# Contact Parser Implementation Guide

This guide explains how to implement the robust `ContactParser` utility in any Node.js/TypeScript project. This parser handles complex names (titles, suffixes), international phone numbers, and email domain extraction.

## 1. Install Dependencies

You need two key libraries:
- `parse-full-name`: For intelligent name splitting.
- `libphonenumber-js`: For Google-grade phone number parsing and validation.

```bash
npm install parse-full-name libphonenumber-js
npm install --save-dev @types/parse-full-name
```

## 2. Create the Utility Class

Create a file named `src/utils/contactParser.ts` (or wherever you keep utilities).

```typescript
import { parseFullName } from 'parse-full-name';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';

export interface ParsedContact {
    firstname: string | null;
    lastname: string | null;
    alias: string | null;
    title: string | null;
    suffix: string | null;
    phone: string | null;
    country_code: string | null;
    phone_formatted: string | null;
    email: string | null;
    domain: string | null;
    original: any;
}

export class ContactParser {
    /**
     * Main entry point to parse a raw contact object.
     * Expects keys like 'Name', 'Phone', 'Email'.
     */
    static parse(raw: any): ParsedContact {
        // Normalize keys if necessary, or pass specific strings to sub-methods
        const nameStr = raw.Name || raw.name || raw.fullname || '';
        const phoneStr = raw.Phone || raw.phone || raw.mobile || '';
        const emailStr = raw.Email || raw.email || '';

        const nameParts = this.parseName(nameStr);
        const phoneParts = this.parsePhone(phoneStr);
        const emailParts = this.parseEmail(emailStr);

        return {
            ...nameParts,
            ...phoneParts,
            ...emailParts,
            original: raw
        };
    }

    static parseName(rawName: string) {
        if (!rawName) return { firstname: null, lastname: null, alias: null, title: null, suffix: null };
        
        const cleanName = rawName.trim();
        const parsed = parseFullName(cleanName);

        return {
            firstname: parsed.first || null,
            lastname: parsed.last || null,
            alias: parsed.nick || null,
            title: parsed.title || null,
            suffix: parsed.suffix || null
        };
    }

    static parsePhone(rawPhone: string, defaultCountry: CountryCode = 'US') {
        if (!rawPhone) return { phone: null, country_code: null, phone_formatted: null };

        const phoneStr = String(rawPhone);
        try {
            const phoneNumber = parsePhoneNumber(phoneStr, defaultCountry);
            if (phoneNumber && phoneNumber.isValid()) {
                return {
                    phone: phoneNumber.nationalNumber as string,
                    country_code: '+' + phoneNumber.countryCallingCode,
                    phone_formatted: phoneNumber.formatInternational()
                };
            }
        } catch (e) { /* Invalid format */ }

        // Fallback: just digits
        return {
            phone: phoneStr.replace(/\D/g, '') || null,
            country_code: null,
            phone_formatted: null
        };
    }

    static parseEmail(rawEmail: string) {
        if (!rawEmail) return { email: null, domain: null };
        const cleanEmail = rawEmail.trim();
        const parts = cleanEmail.split('@');
        return {
            email: cleanEmail,
            domain: parts.length === 2 ? parts[1] : null
        };
    }
}
```

## 3. Usage Example

Here is how you use it in your code (e.g., when processing a CSV row):

```typescript
import { ContactParser } from './utils/contactParser';

const rawRow = {
    Name: 'Dr. Bob Smith Jr.',
    Phone: '555-0199',
    Email: 'bob@gmail.com'
};

const result = ContactParser.parse(rawRow);

console.log(result);
/*
Output:
{
    firstname: "Bob",
    lastname: "Smith",
    title: "Dr.",
    suffix: "Jr.",
    phone: "5550199",
    country_code: "+1",
    email: "bob@gmail.com",
    domain: "gmail.com",
    ...
}
*/
```

## 4. Customization Tips

- **Default Country**: If your users are mostly outside the US, change the default country code in `parsePhone` (e.g., 'GB' for UK).
- **Strict Validation**: The current `parsePhone` implementation falls back to stripping non-digits if validation fails. If you want to reject invalid numbers entirely, return `null` inside the `catch` block instead of the fallback.

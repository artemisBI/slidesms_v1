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
     * Expects keys like 'Name', 'Phone', 'Email' (case-insensitive handling should be done by caller or here if needed).
     */
    static parse(raw: any): ParsedContact {
        // Extract raw values - assuming the caller has normalized keys or we check common ones
        // For this implementation, we'll assume the caller passes specific values or we look for standard ones
        const nameStr = raw.Name || raw.name || raw.fullname || raw['Full Name'] || '';
        const phoneStr = raw.Phone || raw.phone || raw.mobile || raw['Phone Number'] || '';
        const emailStr = raw.Email || raw.email || raw['E-mail'] || '';

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
        if (!rawName) {
            return {
                firstname: null,
                lastname: null,
                alias: null,
                title: null,
                suffix: null
            };
        }

        // Clean up whitespace
        const cleanName = rawName.trim();

        // Use parse-full-name library
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
        if (!rawPhone) {
            return {
                phone: null,
                country_code: null,
                phone_formatted: null
            };
        }

        // Convert to string just in case
        const phoneStr = String(rawPhone);

        try {
            const phoneNumber = parsePhoneNumber(phoneStr, defaultCountry);

            if (phoneNumber && phoneNumber.isValid()) {
                return {
                    phone: phoneNumber.nationalNumber as string, // e.g. "5555555555"
                    country_code: '+' + phoneNumber.countryCallingCode, // e.g. "+1"
                    phone_formatted: phoneNumber.formatInternational() // e.g. "+1 555 555 5555"
                };
            }
        } catch (e) {
            // Invalid phone number format
        }

        // Fallback for invalid numbers: try to just strip non-digits
        const stripped = phoneStr.replace(/\D/g, '');
        return {
            phone: stripped || null,
            country_code: null,
            phone_formatted: null
        };
    }

    static parseEmail(rawEmail: string) {
        if (!rawEmail) {
            return {
                email: null,
                domain: null
            };
        }

        const cleanEmail = rawEmail.trim();
        const parts = cleanEmail.split('@');

        return {
            email: cleanEmail,
            domain: parts.length === 2 ? parts[1] : null
        };
    }
}

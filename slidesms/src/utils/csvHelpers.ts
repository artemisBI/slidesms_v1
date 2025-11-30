import Papa from 'papaparse';
import { ContactParser, ParsedContact } from './contactParser';

// Re-export the interface from the parser for consistency
export type Contact = ParsedContact;

export interface ParseResult {
    valid: Contact[];
    invalid: any[];
    duplicates: number;
    total: number;
}

/**
 * Infer column names from headers
 * Looks for common variations of Name, Phone, Email
 */
export const inferColumns = (headers: string[]) => {
    const lowerHeaders = headers.map(h => h.toLowerCase().trim());

    const mapping = {
        name: -1,
        phone: -1,
        email: -1
    };

    // Priority list for column matching
    const patterns = {
        name: ['name', 'full name', 'fullname', 'first name', 'contact'],
        phone: ['phone', 'mobile', 'cell', 'number', 'phone number', 'contact number'],
        email: ['email', 'e-mail', 'mail', 'email address']
    };

    // Find best match for each field
    lowerHeaders.forEach((header, index) => {
        if (mapping.name === -1 && patterns.name.some(p => header.includes(p))) mapping.name = index;
        if (mapping.phone === -1 && patterns.phone.some(p => header.includes(p))) mapping.phone = index;
        if (mapping.email === -1 && patterns.email.some(p => header.includes(p))) mapping.email = index;
    });

    return mapping;
};

export const parseCSV = (file: File): Promise<ParseResult> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const data = results.data as any[];
                const headers = results.meta.fields || [];
                const mapping = inferColumns(headers);

                const validContacts: Contact[] = [];
                const invalidRows: any[] = [];
                const seenPhones = new Set<string>();
                let duplicates = 0;

                data.forEach((row) => {
                    // Helper to get value by index (if we mapped indices) or by key name
                    const keys = Object.keys(row);

                    const nameKey = mapping.name !== -1 ? keys[mapping.name] : keys.find(k => k.toLowerCase().includes('name'));
                    const phoneKey = mapping.phone !== -1 ? keys[mapping.phone] : keys.find(k => k.toLowerCase().includes('phone'));
                    const emailKey = mapping.email !== -1 ? keys[mapping.email] : keys.find(k => k.toLowerCase().includes('email'));

                    const nameStr = nameKey ? row[nameKey] : '';
                    const phoneStr = phoneKey ? row[phoneKey] : '';
                    const emailStr = emailKey ? row[emailKey] : '';

                    // Use the centralized ContactParser
                    const parsedName = ContactParser.parseName(nameStr);
                    const parsedPhone = ContactParser.parsePhone(phoneStr);
                    const parsedEmail = ContactParser.parseEmail(emailStr);

                    // Validation: Must have at least a valid phone number
                    if (parsedPhone.phone) {
                        if (seenPhones.has(parsedPhone.phone)) {
                            duplicates++;
                        } else {
                            seenPhones.add(parsedPhone.phone);
                            validContacts.push({
                                ...parsedName,
                                ...parsedPhone,
                                ...parsedEmail,
                                original: row
                            });
                        }
                    } else {
                        invalidRows.push(row);
                    }
                });

                resolve({
                    valid: validContacts,
                    invalid: invalidRows,
                    duplicates,
                    total: data.length
                });
            },
            error: (error) => {
                reject(error);
            }
        });
    });
};


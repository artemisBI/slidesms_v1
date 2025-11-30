// ...existing code...
import { NextRequest, NextResponse } from 'next/server';

type Contact = {
    name?: string;
    phone: string;
    email?: string;
};

const DEBUG_UPLOAD = process.env.DEBUG_UPLOAD === 'true';

function isValidPhone(p: unknown): p is string {
    if (typeof p !== 'string') return false;
    const digits = p.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
}

function maskPhone(p: string) {
    const digits = p.replace(/\D/g, '');
    return digits.length <= 4 ? '****' : `****${digits.slice(-4)}`;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // NOTE: authentication removed for testing.
        // To re-enable, import getServerSession + shared nextAuthOptions
        // and validate session before proceeding.

        const body = await request.json();
        const { contacts } = body;

        if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
            return NextResponse.json({ error: 'Invalid request. Contacts array is required.' }, { status: 400 });
        }

        const validated: Contact[] = [];

        for (const raw of contacts) {
            if (!raw || typeof raw !== 'object') {
                return NextResponse.json({ error: 'Invalid contact data.' }, { status: 400 });
            }
            const { phone, name, email } = raw as Record<string, unknown>;

            if (!isValidPhone(phone)) {
                return NextResponse.json({ error: 'Invalid contact data. Valid phone is required.' }, { status: 400 });
            }

            validated.push({ name: typeof name === 'string' ? name.trim() : undefined, phone: String(phone), email: typeof email === 'string' ? email.trim() : undefined });
        }

        console.log(`[DEBUG] Upload request received: ${validated.length} contacts. Example masked:`, maskPhone(validated[0]?.phone ?? ''));

        // TODO: insert into Supabase using server-only key (SUPABASE_SERVICE_ROLE_KEY)
        // const contactIds = await insertContacts(validated, session?.user?.email);

        // Simulate database insert IDs
        const contactIds = validated.map((_, i) => i + 1);

        const responsePayload: Record<string, unknown> = {
            success: true,
            inserted: validated.length,
            contactIds,
        };

        if (DEBUG_UPLOAD) {
            // Only include full data when DEBUG_UPLOAD=true
            responsePayload.debug_received_data = validated;
        }

        return NextResponse.json(responsePayload, { status: 200 });

    } catch (error) {
        console.error('Error uploading contacts:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
// ...existing code...
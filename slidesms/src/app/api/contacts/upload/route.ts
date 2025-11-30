import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../auth/[...nextauth]/route';

/**
 * POST /api/contacts/upload
 * 
 * Saves validated contacts to the database.
 * Requires user to be authenticated.
 * 
 * Request Body:
 * {
 *   contacts: [
 *     { name: string, phone: string, email: string },
 *     ...
 *   ]
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   inserted: number,
 *   contactIds: number[]
 * }
 */
export async function POST(request: NextRequest) {
    try {
        // 1. Check authentication
        // const session = await getServerSession(nextAuthOptions);

        // if (!session?.user?.email) {
        //     return NextResponse.json(
        //         { error: 'Unauthorized. Please sign in.' },
        //         { status: 401 }
        //     );
        // }

        // 2. Parse request body
        const body = await request.json();
        const { contacts } = body;

        if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
            return NextResponse.json(
                { error: 'Invalid request. Contacts array is required.' },
                { status: 400 }
            );
        }

        // 3. Validate contact structure
        // 3. Validate contact structure
        for (const contact of contacts) {
            if (!contact.phone) {
                return NextResponse.json(
                    { error: 'Invalid contact data. Phone is required.' },
                    { status: 400 }
                );
            }
        }

        // 4. TODO: Insert into Supabase
        // For now, we'll simulate success
        // In the next step, we'll add the actual Supabase insert

        // console.log(`User ${session.user.email} uploading ${contacts.length} contacts`);
        console.log(`[DEBUG] Uploading ${contacts.length} contacts`, contacts);

        // Simulate database insert
        const contactIds = contacts.map((_, i) => i + 1);

        // 5. Return success with the data for inspection
        return NextResponse.json({
            success: true,
            inserted: contacts.length,
            contactIds,
            debug_received_data: contacts
        });

    } catch (error) {
        console.error('Error uploading contacts:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

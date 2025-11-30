import styles from './Story.module.css';

/**
 * STORY SECTION
 * 
 * Purpose: Social proof through Sarah's narrative (from README.md)
 * Design: Full-width, centered text, light background
 * Follows: Storytelling best practice for SaaS marketing
 */
export default function Story() {
    return (
        <section className={styles.story}>
            <div className={styles.container}>
                <h2 className={styles.title}>Sarah's Tuesday morning turnaround</h2>

                <div className={styles.narrative}>
                    <p>
                        Sarah, owner of "The Local Roast" coffee shop, used to feel frustrated by her marketing options.
                        Her emails got buried in spam folders, and social media algorithms seemed to hide her posts about daily specials.
                    </p>

                    <p>
                        Then, she discovered SlideSMS.
                    </p>

                    <p>
                        Within ten minutes of signing up, she had uploaded her customer spreadsheet into the intuitive dashboard.
                        Tuesday morning was notoriously slow. She typed up a quick campaign:
                        <em>"Rainy Day Rescue: Show this text for a free pastry with any large latte until noon today!"</em>
                    </p>

                    <p>
                        She used the scheduling tool to time it perfectly for 8:45 AM, right as people were arriving at their desks.
                    </p>

                    <p className={styles.highlight}>
                        At 8:46 AM, phones buzzed across town.
                    </p>

                    <p>
                        At 9:00 AM, the shop door swung open. A regular walked in, holding up their phone with a grin.
                        "Got your text, Sarah. Perfect timing." Then another customer came in. And another.
                    </p>

                    <p className={styles.conclusion}>
                        For the first time, she had the same immediate, direct reach as the giant coffee chains down the street.
                        She wasn't just sending texts; she was finally owning her audience connection.
                    </p>
                </div>
            </div>
        </section>
    );
}

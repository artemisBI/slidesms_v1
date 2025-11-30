import styles from './Footer.module.css';

/**
 * FOOTER COMPONENT
 * 
 * Purpose: Site footer with links and copyright
 * Design: Simple, minimal, professional
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <h3 className={styles.logo}>SlideSMS</h3>
                    <p className={styles.tagline}>Democratizing SMS marketing for everyone</p>
                </div>

                <div className={styles.links}>
                    <a href="#" className={styles.link}>About</a>
                    <a href="#" className={styles.link}>Privacy</a>
                    <a href="#" className={styles.link}>Terms</a>
                    <a href="#" className={styles.link}>Contact</a>
                </div>

                <div className={styles.copyright}>
                    © {currentYear} SlideSMS. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

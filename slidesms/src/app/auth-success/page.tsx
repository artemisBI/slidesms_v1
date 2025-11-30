"use client";

import Link from 'next/link';
import BackgroundParticles from '@/components/BackgroundParticles';
import styles from './page.module.css';

export default function AuthSuccessPage() {
    return (
        <main className={styles.main}>
            <BackgroundParticles />
            <div className={styles.container}>
                <div className={styles.iconWrapper}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <h1 className={styles.title}>You have successfully authenticated.</h1>

                <p className={styles.description}>
                    You should be redirected back to the product. <br />
                    <Link href="/" className={styles.link}>Click here if not working.</Link>
                </p>

                <div className={styles.footer}>
                    <Link href="#" className={styles.footerLink}>Docs</Link>
                    <span className={styles.separator}>•</span>
                    <Link href="#" className={styles.footerLink}>Twitter</Link>
                </div>
            </div>
        </main>
    );
}

"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './EmailCapture.module.css';

/**
 * PREMIUM EMAIL CAPTURE
 * 
 * Features:
 * - Gradient background (softer than solid blue)
 * - Wider container
 * - Scroll-triggered fade-in
 */
export default function EmailCapture() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // TODO: Send to email service
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1000);
    };

    return (
        <section id="email-capture" className={styles.emailCapture}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Get early access
                </motion.h2>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Be the first to know when SlideSMS launches. No spam, just updates.
                </motion.p>

                {status === 'success' ? (
                    <motion.div
                        className={styles.successMessage}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        ✓ Thanks! We'll be in touch soon.
                    </motion.div>
                ) : (
                    <motion.form
                        onSubmit={handleSubmit}
                        className={styles.form}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className={styles.input}
                            disabled={status === 'loading'}
                        />
                        <button
                            type="submit"
                            className={styles.button}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Sending...' : 'Join waitlist'}
                        </button>
                    </motion.form>
                )}
            </div>
        </section>
    );
}

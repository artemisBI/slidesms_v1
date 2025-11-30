"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BackgroundParticles from '@/components/BackgroundParticles';
import styles from './Hero.module.css';

/**
 * PREMIUM HERO SECTION
 *
 * Features:
 * - Full viewport height
 * - Animated text reveal (word-by-word)
 * - Gradient CTA button with glow
 * - Logo display
 * - Floating particle background
 */
export default function Hero() {
    const router = useRouter();
    const headline = "The simplest way to reach your audience instantly";
    const words = headline.split(" ");

    const navigateToUpload = () => {
        router.push("/upload");
    };

    return (
        <section className={styles.hero}>
            {/* Particle Background */}
            <BackgroundParticles />

            <div className={styles.container}>
                {/* Logo */}
                <motion.div
                    className={styles.logoWrapper}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Image
                        src="/logo.png"
                        alt="SlideSMS Logo"
                        width={80}
                        height={80}
                        className={styles.logo}
                    />
                </motion.div>

                {/* Animated Headline - Word by word reveal */}
                <h1 className={styles.headline}>
                    {words.map((word: string, wordIndex: number) => (
                        <motion.span
                            key={wordIndex}
                            className={styles.word}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: wordIndex * 0.1 }}
                        >
                            {word}{" "}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    className={styles.subheadline}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    Turn a cluttered email list into a direct, friendly text message that actually gets read.
                </motion.p>

                <motion.div
                    className={styles.cta}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                >
                    <button onClick={navigateToUpload} className={styles.primaryButton}>
                        Sign On
                    </button>
                </motion.div>

                <motion.p
                    className={styles.tagline}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                >
                    Democratizing SMS marketing for everyone
                </motion.p>
            </div>
        </section>
    );
}


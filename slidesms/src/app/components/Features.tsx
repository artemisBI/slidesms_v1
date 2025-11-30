"use client";

import { motion } from 'framer-motion';
import { MessageSquare, Zap, Target } from 'lucide-react';
import styles from './Features.module.css';

/**
 * PREMIUM FEATURES SECTION
 * 
 * Features:
 * - Monochromatic Lucide icons (animated on hover)
 * - Glass morphism cards
 * - Scroll-triggered fade-in
 * - Wider container (1400px)
 */
export default function Features() {
    const features = [
        {
            icon: MessageSquare,
            title: 'Direct reach',
            description: 'Your message lands in their pocket, not a spam folder. Text messages have a 98% open rate.'
        },
        {
            icon: Zap,
            title: 'Turnkey simple',
            description: 'Upload your list, write your message, and send. No complex setup or technical knowledge required.'
        },
        {
            icon: Target,
            title: 'Built for connection',
            description: 'Compliant, respectful messaging with automatic opt-out handling. Reach people who care.'
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className={styles.features}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Why SlideSMS?
                </motion.h2>

                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                className={styles.card}
                                variants={cardVariants}
                            >
                                <motion.div
                                    className={styles.iconWrapper}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Icon size={48} strokeWidth={1.5} className={styles.icon} />
                                </motion.div>
                                <h3 className={styles.cardTitle}>{feature.title}</h3>
                                <p className={styles.cardDescription}>{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

/**
 * BACKGROUND PARTICLES COMPONENT
 * 
 * Purpose: Floating blue dust/constellation effect (like Google Antigravity)
 * Tech: tsparticles-slim (optimized physics engine)
 * 
 * Features:
 * - Small blue circular particles
 * - Slow random movement
 * - Fading opacity
 * - Transparent background
 * - Sits behind content (z-index: -1)
 */
export default function BackgroundParticles() {
    const particlesInit = useCallback(async (engine: Engine) => {
        // Load only the features we need (slim version for performance)
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // Optional callback when particles are loaded
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "grab",
                        },
                        resize: true,
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            links: {
                                opacity: 0.3,
                            },
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#4E3FF3", // Blue from our palette
                    },
                    links: {
                        color: "#4E3FF3",
                        distance: 150,
                        enable: true,
                        opacity: 0.2,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: true,
                        speed: 0.5, // Slow, gentle movement
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80, // Number of particles
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.5 }, // Fading opacity
                        animation: {
                            enable: true,
                            speed: 1,
                            minimumValue: 0.1,
                            sync: false,
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 3 }, // Small particles
                    },
                },
                detectRetina: true,
            }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1, // Behind all content
            }}
        />
    );
}

import React from 'react';
import { Navbar } from '../../components/navigation';
import { Hero } from '../../components/landing';
import { Section, Container } from '../../components/layout';
import { Button, Card } from '../../components/ui';

const LandingPage: React.FC = () => {
    const navItems = [
        { label: 'Features', href: '#features' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ];

    const authActions = (
        <div className="nav-actions">
            <Button variant="ghost" onClick={() => window.location.href = '/user-login'}>
                Sign In
            </Button>
            <Button onClick={() => window.location.href = '/register'}>
                Get Started
            </Button>
        </div>
    );

    return (
        <main className="landing-page">
            <Navbar
                logo="NoteStore"
                items={navItems}
                actions={authActions}
            />

            <Section variant="brand" size="xs">
                <Container size="xl">
                    <Hero
                        title="NoteStore"
                        subtitle="A clean, focused home for the notes, plans, and course ideas you want to keep moving."
                        primaryAction={{
                            label: 'Start Writing',
                            onClick: () => window.location.href = '/register'
                        }}
                        secondaryAction={{
                            label: 'Explore Features',
                            onClick: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        image="/favicon.jpg"
                    />
                </Container>
            </Section>

            <Section id="features" variant="white" size="lg">
                <Container>
                    <div className="section-heading">
                        <span className="section-kicker">Built for focus</span>
                        <h2>Everything feels organized from the first note.</h2>
                        <p>Fast capture, readable cards, and a workspace that gives your thoughts room to breathe.</p>
                    </div>

                    <div className="landing-feature-grid">
                        <Card title="Cloud Sync" padding="lg" className="feature-card">
                            <span className="feature-card__icon">S</span>
                            <p>Your notes stay available across sessions with a calm dashboard built for quick review.</p>
                        </Card>
                        <Card title="Rich Drafting" padding="lg" className="feature-card">
                            <span className="feature-card__icon">D</span>
                            <p>Write longer ideas in a focused editor with clear fields, generous spacing, and instant saving.</p>
                        </Card>
                        <Card title="Easy Management" padding="lg" className="feature-card">
                            <span className="feature-card__icon">M</span>
                            <p>Admin views make users and notes easier to scan, search, audit, and maintain.</p>
                        </Card>
                    </div>
                </Container>
            </Section>

            <Section id="about" variant="dark" size="lg">
                <Container>
                    <div className="story-layout">
                        <div className="story-copy">
                            <span className="section-kicker">Why NoteStore</span>
                            <h2>Designed like a quiet desk, not a noisy feed.</h2>
                            <p>
                                NoteStore keeps the interface simple, warm, and structured so students and professionals can
                                capture ideas without fighting the tool.
                            </p>
                            <p>
                                The experience now carries the same polish from the public site to the user workspace and admin
                                console, so every path through the app feels considered.
                            </p>
                        </div>
                        <div className="story-panel">
                            <div className="story-note-stack">
                                <div className="story-note">
                                    <strong>Capture</strong>
                                    Save quick thoughts before they disappear.
                                </div>
                                <div className="story-note">
                                    <strong>Refine</strong>
                                    Turn fragments into useful study or project material.
                                </div>
                                <div className="story-note">
                                    <strong>Return</strong>
                                    Find the right note again when it matters.
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            <Section id="contact" variant="white" size="lg">
                <Container>
                    <div className="section-heading">
                        <span className="section-kicker">Contact</span>
                        <h2>Questions, feedback, or support.</h2>
                        <p>Reach the NoteStore team through the channels below.</p>
                    </div>
                    <div className="contact-grid">
                        <div className="contact-card">
                            <span>Email</span>
                            <strong>support@notestore.app</strong>
                        </div>
                        <div className="contact-card">
                            <span>Twitter</span>
                            <strong>@notestore_app</strong>
                        </div>
                    </div>
                </Container>
            </Section>

            <footer className="site-footer">
                <Container>
                    <p>Copyright 2026 NoteStore App. Capture your lightbulb moments.</p>
                </Container>
            </footer>
        </main>
    );
};

export default LandingPage;

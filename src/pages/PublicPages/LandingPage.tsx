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
        <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Button variant="ghost" onClick={() => window.location.href = '/user-login'} style={{ color: '#94a3b8' }}>
                Sign In
            </Button>
            <Button onClick={() => window.location.href = '/register'}>
                Get Started
            </Button>
        </div>
    );

    return (
        <main className="landing-page" style={{ backgroundColor: '#0f172a' }}>
            <Navbar
                logo="NoteStore"
                items={navItems}
                actions={authActions}
            />

            <Section variant="dark" size="xl">
                <Container>
                    <Hero
                        title={
                            <>
                                Capture your <span style={{ color: '#818cf8' }}>ideas</span>, <br />
                                anywhere, anytime.
                            </>
                        }
                        subtitle="The ultimate note-taking app for students, professionals, and world-shapers. Simple yet powerful enough for your biggest dreams."
                        primaryAction={{
                            label: 'Sign Up Free',
                            onClick: () => window.location.href = '/register'
                        }}
                        secondaryAction={{
                            label: 'Learn More',
                            onClick: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        image="../../assets/note.jpg"
                    />
                </Container>
            </Section>

            <Section id="features" variant="white" size="lg">
                <Container>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#f8fafc' }}>
                            Everything you need to be productive
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>
                            Designed to help you focus on your thoughts, not the tool.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        <Card title="Cloud Sync" padding="lg" style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.05)', color: '#f8fafc' }}>
                            <p style={{ color: '#94a3b8' }}>Your notes are synced across all your devices in real-time.</p>
                        </Card>
                        <Card title="Markdown Support" padding="lg" style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.05)', color: '#f8fafc' }}>
                            <p style={{ color: '#94a3b8' }}>Write beautiful notes using rich text and standard markdown syntax.</p>
                        </Card>
                        <Card title="Stay Organized" padding="lg" style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.05)', color: '#f8fafc' }}>
                            <p style={{ color: '#94a3b8' }}>Use folders, tags, and smart filters to manage everything efficiently.</p>
                        </Card>
                    </div>
                </Container>
            </Section>

            <Section id="about" variant="dark" size="lg">
                <Container>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
                        <div style={{ flex: '1', minWidth: '320px' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#f8fafc' }}>Our Story</h2>
                            <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#94a3b8', marginBottom: '1.5rem' }}>
                                NoteStore was founded with a simple goal: to make capturing information as effortless as possible.
                                We believe that everyone should have a place to dump their thoughts, refine them, and turn them into reality.
                            </p>
                            <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#94a3b8' }}>
                                Our platform is built by students and professionals, for students and professionals.
                                We focus on speed, privacy, and simplicity.
                            </p>
                        </div>
                        <div style={{ flex: '1', minWidth: '320px', textAlign: 'center' }}>
                            <img src="https://illustrations.popsy.co/white/creative-work.svg" alt="About" style={{ maxWidth: '100%', height: 'auto', borderRadius: '1rem' }} />
                        </div>
                    </div>
                </Container>
            </Section>

            <Section id="contact" variant="white" size="lg">
                <Container>
                    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#f8fafc' }}>Get in Touch</h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.125rem', marginBottom: '3rem' }}>
                            Have questions or feedback? We'd love to hear from you.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                            <div style={{ padding: '1.5rem', backgroundColor: '#0f172a', borderRadius: '1rem' }}>
                                <strong style={{ color: '#f8fafc' }}>Email:</strong> <span style={{ color: '#94a3b8' }}>support@notestore.app</span>
                            </div>
                            <div style={{ padding: '1.5rem', backgroundColor: '#0f172a', borderRadius: '1rem' }}>
                                <strong style={{ color: '#f8fafc' }}>Twitter:</strong> <span style={{ color: '#94a3b8' }}>@notestore_app</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            <footer style={{ padding: '3rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', backgroundColor: '#0f172a' }}>
                <Container>
                    <p style={{ color: '#64748b' }}>© 2026 NoteStore App. Capture your lightbulb moments.</p>
                </Container>
            </footer>
        </main>
    );
};

export default LandingPage;

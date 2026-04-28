import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../../components/auth';
import { FormGroup } from '../../components/forms';
import { Input, Button } from '../../components/ui';
import { Section, Container } from '../../components/layout';
import authService from '../../services/authService';

const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Form Validation
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await authService.register({ email, password });
            if (response.success) {
                alert("Registration successful! Please login.");
                navigate('/user-login');
            }
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const footer = (
        <>
            Already have an account? <a href="/user-login">Sign In</a>
        </>
    );

    return (
        <main className="registration-page" style={{
            backgroundColor: '#0f172a',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
                <Button variant="ghost" onClick={() => navigate('/')} style={{ color: '#94a3b8' }}>
                    ← Back to Home
                </Button>
            </div>
            <Section variant="dark">

                <Container size="sm">
                    <AuthCard
                        title="Create an Account"
                        subtitle="Join NoteStore to start capturing your best ideas."
                        footer={footer}
                        style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                        {error && (
                            <div style={{
                                color: '#fca5a5',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                padding: '10px',
                                borderRadius: '6px',
                                marginBottom: '1.5rem',
                                textAlign: 'center',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                            }}>
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleRegister}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                                <FormGroup label="Email Address" required style={{ color: '#ffffff' }}>
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            backgroundColor: '#0f172a',
                                            border: '2px solid rgba(255,255,255,0.4)',
                                            color: 'goldenrod',
                                            padding: '14px 18px',
                                            fontSize: '1.1rem'
                                        }}
                                    />
                                </FormGroup>

                                <FormGroup label="Password" required hint="At least 8 characters." style={{ color: '#ffffff' }}>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{
                                            backgroundColor: '#0f172a',
                                            border: '2px solid rgba(255,255,255,0.4)',
                                            color: 'goldenrod',
                                            padding: '14px 18px',
                                            fontSize: '1.1rem'
                                        }}
                                    />
                                </FormGroup>

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={loading}
                                    style={{
                                        marginTop: '1.5rem',
                                        fontWeight: 800,
                                        fontSize: '1.25rem',
                                        opacity: loading ? 0.7 : 1
                                    }}
                                >
                                    {loading ? 'Creating Account...' : 'Register Account'}
                                </Button>

                            </div>
                        </form>
                    </AuthCard>
                </Container>
            </Section>
        </main>
    );
};

export default RegistrationPage;

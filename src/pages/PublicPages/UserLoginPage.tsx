import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../../components/auth';
import { FormGroup } from '../../components/forms';
import { Input, Button } from '../../components/ui';
import { Section, Container } from '../../components/layout';
import authService from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';

const UserLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Redirect admins to the admin portal before attempting to login through the user portal
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        if (email.toLowerCase() === adminEmail?.toLowerCase()) {
            navigate('/admin-login');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await authService.login({ email, password });

            if (response.success && response.user && response.token) {
                login(response.token, response.user);
                // Standard user redirect
                navigate('/user-dashboard');
            }
        } catch (err: any) {
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const footer = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
                Don't have an account? <a href="/register" style={{ color: '#818cf8', fontWeight: 600 }}>Create one</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
                <a href="/reset-password" style={{ color: '#94a3b8' }}>Forgot password?</a>
                <a href="/admin-login" style={{ color: '#94a3b8' }}>Admin Login</a>
            </div>
        </div>
    );

    return (
        <main className="login-page" style={{
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
                        title="Welcome Back"
                        subtitle="Please enter your details to sign in to your account."
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
                        <form onSubmit={handleLogin}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <FormGroup label="Email Address">
                                    <Input
                                        type="email"
                                        placeholder="emailaddress@gmail.com"
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

                                <FormGroup label="Password">
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        required
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
                                        marginTop: '0.5rem',
                                        fontWeight: 800,
                                        fontSize: '1.25rem',
                                        opacity: loading ? 0.7 : 1
                                    }}
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </Button>
                            </div>
                        </form>
                    </AuthCard>
                </Container>
            </Section>
        </main>
    );
};

export default UserLoginPage;

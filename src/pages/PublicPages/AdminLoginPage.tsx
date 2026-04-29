import React, { useState } from 'react';
import { AuthCard } from '../../components/auth';
import { FormGroup } from '../../components/forms';
import { Input, Button } from '../../components/ui';
import { Section, Container } from '../../components/layout';
// New imports for frotend-backend implementation
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';

const AdminLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, logout } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await authService.login({ email, password });

            if (response.success && response.user && response.token) {
                if (response.user.role === 'ADMIN') {
                    login(response.token, response.user);
                    navigate('/admin-dashboard');
                } else {
                    // Remove standard user credentials if they tried to login here
                    logout();
                    setError("Unauthorized access. Admin portal requires administrative privileges.");
                }
            }
        } catch (err: any) {
            setError(err.message || "Admin login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const footer = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem' }}>
                <a href="/reset-password" style={{ color: 'goldenrod', fontWeight: 600 }}>Forgot Admin Password?</a>
                <a href="/user-login" style={{ color: '#94a3b8' }}>User Portal</a>
            </div>
        </div>
    );

    return (
        <main className="admin-login-page" style={{
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
                        title="Admin Portal"
                        subtitle="Authorized access only. Please sign in to manage the store."
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
                        <div style={{
                            backgroundColor: 'rgba(218, 165, 32, 0.1)',
                            border: '1px dashed goldenrod',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem',
                            color: '#e2e8f0',
                            textAlign: 'left'
                        }}>
                            <div style={{ color: 'goldenrod', fontWeight: 700, marginBottom: '6px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Demo Admin Access:</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <div>Email: <span style={{ color: 'white', fontFamily: 'monospace' }}>admin@noteapp.com</span></div>
                                <div>Password: <span style={{ color: 'white', fontFamily: 'monospace' }}>admin123</span></div>
                            </div>
                        </div>

                        <form onSubmit={handleAdminLogin}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <FormGroup label="Admin Email">
                                    <Input
                                        type="email"
                                        placeholder="admin@notestore.app"
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

                                <FormGroup label="Admin Password">
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
                                        backgroundColor: loading ? '#4b5563' : 'goldenrod',
                                        color: '#0f172a',
                                        border: 'none',
                                        opacity: loading ? 0.7 : 1
                                    }}
                                >
                                    {loading ? 'Authenticating...' : 'Admin Sign In'}
                                </Button>
                            </div>
                        </form>
                    </AuthCard>
                </Container>
            </Section>
        </main>
    );
};

export default AdminLoginPage;

import React, { useState } from 'react';
import { AuthCard } from '../../components/auth';
import { FormGroup } from '../../components/forms';
import { Input, Button } from '../../components/ui';
import { Section, Container } from '../../components/layout';
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
        <div className="auth-mini-links">
            <a href="/reset-password">Forgot Admin Password?</a>
            <a href="/user-login">User Portal</a>
        </div>
    );

    return (
        <main className="page-shell page-shell--auth">
            <div className="auth-back">
                <Button variant="ghost" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </div>
            <Section variant="dark" size="xs">
                <Container size="sm">
                    <AuthCard
                        title="Admin Portal"
                        subtitle="Secure access for managing NoteStore users and notes."
                        footer={footer}
                    >
                        <div className="auth-brand">
                            <img src="/favicon.jpg" alt="NoteStore" />
                        </div>
                        {error && <div className="alert alert--error">{error}</div>}

                        <div className="demo-panel">
                            <div className="demo-panel__label">Demo Admin Access</div>
                            <div>Email: <code>admin@noteapp.com</code></div>
                            <div>Password: <code>admin123</code></div>
                        </div>

                        <form onSubmit={handleAdminLogin}>
                            <div className="form-stack">
                                <FormGroup label="Admin Email">
                                    <Input
                                        type="email"
                                        placeholder="admin@notestore.app"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup label="Admin Password">
                                    <Input
                                        type="password"
                                        placeholder="Enter admin password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormGroup>

                                <Button type="submit" size="lg" disabled={loading} isLoading={loading}>
                                    Admin Sign In
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

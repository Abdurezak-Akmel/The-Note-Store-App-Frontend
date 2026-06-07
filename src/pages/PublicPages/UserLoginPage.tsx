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
                navigate('/user-dashboard');
            }
        } catch (err: any) {
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const footer = (
        <div className="auth-footer-stack">
            <div>
                Don't have an account? <a href="/register">Create one</a>
            </div>
            <div className="auth-mini-links">
                <a href="/reset-password">Forgot password?</a>
                <a href="/admin-login">Admin Login</a>
            </div>
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
                        title="Welcome Back"
                        subtitle="Sign in to return to your NoteStore workspace."
                        footer={footer}
                    >
                        <div className="auth-brand">
                            <img src="/favicon.jpg" alt="NoteStore" />
                        </div>
                        {error && <div className="alert alert--error">{error}</div>}
                        <form onSubmit={handleLogin}>
                            <div className="form-stack">
                                <FormGroup label="Email Address">
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup label="Password">
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormGroup>

                                <Button type="submit" size="lg" disabled={loading} isLoading={loading}>
                                    Sign In
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

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
        <main className="page-shell page-shell--auth">
            <div className="auth-back">
                <Button variant="ghost" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </div>
            <Section variant="dark" size="xs">
                <Container size="sm">
                    <AuthCard
                        title="Create an Account"
                        subtitle="Start a clean NoteStore workspace for your best ideas."
                        footer={footer}
                    >
                        <div className="auth-brand">
                            <img src="/favicon.jpg" alt="NoteStore" />
                        </div>
                        {error && <div className="alert alert--error">{error}</div>}
                        <form onSubmit={handleRegister}>
                            <div className="form-stack">
                                <FormGroup label="Email Address" required>
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup label="Password" required hint="Use at least 8 characters.">
                                    <Input
                                        type="password"
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormGroup>

                                <Button type="submit" size="lg" disabled={loading} isLoading={loading}>
                                    Register Account
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

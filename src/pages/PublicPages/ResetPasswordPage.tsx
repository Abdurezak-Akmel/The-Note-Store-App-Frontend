import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../../components/auth';
import { FormGroup } from '../../components/forms';
import { Input, Button } from '../../components/ui';
import { Section, Container } from '../../components/layout';
import { authService } from '../../services/authService';

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await authService.resetPassword({ email, newPassword });
            if (response.success) {
                setSuccess(response.message || 'Password updated successfully!');
                setEmail('');
                setNewPassword('');
                setTimeout(() => {
                    navigate('/user-login');
                }, 2000);
            } else {
                setError(response.message || 'Failed to update password.');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const footer = (
        <div>
            Remembered your password? <a href="/user-login">Sign In</a>
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
                        title="Reset Password"
                        subtitle="Set a new password and get back to your notes."
                        footer={footer}
                    >
                        <div className="auth-brand">
                            <img src="/favicon.jpg" alt="NoteStore" />
                        </div>
                        {error && <div className="alert alert--error">{error}</div>}
                        {success && <div className="alert alert--success">{success}</div>}
                        <form onSubmit={handleReset}>
                            <div className="form-stack">
                                <FormGroup label="Email Address">
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup label="New Password">
                                    <Input
                                        type="password"
                                        placeholder="Enter a new password"
                                        autoComplete="new-password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </FormGroup>

                                <Button type="submit" size="lg" disabled={isLoading} isLoading={isLoading}>
                                    Update Password
                                </Button>
                            </div>
                        </form>
                    </AuthCard>
                </Container>
            </Section>
        </main>
    );
};

export default ResetPasswordPage;

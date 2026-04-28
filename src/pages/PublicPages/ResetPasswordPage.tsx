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
                // Redirect to login page after 2 seconds
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
            Remembered your password? <a href="/user-login" style={{ color: '#818cf8', fontWeight: 600 }}>Sign In</a>
        </div>
    );

    return (
        <main className="reset-password-page" style={{
            backgroundColor: '#0f172a',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <div style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
                <Button variant="ghost" onClick={() => window.location.href = '/'} style={{ color: '#94a3b8' }}>
                    ← Back to Home
                </Button>
            </div>
            <Section variant="dark">

                <Container size="sm">
                    <AuthCard
                        title="Reset Password"
                        subtitle="Enter your email and a new password to secure your account."
                        footer={footer}
                        style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                        {error && (
                            <div style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                marginBottom: '1rem',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}
                        {success && (
                            <div style={{
                                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                color: '#22c55e',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                marginBottom: '1rem',
                                border: '1px solid rgba(34, 197, 94, 0.2)',
                                textAlign: 'center'
                            }}>
                                {success}
                            </div>
                        )}
                        <form onSubmit={handleReset}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <FormGroup label="Email Address">
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
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

                                <FormGroup label="New Password">
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
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
                                    disabled={isLoading}
                                    style={{ marginTop: '0.5rem', fontWeight: 800, fontSize: '1.25rem' }}
                                >
                                    {isLoading ? 'Updating...' : 'Update Password'}
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

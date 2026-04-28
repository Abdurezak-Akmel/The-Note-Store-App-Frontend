import React from 'react';
import { StatsCard } from '../../components/dashboard';
import { Section, Container } from '../../components/layout';
import { Button, Card } from '../../components/ui';
import { Navbar } from '../../components/navigation';

//New
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import usersService from '../../services/usersService';
import notesService from '../../services/notesService';
import { useState, useEffect } from 'react';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState<number | string>('...');
    const [noteCount, setNoteCount] = useState<number | string>('...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [usersResponse, notesResponse] = await Promise.all([
                    usersService.getAllUsers(),
                    notesService.getAllNotes()
                ]);

                if (usersResponse.success) {
                    setUserCount(usersResponse.users.length);
                }

                if (notesResponse.success) {
                    setNoteCount(notesResponse.data.length);
                }
            } catch (err: any) {
                console.error("Failed to fetch dashboard stats:", err);
                setError("Could not load latest statistics.");
            }
        };

        fetchStats();
    }, []);

    const stats = [
        { label: 'Total Users', value: userCount.toString() },
        { label: 'Total Notes', value: noteCount.toString() }
    ];

    const navItems = [
        { label: 'Overview', href: '/admin-dashboard' },
        { label: 'Users', href: '/admin/users' },
        { label: 'Notes', href: '/admin/notes' },
    ];

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/admin-login');
        } catch (error) {
            console.error("Logout failed", error);
            // Force clear storage and redirect even on failure
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userInfo");
            navigate('/admin-login');
        }
    };

    const logoutAction = (
        <Button variant="ghost" onClick={handleLogout} style={{ color: '#94a3b8' }}>
            Logout
        </Button>
    );

    return (
        <main className="admin-dashboard" style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
            {/* Header / Nav */}
            <Navbar
                logo="NoteStore"
                items={navItems}
                actions={logoutAction}
            />

            <Section variant="dark" size="lg">
                <Container>
                    <div style={{ marginBottom: '3rem' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Dashboard</h1>
                        <p style={{ color: '#94a3b8' }}>Real-time insights and system administration.</p>
                        {error && (
                            <p style={{ color: '#fca5a5', marginTop: '1rem', padding: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px', display: 'inline-block' }}>
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                        marginBottom: '4rem'
                    }}>
                        {stats.map((stat, idx) => (
                            <StatsCard
                                key={idx}
                                label={stat.label}
                                value={stat.value}
                                style={{ backgroundColor: '#d1d8e2ff', border: '1px solid rgba(255,255,255,0.05)' }}
                            />
                        ))}
                    </div>

                    {/* Management Section */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Quick Actions</h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '2rem'
                        }}>
                            <Card
                                title="User Management"
                                padding="lg"
                                style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                <p style={{ color: '#94a3b8', margin: '1rem 0 2rem 0' }}>
                                    View, edit, and manage all users in the system. Monitor account activity and handle permissions.
                                </p>
                                <Button onClick={() => window.location.href = '/admin/users'}>
                                    Manage Users
                                </Button>
                            </Card>

                            <Card
                                title="Note Management"
                                padding="lg"
                                style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                <p style={{ color: '#94a3b8', margin: '1rem 0 2rem 0' }}>
                                    Audit and manage user notes. Review reports, handle storage limits, and monitor system-wide content.
                                </p>
                                <Button onClick={() => window.location.href = '/admin/notes'}>
                                    Manage Notes
                                </Button>
                            </Card>
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    );
};

export default AdminDashboard;

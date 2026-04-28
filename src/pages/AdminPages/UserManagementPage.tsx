import React, { useState, useEffect } from 'react';
import { Section, Container } from '../../components/layout';
import { Button, Card, Input } from '../../components/ui';
import { Navbar } from '../../components/navigation';
import usersService, { type User } from '../../services/usersService';

const UserManagementPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await usersService.getAllUsers();
            if (response.success) {
                setUsers(response.users);
            }
        } catch (err: any) {
            setError(err.message || "Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this user? All their notes and data will be permanently removed.")) {
            try {
                const response = await usersService.deleteUser(id);
                if (response.success) {
                    setUsers(users.filter(user => user.id !== id));
                }
            } catch (err: any) {
                alert(err.message || "Failed to delete user.");
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navItems = [
        { label: 'Dashboard', href: '/admin-dashboard' },
        { label: 'Users', href: '/admin/users' },
        { label: 'Notes', href: '/admin/notes' },
    ];

    return (
        <main className="user-management-page" style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
            <Navbar
                logo="NoteStore"
                items={navItems}
                actions={<Button variant="ghost" onClick={() => window.location.href = '/admin-login'} style={{ color: '#94a3b8' }}>Logout</Button>}
            />

            <Section variant="dark" size="lg">
                <Container size="xl">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>User Management</h1>
                            <p style={{ color: '#94a3b8' }}>Monitor and manage all accounts on the platform.</p>
                            {loading && <p style={{ color: 'goldenrod', marginTop: '0.5rem' }}>Loading users...</p>}
                            {error && <p style={{ color: '#fca5a5', marginTop: '0.5rem' }}>{error}</p>}
                        </div>
                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <Input
                                placeholder="Search by email or role..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    backgroundColor: '#1e293b',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    color: 'goldenrod'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Table Header for better structure */}
                        <Card
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0',
                                padding: '1rem 2rem'
                            }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', alignItems: 'center', fontWeight: 700, color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                <span>User Email</span>
                                <span>Role</span>
                                <span>Joined Date</span>
                                <span style={{ width: '120px', textAlign: 'right' }}>Actions</span>
                            </div>
                        </Card>

                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <Card
                                    key={user.id}
                                    padding="lg"
                                    style={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        transition: 'transform 0.2s ease',
                                    }}
                                    className="user-row-card"
                                >
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, color: 'goldenrod' }}>{user.email}</span>
                                        <span>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                backgroundColor: user.role === 'ADMIN' ? 'rgba(218, 165, 32, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                                                color: user.role === 'ADMIN' ? 'goldenrod' : '#94a3b8',
                                                border: `1px solid ${user.role === 'ADMIN' ? 'goldenrod' : '#94a3b8'}`
                                            }}>
                                                {user.role}
                                            </span>
                                        </span>
                                        <span style={{ color: '#cbd5e1' }}>{new Date(user.created_at).toLocaleDateString()}</span>
                                        <div style={{ width: '120px', textAlign: 'right' }}>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(user.id)}
                                                disabled={user.role === 'ADMIN' && users.filter(u => u.role === 'ADMIN').length <= 1}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                                <p style={{ fontSize: '1.2rem' }}>No users found matching your search criteria.</p>
                            </div>
                        )}
                    </div>
                </Container>
            </Section>
        </main>
    );
};

export default UserManagementPage;

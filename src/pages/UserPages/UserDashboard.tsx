import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, Container } from '../../components/layout';
import { Button, Card } from '../../components/ui';
import { Navbar } from '../../components/navigation';
import authService from '../../services/authService';
import notesService, { type Note } from '../../services/notesService';
import { useAuth } from '../../hooks/useAuth';

// The UserNote interface is no longer needed as we use Note from notesService

const UserDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const response = await notesService.getUserNotes(user.id);
            if (response.success) {
                setNotes(response.data);
            }
        } catch (err: any) {
            setError(err.message || "Could not load your notes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [user]);

    const handleCreateNote = () => {
        navigate('/user/new-note');
    };

    const handleDeleteNote = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                const response = await notesService.deleteNote(id);
                if (response.success) {
                    setNotes(notes.filter(note => note.id !== id));
                }
            } catch (err: any) {
                alert(err.message || "Failed to delete note.");
            }
        }
    };

    const handleEditNote = (id: string) => {
        navigate(`/user/edit-note/${id}`);
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/user-login');
        } catch (error) {
            console.error("Logout failed", error);
            // Force clear storage and redirect even on failure
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userInfo");
            navigate('/user-login');
        }
    };

    const navItems = [
        { label: 'My Notes', href: '/user-dashboard' }
    ];

    const logoutAction = (
        <Button variant="ghost" onClick={handleLogout} style={{ color: '#94a3b8' }}>
            Logout
        </Button>
    );

    return (
        <main className="user-dashboard" style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
            <Navbar logo="NoteStore" items={navItems} actions={logoutAction} />

            <Section variant="dark" size="lg">
                <Container size="xl">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>My Workspace</h1>
                            <p style={{ color: '#94a3b8' }}>Capture and organize your thoughts effortlessly.</p>
                            {loading && <p style={{ color: 'goldenrod', marginTop: '0.5rem' }}>Loading your notes...</p>}
                            {error && <p style={{ color: '#fca5a5', marginTop: '0.5rem' }}>{error}</p>}
                        </div>
                        <Button size="lg" onClick={handleCreateNote}>
                            + Create New Note
                        </Button>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {notes.length > 0 ? (
                            notes.map(note => (
                                <Card
                                    key={note.id}
                                    padding="lg"
                                    style={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        minHeight: '220px'
                                    }}
                                >
                                    <div style={{ marginBottom: '1rem', flex: 1 }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'goldenrod', marginBottom: '0.5rem' }}>{note.title}</h3>
                                        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                            {note.content}
                                        </p>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingTop: '1rem',
                                        borderTop: '1px solid rgba(255,255,255,0.05)',
                                        marginTop: 'auto'
                                    }}>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Updated: {new Date(note.updated_at).toLocaleDateString()}</span>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <Button variant="secondary" size="sm" onClick={() => handleEditNote(note.id)}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteNote(note.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <div style={{
                                gridColumn: '1 / -1',
                                textAlign: 'center',
                                padding: '5rem',
                                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                                borderRadius: '12px',
                                border: '2px dashed rgba(255,255,255,0.1)'
                            }}>
                                <h2 style={{ color: '#94a3b8', marginBottom: '1rem' }}>No notes yet</h2>
                                <Button onClick={handleCreateNote}>Create your first note</Button>
                            </div>
                        )}
                    </div>
                </Container>
            </Section>
        </main>
    );
};

export default UserDashboard;

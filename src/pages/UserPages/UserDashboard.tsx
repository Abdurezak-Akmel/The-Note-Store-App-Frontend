import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, Container } from '../../components/layout';
import { Button, Card } from '../../components/ui';
import { Navbar } from '../../components/navigation';
import authService from '../../services/authService';
import notesService, { type Note } from '../../services/notesService';
import { useAuth } from '../../hooks/useAuth';

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
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userInfo");
            navigate('/user-login');
        }
    };

    const navItems = [
        { label: 'My Notes', href: '/user-dashboard' }
    ];

    const logoutAction = (
        <Button variant="ghost" onClick={handleLogout}>
            Logout
        </Button>
    );

    return (
        <main className="page-shell page-shell--work user-dashboard">
            <Navbar logo="NoteStore" items={navItems} actions={logoutAction} />

            <Section variant="dark" size="lg">
                <Container size="xl">
                    <div className="page-header">
                        <div className="page-header__copy">
                            <span className="section-kicker">My workspace</span>
                            <h1>Notes that are easy to return to.</h1>
                            <p>Capture ideas, keep drafts tidy, and move back into your work without friction.</p>
                            {loading && <span className="status-line">Loading your notes...</span>}
                            {error && <div className="alert alert--error inline-alert">{error}</div>}
                        </div>
                        <div className="page-header__actions">
                            <Button size="lg" onClick={handleCreateNote}>
                                Create New Note
                            </Button>
                        </div>
                    </div>

                    <div className="note-grid">
                        {loading ? (
                            <div className="empty-state">
                                <span className="empty-state__icon">N</span>
                                <h2>Loading your notebook</h2>
                                <p>Your notes will appear here in a moment.</p>
                            </div>
                        ) : notes.length > 0 ? (
                            notes.map(note => (
                                <Card key={note.id} padding="lg" className="note-card">
                                    <div className="note-card__body">
                                        <h3 className="note-card__title">{note.title}</h3>
                                        <p>{note.content}</p>
                                    </div>

                                    <div className="note-card__footer">
                                        <span className="note-card__date">
                                            Updated {new Date(note.updated_at).toLocaleDateString()}
                                        </span>
                                        <div className="note-card__actions">
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
                            <div className="empty-state">
                                <span className="empty-state__icon">N</span>
                                <h2>No notes yet</h2>
                                <p>Create your first note and it will appear here as a polished card.</p>
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

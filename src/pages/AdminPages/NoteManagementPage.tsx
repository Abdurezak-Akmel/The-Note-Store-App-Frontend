import React, { useState, useEffect } from 'react';
import { Section, Container } from '../../components/layout';
import { Button, Card, Input } from '../../components/ui';
import { Navbar } from '../../components/navigation';
import notesService, { type Note } from '../../services/notesService';

const NoteManagementPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await notesService.getAllNotes();
            if (response.success) {
                setNotes(response.data);
            }
        } catch (err: any) {
            setError(err.message || "Failed to load notes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
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

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.user_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navItems = [
        { label: 'Dashboard', href: '/admin-dashboard' },
        { label: 'Users', href: '/admin/users' },
        { label: 'Notes', href: '/admin/notes' },
    ];

    return (
        <main className="note-management-page" style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
            <Navbar
                logo="NoteStore"
                items={navItems}
                actions={<Button variant="ghost" onClick={() => window.location.href = '/admin-login'} style={{ color: '#94a3b8' }}>Logout</Button>}
            />

            <Section variant="dark" size="lg">
                <Container size="xl">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Note Management</h1>
                            <p style={{ color: '#94a3b8' }}>Review and manage all user-generated content.</p>
                            {loading && <p style={{ color: 'goldenrod', marginTop: '0.5rem' }}>Loading notes...</p>}
                            {error && <p style={{ color: '#fca5a5', marginTop: '0.5rem' }}>{error}</p>}
                        </div>
                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <Input
                                placeholder="Search by title, content or author..."
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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {filteredNotes.length > 0 ? (
                            filteredNotes.map(note => (
                                <Card
                                    key={note.id}
                                    padding="lg"
                                    style={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'goldenrod', marginBottom: '0.25rem' }}>{note.title}</h3>
                                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                                                <span>By: <strong style={{ color: '#cbd5e1' }}>{note.user_id}</strong></span>
                                                <span>Created: {new Date(note.created_at).toLocaleString()}</span>
                                                <span>Updated: {new Date(note.updated_at).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(note.id)}
                                            style={{ fontWeight: 600 }}
                                        >
                                            Delete Note
                                        </Button>
                                    </div>
                                    <div style={{
                                        padding: '1rem',
                                        backgroundColor: '#0f172a',
                                        borderRadius: '8px',
                                        color: '#cbd5e1',
                                        lineHeight: '1.6'
                                    }}>
                                        {note.content}
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                                <p style={{ fontSize: '1.2rem' }}>No notes found matching your search criteria.</p>
                            </div>
                        )}
                    </div>
                </Container>
            </Section>
        </main>
    );
};

export default NoteManagementPage;

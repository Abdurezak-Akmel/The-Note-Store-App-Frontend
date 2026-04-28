import React, { useState, useEffect } from 'react';
import { Section, Container } from '../../components/layout';
import { Button, Card, Input } from '../../components/ui';
import { FormGroup } from '../../components/forms';
import { Navbar } from '../../components/navigation';
import { useNavigate, useParams } from 'react-router-dom';
import notesService from '../../services/notesService';

const NewNote: React.FC = () => {
    const navigate = useNavigate();
    const { noteId } = useParams<{ noteId: string }>();
    const isEditMode = !!noteId;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isEditMode && noteId) {
            const fetchNoteDetails = async () => {
                try {
                    setFetching(true);
                    const response = await notesService.getNoteById(noteId);
                    if (response.success && response.data) {
                        setTitle(response.data.title);
                        setContent(response.data.content);
                    }
                } catch (err: any) {
                    setError(err.message || "Could not retrieve note details.");
                } finally {
                    setFetching(false);
                }
            };
            fetchNoteDetails();
        }
    }, [isEditMode, noteId]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let response;
            if (isEditMode && noteId) {
                response = await notesService.updateNote(noteId, { title, content });
            } else {
                response = await notesService.createNote({ title, content });
            }

            if (response.success) {
                navigate('/user-dashboard');
            }
        } catch (err: any) {
            setError(err.message || `Failed to ${isEditMode ? 'update' : 'save'} note. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/user-dashboard');
    };

    const navItems = [
        { label: 'My Notes', href: '/user-dashboard' }
    ];

    const logoutAction = (
        <Button variant="ghost" onClick={() => navigate('/user-login')} style={{ color: '#94a3b8' }}>
            Logout
        </Button>
    );

    return (
        <main className="new-note-page" style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
            <Navbar logo="NoteStore" items={navItems} actions={logoutAction} />

            <Section variant="dark" size="lg">
                <Container size="md">
                    <div style={{ marginBottom: '2.5rem' }}>
                        <Button variant="ghost" onClick={handleCancel} style={{ color: '#94a3b8', paddingLeft: 0, marginBottom: '1rem' }}>
                            ← Back to Dashboard
                        </Button>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{isEditMode ? 'Edit Note' : 'Create New Note'}</h1>
                        <p style={{ color: '#94a3b8' }}>
                            {isEditMode ? 'Modify your note below.' : 'Fill in the details below to save your new note.'}
                        </p>
                        {fetching && <p style={{ color: 'goldenrod', marginTop: '1rem' }}>Loading note data...</p>}
                        {error && (
                            <p style={{ color: '#fca5a5', marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px' }}>
                                {error}
                            </p>
                        )}
                    </div>

                    <Card style={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.05)', padding: '2.5rem' }}>
                        <form onSubmit={handleSave}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <FormGroup label="Note Title">
                                    <Input
                                        placeholder="Enter title..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        style={{
                                            backgroundColor: '#0f172a',
                                            border: '2px solid rgba(255,255,255,0.3)',
                                            color: 'goldenrod',
                                            padding: '14px 18px',
                                            fontSize: '1.2rem',
                                            fontWeight: 600
                                        }}
                                    />
                                </FormGroup>

                                <FormGroup label="Content">
                                    <textarea
                                        placeholder="Start writing your thoughts here..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                        rows={12}
                                        className="ui-input" // Reusing the project's input class
                                        style={{
                                            backgroundColor: '#0f172a',
                                            border: '2px solid rgba(255,255,255,0.3)',
                                            color: '#cbd5e1',
                                            padding: '18px',
                                            fontSize: '1.1rem',
                                            lineHeight: '1.6',
                                            width: '100%',
                                            boxSizing: 'border-box',
                                            borderRadius: '8px',
                                            outline: 'none',
                                            resize: 'vertical'
                                        }}
                                    />
                                </FormGroup>

                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                                    <Button type="submit" size="lg" disabled={loading || fetching} style={{ flex: 1, fontWeight: 800, fontSize: '1.2rem', opacity: (loading || fetching) ? 0.7 : 1 }}>
                                        {loading ? 'Saving...' : (isEditMode ? 'Update Note' : 'Save Note')}
                                    </Button>
                                    <Button type="button" variant="secondary" size="lg" disabled={loading} onClick={handleCancel} style={{ flex: 1 }}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Card>
                </Container>
            </Section>
        </main>
    );
};

export default NewNote;

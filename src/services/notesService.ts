import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/notes";

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Types for note data
export interface Note {
    id: string;
    title: string;
    content: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface CreateNoteData {
    title: string;
    content: string;
}

export interface NotesResponse {
    success: boolean;
    message: string;
    data?: Note;
}

export interface AllNotesResponse {
    success: boolean;
    message?: string;
    data: Note[];
}

// Notes service functions
export const notesService = {

    // Create a new note (User)
    async createNote(noteData: CreateNoteData): Promise<NotesResponse> {
        try {
            const response = await api.post("/createNote", noteData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to create note" };
        }
    },

    // Read all notes (Admin)
    async getAllNotes(): Promise<AllNotesResponse> {
        try {
            const response = await api.get("/admin/notes");
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch all notes" };
        }
    },

    // Read all notes for a specific user (User)
    async getUserNotes(userId: string): Promise<AllNotesResponse> {
        try {
            const response = await api.get(`/user/${userId}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch user notes" };
        }
    },

    // Read a single note by ID (User)
    async getNoteById(noteId: string): Promise<NotesResponse> {
        try {
            const response = await api.get(`/${noteId}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch note" };
        }
    },

    // Update a note (User)
    async updateNote(noteId: string, noteData: Partial<CreateNoteData>): Promise<NotesResponse> {
        try {
            const response = await api.patch(`/${noteId}`, noteData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to update note" };
        }
    },

    // Delete a note (User)
    async deleteNote(noteId: string): Promise<NotesResponse> {
        try {
            const response = await api.delete(`/${noteId}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to delete note" };
        }
    }
}

export default notesService;
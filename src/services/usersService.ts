import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/users";

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

// Types for user data
export interface User {
    id: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface UsersResponse {
    success: boolean;
    users: User[];
}

export interface DeleteUserResponse {
    success: boolean;
    message: string;
}

// Users service functions
export const usersService = {
    // Read all users (Admin)
    async getAllUsers(): Promise<UsersResponse> {
        try {
            const response = await api.get("/admin/users");
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch users" };
        }
    },

    // Delete a user (Admin)
    async deleteUser(userId: string): Promise<DeleteUserResponse> {
        try {
            const response = await api.delete(`/admin/users/${userId}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to delete user" };
        }
    }
};

export default usersService;

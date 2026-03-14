export type Role = "admin" | "user" | "tasker" | "member";
export type Permission = "dashboard" | "users" | "tasks";

export interface User { 
  id: string; // Changed from id?: number to id: string
  name: string; 
  email: string; 
  mob_no: string; 
  profile_pic?: string | null; 
  role: Role; 
  is_verified: boolean; 
  created_at: string; 
}

export interface TokenResponse { access_token: string; type: string; }

export interface ApiError { detail: string | { msg: string; loc: string[] }[]; }
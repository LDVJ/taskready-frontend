import { api } from "./axios";
import { User, Role } from "../types";

export interface SignupPayload {
  name: string;
  email: string;
  mob_no: string;
  password: string;
  role: Role;
  profile_pic?: string;
}

/**
 * Register a new user
 */
export async function signup(payload: SignupPayload): Promise<User> {
  const { data } = await api.post<User>("/user/signup", payload);
  return data;
}

/**
 * Update the current user's profile information
 */
export async function updateProfile(payload: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>("/user/update", payload);
  return data;
}

/**
 * Verify user email using the token sent via email
 */
export async function verifyEmail(token: string): Promise<unknown> {
  // Fixed the template literal syntax
  const { data } = await api.get(`/users/verify?token=${token}`);
  return data;
}
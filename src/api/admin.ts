import { api } from "./axios";
import { User } from "../types";

/**
 * Fetch all registered users from the system.
 * Typically requires Admin role permissions on the backend.
 */
export async function getAllUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/admin/user");
  return data;
}
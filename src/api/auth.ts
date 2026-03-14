import { api } from "./axios";
import { TokenResponse } from "../types";

/**
 * Log in a user using email and password.
 * FastAPI OAuth2PasswordRequestForm expects application/x-www-form-urlencoded.
 */
export async function login(
  email: string, 
  password: string
): Promise<TokenResponse> {
  const form = new URLSearchParams();
  // FastAPI OAuth2 standard uses "username" as the key even if we send an email
  form.append("username", email);
  form.append("password", password);

  const { data } = await api.post<TokenResponse>("/login", form, {
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded" 
    },
  });

  return data;
}

/**
 * Manually trigger a token refresh.
 * Note: Your axios interceptor usually handles this automatically.
 */
export async function refresh(): Promise<TokenResponse> {
  const { data } = await api.post<TokenResponse>("/refresh");
  return data;
}
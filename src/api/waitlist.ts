import axios from 'axios';

export type WaitlistSignupResponse = {
  message: string;
};

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const client = axios.create({
  baseURL,
  // Without a timeout a hung backend leaves the form stuck on "Sending…" forever.
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

export async function postWaitlistSignup(email: string): Promise<WaitlistSignupResponse> {
  const response = await client.post<WaitlistSignupResponse>('/auth/waitlist', { email });
  return response.data;
}

/** Loose shape check (something@domain.tld); the backend's EmailStr is the real validator. */
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidWaitlistEmail(email: string): boolean {
  return EMAIL_SHAPE.test(email);
}

export const WAITLIST_INVALID_EMAIL_MESSAGE = "Please enter a valid email address.";

/** Map a failed signup to a user-facing message (backend: 422 invalid email, 429 rate limit). */
export function waitlistErrorMessage(err: unknown): string {
  const status = axios.isAxiosError(err) ? err.response?.status : undefined;
  if (status === 422) return WAITLIST_INVALID_EMAIL_MESSAGE;
  if (status === 429) return "Too many attempts. Please wait a minute and try again.";
  return "Something went wrong. Please try again in a moment.";
}

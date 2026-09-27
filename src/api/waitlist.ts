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

import { Session } from 'next-auth';

// Extiende el tipo Session con tus propios campos
declare module 'next-auth' {
  interface Session {
    accessToken: string | unknown;
    error: string | unknown;
  }
}

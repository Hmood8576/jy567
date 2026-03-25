import { ProfileData } from './types';

// الرابط الآن قصير جداً: /p/abc123 فقط
export function generateShareableUrl(profile: ProfileData, baseUrl: string): string {
  return `${baseUrl}/p/${profile.id}`;
}

export function encodeProfileToUrl(_profile: ProfileData): string {
  return '';
}

export function decodeProfileFromUrl(_encoded: string): ProfileData | null {
  return null;
}

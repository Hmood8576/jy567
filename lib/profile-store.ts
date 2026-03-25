'use client';

import { ProfileData, defaultTheme } from './types';

const LOCAL_STORAGE_KEY = 'profilelink_my_profiles';

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function generateSlug(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function createDefaultProfile(): ProfileData {
  return {
    id: generateSlug(),
    name: '',
    nameColor: '#ffffff',
    nameFont: 'font-cairo',
    nameSize: 'medium',
    nameAlignment: 'center',
    nameBackground: false,
    bio: '',
    bioFont: 'font-cairo',
    bioAlignment: 'center',
    bioBackground: false,
    avatar: undefined,
    avatarStyle: 'circle',
    avatarSize: 'medium',
    avatarAlignment: 'center',
    avatarGlow: false,
    textBlocks: [],
    socialLinks: [],
    theme: { ...defaultTheme },
    media: [],
    musicAutoplay: false,
    musicLoop: false,
    createdAt: new Date().toISOString(),
  };
}

// ─── API Calls (تتصل بـ Neon عبر API Routes) ──────────────────────────

export async function saveProfileToDb(profile: ProfileData): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });

    if (!res.ok) throw new Error(await res.text());

    saveProfileIdLocally(profile.id);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'حدث خطأ أثناء الحفظ';
    return { success: false, error: message };
  }
}

export async function getProfileFromDb(id: string): Promise<ProfileData | null> {
  try {
    const res = await fetch(`/api/profiles/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function deleteProfileFromDb(id: string): Promise<void> {
  try {
    await fetch(`/api/profiles/${id}`, { method: 'DELETE' });
    removeProfileIdLocally(id);
  } catch (err) {
    console.error('Delete error:', err);
  }
}

export async function getAllProfilesFromDb(): Promise<ProfileData[]> {
  const ids = getLocalProfileIds();
  if (ids.length === 0) return [];

  try {
    const res = await fetch(`/api/profiles?ids=${ids.join(',')}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// ─── Local ID storage ─────────────────────────────────────────────────

export function getLocalProfileIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProfileIdLocally(id: string): void {
  if (typeof window === 'undefined') return;
  const ids = getLocalProfileIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
  }
}

function removeProfileIdLocally(id: string): void {
  if (typeof window === 'undefined') return;
  const ids = getLocalProfileIds().filter((i) => i !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
}

// ─── Legacy stubs ─────────────────────────────────────────────────────

export function saveProfile(profile: ProfileData): { success: boolean; error?: string } {
  saveProfileIdLocally(profile.id);
  return { success: true };
}

export function getProfile(_id: string): ProfileData | null { return null; }
export function getAllProfiles(): ProfileData[] { return []; }
export function deleteProfile(id: string): void { removeProfileIdLocally(id); }

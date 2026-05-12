/**
 * db.js — Firestore helpers for portfolio data.
 *
 * Data lives in a single Firestore document:
 *   portfolios / main
 *
 * Large images (base64) are stored in Firebase Storage and their
 * download URLs are saved back into Firestore, keeping doc size small.
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase";

const PORTFOLIO_DOC = doc(db, "portfolios", "main");

// ─── READ ────────────────────────────────────────────────────────────────────

/**
 * Fetch portfolio data once.
 * Returns null if the document doesn't exist yet.
 */
export async function fetchPortfolioData() {
  const snap = await getDoc(PORTFOLIO_DOC);
  if (!snap.exists()) return null;
  return snap.data();
}

/**
 * Subscribe to real-time portfolio updates.
 * @param {function} callback - called with the data object whenever it changes
 * @returns unsubscribe function
 */
export function subscribeToPortfolioData(callback) {
  return onSnapshot(PORTFOLIO_DOC, (snap) => {
    if (snap.exists()) callback(snap.data());
  });
}

// ─── WRITE ───────────────────────────────────────────────────────────────────

/**
 * Save the full portfolio data object to Firestore.
 * Before saving, any base64 images are uploaded to Storage and
 * replaced with their download URLs.
 *
 * @param {object} data - the full portfolio data object
 * @param {function} onProgress - optional callback(message: string)
 */
export async function savePortfolioData(data, onProgress = () => {}) {
  // Deep clone so we don't mutate the caller's state
  const payload = JSON.parse(JSON.stringify(data));

  // ── Upload profile photo ──────────────────────────────────────────────────
  if (isBase64(payload.about?.photo)) {
    onProgress("Uploading profile photo…");
    payload.about.photo = await uploadImage(
      payload.about.photo,
      "images/profile-photo"
    );
  }

  // ── Upload project thumbnails ─────────────────────────────────────────────
  if (Array.isArray(payload.projects?.items)) {
    for (let i = 0; i < payload.projects.items.length; i++) {
      if (isBase64(payload.projects.items[i].image)) {
        onProgress(`Uploading project ${i + 1} thumbnail…`);
        payload.projects.items[i].image = await uploadImage(
          payload.projects.items[i].image,
          `images/project-${i}`
        );
      }
    }
  }

  // ── Upload resume PDF ─────────────────────────────────────────────────────
  if (isBase64(payload.resume?.file)) {
    onProgress("Uploading resume PDF…");
    payload.resume.file = await uploadFile(
      payload.resume.file,
      "files/resume.pdf",
      "application/pdf"
    );
  }

  onProgress("Saving to database…");
  await setDoc(PORTFOLIO_DOC, payload);
  onProgress("Saved ✓");
}

/**
 * Partially update a single section (e.g. "hero", "about").
 * Useful for lightweight single-field saves without re-uploading images.
 */
export async function updateSection(section, value) {
  await updateDoc(PORTFOLIO_DOC, { [section]: value });
}

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────

function isBase64(str) {
  return typeof str === "string" && str.startsWith("data:");
}

async function uploadImage(base64, path) {
  const storageRef = ref(storage, path);
  await uploadString(storageRef, base64, "data_url");
  return getDownloadURL(storageRef);
}

async function uploadFile(base64, path) {
  const storageRef = ref(storage, path);
  await uploadString(storageRef, base64, "data_url");
  return getDownloadURL(storageRef);
}

export async function deleteStorageFile(path) {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch {
    // Ignore — file may not exist
  }
}

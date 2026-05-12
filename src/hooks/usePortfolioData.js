import { useState, useEffect } from "react";
import { fetchPortfolioData, subscribeToPortfolioData, savePortfolioData } from "../lib/db";
import { defaultData } from "../constants/defaultData";

/**
 * usePortfolioData
 *
 * Loads portfolio data from Firestore on mount.
 * Falls back to defaultData while loading or if no document exists.
 * Provides a `save` function that uploads assets and persists to Firestore.
 */
export function usePortfolioData() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState("");
  const [error, setError] = useState(null);

  // ── Initial load + real-time subscription ──────────────────────────────────
  useEffect(() => {
    let unsub;

    async function init() {
      try {
        // First fetch to seed state quickly
        const initial = await fetchPortfolioData();
        if (initial) setData(mergeWithDefaults(initial));
      } catch (err) {
        console.warn("Could not load from Firestore, using defaults.", err);
        setError(err);
      } finally {
        setLoading(false);
      }

      // Subscribe to live updates (useful if editing from multiple devices)
      unsub = subscribeToPortfolioData((live) => {
        setData(mergeWithDefaults(live));
      });
    }

    init();
    return () => unsub?.();
  }, []);

  // ── Save function ──────────────────────────────────────────────────────────
  async function save(newData) {
    setSaving(true);
    setSaveProgress("Starting…");
    try {
      await savePortfolioData(newData, (msg) => setSaveProgress(msg));
      // State will be updated via the real-time subscription above
    } catch (err) {
      console.error("Save failed:", err);
      setError(err);
      throw err;
    } finally {
      setSaving(false);
      setSaveProgress("");
    }
  }

  return { data, loading, saving, saveProgress, error, save };
}

// ── Merge Firestore data with defaultData so new fields are never undefined ──
function mergeWithDefaults(remote) {
  return deepMerge(defaultData, remote);
}

function deepMerge(base, override) {
  if (override === null || override === undefined) return base;
  if (typeof base !== "object" || Array.isArray(base)) return override ?? base;
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (
      typeof override[key] === "object" &&
      override[key] !== null &&
      !Array.isArray(override[key]) &&
      typeof base[key] === "object" &&
      base[key] !== null &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key], override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

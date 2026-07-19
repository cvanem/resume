"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { makeAutoObservable } from "mobx";

export type ThemeChoice = "system" | "light" | "dark";

const THEME_KEY = "cv-theme";

/** Global UI state: theme choice, expanded timeline items, open project. */
export class UIStore {
  theme: ThemeChoice = "system";
  /** Set after mount so SSR markup never disagrees with the server. */
  hydrated = false;
  expandedTimelineIds = new Set<string>();
  openProjectId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate() {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(THEME_KEY) : null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      this.theme = stored;
    }
    this.hydrated = true;
  }

  setTheme(theme: ThemeChoice) {
    this.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }

  cycleTheme() {
    // system -> dark -> light -> system
    const next: Record<ThemeChoice, ThemeChoice> = { system: "dark", dark: "light", light: "system" };
    this.setTheme(next[this.theme]);
  }

  toggleTimelineItem(id: string) {
    if (this.expandedTimelineIds.has(id)) {
      this.expandedTimelineIds.delete(id);
    } else {
      this.expandedTimelineIds.add(id);
    }
  }

  isTimelineItemExpanded(id: string) {
    return this.expandedTimelineIds.has(id);
  }

  openProject(id: string) {
    this.openProjectId = id;
  }

  closeProject() {
    this.openProjectId = null;
  }
}

const UIStoreContext = createContext<UIStore | null>(null);

export function UIStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => new UIStore());

  useEffect(() => {
    store.hydrate();
  }, [store]);

  return <UIStoreContext.Provider value={store}>{children}</UIStoreContext.Provider>;
}

export function useUIStore(): UIStore {
  const store = useContext(UIStoreContext);
  if (!store) throw new Error("useUIStore must be used within UIStoreProvider");
  return store;
}

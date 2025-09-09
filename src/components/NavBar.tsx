"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type UserCookie = { id: number | string; email?: string; name?: string } | null;

export function NavBar() {
  const [user, setUser] = useState<UserCookie>(null);
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )user=([^;]+)/);
    if (match) {
      try {
        const decoded = JSON.parse(atob(match[1].replace(/-/g, "+").replace(/_/g, "/")));
        setUser(decoded);
      } catch {}
    }
  }, []);

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded bg-black dark:bg-white" />
          <span className="text-sm font-semibold">IDEERI CRA</span>
        </div>
        <nav className="flex gap-5 text-sm items-center">
          <Link className="hover:underline" href="/ui/events">Events</Link>
          <Link className="hover:underline" href="/ui/us">User Stories</Link>
          <Link className="hover:underline" href="/ui/linker">Linker</Link>
          <Link className="hover:underline" href="/ui/report">Report</Link>
          <span className="ml-4 text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
            {user ? (
              <>
                <span>{user.name || user.email}</span>
                <form action="/api/auth/logout" method="post">
                  <button className="underline" type="submit">Se déconnecter</button>
                </form>
              </>
            ) : (
              <Link href="/api/auth/google/start" className="underline">Se connecter</Link>
            )}
          </span>
        </nav>
      </div>
    </header>
  );
}


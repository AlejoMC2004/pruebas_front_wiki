// app/settings/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PageShell from "@/components/layout/PageShell";
import { THEME } from "@/styles/theme";

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to /unauthorized if not logged in or not an admin
  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.replace("/unauthorized");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") return null;

  return (
    <PageShell title="Settings" subtitle="Preferences and site configuration.">
      <div style={s.placeholder}>
        <span style={s.icon}>⚙️</span>
        <p style={s.text}>Settings module under construction.</p>
        <p style={s.sub}>
          User management, permissions, and site configuration options will be available here.
        </p>
      </div>
    </PageShell>
  );
}

const s = {
  placeholder: {
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "center",
    justifyContent: "center",
    padding:        "80px 24px",
    gap:            "12px",
    color:          THEME.colors.muted,
    textAlign:      "center",
  },
  icon: { fontSize: "48px" },
  text: { fontWeight: 700, fontSize: "18px", color: THEME.colors.navy },
  sub:  { maxWidth: "360px", lineHeight: 1.6, fontSize: "14px" },
};

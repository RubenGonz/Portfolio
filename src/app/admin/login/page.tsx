"use client";

import { useActionState } from "react";
import { authenticate } from "@/actions/auth";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form action={formAction} className="w-full max-w-sm flex flex-col gap-5">
        <div className="mb-2">
          <p className="font-inputmono text-[11px] tracking-[0.2em] uppercase mb-1">
            <span className="text-brand">{"//"}</span> <span className="text-fg">Admin</span>
          </p>
          <div className="w-5 h-px bg-linear-to-r from-brand-sec to-brand" />
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="font-inputmono text-[11px] tracking-widest uppercase text-subtle">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="font-inputmono text-sm bg-surface border border-line/10 px-3 py-2
              text-fg focus:border-brand/50 focus:outline-none transition-colors"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-inputmono text-[11px] tracking-widest uppercase text-subtle">Password</span>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="font-inputmono text-sm bg-surface border border-line/10 px-3 py-2
              text-fg focus:border-brand/50 focus:outline-none transition-colors"
          />
        </label>

        {errorMessage && (
          <p className="font-inputmono text-[11px] text-danger">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="font-inputmono text-[11px] tracking-widest uppercase font-bold
            bg-linear-to-r from-brand-sec to-brand text-on-accent px-4 py-2.5
            hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

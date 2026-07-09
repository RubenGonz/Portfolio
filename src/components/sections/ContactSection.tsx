"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GhostNumber } from "@/components/ui/GhostNumber";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { siteConfig } from "@/config/site";
import type { ContactContent } from "@/data/settings";

type Status = "idle" | "sending" | "success" | "error";

export const ContactSection = ({ contact }: { contact: ContactContent }) => {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const _trap = (form.elements.namedItem("_trap") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, _trap }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact">
      <SectionHeader label={t("sectionLabel")} srTitle={t("sectionLabel")} />

      <AnimateIn className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-16 max-w-4xl relative">
        <GhostNumber>05</GhostNumber>

        <div>
          <h2 className="font-n27 font-bold italic text-fg text-3xl md:text-5xl mb-2 md:mb-3 leading-tight tracking-tight">
            {contact.headline}
          </h2>
          <p className="font-inputmono text-muted text-xs leading-relaxed mb-6 md:mb-8">
            {contact.subtext.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-inputmono text-xs text-muted hover:text-fg transition-colors flex items-center gap-2 break-all cursor-pointer"
            >
              <span className="text-subtle shrink-0" aria-hidden="true">→</span>
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.social.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-xs text-muted hover:text-fg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="text-subtle shrink-0" aria-hidden="true">→</span>
              {siteConfig.social.linkedin.handle} ↗
            </a>
            <a
              href={siteConfig.social.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-xs text-muted hover:text-fg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="text-subtle shrink-0" aria-hidden="true">→</span>
              {siteConfig.social.github.handle} ↗
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="_trap" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-email"
              className="font-inputmono text-[11px] text-muted uppercase tracking-[0.18em]"
            >
              {t("emailLabel")}
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              disabled={status === "sending" || status === "success"}
              className="font-inputmono text-xs bg-surface border border-line/10 text-fg px-4 py-3
                focus:outline-none focus:border-brand/40 transition-colors disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-message"
              className="font-inputmono text-[11px] text-muted uppercase tracking-[0.18em]"
            >
              {t("messageLabel")}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              disabled={status === "sending" || status === "success"}
              className="font-inputmono text-xs bg-surface border border-line/10 text-fg px-4 py-3
                focus:outline-none focus:border-brand/40 transition-colors resize-none disabled:opacity-50"
            />
          </div>

          {status === "success" && (
            <p className="font-inputmono text-xs text-brand">{t("success")}</p>
          )}
          {status === "error" && (
            <p className="font-inputmono text-xs text-danger">{t("error")}</p>
          )}

          <Button type="submit" disabled={status === "sending" || status === "success"} className="w-full md:w-fit">
            {status === "sending" ? t("sending") : t("send")}
          </Button>
        </form>
      </AnimateIn>
    </Section>
  );
};

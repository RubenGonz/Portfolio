"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export const ContactSection = () => {
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
    <section id="contact" className="px-6 md:px-16 py-16 md:py-28 max-w-5xl mx-auto">
      <h2 className="sr-only">Contact</h2>
      <p className="font-inputmono text-gray-400 text-[11px] tracking-[0.2em] uppercase mb-1" aria-hidden="true">
        {"// Contact"}
      </p>
      <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-8 md:mb-10" />

      <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-16 max-w-4xl relative">
        <span aria-hidden="true" className="absolute -top-2 right-0 font-n27 font-bold italic text-[60px] md:text-[80px] leading-none text-white/[0.02] select-none pointer-events-none">
          04
        </span>

        {/* Left: headline + links */}
        <div>
          <h2 className="font-n27 font-bold italic text-light text-3xl md:text-5xl mb-2 md:mb-3 leading-tight tracking-tight">
            Let&apos;s talk.
          </h2>
          <p className="font-inputmono text-gray-400 text-xs leading-relaxed mb-6 md:mb-8">
            Open to full-time roles, freelance and collaborations.<br />
            Based in Elche, Spain. I usually reply within 24 hours.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:ruben.gonzalez.rodriguez00@gmail.com"
              className="font-inputmono text-xs text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2 break-all"
            >
              <span className="text-gray-500 shrink-0" aria-hidden="true">→</span>
              ruben.gonzalez.rodriguez00@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/ruben-gonz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-xs text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2"
            >
              <span className="text-gray-500 shrink-0" aria-hidden="true">→</span>
              linkedin.com/in/ruben-gonz ↗
            </a>
            <a
              href="https://github.com/RubenGonz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-xs text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2"
            >
              <span className="text-gray-500 shrink-0" aria-hidden="true">→</span>
              github.com/RubenGonz ↗
            </a>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Honeypot — hidden from humans, bots fill it */}
          <input type="text" name="_trap" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-email"
              className="font-inputmono text-[11px] text-gray-400 uppercase tracking-[0.18em]"
            >
              Your email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              disabled={status === "sending" || status === "success"}
              className="font-inputmono text-xs bg-white/[0.01] border border-white/6 text-light px-4 py-3
                focus:outline-none focus:border-brand/40 transition-colors disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-message"
              className="font-inputmono text-[11px] text-gray-400 uppercase tracking-[0.18em]"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              disabled={status === "sending" || status === "success"}
              className="font-inputmono text-xs bg-white/[0.01] border border-white/6 text-light px-4 py-3
                focus:outline-none focus:border-brand/40 transition-colors resize-none disabled:opacity-50"
            />
          </div>

          {status === "success" && (
            <p className="font-inputmono text-xs text-brand">
              Message sent. I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="font-inputmono text-xs text-red-400">
              Something went wrong. Try emailing me directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className="font-inputmono text-xs font-bold px-5 py-3 tracking-wide w-full md:w-fit
              bg-gradient-to-r from-brand-sec to-brand text-deep-black
              hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Send message →"}
          </button>
        </form>
      </div>
    </section>
  );
};

export const ContactSection = () => {
  return (
    <section id="contact" className="px-6 md:px-16 py-16 md:py-28 max-w-5xl mx-auto">
      <p className="font-inputmono text-gray-700 text-[11px] tracking-[0.2em] uppercase mb-1">
        {"// Contact"}
      </p>
      <div className="w-5 h-px bg-gradient-to-r from-brand-sec to-brand mb-8 md:mb-10" />

      <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-16 max-w-4xl relative">
        <span className="absolute -top-2 right-0 font-n27 font-bold italic text-[60px] md:text-[80px] leading-none text-white/[0.02] select-none pointer-events-none">
          04
        </span>

        {/* Left: headline + links */}
        <div>
          <h2 className="font-n27 font-bold italic text-light text-3xl md:text-5xl mb-2 md:mb-3 leading-tight tracking-tight">
            Let&apos;s talk.
          </h2>
          <p className="font-inputmono text-gray-500 text-xs leading-relaxed mb-6 md:mb-8">
            Open to full-time roles, freelance and collaborations.<br />
            Based in Elche, Spain. I usually reply within 24 hours.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:ruben.gonzalez.rodriguez00@gmail.com"
              className="font-inputmono text-xs text-gray-500 hover:text-gray-200 transition-colors flex items-center gap-2 break-all"
            >
              <span className="text-gray-700 shrink-0">→</span>
              ruben.gonzalez.rodriguez00@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/ruben-gonz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-xs text-gray-600 hover:text-gray-300 transition-colors flex items-center gap-2"
            >
              <span className="text-gray-800 shrink-0">→</span>
              linkedin.com/in/ruben-gonz ↗
            </a>
            <a
              href="https://github.com/RubenGonz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inputmono text-xs text-gray-600 hover:text-gray-300 transition-colors flex items-center gap-2"
            >
              <span className="text-gray-800 shrink-0">→</span>
              github.com/RubenGonz ↗
            </a>
          </div>
        </div>

        {/* Right: form */}
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-email"
              className="font-inputmono text-[11px] text-gray-700 uppercase tracking-[0.18em]"
            >
              Your email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              className="font-inputmono text-xs bg-white/[0.01] border border-white/6 text-light px-4 py-3
                focus:outline-none focus:border-brand/40 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-message"
              className="font-inputmono text-[11px] text-gray-700 uppercase tracking-[0.18em]"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              className="font-inputmono text-xs bg-white/[0.01] border border-white/6 text-light px-4 py-3
                focus:outline-none focus:border-brand/40 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="font-inputmono text-xs font-bold px-5 py-3 tracking-wide w-full md:w-fit
              bg-gradient-to-r from-brand-sec to-brand text-deep-black
              hover:opacity-90 transition-opacity"
          >
            Send message →
          </button>
        </form>
      </div>
    </section>
  );
};

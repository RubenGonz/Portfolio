export const ContactSection = () => {
  return (
    <section id="contact" className="px-6 md:px-16 py-32 max-w-5xl mx-auto">
      {/* Section label */}
      <p className="font-inputmono text-gray-600 text-xs tracking-widest uppercase mb-12">
        04 — Contact
      </p>

      <div className="max-w-xl">
        <h2 className="font-n27 font-bold italic text-light text-3xl md:text-4xl mb-6">
          Let&apos;s work together
        </h2>

        <p className="font-inputmono text-gray-400 text-sm leading-relaxed mb-10">
          I&apos;m open to full-time roles, freelance projects and collaborations.
          Feel free to reach out.
        </p>

        {/* Direct links */}
        <div className="flex flex-col gap-3 mb-12">
          <a
            href="mailto:ruben.gonzalez.rodriguez00@gmail.com"
            className="font-inputmono text-sm text-gray-400 hover:text-brand transition-colors"
          >
            ruben.gonzalez.rodriguez00@gmail.com ↗
          </a>
          <a
            href="https://linkedin.com/in/ruben-gonz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inputmono text-sm text-gray-400 hover:text-brand transition-colors"
          >
            linkedin.com/in/ruben-gonz ↗
          </a>
          <a
            href="https://github.com/RubenGonz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inputmono text-sm text-gray-400 hover:text-brand transition-colors"
          >
            github.com/RubenGonz ↗
          </a>
        </div>

        {/* Form — backend pending */}
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="font-inputmono text-xs text-gray-600 uppercase tracking-widest">
              Your email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              className="font-inputmono text-sm bg-transparent border border-gray-800 text-light px-4 py-3
                focus:outline-none focus:border-brand transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-message" className="font-inputmono text-xs text-gray-600 uppercase tracking-widest">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              className="font-inputmono text-sm bg-transparent border border-gray-800 text-light px-4 py-3
                focus:outline-none focus:border-brand transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="font-inputmono text-sm font-semibold px-6 py-3 bg-brand text-soft-black
              hover:bg-brand/90 transition-colors w-fit"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

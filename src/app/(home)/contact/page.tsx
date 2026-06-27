import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
};

export default function ContactPage() {
  return (
    <section id="contacto" className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <h2 className="text-2xl font-bold mb-6 font-n27">CONTACTO</h2>

      {/* Social links */}
      <div className="flex gap-6 mb-8">
        <a
          href="https://github.com/RubenGonz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/ruben-gonzalez-rodriguez"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="mailto:ruben.gonzalez.rodriguez00@gmail.com"
          className="hover:text-brand transition-colors"
        >
          Email
        </a>
      </div>

      {/* Contact form — backend pending */}
      <form className="w-full max-w-lg flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-gray-400">
            Tu correo
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="px-4 py-2 border border-gray-600 rounded-lg bg-transparent text-light focus:outline-none focus:border-brand"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-sm text-gray-400">
            Tu mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="px-4 py-2 border border-gray-600 rounded-lg bg-transparent text-light focus:outline-none focus:border-brand resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-brand text-soft-black font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}

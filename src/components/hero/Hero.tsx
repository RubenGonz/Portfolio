import Link from "next/link";

export const Hero = () => {
  return (
    <section className="min-h-screen flex justify-center items-center bg-soft-black text-light px-6 md:flex-row md:px-16">
      {/* Main text */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="font-n27 text-brand font-bold italic text-4xl md:text-6xl mb-7">
          Soy web <br /> developer
        </h1>

        <p className="text-md mb-7 max-w-lg">
          Desarrollador Full Stack especializado en React, Next.js y Node.js.
          Construyo aplicaciones web modernas, escalables y con buena experiencia de usuario.
        </p>

        <div className="flex gap-3 font-n27">
          <Link
            href="#sobre-mi"
            className="bg-blue-600 text-light px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition-colors"
          >
            MÁS SOBRE MÍ
          </Link>
          <Link
            href="https://github.com/RubenGonz"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-light text-light px-6 py-3 rounded-full text-lg hover:bg-light/10 transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>

      {/* Image placeholder */}
      <div className="flex-1 hidden md:flex justify-center">
        <div className="w-64 h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Foto</span>
        </div>
      </div>
    </section>
  );
};

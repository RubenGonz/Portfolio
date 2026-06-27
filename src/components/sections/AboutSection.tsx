export const AboutSection = () => {
  return (
    <section id="about" className="px-6 md:px-16 py-32 max-w-5xl mx-auto">
      {/* Section label */}
      <p className="font-inputmono text-gray-600 text-xs tracking-widest uppercase mb-12">
        02 — About
      </p>

      <div className="max-w-2xl flex flex-col gap-5">
        <p className="font-inputmono text-gray-300 text-base leading-relaxed">
          Front-end developer with professional experience at{" "}
          <span className="text-light">Bosonit</span>, where I built production
          applications for the banking sector and internal asset management
          systems using React and Angular.
        </p>

        <p className="font-inputmono text-gray-300 text-base leading-relaxed">
          Currently expanding into full-stack development with Next.js and
          Node.js — building real projects, not just following tutorials.
        </p>

        <p className="font-inputmono text-gray-300 text-base leading-relaxed">
          Open to new opportunities, remote or on-site.
          Based in{" "}
          <span className="text-light">Elche, Spain</span>.
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          <a
            href="mailto:ruben.gonzalez.rodriguez00@gmail.com"
            className="font-inputmono text-sm text-brand hover:underline"
          >
            ruben.gonzalez.rodriguez00@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

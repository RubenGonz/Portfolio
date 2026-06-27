import { Hero } from "@/components";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* About */}
      <section id="sobre-mi" className="section">
        <h2><span className="number">01</span> SOBRE MÍ</h2>
        <p>Próximamente.</p>
      </section>

      {/* Projects */}
      <section id="proyectos" className="section dark">
        <h2><span className="number">02</span> PROYECTOS</h2>
        <p>Próximamente.</p>
      </section>

      {/* Skills */}
      <section id="habilidades" className="section">
        <h2><span className="number">03</span> HABILIDADES</h2>
        <p>Próximamente.</p>
      </section>
    </>
  );
}

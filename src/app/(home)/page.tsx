import { Hero } from "@/components";

export default function Home() {

  return <>
    {/*  Hero principal */}
    <Hero />

    <div className="bg-amber-50">------------------------------</div>

    {/*  Sobre mí */}
    <section id="sobre-mi" className="section">
      <h2><span className="number">01</span> SOBRE MÍ</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat.
      </p>
    </section>

    {/*  Trabajos seleccionados */}
    <section id="proyectos" className="section dark">
      <h2><span className="number">02</span> TRABAJOS SELECCIONADOS</h2>
      <div className="grid">
        <div className="card">
          <h3>Título trabajo</h3>
          <p>Trabajo Final (20XX)</p>
          <a href="#">Leer más</a>
        </div>
        <div className="card">
          <h3>Título trabajo</h3>
          <p>Trabajo Final (20XX)</p>
          <a href="#">Leer más</a>
        </div>
        <div className="card">
          <h3>Título trabajo</h3>
          <p>Trabajo Final (20XX)</p>
          <a href="#">Leer más</a>
        </div>
      </div>
    </section>

    {/*  Habilidades */}
    <section id="habilidades" className="section">
      <h2><span className="number">03</span> HABILIDADES</h2>
      <ul className="skills">
        <li>HTML / CSS</li>
        <li>JavaScript</li>
        <li>React / Next.js</li>
        <li>Node.js</li>
      </ul>
    </section>
  </>
}

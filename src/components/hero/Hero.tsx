import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return <section className="min-h-screen flex justify-center items-center bg-soft-black text-light pl-6 md:flex-row md:pl-20">
    {/* Bg Image */}
    <div className="absolute top-0 right-0 w-7/10 h-full bg-[url('/bg/CodingBg.png')] opacity-10 bg-cover bg-center"
      style={{
        maskImage: "linear-gradient(300deg, white 40%, transparent 60%)",
        WebkitMaskImage: "linear-gradient(300deg, white 40%, transparent 60%)",
      }}
    />

    {/* Main Content */}
    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
      <h1 className="font-n27 text-brand font-bold italic mb-7">
        <span className="text-4xl md:text-8xl">Soy desarrollador</span>
        <br />
        <span className="text-4xl md:text-9xl">Web</span>
      </h1>

      <p className="text-xl mb-7">
        Doy forma a tus ideas a través del código. <br />
        Construyendo. Aprendiendo. Evolucionando.<br />
        Siempre en busca de equilibrio entre lo funcional y lo simple.
      </p>

      <div className="flex font-n27">
        <Link href="#sobre-mi" className="bg-blue-600 text-light px-6 py-3 rounded text-lg rounded-s-full">
          MÁS SOBRE MÍ
        </Link>

        <Link href="https://github.com/RubenGonz" target="_blank" rel="noopener noreferrer"
          className="bg-blue-600 text-light px-6 py-3 text-lg rounded-full">Github</Link>
        <Link href="https://www.linkedin.com/in/ruben-gonz/" target="_blank" rel="noopener noreferrer"
          className="bg-blue-600 text-light px-6 py-3 text-lg rounded-full">Linkedin</Link>
      </div>
    </div>

    {/* Hero Image */}
    <div className="hidden md:flex flex-1 h-screen justify-end items-end">
      <div className="relative w-full h-[90%]">
        <Image alt="Hero" src="/images/hero.png" fill className="object-contain object-bottom-right" />
      </div>
    </div>
  </section>
};
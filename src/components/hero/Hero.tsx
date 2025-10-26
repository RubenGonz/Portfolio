import Link from "next/link";

export const Hero = () => {
  return <section className="min-h-screen flex justify-center items-center bg-surface text-white px-6
  md:flex-row md:px-16">
    {/* Contenedor que miestar la imagen */}
    {/* <div
      className="absolute top-0 right-0 w-1/2 h-full bg-[url('/bg/CodingBg.png')] bg-cover bg-center"
      style={{
        maskImage: "linear-gradient(to left, black 70%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to left, black 70%, transparent 100%)",
      }}
    /> */}

    {/* Texto principal */}
    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
      <h1 className="font-n27 text-primary font-bold italic text-4xl md:text-6xl mb-7">
        Soy web <br /> developer
      </h1>
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-200 font-semibold text-xl">
  Este es un texto <br /> con gradiente.
</p>
      <p className="text-md mb-7">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe quae explicabo incidunt, dolorum modi laboriosam laudantium cum. Esse numquam, expedita suscipit amet quam assumenda repellat dolor fugit blanditiis a praesentium!
      </p>
      <div className="flex font-n27">
        <Link
          href="#sobre-mi"
          className="bg-blue-600 text-white px-6 py-3 rounded text-lg
          rounded-s-full"
        >
          MÁS SOBRE MÍ
        </Link>
        <div className="bg-amber-300 rounded-e-full">s</div>
        <Link
          href="#github"
          className="bg-blue-600 text-white px-6 py-3 text-lg
          rounded-full"
        >
          
        </Link>
      </div>

    </div>

    {/* Placeholder para la imagen */}
    <div className="flex-1 hidden md:flex justify-center z-1">
      <div className="w-64 h-64 bg-gray-700 rounded-lg flex items-center justify-center">
        {/* Aquí podrías meter <Image /> de next/image más adelante */}
        <span className="text-gray-300">Imagen</span>
      </div>
    </div>
  </section>
};
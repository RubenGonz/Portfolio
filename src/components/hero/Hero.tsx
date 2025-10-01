export const Hero = () => {
  return <section className="h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 bg-gray-900 text-white">

    {/* Texto principal */}
    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
        EL TIPO TRAS <br /> LA PANTALLA
      </h1>
      <p className="text-xl md:text-2xl">
        Soy <span className="text-blue-500 font-semibold">web developer</span>
      </p>
      <a
        href="#sobre-mi"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition-colors"
      >
        MÁS SOBRE MÍ
      </a>
    </div>

    {/* Placeholder para la imagen */}
    <div className="flex-1 hidden md:flex justify-center">
      <div className="w-64 h-64 bg-gray-700 rounded-lg flex items-center justify-center">
        {/* Aquí podrías meter <Image /> de next/image más adelante */}
        <span className="text-gray-300">Imagen</span>
      </div>
    </div>
  </section>
};
export default function MaintenancePage() {

  return <main className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat 
    bg-[url('/error/mantenimiento-mobile-1.png')] md:bg-[url('/error/mantenimiento-desktop-1.png')]">

    {/* Background gradient layer positioned behind the main content */}
    <div className="absolute inset-0 bg-linear-to-r from-deep-black to-soft-black -z-10"></div>

    {/* Content */}
    <div className="flex flex-col items-center justify-center text-center
          w-full max-w-5xl
          px-6 md:px-10
          py-10 md:py-20">
      <h1 className="font-n27 font-bold text-brand text-shadow-brand
            text-5xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl
            mb-6 sm:mb-8 md:mb-10 leading-tight">
        Web en desarrollo
      </h1>

      <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl
            text-gray-300 max-w-md sm:max-w-xl md:max-w-2xl
            mb-8 sm:mb-10 md:mb-12">
        Estoy trabajando en el portfolio. Muy pronto estará disponible.
      </p>

      <a href="mailto:ruben.gonzalez.rodriguez00@gmail.com"
        className="px-3 sm:px-4 py-1 sm:py-1.5
            text-gray-300 hover:text-light
            font-medium text-sm sm:text-base md:text-lg
            bg-soft-black hover:bg-black
            border border-gray-300 hover:border-light
            shadow-md hover:shadow-lg
            transition-all duration-300">
        CONTÁCTAME
      </a>
    </div>
  </main>
}
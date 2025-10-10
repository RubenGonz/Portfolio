export default function MaintenancePage() {
  return <main className="min-h-screen bg-surface bg-cover bg-center bg-no-repeat
        flex items-center justify-center
        bg-[url('/error/mantenimiento-mobile-2.png')]
        md:bg-[url('/error/mantenimiento-desktop-2.png')]">
    <div className="flex flex-col items-center justify-center text-center
          w-full max-w-5xl
          px-4 sm:px-6 md:px-10
          py-10 md:py-20">
      <h1 className="font-n27 font-bold text-primary text-shadow-primary
            text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl
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
            text-gray-300 hover:text-white
            font-medium text-sm sm:text-base md:text-lg
            bg-surface hover:bg-black
            border border-gray-300 hover:border-white
            shadow-md hover:shadow-lg
            transition-colors">
        CONTÁCTAME
      </a>
    </div>
  </main>
}
export default function MaintenancePage() {
  return <main className="min-h-screen bg-cover bg-center bg-no-repeat 
    bg-surface bg-[url('/error/mantenimiento-mobile-2.png')] md:bg-[url('/error/mantenimiento-desktop-2.png')]"
  >
    <div className="h-screen w-full flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-n27 font-bold text-primary text-shadow-primary mb-10 text-4xl md:text-8xl">
        Web en desarrollo
      </h1>

      <p className="text-lg md:text-3xl text-gray-300 max-w-xl mb-10 ">
        Estoy trabajando en el portfolio. Muy pronto estará disponible.
      </p>

      <a
        href="mailto:ruben.gonzalez.rodriguez00@gmail.com"
        className="px-4 py-1 bg-surface border-1 text-gray-300 hover:text-white font-medium text-md md:text-xl"
      >
        CONTÁCTAME
      </a>
    </div>
  </main>
}
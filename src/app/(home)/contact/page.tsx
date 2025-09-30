export default function ContactPage() {
  return <section id="contacto" className="section bg-gray-100 ">
    <h2 className="text-2xl font-bold mb-6">
      <span className="number">04</span> CONTACTO
    </h2>

    {/* Redes */}
    <div className="flex gap-6 mb-8">
      <a href="https://github.com/TUUSER" target="_blank" rel="noopener noreferrer" className="hover:underline">
        GitHub
      </a>
      <a href="https://linkedin.com/in/TUUSER" target="_blank" rel="noopener noreferrer" className="hover:underline">
        LinkedIn
      </a>
      <a href="mailto:tuemail@gmail.com" className="hover:underline">
        Email
      </a>
    </div>

    {/* Formulario */}
    <form className="max-w-lg flex flex-col gap-4">
      <input
        type="email"
        name="email"
        placeholder="Tu correo"
        required
        className="px-4 py-2 border rounded-lg text-black"
      />
      <textarea
        name="message"
        placeholder="Tu mensaje"
        rows={4}
        required
        className="px-4 py-2 border rounded-lg text-black"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </form>
  </section>
}
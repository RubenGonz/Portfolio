import Link from "next/link";

export const Header = () => {

  return <header className="flex justify-between items-center py-3 px-5 w-full fixed text-white">
    {/* Logo a la izquierda */}
    <Link href={"/"} className="flex">
      Logo
    </Link>

    {/* Nav centrado */}
    <nav className="flex justify-center items-center gap-5">
      <Link href={"/#sobre-mi"}>SOBRE MÍ</Link>
      <Link href={"/#proyectos"}>PROYECTOS</Link>
      <Link href={"/#habilidades"}>HABILIDADES</Link>
      <Link href={"/contact"}>CONTACTO</Link>
    </nav>

    {/* Parte funcional a la derecha */}
    <div className="flex gap-2">
      <div>Idioma</div>
      <div>Modo oscuro</div>
      <div>Login</div>
    </div>
  </header>
};
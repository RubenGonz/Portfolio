import Image from "next/image";
import Link from "next/link";
import { Spinner } from "../svg/spinner/Spinner";
import { GitHubIcon } from "../svg/github-icon/GitHubIcon";
import { LinkedinIcon } from "../svg/linkedin-icon/LinkedinIcon";
import { EmailIcon } from "../svg/email-icon/EmailIcon";

export const Hero = () => {
  return <section className="min-h-screen flex justify-center items-center bg-gray-200 dark:bg-soft-black pl-6 md:flex-row md:pl-20">
    {/* Bg Image */}
    <div className="absolute top-0 right-0 w-7/10 h-full bg-[url('/bg/CodingBg.png')] opacity-25 dark:opacity-10 bg-cover bg-center pointer-events-none"
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

      <div className="border-3 border-brand rounded-2xl p-5">
        <p className="flex items-center gap-5 mb-4">
          <Spinner size={32} className="animate-spin text-light  dark:text-gray-600 fill-brand" />
          <span>Web en desarrollo</span>
        </p>

        <p className="mb-2 text-gray-500 dark:text-gray-400">Mientras tanto, puedes encontrarme en:</p>

        <Link href="https://www.linkedin.com/in/ruben-gonz/" target="_blank" rel="noopener noreferrer" className="flex items-center">
          <LinkedinIcon size={32} className="p-1" />
          <span className="text-brand px-2 text-lg">linkedin.com/in/ruben-gonz/</span>
        </Link>

        <div>
          <Link href="mailto:ruben.gonzalez.rodriguez00@gmail.com" className="flex items-center">
            <EmailIcon size={32} className="p-1" />
            <span className="text-brand px-2 text-lg">ruben.gonzalez.rodriguez00@gmail.com</span>
          </Link>

          <Link href="https://github.com/RubenGonz" target="_blank" rel="noopener noreferrer" className="flex items-center">
            <GitHubIcon size={32} className="p-1" />
            <span className="text-brand px-2 text-lg">github.com/RubenGonz</span>
          </Link>
        </div>
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
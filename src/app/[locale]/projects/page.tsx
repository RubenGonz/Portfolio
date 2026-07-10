import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getProjects } from "@/data/projects";
import { BackLink, SectionHeader } from "@/components/ui";
import { ProjectsListing } from "@/components/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects built by Rubén González Rodríguez — full-stack applications, frontend work and open source.",
};

export default async function ProjectsPage() {
  const t = await getTranslations("projects");
  const projects = await getProjects(await getLocale());

  return (
    <main className="min-h-screen px-6 md:px-16 pt-28 pb-16 max-w-5xl mx-auto">
      <BackLink label={t("back")} fallbackHref="/#projects" />
      <SectionHeader label={t("sectionLabel")} srTitle={t("sectionLabel")} />
      <ProjectsListing projects={projects} />
    </main>
  );
}

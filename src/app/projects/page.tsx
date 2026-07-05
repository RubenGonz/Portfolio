import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { BackLink } from "@/components/ui/BackLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectsListing } from "@/components/projects/ProjectsListing";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects built by Rubén González Rodríguez — full-stack applications, frontend work and open source.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 md:px-16 pt-28 pb-16 max-w-5xl mx-auto">
      <BackLink label="Back" fallbackHref="/#projects" />

      <SectionHeader label="Projects" srTitle="Projects" />

      <ProjectsListing projects={projects} />
    </main>
  );
}

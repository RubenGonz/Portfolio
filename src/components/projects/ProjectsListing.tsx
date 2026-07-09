"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { Project } from "@/types";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ListingFilters } from "@/components/ui/ListingFilters";

interface Props {
  projects: Project[];
}

export const ProjectsListing = ({ projects }: Props) => {
  const t = useTranslations("projects");
  const ts = useTranslations("status");
  const [status, setStatus] = useState("all");
  const [order, setOrder] = useState("newest");

  const statusOptions = [
    { value: "all", label: ts("all") },
    { value: "live", label: ts("live") },
    { value: "in-progress", label: ts("in-progress") },
    { value: "archived", label: ts("archived") },
  ];

  const filtered = useMemo(() => {
    const result = status === "all" ? projects : projects.filter((p) => p.status === status);
    return order === "newest"
      ? [...result].sort((a, b) => b.year - a.year)
      : [...result].sort((a, b) => a.year - b.year);
  }, [projects, status, order]);

  return (
    <>
      <ListingFilters
        statusOptions={statusOptions}
        selectedStatus={status}
        selectedOrder={order}
        onStatusChange={setStatus}
        onOrderChange={setOrder}
      />

      {filtered.length === 0 ? (
        <p className="font-inputmono text-subtle text-sm">{t("noMatch")}</p>
      ) : (
        <div className="flex flex-col gap-4 md:gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel={2} />
          ))}
        </div>
      )}
    </>
  );
};

"use client";

import { useState, useMemo } from "react";
import type { Project } from "@/types";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ListingFilters } from "@/components/ui/ListingFilters";

const statusOptions = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "in-progress", label: "In progress" },
  { value: "archived", label: "Archived" },
];

interface Props {
  projects: Project[];
}

export const ProjectsListing = ({ projects }: Props) => {
  const [status, setStatus] = useState("all");
  const [order, setOrder] = useState("newest");

  const filtered = useMemo(() => {
    let result = status === "all" ? projects : projects.filter((p) => p.status === status);
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
        <p className="font-inputmono text-subtle text-sm">No projects match this filter.</p>
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

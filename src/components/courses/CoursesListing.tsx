"use client";

import { useState, useMemo } from "react";
import type { Course } from "@/types";
import { CourseCard } from "@/components/ui/CourseCard";
import { ListingFilters } from "@/components/ui/ListingFilters";

const statusOptions = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "in-progress", label: "In progress" },
  { value: "not-started", label: "Not started" },
];

interface Props {
  courses: Course[];
}

export const CoursesListing = ({ courses }: Props) => {
  const [status, setStatus] = useState("all");
  const [order, setOrder] = useState("newest");

  const filtered = useMemo(() => {
    const result = status === "all" ? courses : courses.filter((c) => c.status === status);
    return order === "newest"
      ? [...result].sort((a, b) => b.year - a.year)
      : [...result].sort((a, b) => a.year - b.year);
  }, [courses, status, order]);

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
        <p className="font-inputmono text-subtle text-sm">No courses match this filter.</p>
      ) : (
        <div className="flex flex-col gap-4 max-w-4xl">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} headingLevel={2} />
          ))}
        </div>
      )}
    </>
  );
};

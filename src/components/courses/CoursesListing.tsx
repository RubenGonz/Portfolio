"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { Course } from "@/types";
import { CourseCard } from "@/components/ui/CourseCard";
import { ListingFilters } from "@/components/ui/ListingFilters";

interface Props {
  courses: Course[];
}

export const CoursesListing = ({ courses }: Props) => {
  const t = useTranslations("courses");
  const ts = useTranslations("status");
  const [status, setStatus] = useState("all");
  const [order, setOrder] = useState("newest");

  const statusOptions = [
    { value: "all", label: ts("all") },
    { value: "completed", label: ts("completed") },
    { value: "in-progress", label: ts("in-progress") },
    { value: "not-started", label: ts("not-started") },
  ];

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
        <p className="font-inputmono text-subtle text-sm">{t("noMatch")}</p>
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

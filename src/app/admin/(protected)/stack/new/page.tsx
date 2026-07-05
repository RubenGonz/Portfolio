"use client";

import { useActionState } from "react";
import { createStackItem } from "@/actions/stack";
import { FormField, SelectField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const tierOptions = [
  { value: "professional", label: "Professional" },
  { value: "active",       label: "Active" },
  { value: "familiar",     label: "Familiar" },
];

const categoryOptions = [
  { value: "Frontend", label: "Frontend" },
  { value: "Backend",  label: "Backend" },
  { value: "Database", label: "Database" },
  { value: "Tooling",  label: "Tooling" },
];

export default function NewStackItemPage() {
  const [error, action] = useActionState(createStackItem, undefined);

  return (
    <div>
      <AdminPageHeader title="New Stack Item" />

      <form action={action} className="flex flex-col gap-5 max-w-sm">
        <FormField label="Name" name="name" required hint="e.g. Rust, Bun, Astro" />
        <SelectField label="Category" name="category" options={categoryOptions} defaultValue="Frontend" />
        <SelectField label="Tier" name="tier" options={tierOptions} defaultValue="familiar" />

        {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
        <SubmitButton label="Add Item" />
      </form>
    </div>
  );
}

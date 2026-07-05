"use client";

import { useActionState } from "react";
import { updateStackItem } from "@/actions/stack";
import { FormField, SelectField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { StackItemWithId } from "@/data/stack";

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

export function EditStackForm({ item }: { item: StackItemWithId }) {
  const updateWithId = updateStackItem.bind(null, item.id);
  const [error, action] = useActionState(updateWithId, undefined);

  return (
    <form action={action} className="flex flex-col gap-5 max-w-sm">
      <FormField label="Name" name="name" defaultValue={item.name} required />
      <SelectField label="Category" name="category" options={categoryOptions} defaultValue={item.category} />
      <SelectField label="Tier" name="tier" options={tierOptions} defaultValue={item.tier} />
      <FormField label="Order" name="order" type="number" defaultValue={String(item.order)} hint="Lower = first within category" />

      {error && <p className="font-inputmono text-[11px] text-danger">{error}</p>}
      <SubmitButton label="Save Changes" />
    </form>
  );
}

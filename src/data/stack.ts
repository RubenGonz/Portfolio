import { prisma } from "@/lib/prisma";
import type { StackItem } from "@/types";

export interface StackItemWithId extends StackItem {
  id: string;
  category: string;
  order: number;
}

export interface StackCategory {
  label: string;
  items: StackItemWithId[];
}

const CATEGORY_ORDER = ["Frontend", "Backend", "Database", "Tooling"];

export async function getStack(): Promise<StackCategory[]> {
  const rows = await prisma.stackItem.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  const map = new Map<string, StackItemWithId[]>();
  for (const r of rows) {
    const list = map.get(r.category) ?? [];
    list.push({ id: r.id, name: r.name, tier: r.tier as StackItem["tier"], category: r.category, order: r.order });
    map.set(r.category, list);
  }

  return CATEGORY_ORDER.filter((cat) => map.has(cat)).map((cat) => ({
    label: cat,
    items: map.get(cat)!,
  }));
}

export async function getStackItem(id: string): Promise<StackItemWithId | undefined> {
  const row = await prisma.stackItem.findUnique({ where: { id } });
  if (!row) return undefined;
  return { id: row.id, name: row.name, tier: row.tier as StackItem["tier"], category: row.category, order: row.order };
}

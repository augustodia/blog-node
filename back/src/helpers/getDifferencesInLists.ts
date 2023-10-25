type CompareListArguments<T, F extends keyof T> = {
  oldList: T[];
  newList: T[];
  fieldToCompare: F;
  fieldsToExcludeToCompare: F[];
};
export function getDifferencesInListsOfObjects<T, F extends keyof T>({
  oldList,
  newList,
  fieldToCompare,
  fieldsToExcludeToCompare,
}: CompareListArguments<T, F>) {
  const additions: T[] = [];
  const updates: T[] = [];
  const deletions: T[] = [];

  const oldItemsByField = new Map(
    oldList.map((item) => [item[fieldToCompare], item])
  );
  const newItemsByField = new Map(
    newList.map((item) => [item[fieldToCompare], item])
  );

  for (const [id, newItem] of newItemsByField.entries()) {
    const oldItem = oldItemsByField.get(id);

    if (!oldItem) {
      additions.push(newItem);
      continue;
    }

    const filteredNewItem = filterFields(newItem, fieldsToExcludeToCompare);
    const filteredOldItem = filterFields(oldItem, fieldsToExcludeToCompare);

    const isEqual =
      JSON.stringify(filteredNewItem) === JSON.stringify(filteredOldItem);

    if (isEqual) continue;

    updates.push(newItem);
  }

  for (const id of oldItemsByField.keys()) {
    if (!newItemsByField.has(id)) {
      deletions.push(oldItemsByField.get(id)!);
    }
  }

  return { additions, updates, deletions };
}

function filterFields<T, F extends keyof T>(
  item: T,
  fieldsToExclude: F[]
): Partial<T> {
  return Object.fromEntries(
    Object.entries(item as Record<string, unknown>).filter(
      ([key]) => !fieldsToExclude.includes(key as string as F)
    )
  ) as Partial<T>;
}

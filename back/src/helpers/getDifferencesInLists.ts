type CompareListArguments<T, F extends keyof T> = {
  originalList: T[];
  updatedList: T[];
  idField: F;
  nonComparableUpdateFields: F[];
};
export function getDifferencesInListsOfObjects<T, F extends keyof T>({
  originalList,
  updatedList,
  idField,
  nonComparableUpdateFields,
}: CompareListArguments<T, F>) {
  const additions: T[] = [];
  const updates: T[] = [];
  const deletions: T[] = [];

  const oldItemsByField = new Map(
    originalList.map((item) => [item[idField], item])
  );
  const newItemsByField = new Map(
    updatedList.map((item) => [item[idField], item])
  );

  for (const [id, newItem] of newItemsByField.entries()) {
    const oldItem = oldItemsByField.get(id);

    if (!oldItem) {
      additions.push(newItem);
      continue;
    }

    const filteredNewItem = filterFields(newItem, nonComparableUpdateFields);
    const filteredOldItem = filterFields(oldItem, nonComparableUpdateFields);

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

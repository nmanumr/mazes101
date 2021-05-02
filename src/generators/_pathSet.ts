export type ItemSets<T> = Array<Set<T>>;

/**
 * Get set from which item belongs to
 */
export function getItemSet<T>(item: T, itemSets: ItemSets<T>): Set<T> {
  return itemSets.find((set) => set.has(item));
}

/**
 * Join sets from which both items belong
 */
export function joinItemSets<T>(item1: T, item2: T, itemSets: ItemSets<T>): ItemSets<T> {
  const newItemSets = itemSets.map((set) => new Set(set));
  const set1 = getItemSet(item1, newItemSets);
  const set2 = getItemSet(item2, newItemSets);

  if (!set1 && !set2) {
    // if both item doesn't belong to any set create new set and push it to itemSets
    newItemSets.push(new Set([item1, item2]));
  } else if (set1 == null) {
    // if item1 doesn't belong to any set add it to set 2
    set2.add(item1);
  } else if (set2 == null) {
    // if item2 doesn't belong to any set add it to set 1
    set1.add(item2);
  } else if (set1 != set2) {
    // if both items are from distinct sets merge them
    set2.forEach((item) => set1.add(item));
    const i = newItemSets.indexOf(set2);
    newItemSets.splice(i, 1);
  }

  return newItemSets;
}

/**
 * checks if both items belongs to same set
 */
export function isFromSameSet<T>(item1: T, item2: T, itemSets: ItemSets<T>): boolean {
  const set1 = getItemSet(item1, itemSets);
  const set2 = getItemSet(item2, itemSets);

  return !!set1 && !!set2 && set1 == set2;
}

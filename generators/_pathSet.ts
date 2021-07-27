export type ItemSets<T> = Record<string, Set<T>>;
export function getItemSet<T>(item: T, itemSets: ItemSets<T>): Set<T> | undefined {
    return Object.entries(itemSets).find(([key, set]) => set.has(item))?.[1];
}
export function getItemSetKey<T>(item: T, itemSets: ItemSets<T>): string | undefined {
    return Object.entries(itemSets).find(([key, set]) => set.has(item))?.[0];
}
export function addItemSet<T>(item: T | Set<T>, itemSets: ItemSets<T>): [
    string,
    Set<T>
] {
    let max = Object.keys(itemSets).reduce((a, b) => a > +b ? a : +b, 0);
    let val = item instanceof Set ? item : new Set([item]);
    itemSets[+max + 1] = val;
    return [(+max + 1).toString(), val];
}
export function joinItemSets<T>(item1: T, item2: T, itemSets: ItemSets<T>): ItemSets<T> {
    const newItemSets = Object.fromEntries(Object.entries(itemSets).map(([k, set]) => [k, new Set(set)]));
    const set1 = getItemSet(item1, newItemSets);
    const set2 = getItemSetKey(item2, newItemSets) as string;
    if (!set1 && !set2) {
        addItemSet(new Set([item1, item2]), newItemSets);
    }
    else if (!set1) {
        newItemSets[set2]?.add(item1);
    }
    else if (!set2) {
        set1.add(item2);
    }
    else if (set1 != newItemSets[set2]) {
        newItemSets[set2].forEach((item) => set1.add(item));
        delete newItemSets[set2];
    }
    return newItemSets;
}
export function isFromSameSet<T>(item1: T, item2: T, itemSets: ItemSets<T>): boolean {
    const set1 = getItemSet(item1, itemSets);
    const set2 = getItemSet(item2, itemSets);
    return !!set1 && !!set2 && set1 == set2;
}

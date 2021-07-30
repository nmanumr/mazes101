export type PartialExcept<T extends object, K extends keyof T = keyof T> = Pick<T, K> & Partial<T>;

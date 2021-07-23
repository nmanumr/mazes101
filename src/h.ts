type Child = string | number;

type Attributes = Record<string, any>;

const attrMap = new Map([
  ['className', 'class'],
  ['viewBox', 'view=Box'],
]);

function normalizeAttr(attr: string) {
  if (attrMap.has(attr)) attr = attrMap.get(attr) as string;

  return attr.split('').map((letter, idx) => {
    return letter === '='
      ? ''
      : letter.toUpperCase() === letter && attr[idx - 1] !== '='
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter;
  }).join('');
}

/**
 * JSX factory that renders HTML string
 */
export function StrH(tag: string, attributes: Attributes | null, ...children: Child[]): string {
  let attrStr = Object.entries(attributes || {}).map(([key, val]) => {
    if (typeof val === 'boolean') {
      return normalizeAttr(key);
    }
    return `${normalizeAttr(key)}="${val}"`;
  }).join(' ');

  let childStr = children.map((child) => child.toString()).join('');

  if (childStr) {
    if (attrStr) {
      return `<${tag} ${attrStr}>${childStr}</${tag}>`;
    }
    return `<${tag}>${childStr}</${tag}>`;
  } else if (attrStr) {
    return `<${tag} ${attrStr} />`;
  }

  return `<${tag} />`;
}

import {JSX as JSXInternal} from "preact"
import {normalizeAttr} from './index';

type Child =
  | HTMLElement
  | Text
  | string
  | number

type Attributes = JSXInternal.HTMLAttributes & JSXInternal.SVGAttributes;

// CAUTION: These are not all the svg tags but some of the svg tags
// that can be used in the scope of this project
const svgTags = ['svg', 'path', 'circle', 'line', 'rect'];

/**
 * Append a child node to an element
 *
 * @param el - Element
 * @param child - Child node(s)
 */
export function appendChild(el: HTMLElement | SVGElement, child: Child | Child[]): void {
  /* Handle primitive types (including raw HTML) */
  if (typeof child === "string" || typeof child === "number") {
    el.innerHTML += child.toString()

    /* Handle nodes */
  } else if (child instanceof Node) {
    el.appendChild(child)

    /* Handle nested children */
  } else if (Array.isArray(child)) {
    for (const node of child)
      appendChild(el, node)
  }
}

/**
 * JSX factory that renders DOMElement
 */
export function DomH(
  tag: string, attributes: Attributes | null, ...children: Child[]
): HTMLElement | SVGElement {
  let el;

  /* Handle svg element */
  if (svgTags.includes(tag)) {
    el = document.createElementNS("http://www.w3.org/2000/svg", tag);

    /* Handle normal html element */
  } else {
    el = document.createElement(tag);
  }

  /* Set attributes, if any */
  if (attributes) {
    for (const attr of Object.keys(attributes)) {
      if (typeof attributes[attr] !== "boolean") {
        el.setAttribute(normalizeAttr(attr), attributes[attr]);
      } else if (attributes[attr]) {
        el.setAttribute(normalizeAttr(attr), "");
      }
    }
  }

  /* Append child nodes */
  for (const child of children) {
    appendChild(el, child)
  }

  /* Return element */
  return el
}

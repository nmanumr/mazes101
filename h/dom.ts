import { JSX as JSXInternal } from "preact";
import { normalizeAttr } from "./index/index.ts";
type Child = HTMLElement | Text | string | number;
type Attributes = JSXInternal.HTMLAttributes & JSXInternal.SVGAttributes;
const svgTags = ['svg', 'path', 'circle', 'line', 'rect'];
export function appendChild(el: HTMLElement | SVGElement, child: Child | Child[]): void {
    if (typeof child === "string" || typeof child === "number") {
        el.innerHTML += child.toString();
    }
    else if (child instanceof Node) {
        el.appendChild(child);
    }
    else if (Array.isArray(child)) {
        for (const node of child)
            appendChild(el, node);
    }
}
export function DomH(tag: string, attributes: Attributes | null, ...children: Child[]): HTMLElement | SVGElement {
    let el;
    if (svgTags.includes(tag)) {
        el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    }
    else {
        el = document.createElement(tag);
    }
    if (attributes) {
        for (const attr of Object.keys(attributes)) {
            if (typeof attributes[attr] !== "boolean") {
                el.setAttribute(normalizeAttr(attr), attributes[attr]);
            }
            else if (attributes[attr]) {
                el.setAttribute(normalizeAttr(attr), "");
            }
        }
    }
    for (const child of children) {
        appendChild(el, child);
    }
    return el;
}

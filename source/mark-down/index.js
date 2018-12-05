import { component } from 'web-cell';

import marked from 'marked';

const MD_raw = new WeakMap();

@component({
    template: '<slot></slot>',
    style: `
        :host {
            display: block;
            outline: none;
        }`
})
export default class MarkDown extends HTMLElement {
    constructor() {
        super().buildDOM();
    }

    set innerHTML(raw) {
        MD_raw.set(this, raw);

        super.innerHTML = marked(raw);
    }

    get innerHTML() {
        return super.innerHTML;
    }

    get textContent() {
        return MD_raw.get(this);
    }

    set textContent(raw) {
        MD_raw.set(this, (super.textContent = raw));
    }
}

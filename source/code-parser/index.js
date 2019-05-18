import { parseDOM, stringifyDOM } from 'dom-renderer';

const style = parseDOM(`<style>
    :host {
        display: block;
        outline: none;
    }
</style>`),
    code_raw = new WeakMap();

var template = parseDOM('<slot></slot>');

template.prepend(style.cloneNode(true));

template = stringifyDOM(template);

export default class CodeParser extends HTMLElement {
    constructor(option) {
        super();

        if (this.constructor === CodeParser)
            throw TypeError('CodeParser() is an abstract class');

        this.construct(option);
    }

    static get template() {
        return template;
    }

    static get style() {
        return style;
    }
    /* eslint-disable */
    /**
     * @param {String} raw - Specific source code
     *
     * @return {String} HTML source code
     */
    static parse(raw) {
        throw ReferenceError(
            'Sub class of CodeParser() should implement .parse()'
        );
    } /* eslint-enable */

    set innerHTML(raw) {
        raw = (raw + '').trim();

        code_raw.set(this, raw);

        super.innerHTML = this.constructor.parse(raw);
    }

    get innerHTML() {
        return super.innerHTML;
    }

    get textContent() {
        return code_raw.get(this);
    }

    set textContent(raw) {
        code_raw.set(this, (super.textContent = raw));
    }
}

import { component, on } from 'web-cell';

import template from './index.html';

@component({ template })
export default class CommandLine extends HTMLElement {
    constructor() {
        super().buildDOM();
    }

    /**
     * @param {String}                       raw
     * @param {function(char: String): void} renderer
     * @param {Number}                       [interval=250]
     *
     * @return {Promise}
     */
    static keyType(raw, renderer, interval = 100) {
        raw = [...raw];

        return new Promise(resolve => {
            const timer = setInterval(() => {
                renderer(raw.shift());

                if (!raw[0]) clearInterval(timer) || resolve();
            }, interval);
        });
    }

    slotChangedCallback(assigned) {
        const code = assigned.find(node => node.tagName === 'CODE'),
            line = this.$('kbd')[0];

        CommandLine.keyType(
            code.textContent.trim(),
            char => (line.textContent += char)
        );
    }

    @on('click', ':host kbd')
    autoCopy(_, target) {
        self.getSelection()
            .getRangeAt(0)
            .selectNode(target);

        document.execCommand('copy');
    }
}

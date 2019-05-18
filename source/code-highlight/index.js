import { component } from 'web-cell';

import CodeParser from 'code-parser';

import { highlightAuto } from 'highlight.js';

@component()
export default class CodeHighlight extends CodeParser {
    constructor() {
        super();
    }

    static parse(raw) {
        return highlightAuto(raw);
    }
}

import marked from 'marked';
import { highlight } from 'highlight.js';

marked.setOptions({
    highlight: (code, lang) => highlight(lang, code).value
});

export * from './CommandLine';
export * from './Repository';
export * from './Issue';
export * from './Profile';
export * from './EventFlow';

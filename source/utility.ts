import { marked } from 'marked';
import { highlight, languages } from 'prismjs';

const renderer = new marked.Renderer();

renderer.code = (code, language) => {
    language = language?.toLowerCase() || 'none';

    const Class = `class="language-${language}"`,
        grammer = languages[language];

    return `<pre ${Class}><code ${Class}>${
        grammer ? highlight(code, grammer, language) : code
    }</code></pre>`;
};

export const parseMarkDown = (raw: string) =>
    marked(raw, { renderer }) as string;

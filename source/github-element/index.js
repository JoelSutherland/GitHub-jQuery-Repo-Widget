import { request } from 'web-cell';

export default class GithubElement extends HTMLElement {
    constructor(option) {
        super().construct(option);
    }

    static get observedAttributes() {
        return ['user', 'org', 'token'];
    }

    attributeChangedCallback() {}

    async fetch(URI, method, body, headers, option) {
        headers = headers || {};

        const token = this.token || GithubElement.token;

        if (token) headers.Authorization = `token ${token}`;

        return (await request(
            new URL(URI, 'https://api.github.com/'),
            method,
            body,
            headers,
            option
        )).body;
    }
}

import { request } from 'web-cell';

export default class GithubElement extends HTMLElement {
    constructor(option) {
        super().buildDOM(option);
    }

    static get observedAttributes() {
        return ['user', 'org', 'token'];
    }

    attributeChangedCallback() {}

    fetch(URI, method, body, headers, option) {
        return request(
            new URL(URI, 'https://api.github.com/'),
            method,
            body,
            {
                Authorization: `token ${this.token || GithubElement.token}`,
                ...headers
            },
            option
        );
    }
}

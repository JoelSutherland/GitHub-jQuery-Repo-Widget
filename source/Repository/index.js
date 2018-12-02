import { component, mapProperty, mapData, blobURI } from 'web-cell';
import GithubElement from 'github-element';

import template from './index.html';
import style from './index.less';
import icon_repo from './repository.png';
import icon_status from './watch-fork.png';

@component({ template, style })
export default class GithubRepository extends GithubElement {
    constructor() {
        super();
    }

    @mapProperty
    static get observedAttributes() {
        return super.observedAttributes.concat('repo');
    }

    @mapData
    attributeChangedCallback() {}

    @blobURI
    static get repository() {
        return icon_repo;
    }

    @blobURI
    static get status() {
        return icon_status;
    }

    async viewChangedCallback({ user, org, repo }) {
        if (!(user || org) || !repo) return;

        const data = await this.fetch(`repos/${user || org}/${repo}`);

        this.view.render(data);
    }
}

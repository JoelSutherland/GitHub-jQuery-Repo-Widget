import { component, mapProperty, mapData } from 'web-cell';

import GithubElement from 'github-element';

import template from './index.html';

import style from './index.less';

@component({ template, style })
export default class GithubIssue extends GithubElement {
    constructor() {
        super();
    }

    @mapProperty
    static get observedAttributes() {
        return super.observedAttributes.concat('repo', 'issue', 'pull');
    }

    @mapData
    attributeChangedCallback() {}

    async viewChangedCallback({ user, org, repo, issue, pull }) {
        (issue = parseInt(issue)), (pull = parseInt(pull));

        if (!(user || org) || !repo || !(issue || pull)) return;

        const [detail, owner] = await Promise.all([
            this.fetch(
                `repos/${user || org}/${repo}/${
                    pull ? 'pull' : 'issue'
                }s/${pull || issue}`
            ),
            this.fetch(`${org ? 'org' : 'user'}s/${org || user}`)
        ]);

        detail.comment = await this.fetch(detail.comments_url);

        if (detail.merged) detail.state = 'merged';

        await this.view.render({ owner, detail });
    }
}

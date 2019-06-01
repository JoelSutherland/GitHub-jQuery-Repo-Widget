import { component, mapProperty, mapData, multipleMap } from 'web-cell';

import GithubElement from 'github-element';

import template from './index.html';

import style from './index.less';

@component({ template, style })
export default class GithubProfile extends GithubElement {
    constructor() {
        super();
    }

    @mapProperty
    static get observedAttributes() {
        return super.observedAttributes;
    }

    @mapData
    attributeChangedCallback() {}

    static filterRepo(list) {
        return multipleMap(list, repo => {
            if (
                !repo.fork &&
                repo.forks_count + repo.watchers_count + repo.stargazers_count
            ) {
                delete repo.owner;
                return repo;
            }
        }).sort(
            (A, B) =>
                new Date(B.pushed_at) - new Date(A.pushed_at) ||
                B.stargazers_count - A.stargazers_count ||
                B.watchers_count - A.watchers_count ||
                B.forks_count - A.forks_count
        );
    }

    static filterTech(list) {
        const tech = {};

        for (let item of list)
            for (var name in item) {
                tech[name] = tech[name] || {
                    name: name,
                    count: 0
                };

                tech[name].count += item[name];
            }

        return Object.keys(tech)
            .map(name => tech[name])
            .sort((A, B) => B.count - A.count);
    }

    async viewChangedCallback({ user, org }) {
        if (!user && !org) return;

        const data = await this.fetch(user ? `users/${user}` : `orgs/${org}`),
            { view } = this;

        await view.render(data);

        const repos = GithubProfile.filterRepo(
            await this.fetch(`${data.repos_url}?sort=updated`)
        );

        view.repositories = repos;

        const languages = await Promise.all(
            repos.map(async repo => this.fetch(repo.languages_url))
        );

        view.languages = GithubProfile.filterTech(languages).slice(0, 8);
    }

    get repoCount() {
        return (this.view.repositories || '').length || 0;
    }
}

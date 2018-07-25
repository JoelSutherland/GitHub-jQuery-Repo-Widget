import { component } from 'web-cell';

import template from './index.html';

import style from './index.css';



export default  class GithubProfile extends HTMLElement {

    constructor() {  super().buildDOM(template, style);  }

    get user() {  return this.getAttribute('user');  }

    static filterRepo(list) {

        return  list.map(repo => {

            if ((! repo.fork)  &&  (
                repo.forks_count + repo.watchers_count + repo.stargazers_count
            )) {
                delete repo.owner;    return repo;
            }
        }).filter( Boolean ).sort(
            (A, B)  =>  (new Date( B.pushed_at ) - new Date( A.pushed_at ))  ||
                (B.stargazers_count - A.stargazers_count)  ||
                (B.watchers_count - A.watchers_count)  ||
                (B.forks_count - A.forks_count)
        );
    }

    static filterTech(list) {

        const tech = { };

        for (let item of list)  for (var name in item) {

            tech[ name ] = tech[ name ]  ||  {
                name:     name,
                count:    0
            };

            tech[ name ].count += item[ name ];
        }

        return  Object.keys( tech )
            .map(name => tech[ name ]).sort((A, B) => B.count - A.count);
    }

    async connectedCallback() {

        const user = await (await fetch(
                `https://api.github.com/users/${this.user}`
            )).json(),
            view = this.view;

        view.render( user );

        const repos = GithubProfile.filterRepo(
            await (await fetch(`${user.repos_url}?sort=updated`)).json()
        );

        view.repositories.render( repos );

        const languages = await Promise.all(repos.map(
            async repo => (await fetch( repo.languages_url )).json()
        ));

        view.languages.render( GithubProfile.filterTech( languages ).slice(0, 8) );
    }

    get repoCount() {  return this.view.repositories.length;  }
}


component( GithubProfile );

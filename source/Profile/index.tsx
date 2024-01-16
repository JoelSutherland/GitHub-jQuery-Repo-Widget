import { observable } from 'mobx';
import { WebCellProps, attribute, component, observer } from 'web-cell';

import { Owner, Repository, getOwner, getRepositories } from '../service';
import style from './index.less';

export interface GithubProfileProps extends WebCellProps {
    user?: string;
    organization?: string;
}

@component({
    tagName: 'github-profile'
})
@observer
export class GithubProfile extends HTMLElement {
    declare props: GithubProfileProps;

    @attribute
    @observable
    accessor user = '';

    @attribute
    @observable
    accessor organization = '';

    @observable
    currentOwner = {
        login: '',
        name: '',
        avatar_url: '',
        html_url: '',
        followers: 0,
        updated_at: '',
        languages: [],
        repositories: [] as Repository[]
    } as Partial<Owner & { languages: string[]; repositories: Repository[] }>;

    async connectedCallback() {
        const { user, organization } = this;

        const owner = await (user
                ? getOwner('user', user)
                : getOwner('organization', organization)),
            sort = 'updated';

        let list = await (user
            ? getRepositories('user', user, { sort })
            : getRepositories('organization', organization, { sort }));

        list = list.filter(({ fork }) => !fork);

        const repositories = list
                .filter(({ stargazers_count }) => stargazers_count)
                .sort((A, B) => B.stargazers_count - A.stargazers_count)
                .slice(0, 5),
            languages = [
                ...new Set(list.map(({ language }) => language))
            ].filter(Boolean);

        this.currentOwner = { ...owner, languages, repositories };
    }

    renderRepository = ({
        html_url,
        description,
        name,
        updated_at,
        stargazers_count
    }) => (
        <a
            key={html_url}
            className={style['profile-repos']}
            target="_blank"
            href={html_url}
            title={description}
        >
            <span className="d-flex justify-content-between">
                <span className={style['repos-name']}>{name}</span>
                <span className={style['repos-star']}>{stargazers_count}</span>
            </span>
            <time className={style['repos-updated']} dateTime={updated_at}>
                Updated:
                {new Date(updated_at).toLocaleString()}
            </time>
        </a>
    );

    render() {
        const {
            avatar_url,
            html_url,
            name,
            login,
            followers,
            languages,
            repositories
        } = this.currentOwner;

        return (
            <div className={style['gh-profile-card']}>
                <header>
                    <header className="d-flex justify-content-between">
                        <img
                            className={style['profile-avatar']}
                            src={avatar_url}
                        />
                        <div>
                            <a
                                className={style['profile-name']}
                                target="_blank"
                                href={html_url}
                            >
                                {name}
                            </a>
                            <div className="d-flex justify-content-between mt-1">
                                <a
                                    className={style['profile-follow']}
                                    target="_blank"
                                    href={html_url}
                                >
                                    Follow @{login}
                                </a>
                                <span className={style['profile-followers']}>
                                    {followers}
                                </span>
                            </div>
                        </div>
                    </header>
                    <ul className={style['profile-languages']}>
                        {languages.map(name => (
                            <li key={name}>{name}</li>
                        ))}
                    </ul>
                </header>
                <section>
                    <header className={style['repos-header']}>
                        Most popular original repositories
                    </header>

                    {repositories.map(this.renderRepository)}
                </section>
            </div>
        );
    }
}

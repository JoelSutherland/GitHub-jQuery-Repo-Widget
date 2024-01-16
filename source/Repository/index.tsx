import { observable } from 'mobx';
import { WebCellProps, attribute, component, observer } from 'web-cell';

import { Repository, getRepository } from '../service';
import style from './index.less';
import icon_repo from './repository.png';
import icon_status from './watch-fork.png';

export interface GithubRepositoryProps extends WebCellProps {
    owner: string;
    repository: string;
}

@component({
    tagName: 'github-repository'
})
@observer
export class GithubRepository extends HTMLElement {
    declare props: GithubRepositoryProps;

    @attribute
    @observable
    accessor owner = 'TechQuery';

    @attribute
    @observable
    accessor repository = 'GitHub-Web-Widget';

    @observable
    currentRepository = {
        owner: {} as Repository['owner'],
        name: this.repository,
        full_name: `${this.owner}/${this.repository}`,
        description: '',
        homepage: '',
        default_branch: 'master',
        pushed_at: '',
        has_wiki: true,
        watchers: 0,
        forks: 0,
        html_url: ''
    } as Partial<Repository>;

    async connectedCallback() {
        this.currentRepository = await getRepository(
            this.owner,
            this.repository
        );
    }

    render() {
        const {
            owner,
            html_url,
            full_name,
            name,
            watchers,
            forks,
            description,
            has_wiki,
            homepage,
            default_branch,
            pushed_at
        } = this.currentRepository;

        return (
            <main className={style['github-box']}>
                <div className={style['github-box-title']}>
                    <h3 className="p-2">
                        <img className="pr-1" src={icon_repo} />
                        <a
                            target="_blank"
                            href={owner.html_url}
                            title={`GitHub Homepage of ${owner.login}`}
                        >
                            {owner.login}
                        </a>
                        <span>/</span>
                        <a
                            className="font-weight-bold"
                            target="_blank"
                            href={html_url}
                            title={`GitHub Homepage of ${full_name}`}
                        >
                            {name}
                        </a>
                    </h3>
                    <div className={style['github-stats']}>
                        <a
                            className={style['watchers']}
                            style={{ backgroundImage: `url("${icon_status}")` }}
                            title="See watchers"
                            target="_blank"
                            href={`https://github.com/${full_name}/watchers`}
                        >
                            {watchers}
                        </a>
                        <a
                            className={style['forks']}
                            style={{ backgroundImage: `url("${icon_status}")` }}
                            title="See forkers"
                            target="_blank"
                            href={`https://github.com/${full_name}/forks`}
                        >
                            {forks}
                        </a>
                    </div>
                </div>
                <div className={style['github-box-content']}>
                    <p className="m-0 d-flex justify-content-between">
                        {description}
                        {has_wiki && (
                            <a
                                target="_blank"
                                href={`https://github.com/${full_name}#readme`}
                            >
                                Read More
                            </a>
                        )}
                    </p>
                    <p className="m-0 font-weight-bold">
                        <a target="_blank" href={homepage}>
                            {homepage}
                        </a>
                    </p>
                </div>
                <div className={style['github-box-download']}>
                    <div className={style['updated']}>
                        Latest commit to the
                        <strong className="font-weight-bold text-dark px-1">
                            {default_branch}
                        </strong>
                        branch on
                        <time dateTime={pushed_at} className="p-1">
                            {new Date(pushed_at).toLocaleString()}
                        </time>
                    </div>
                    <a
                        className={style['download']}
                        title="Get an archive of this repository"
                        target="_blank"
                        href={`https://github.com/${full_name}/zipball/${default_branch}`}
                    >
                        Download as zip
                    </a>
                </div>
            </main>
        );
    }
}

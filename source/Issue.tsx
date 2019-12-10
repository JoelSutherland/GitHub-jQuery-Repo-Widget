import { component, mixin, watch, attribute, createCell } from 'web-cell';
import marked from 'marked';

import {
    Issue,
    Repository,
    IssueState,
    Owner,
    Comment,
    getIssue,
    getRepository
} from './service';

import style from './common.less';

@component({
    tagName: 'github-issue',
    renderTarget: 'children'
})
export class GithubIssue extends mixin<
    { owner: string; repository: string; code: number },
    Issue & { repository: Repository }
>() {
    @attribute
    @watch
    owner = '';

    @attribute
    @watch
    repository = '';

    @attribute
    @watch
    issue = 0;

    @attribute
    @watch
    pull = 0;

    state = {
        state: 'open' as Issue['state'],
        title: '',
        body: '',
        created_at: '',
        user: {} as Owner,
        html_url: '',
        comments: [] as Comment[],
        repository: {} as Repository
    };

    async connectedCallback() {
        super.connectedCallback();

        const issue = await getIssue(
                this.owner,
                this.repository,
                this.pull ? 'pullRequest' : 'issue',
                this.pull || this.issue
            ),
            repository = await getRepository(this.owner, this.repository);

        this.setState({ ...issue, repository });
    }

    renderComment({ user, created_at, body }: Comment, top?: boolean) {
        return (
            <details>
                <summary className="d-flex justify-content-between">
                    <div>
                        <img className={style['logo']} src={user.avatar_url} />

                        <a target="_blank" href={user.html_url}>
                            <strong>{user.login}</strong>
                        </a>
                    </div>
                    <div>
                        {top ? 'opened this' : 'commented'} at
                        <time datetime={created_at}>
                            {new Date(created_at).toLocaleString()}
                        </time>
                    </div>
                </summary>
                <div className="markdown-body" innerHTML={marked(body)} />
            </details>
        );
    }

    render() {
        const {
            user,
            state,
            html_url,
            title,
            created_at,
            body,
            comments,
            repository: { owner }
        } = this.state;

        return (
            <div className="d-flex justify-content-around">
                <aside className="d-flex flex-column align-items-center px-3">
                    <img
                        className={`${style['logo']} ${style['big']}`}
                        src={owner?.avatar_url}
                    />
                    <a target="_blank" href={owner?.html_url}>
                        <strong>{owner?.login}</strong>
                    </a>
                </aside>
                <div>
                    <h1>
                        <span
                            className={`badge badge-${IssueState[state]} mr-3`}
                        >
                            {state}
                        </span>
                        <a target="_blank" href={html_url}>
                            {title}
                        </a>
                    </h1>
                    <main>
                        {this.renderComment({ user, created_at, body }, true)}

                        {comments.map(item => this.renderComment(item))}
                    </main>
                </div>
            </div>
        );
    }
}

import { component, mixin, watch, attribute, createCell } from 'web-cell';
import marked from 'marked';

import { Owner, Resource, client } from '../utility';
import { Repository } from '../Repository';
import style from './index.less';

export interface Comment {
    body: string;
    created_at: string;
    user: Owner;
}

enum IssueState {
    open = 'success',
    closed = 'danger',
    merged = 'primary'
}

export interface Issue extends Comment, Resource {
    state: keyof typeof IssueState;
    title: string;
    comments: Comment[];
    repository: Repository;
}

@component({
    tagName: 'github-issue',
    renderTarget: 'children'
})
export class GithubIssue extends mixin<
    { namespace: string; repository: string; code: number },
    Issue
>() {
    @attribute
    @watch
    namespace = '';

    @attribute
    @watch
    repository = '';

    @attribute
    @watch
    code = 0;

    state = {
        state: 'open' as keyof typeof IssueState,
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

        const meta = {
            owner: this.namespace,
            repo: this.repository,
            issue_number: this.code
        };
        const { data: issue } = await client.issues.get(meta),
            { data: comments } = await client.issues.listComments(meta),
            { data: repository } = await client.repos.get({
                owner: this.namespace,
                repo: this.repository
            });

        this.setState({ ...issue, comments, repository });
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

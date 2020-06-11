import {
    WebCellProps,
    component,
    mixin,
    watch,
    attribute,
    createCell
} from 'web-cell';

import { parseMarkDown } from './utility';
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

export interface GithubIssueProps extends WebCellProps {
    owner: string;
    repository: string;
    issue: number;
}

@component({
    tagName: 'github-issue',
    renderTarget: 'children'
})
export class GithubIssue extends mixin<
    GithubIssueProps,
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
                <summary className="d-flex align-items-center my-3">
                    <img
                        className={`px-1 ${style.logo}`}
                        src={user.avatar_url}
                    />
                    <a className="px-1" target="_blank" href={user.html_url}>
                        <strong>{user.login}</strong>
                    </a>
                    <span className="px-1">
                        {top ? 'opened this' : 'commented'} at
                    </span>
                    <time className="px-1" datetime={created_at}>
                        {new Date(created_at).toLocaleString()}
                    </time>
                </summary>
                <div
                    className="markdown-body my-3"
                    innerHTML={parseMarkDown(body)}
                />
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
            <div className="d-flex my-4">
                <aside className="d-flex flex-column align-items-center px-3 w-25">
                    <img
                        className={`${style.logo} ${style.big}`}
                        src={owner?.avatar_url}
                    />
                    <a target="_blank" href={owner?.html_url}>
                        <strong>{owner?.login}</strong>
                    </a>
                </aside>
                <div className="flex-grow-1">
                    <h3>
                        <span
                            className={`badge badge-${IssueState[state]} mr-3`}
                        >
                            {state}
                        </span>
                        <a target="_blank" href={html_url}>
                            {title}
                        </a>
                    </h3>
                    <div>
                        {this.renderComment({ user, created_at, body }, true)}

                        {comments.map(item => this.renderComment(item))}
                    </div>
                </div>
            </div>
        );
    }
}

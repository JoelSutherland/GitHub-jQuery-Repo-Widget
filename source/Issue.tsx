import { observable } from 'mobx';
import { WebCellProps, attribute, component, observer } from 'web-cell';

import {
    Comment,
    Issue,
    IssueState,
    Repository,
    getIssue,
    getRepository
} from './service';
import { parseMarkDown } from './utility';

import style from './common.less';

export interface GithubIssueProps extends WebCellProps {
    owner: string;
    repository: string;
    issue: number;
    pull: number;
}

@component({
    tagName: 'github-issue'
})
@observer
export class GithubIssue extends HTMLElement {
    declare props: GithubIssueProps;

    @attribute
    @observable
    accessor owner = '';

    @attribute
    @observable
    accessor repository = '';

    @attribute
    @observable
    accessor issue = 0;

    @attribute
    @observable
    accessor pull = 0;

    @observable
    currentIssue = {
        state: 'open' as Issue['state'],
        title: '',
        body: '',
        created_at: '',
        user: {} as Issue['user'],
        html_url: '',
        comment_list: [] as Comment[],
        repository: {} as Repository
    } as Issue & { repository: Repository };

    async connectedCallback() {
        const issue = await getIssue(
                this.owner,
                this.repository,
                this.pull ? 'pullRequest' : 'issue',
                this.pull || this.issue
            ),
            repository = await getRepository(this.owner, this.repository);

        this.currentIssue = { ...issue, repository };
    }

    renderComment({ user, created_at, body }: Partial<Comment>, top?: boolean) {
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
                    <time className="px-1" dateTime={created_at}>
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
            comment_list,
            repository: { owner }
        } = this.currentIssue;

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

                        {comment_list.map(item => this.renderComment(item))}
                    </div>
                </div>
            </div>
        );
    }
}

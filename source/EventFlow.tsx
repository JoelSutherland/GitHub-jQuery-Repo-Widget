import { LinkHeader } from 'koajax';
import { observable } from 'mobx';
import { WebCellProps, attribute, component, observer } from 'web-cell';

import style from './common.less';
import { Event, client, getEvents } from './service';

export interface GithubEventsProps extends WebCellProps {
    user?: string;
    organization?: string;
    repository?: string;
}

@component({
    tagName: 'github-events'
})
@observer
export class GithubEvents extends HTMLElement {
    declare props: GithubEventsProps;

    @attribute
    @observable
    accessor user = '';

    @attribute
    @observable
    accessor organization = 'EasyWebApp';

    @attribute
    @observable
    accessor repository = '';

    @observable
    accessor end = false;

    @observable
    accessor list: Event[] = [];

    private loading = false;
    private nextPage = '';

    async loadPage() {
        this.loading = true;

        const { headers, body } = await (!this.nextPage
            ? getEvents(this)
            : client.get<Event[]>(this.nextPage));

        const { next } = headers.Link as LinkHeader;

        if (next) this.nextPage = next.URI;
        else this.end = true;

        this.list = [...this.list, ...body];

        this.loading = false;
    }

    loadMore = (bottom: HTMLElement) =>
        new IntersectionObserver((_, observer) => {
            if (!this.end) {
                if (!this.loading) this.loadPage();
            } else observer.disconnect();
        }).observe(bottom);

    renderPayload = ({
        ref,
        master_branch,
        issue,
        pull_request,
        release,
        member,
        pages
    }: Event['payload']) => (
        <>
            <a
                target="_blank"
                href={(issue || pull_request || release || member)?.html_url}
            >
                {ref ||
                    master_branch ||
                    (issue || pull_request)?.title ||
                    release?.name ||
                    member?.login}
            </a>
            <ol>
                {pages?.map(({ action, html_url, summary, sha, title }) => (
                    <li>
                        {action}
                        <a
                            target="_blank"
                            href={html_url}
                            title={summary || sha}
                        >
                            {title}
                        </a>
                    </li>
                ))}
            </ol>
        </>
    );

    renderEvent = ({ actor, repo, created_at, payload, type }: Event) => (
        <li key={created_at} className="d-flex align-items-center my-3">
            <a
                className="text-center w-25"
                target="_blank"
                href={`https://github.com/${actor.login}`}
                title={actor.login}
            >
                <img
                    className={`${style.logo} ${style.big}`}
                    src={actor.avatar_url}
                />
                <div>{actor.display_login}</div>
            </a>
            <div>
                <h4>
                    <a target="_blank" href={`https://github.com/${repo.name}`}>
                        {repo.name}
                    </a>
                </h4>
                <time className="pr-1" dateTime={created_at}>
                    {new Date(created_at).toLocaleString()}
                </time>
                <strong className="pr-1">
                    {payload.action || type.replace('Event', '')}
                </strong>
                {this.renderPayload(payload)}
            </div>
        </li>
    );

    render() {
        const { list } = this;

        return (
            <div>
                <ul className="list-unstyled">{list.map(this.renderEvent)}</ul>

                <p className="text-center" ref={this.loadMore}>
                    {this.end ? 'No more' : 'Loading'}
                </p>
            </div>
        );
    }
}

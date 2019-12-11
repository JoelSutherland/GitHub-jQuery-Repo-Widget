import {
    component,
    mixin,
    watch,
    attribute,
    createCell,
    Fragment
} from 'web-cell';
import { LinkHeader } from 'koajax';

import { Event, getEvents, client } from './service';

import style from './common.less';

@component({
    tagName: 'github-events',
    renderTarget: 'children'
})
export class GithubEvents extends mixin<
    { user: string; organization: string; repository: string },
    { list: Event[] }
>() {
    @attribute
    @watch
    user = '';

    @attribute
    @watch
    organization = 'EasyWebApp';

    @attribute
    @watch
    repository = '';

    @watch
    end = false;

    state = { list: [] as Event[] };

    private loading = false;
    private nextPage = '';

    async loadPage() {
        this.loading = true;

        const { headers, body } = await (!this.nextPage
            ? getEvents(this)
            : client.get(this.nextPage));

        const { next } = headers.Link as LinkHeader;

        if (next) this.nextPage = next.URI;
        else this.end = true;

        await this.setState({ list: this.state.list.concat(body) });

        this.loading = false;
    }

    loadMore = (bottom: HTMLElement) =>
        new IntersectionObserver((_, observer) => {
            if (!this.end) {
                if (!this.loading) this.loadPage();
            } else observer.disconnect();
        }).observe(bottom);

    renderPayload({
        ref,
        master_branch,
        issue,
        pull_request,
        release,
        member,
        pages
    }: Event['payload']) {
        return (
            <Fragment>
                <a
                    target="_blank"
                    href={
                        (issue || pull_request || release || member)?.html_url
                    }
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
            </Fragment>
        );
    }

    renderEvent = ({ actor, repo, created_at, payload, type }: Event) => {
        return (
            <li className="d-flex align-items-center my-3">
                <a
                    className="text-center w-25"
                    target="_blank"
                    href={`https://github.com/${actor.login}`}
                    title={actor.login}
                >
                    <img
                        className={`${style['logo']} ${style['big']}`}
                        src={actor.avatar_url}
                    />
                    <div>{actor.display_login}</div>
                </a>
                <div>
                    <h4>
                        <a
                            target="_blank"
                            href={`https://github.com/${repo.name}`}
                        >
                            {repo.name}
                        </a>
                    </h4>
                    <time className="pr-1" datetime={created_at}>
                        {new Date(created_at).toLocaleString()}
                    </time>
                    <strong className="pr-1">
                        {payload.action || type.replace('Event', '')}
                    </strong>
                    {this.renderPayload(payload)}
                </div>
            </li>
        );
    };

    render() {
        const { list } = this.state;

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

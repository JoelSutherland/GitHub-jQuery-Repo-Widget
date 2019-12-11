import { HTTPClient } from 'koajax';

export const client = new HTTPClient({
    baseURI: 'https://api.github.com/',
    responseType: 'json'
});

interface QueryOption {
    sort?: 'updated';
    [key: string]: string;
}

export interface Resource {
    html_url?: string;
    created_at?: string;
    updated_at?: string;
}

export enum OwnerType {
    user = 'users',
    organization = 'orgs'
}

export interface Owner extends Resource {
    login: string;
    display_login?: string;
    name: string;
    description?: string;
    avatar_url: string;
    followers: number;
}

export async function getOwner(type: keyof typeof OwnerType, name: string) {
    const { body } = await client.get<Owner>(`${OwnerType[type]}/${name}`);

    return body;
}

export interface Repository extends Resource {
    owner: Owner;
    name: string;
    full_name: string;
    description: string;
    homepage: string;
    default_branch: string;
    pushed_at: string;
    has_wiki: boolean;
    language?: string;
    watchers?: number;
    forks?: number;
    stargazers_count?: number;
}

export async function getRepository(owner: string, name: string) {
    const { body } = await client.get<Repository>(`repos/${owner}/${name}`);

    return body;
}

export async function getRepositories(
    type: keyof typeof OwnerType,
    owner: string,
    options: QueryOption = {}
) {
    const { body } = await client.get<Repository[]>(
        `${OwnerType[type]}/${owner}/repos?${new URLSearchParams(options)}`
    );

    return body;
}

export enum IssueType {
    issue = 'issues',
    pullRequest = 'pulls'
}

export interface Comment extends Resource {
    body: string;
    user: Owner;
}

export enum IssueState {
    open = 'success',
    closed = 'danger',
    merged = 'primary'
}

export interface Issue extends Comment {
    state: keyof typeof IssueState;
    title: string;
    comments: Comment[];
}

export async function getIssue(
    owner: string,
    repository: string,
    type: keyof typeof IssueType,
    code: number
) {
    const path = `repos/${owner}/${repository}/${IssueType[type]}/${code}`;

    const { body: issue } = await client.get<Issue>(path),
        { body: comments } = await client.get<Comment[]>(`${path}/comments`);

    return { ...issue, comments };
}

export interface Release extends Resource {
    name: string;
}

export interface Action extends Resource {
    action: string;
    sha?: string;
    title: string;
    summary?: string;
}

export interface Event extends Resource {
    type: string;
    actor: Owner;
    repo: Repository;
    org?: Owner;
    payload: {
        action?: string;
        description?: string;
        ref?: string;
        master_branch?: string;
        issue?: Issue;
        pull_request?: Issue;
        release?: Release;
        member?: Owner;
        pages?: Action[];
        forkee?: Repository;
    };
}

export function getEvents({
    user,
    organization,
    repository
}: {
    user?: string;
    organization?: string;
    repository?: string;
}) {
    const path = repository
        ? `repos/${user || organization}/${repository}`
        : user
        ? `${OwnerType.user}/${user}`
        : `${OwnerType.organization}/${organization}`;

    return client.get<Event[]>(`${path}/events`);
}

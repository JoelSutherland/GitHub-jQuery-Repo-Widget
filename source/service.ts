import { HTTPClient } from 'koajax';
import { components } from '@octokit/openapi-types';

export const client = new HTTPClient({
    baseURI: 'https://api.github.com/',
    responseType: 'json'
});

interface QueryOption {
    sort?: 'updated';
    [key: string]: string;
}

export enum OwnerType {
    user = 'users',
    organization = 'orgs'
}

export type Owner =
    | components['schemas']['public-user']
    | components['schemas']['organization-full'];

export async function getOwner(type: keyof typeof OwnerType, name: string) {
    const { body } = await client.get<Owner>(`${OwnerType[type]}/${name}`);

    return body;
}

export type Repository = components['schemas']['repository'];

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

export type Comment = components['schemas']['issue-comment'];

export enum IssueState {
    open = 'success',
    closed = 'danger',
    merged = 'primary'
}

export type Issue = components['schemas']['issue'] & {
    comment_list: Comment[];
};

export async function getIssue(
    owner: string,
    repository: string,
    type: keyof typeof IssueType,
    code: number
) {
    const path = `repos/${owner}/${repository}/${IssueType[type]}/${code}`;

    const { body: issue } = await client.get<Issue>(path),
        { body: comment_list } = await client.get<Comment[]>(
            `${path}/comments`
        );
    return { ...issue, comment_list };
}

export type Release = components['schemas']['release'];

export type Event = components['schemas']['event'] & {
    payload: {
        description?: string;
        ref?: string;
        master_branch?: string;
        pull_request?: Issue;
        release?: Release;
        member?: Owner;
        forkee?: Repository;
    };
};

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

import Octokit from '@octokit/rest';

export const client = new Octokit();

export interface Resource {
    html_url: string;
}

export interface Owner extends Resource {
    login: string;
}

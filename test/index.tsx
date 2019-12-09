import { render, createCell } from 'web-cell';

import { CommandLine, GithubRepository, GithubIssue } from '../source';

render(
    <main className="container">
        <h1>GitHub Web Widget</h1>

        <section>
            <h2>Command Line</h2>
            <CommandLine>npm install github-web-widget</CommandLine>
        </section>

        <section>
            <h2>Repository</h2>
            <GithubRepository />
        </section>

        <section>
            <h2>Issue</h2>
            <GithubIssue
                namespace="jsdom"
                repository="w3c-xmlserializer"
                code="2"
            />
        </section>
    </main>
);

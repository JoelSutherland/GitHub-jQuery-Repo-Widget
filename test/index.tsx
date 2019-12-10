import { render, createCell } from 'web-cell';

import {
    CommandLine,
    GithubRepository,
    GithubIssue,
    GithubProfile
} from '../source';

render(
    <main className="container">
        <h1>GitHub Web Widget</h1>

        <section>
            <h2>Command Line</h2>
            <CommandLine>npm install github-web-widget</CommandLine>
        </section>

        <section>
            <h2>Repository</h2>
            <GithubRepository owner="EasyWebApp" repository="WebCell" />
        </section>

        <section>
            <h2>Issue</h2>
            <GithubIssue
                owner="jsdom"
                repository="w3c-xmlserializer"
                issue="2"
            />
        </section>

        <section>
            <h2>Profile</h2>
            <GithubProfile user="TechQuery" />
        </section>
    </main>
);

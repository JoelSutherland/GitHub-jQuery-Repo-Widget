# GitHub Web Widget

[Web Components][1] library for GitHub based on [WebCell][2]

[![NPM Dependency](https://david-dm.org/TechQuery/GitHub-Web-Widget.svg)][3]
[![Build Status](https://travis-ci.com/TechQuery/GitHub-Web-Widget.svg?branch=master)][4]

[![NPM](https://nodei.co/npm/github-web-widget.png?downloads=true&downloadRank=true&stars=true)][5]

## Demo

https://tech-query.me/GitHub-Web-Widget/demo/

## Components

1. [Command Line][6]
2. [Owner Profile][7] (forked from http://github-profile.com/)
3. [Repository][8] (forked from [jQuery GitHub Widget][9])
4. [Issue][10]
5. [Event Flow][11]

## Usage

```shell
npm install github-web-widget
```

[`source/index.html`][12]

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Your Blog</title>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.min.css"
        />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/prismjs@1.22.0/themes/prism-okaidia.css"
        />
        <script
            crossorigin
            src="https://polyfill.app/api/polyfill?features=es.string.match-all,es.array.flat,es.object.from-entries,intersection-observer"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/details-element-polyfill@2.4.0/dist/details-element-polyfill.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.5.0/custom-elements-es5-adapter.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.5.0/webcomponents-bundle.js"></script>
    </head>
    <body>
        <script src="index.tsx"></script>
    </body>
</html>
```

[`source/index.tsx`][13]

```JavaScript
import { render, createCell } from 'web-cell';
import {
    CommandLine,
    GithubRepository,
    GithubIssue,
    GithubProfile,
    GithubEvents
} from 'github-web-widget/source';

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

        <section>
            <h2>Event Flow</h2>
            <GithubEvents />
        </section>
    </main>
);
```

[1]: https://www.webcomponents.org/
[2]: https://web-cell.dev/
[3]: https://david-dm.org/TechQuery/GitHub-Web-Widget
[4]: https://travis-ci.com/TechQuery/GitHub-Web-Widget
[5]: https://nodei.co/npm/github-web-widget/
[6]: https://tech-query.me/GitHub-Web-Widget/classes/_commandline_.commandline.html
[7]: https://tech-query.me/GitHub-Web-Widget/classes/_profile_index_.githubprofile.html
[8]: https://tech-query.me/GitHub-Web-Widget/classes/_repository_index_.githubrepository.html
[9]: http://www.newmediacampaigns.com/blog/a-beautiful-jquery-github-widget
[10]: https://tech-query.me/GitHub-Web-Widget/classes/_issue_.githubissue.html
[11]: https://tech-query.me/GitHub-Web-Widget/classes/_eventflow_.githubevents.html
[12]: https://github.com/TechQuery/GitHub-Web-Widget/blob/master/test/index.html
[13]: https://github.com/TechQuery/GitHub-Web-Widget/blob/master/test/index.tsx

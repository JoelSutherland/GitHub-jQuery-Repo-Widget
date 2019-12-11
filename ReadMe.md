# GitHub Web Widget

[Web Components][1] library for GitHub based on [WebCell][2]

[![NPM Dependency](https://david-dm.org/TechQuery/GitHub-Web-Widget.svg)][3]
[![](https://data.jsdelivr.com/v1/package/npm/github-web-widget/badge?style=rounded)][4]

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
npm install web-cell@next github-web-widget \
    bootstrap github-markdown-css highlight.js \
    @webcomponents/webcomponentsjs marked koajax
```

[`source/index.html`][12]

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Your Blog</title>
        <link
            rel="stylesheet"
            href="../node_modules/bootstrap/dist/css/bootstrap.min.css"
        />
        <link
            rel="stylesheet"
            href="../node_modules/github-markdown-css/github-markdown.css"
        />
        <link
            rel="stylesheet"
            href="../node_modules/highlight.js/styles/atom-one-light.css"
        />
        <script src="../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
        <script src="../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
    </head>
    <body>
        <script src="index.tsx"></script>
    </body>
</html>
```

[`source/index.tsx`][13]

```javascript
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
[4]: https://www.jsdelivr.com/package/npm/github-web-widget
[5]: https://nodei.co/npm/github-web-widget/
[6]: https://tech-query.me/GitHub-Web-Widget/classes/_commandline_.commandline.html
[7]: https://tech-query.me/GitHub-Web-Widget/classes/_profile_index_.githubprofile.html
[8]: https://tech-query.me/GitHub-Web-Widget/classes/_repository_index_.githubrepository.html
[9]: http://www.newmediacampaigns.com/blog/a-beautiful-jquery-github-widget
[10]: https://tech-query.me/GitHub-Web-Widget/classes/_issue_.githubissue.html
[11]: https://tech-query.me/GitHub-Web-Widget/classes/_eventflow_.githubevents.html
[12]: https://github.com/TechQuery/GitHub-Web-Widget/blob/master/test/index.html
[13]: https://github.com/TechQuery/GitHub-Web-Widget/blob/master/test/index.tsx

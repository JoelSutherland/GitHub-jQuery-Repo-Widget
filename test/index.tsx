import { render, createCell } from 'web-cell';

import CommandLine from '../source/CommandLine';

render(
    <main className="container">
        <h1>GitHub Web Widget</h1>

        <section>
            <h2>Command Line</h2>
            <CommandLine>npm install github-web-widget</CommandLine>
        </section>
    </main>
);

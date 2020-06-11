import { WebCellProps, component, mixin, createCell } from 'web-cell';

@component({
    tagName: 'command-line',
    renderTarget: 'children'
})
export class CommandLine extends mixin<
    WebCellProps,
    { active?: boolean; shownIndex?: number }
>() {
    state = {
        active: false,
        shownIndex: 0
    };

    get text() {
        return this.defaultSlot.join('').trim();
    }

    connectedCallback() {
        super.connectedCallback();

        const timer = setInterval(async () => {
            const { text } = this;

            if (!text) return;

            let { shownIndex } = this.state;

            await this.setState({ shownIndex: ++shownIndex });

            if (shownIndex >= text.length) clearInterval(timer);
        }, 100);
    }

    autoCopy = () => {
        const target = this.querySelector('kbd')!;

        self.getSelection().getRangeAt(0).selectNode(target);

        document.execCommand('copy');
    };

    render() {
        const { autoCopy, text } = this,
            { shownIndex, active } = this.state;

        return (
            <div
                className="rounded p-3 bg-dark text-white"
                tabIndex={-1}
                onClick={autoCopy}
                onFocus={() => this.setState({ active: true })}
                onBlur={() => this.setState({ active: false })}
            >
                <span style={{ userSelect: 'none' }}>$</span>

                <kbd className="bg-dark">{text.slice(0, shownIndex)}</kbd>

                <small
                    className="badge badge-success"
                    style={{
                        opacity: active ? '1' : '0',
                        transition: '0.25s'
                    }}
                >
                    Copied !
                </small>
            </div>
        );
    }
}

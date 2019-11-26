import { component, mixin, watch, createCell } from 'web-cell';

@component({
    tagName: 'command-line',
    renderTarget: 'children'
})
export default class CommandLine extends mixin() {
    @watch
    active = false;

    @watch
    shownIndex = 0;

    get text() {
        return this.defaultSlot.join('').trim();
    }

    connectedCallback() {
        super.connectedCallback();

        const timer = setInterval(() => {
            if (this.text && ++this.shownIndex >= this.text.length)
                clearInterval(timer);
        }, 100);
    }

    autoCopy = () => {
        const target = this.querySelector('kbd')!;

        self.getSelection()
            .getRangeAt(0)
            .selectNode(target);

        document.execCommand('copy');
    };

    render() {
        const { autoCopy, text, shownIndex, active } = this;

        return (
            <div
                className="rounded p-3 bg-dark text-white"
                tabIndex={-1}
                onClick={autoCopy}
                onFocus={() => (this.active = true)}
                onBlur={() => (this.active = false)}
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

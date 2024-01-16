import { observable } from 'mobx';
import { WebCellProps, attribute, component, observer } from 'web-cell';

@component({
    tagName: 'command-line'
})
@observer
export class CommandLine extends HTMLElement {
    declare props: WebCellProps;

    @attribute
    @observable
    accessor active = false;

    @attribute
    @observable
    accessor shownIndex = 0;

    get text() {
        return this.children.join('').trim();
    }

    connectedCallback() {
        this.classList.add(
            'd-block',
            'rounded',
            'p-3',
            'bg-dark',
            'text-white'
        );
        this.tabIndex = -1;
        this.addEventListener('click', this.autoCopy);
        this.addEventListener('focus', () => (this.active = true));
        this.addEventListener('blur', () => (this.active = false));

        this.boot();
    }

    private timer: number;

    protected boot() {
        this.timer = self.setInterval(async () => {
            const { text } = this;

            if (!text) return;

            let { shownIndex } = this;

            this.shownIndex++;

            if (shownIndex >= text.length) self.clearInterval(this.timer);
        }, 100);
    }

    disconnectedCallback() {
        self.clearInterval(this.timer);
    }

    autoCopy = () => {
        const target = this.querySelector('kbd')!;

        self.getSelection().getRangeAt(0).selectNode(target);

        document.execCommand('copy');
    };

    render() {
        const { text } = this,
            { shownIndex, active } = this;

        return (
            <>
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
            </>
        );
    }
}

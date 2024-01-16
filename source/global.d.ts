interface SymbolConstructor {
    readonly observable: unique symbol;
}

declare module '*.less' {
    const content: any;

    export default content;
}

declare module '*.png' {
    const content: string;

    export default content;
}

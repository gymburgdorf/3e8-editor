export type TMode = "javascript" | "python" | "html";
export interface IEditorState {
    element: HTMLElement;
    mode: TMode;
    theme: "light" | "dark" | string;
    fontSize: number;
    code: string;
    readOnly: boolean;
    disableSelect: boolean;
    showLineNumbers: boolean;
    minLines: number;
    maxLines: number;
    showGutter: boolean;
    showInvisibles: boolean;
}
export interface IEditor {
    readonly editorState: IEditorState;
}
export declare class Editor implements IEditor {
    readonly editorState: IEditorState;
    private monacoEditor;
    private decorations;
    private cursors;
    constructor(config: Partial<IEditorState>, monacoBinding: typeof monaco.editor);
    static create(config: Partial<IEditorState>): Promise<Editor>;
    updateHeight(): void;
    resize(): void;
    setValue(code: string): void | undefined;
    getValue(): string | undefined;
    undo(): void;
    redo(): void;
    sizeup(): void;
    sizedown(): void;
    setFontSize(val: number): void;
    updateDecorations(): void;
    renderCursors(): {
        range: monaco.Range;
        options: {
            isWholeLine: boolean;
            inlineClassName: string;
            hoverMessage: {
                value: string;
                isTrusted: boolean;
            };
            stickiness: monaco.editor.TrackedRangeStickiness;
        };
    }[];
    addRemoteCursor(id: string, l: number, c: number): void;
    removeRemoteCursor(id: string): void;
}

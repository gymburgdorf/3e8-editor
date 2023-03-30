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
    addRemoteCursor(id: string, l: number, c: number): void;
}
/***
this._beautify =  ace.require("ace/ext/beautify");
// @check: window.beautifyOptions = this._beautify.options;


beautify() {
    this._beautify.beautify(this.editor.session);
}

 const langTools = ace.require("ace/ext/language_tools");
console.log(langTools);
         enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false
**/

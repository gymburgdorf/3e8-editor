import { loadMonaco } from "./loadMonaco";

let monacoEditorPromise = loadMonaco()

const templateCode = `function x() {
    let a = 1
    let b = 2
    return a + b
}`

export class Editor {
    static async create(element: HTMLElement) {
        let monacoEditor = await monacoEditorPromise
        const editor = monacoEditor.create(element, {
            value: templateCode,
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true
        });
        // set the editor height based on the number of lines
        var lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
        var lineCount = editor.getModel()!.getLineCount();
        var height = lineHeight * lineCount;
        editor.getDomNode()!.style.height = height + 10 + 'px';
        return editor
    }
}
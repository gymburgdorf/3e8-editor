function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script);
    });
}

document.head.insertAdjacentHTML("beforeend", `
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/editor/editor.main.min.css">
`);

export async function initMonaco(element) {
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/loader.min.js")
    //@ts-ignore
    const require = window.require
    // require is provided by loader.min.js.
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' } });
    require(["vs/editor/editor.main"], () => {
        const editor = monaco.editor.create(element, {
            value: `function x() {
          console.log("Hello world!!!");
      }`,
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true
        });
        // set the editor height based on the number of lines
        var lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
        var lineCount = editor.getModel().getLineCount();
        var height = lineHeight * lineCount;
        editor.getDomNode().style.height = height + 10 + 'px';
    });
}

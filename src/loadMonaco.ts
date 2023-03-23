function loadScript(url: string) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script);
    });
}

const PATHTOCDNVERSION = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs"

document.head.insertAdjacentHTML("beforeend", `
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="${PATHTOCDNVERSION}/editor/editor.main.min.css">
`);

export async function loadMonaco(): Promise<typeof monaco.editor> {
    await loadScript(`${PATHTOCDNVERSION}/loader.min.js`)
    //@ts-ignore
    const require = window.require
    // require is provided by loader.min.js.
    require.config({ paths: { 'vs': PATHTOCDNVERSION } });
    return new Promise(resolve=>{
        require(["vs/editor/editor.main"], () => {resolve(monaco.editor)})
    })
}

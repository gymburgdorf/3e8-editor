function c(t) {
  return new Promise((o, n) => {
    const e = document.createElement("script");
    e.src = t, e.onload = o, e.onerror = n, document.head.appendChild(e);
  });
}
document.head.insertAdjacentHTML("beforeend", `
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/editor/editor.main.min.css">
`);
async function d(t) {
  await c("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/loader.min.js");
  const o = window.require;
  return o.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs" } }), new Promise((n) => {
    o(["vs/editor/editor.main"], () => {
      const e = monaco.editor.create(t, {
        value: `function x() {
                console.log("Hello world!!!");
            }`,
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: !0
      });
      var i = e.getOption(monaco.editor.EditorOption.lineHeight), r = e.getModel().getLineCount(), a = i * r;
      e.getDomNode().style.height = a + 10 + "px", n(e);
    });
  });
}
export {
  d as initMonaco
};

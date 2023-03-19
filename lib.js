function r(n) {
  return new Promise((t, o) => {
    const e = document.createElement("script");
    e.src = n, e.onload = t, e.onerror = o, document.head.appendChild(e);
  });
}
document.head.insertAdjacentHTML("beforeend", `
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/editor/editor.main.min.css">
`);
async function c(n) {
  await r("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/loader.min.js");
  const t = window.require;
  t.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs" } }), t(["vs/editor/editor.main"], () => {
    const o = monaco.editor.create(n, {
      value: `function x() {
          console.log("Hello world!!!");
      }`,
      language: "javascript",
      theme: "vs-dark",
      automaticLayout: !0
    });
    var e = o.getOption(monaco.editor.EditorOption.lineHeight), i = o.getModel().getLineCount(), a = e * i;
    o.getDomNode().style.height = a + 10 + "px";
  });
}
export {
  c as initMonaco
};

function d(t) {
  return new Promise((o, i) => {
    const e = document.createElement("script");
    e.src = t, e.onload = o, e.onerror = i, document.head.appendChild(e);
  });
}
const n = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs";
document.head.insertAdjacentHTML("beforeend", `
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="${n}/editor/editor.main.min.css">
`);
async function s() {
  await d(`${n}/loader.min.js`);
  const t = window.require;
  return t.config({ paths: { vs: n } }), new Promise((o) => {
    t(["vs/editor/editor.main"], () => {
      o(monaco.editor);
    });
  });
}
let m = s();
class l {
  static async create(o) {
    const e = (await m).create(o, {
      value: "function x() {return 2}",
      language: "javascript",
      theme: "vs-dark",
      automaticLayout: !0
    });
    var r = e.getOption(monaco.editor.EditorOption.lineHeight), a = e.getModel().getLineCount(), c = r * a;
    return e.getDomNode().style.height = c + 10 + "px", e;
  }
}
export {
  l as Editor
};

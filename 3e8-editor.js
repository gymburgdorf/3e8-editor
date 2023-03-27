var u = Object.defineProperty;
var p = (o, e, t) => e in o ? u(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var i = (o, e, t) => (p(o, typeof e != "symbol" ? e + "" : e, t), t);
function g(o) {
  return new Promise((e, t) => {
    const n = document.createElement("script");
    n.src = o, n.onload = e, n.onerror = t, document.head.appendChild(n);
  });
}
const r = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs";
document.head.insertAdjacentHTML("beforeend", `
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="${r}/editor/editor.main.min.css">
`);
async function y() {
  await g(`${r}/loader.min.js`);
  const o = window.require;
  return o.config({ paths: { vs: r } }), new Promise((e) => {
    o(["vs/editor/editor.main"], () => {
      e(monaco.editor);
    });
  });
}
let f = y();
const v = `function x() {
    let a = 1
    let b = 2
    return a + b
}`;
class a {
  constructor(e, t) {
    i(this, "editorState");
    // private readonly mode: "python" | "javascript" | undefined;
    // private _maxLines: number | undefined;
    // private readonly editor: AceAjax.Editor;
    // private _beautify: any;
    i(this, "pythonCodeCheckWorker");
    i(this, "pythonCodeCheckWorkerBusy");
    i(this, "parserTimeout");
    i(this, "monacoEditor");
    this.editorState = Object.assign({
      element: document.getElementById("editor") || document.createElement("div"),
      mode: "python",
      theme: "dark",
      fontSize: 18,
      code: "",
      readOnly: !1,
      disableSelect: !1,
      showLineNumbers: !["html", "css", "svg"].includes(e.mode || ""),
      minLines: 4,
      showInvisibles: e.mode === "python",
      maxLines: 20,
      showGutter: !0
    }, e);
    const { code: n, element: s, minLines: w, maxLines: b, theme: E, mode: C, showGutter: d, showLineNumbers: c, readOnly: L, fontSize: S, showInvisibles: k } = this.editorState;
    this.monacoEditor = t.create(s, {
      value: v,
      language: "javascript",
      theme: "vs-dark",
      automaticLayout: !0,
      ...(!d || !c) && {
        lineNumbers: "off",
        glyphMargin: !1,
        folding: !1,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 0
      },
      renderLineHighlight: "none"
    });
    var m = this.monacoEditor.getOption(monaco.editor.EditorOption.lineHeight), l = this.monacoEditor.getModel().getLineCount(), h = m * l;
    this.monacoEditor.getDomNode().style.height = h + 10 + "px";
  }
  static async create(e) {
    let t = await f;
    return new a(e, t);
  }
}
export {
  a as Editor
};

var u = Object.defineProperty;
var g = (o, e, t) => e in o ? u(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var n = (o, e, t) => (g(o, typeof e != "symbol" ? e + "" : e, t), t);
function S(o) {
  return new Promise((e, t) => {
    const i = document.createElement("script");
    i.src = o, i.onload = e, i.onerror = t, document.head.appendChild(i);
  });
}
const r = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs";
document.head.insertAdjacentHTML("beforeend", `
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="${r}/editor/editor.main.min.css">
`);
async function p() {
  await S(`${r}/loader.min.js`);
  const o = window.require;
  return o.config({ paths: { vs: r } }), new Promise((e) => {
    o(["vs/editor/editor.main"], () => {
      e(monaco.editor);
    });
  });
}
let w = p();
class s {
  constructor(e, t) {
    n(this, "editorState");
    // private readonly mode: "python" | "javascript" | undefined;
    // private _maxLines: number | undefined;
    // private readonly editor: AceAjax.Editor;
    // private _beautify: any;
    n(this, "pythonCodeCheckWorker");
    n(this, "pythonCodeCheckWorkerBusy");
    n(this, "parserTimeout");
    n(this, "monacoEditor");
    this.editorState = Object.assign(
      {
        element: null,
        mode: "python",
        theme: "dark",
        fontSize: 24,
        code: "",
        readOnly: !1,
        disableSelect: !1,
        showLineNumbers: !["html", "css", "svg"].includes(e.mode || ""),
        minLines: 4,
        showInvisibles: e.mode === "python",
        maxLines: 20,
        showGutter: !0
      },
      e
    );
    const {
      code: i,
      element: a = document.documentElement.appendChild(
        document.createElement("div")
      ),
      minLines: y,
      maxLines: f,
      theme: v,
      mode: d,
      showGutter: l,
      showLineNumbers: h,
      readOnly: c,
      fontSize: m,
      showInvisibles: z
    } = this.editorState;
    this.monacoEditor = t.create(a, {
      value: i || "//missing code :-)",
      language: d,
      theme: "vs-dark",
      readOnly: c,
      fontSize: m,
      ...(!l || !h) && {
        lineNumbers: "off",
        glyphMargin: !1,
        folding: !1,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 0
      },
      scrollbar: {
        useShadows: !0,
        verticalHasArrows: !0,
        horizontalHasArrows: !0,
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
        arrowSize: 12
      },
      renderLineHighlight: "none",
      scrollBeyondLastLine: !1,
      //wordWrap: 'on',
      wrappingStrategy: "advanced",
      minimap: {
        enabled: !1
      },
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: !0,
      overviewRulerBorder: !1,
      lineNumbersMinChars: 3
    }), this.monacoEditor.onDidContentSizeChange(() => this.updateHeight), this.updateHeight();
  }
  static async create(e) {
    let t = await w;
    return new s(e, t);
  }
  updateHeight() {
    const e = Math.min(500, this.monacoEditor.getContentHeight());
    this.editorState.element.style.height = `${e}px`, this.monacoEditor.layout({
      width: this.editorState.element.getBoundingClientRect().width,
      height: e
    });
  }
  resize() {
    return this.updateHeight();
  }
  setValue(e) {
    var t;
    return (t = this.monacoEditor.getModel()) == null ? void 0 : t.setValue(e);
  }
  getValue() {
    var e;
    return (e = this.monacoEditor.getModel()) == null ? void 0 : e.getValue();
  }
  undo() {
    return this.monacoEditor.trigger("myedits", "redo", "myedits");
  }
  redo() {
    return this.monacoEditor.trigger("myedits", "undo", "myedits");
  }
  // getAnnotations() {
  //   return this.aceEditor.getSession().getAnnotations();
  // }
  sizeup() {
    this.setFontSize(this.editorState.fontSize + 1);
  }
  sizedown() {
    this.setFontSize(this.editorState.fontSize - 1);
  }
  setFontSize(e) {
    return this.editorState.fontSize = e, this.monacoEditor.updateOptions({ fontSize: e });
  }
}
export {
  s as Editor
};

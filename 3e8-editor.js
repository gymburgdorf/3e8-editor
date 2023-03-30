var S = Object.defineProperty;
var p = (i, e, t) => e in i ? S(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var n = (i, e, t) => (p(i, typeof e != "symbol" ? e + "" : e, t), t);
function w(i) {
  return new Promise((e, t) => {
    const o = document.createElement("script");
    o.src = i, o.onload = e, o.onerror = t, document.head.appendChild(o);
  });
}
const r = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs";
document.head.insertAdjacentHTML("beforeend", `
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="${r}/editor/editor.main.min.css">
`);
async function f() {
  await w(`${r}/loader.min.js`);
  const i = window.require;
  return i.config({ paths: { vs: r } }), new Promise((e) => {
    i(["vs/editor/editor.main"], () => {
      e(monaco.editor);
    });
  });
}
let v = f();
class a {
  constructor(e, t) {
    n(this, "editorState");
    // private _maxLines: number | undefined;
    // private pythonCodeCheckWorker?: Worker;
    // private pythonCodeCheckWorkerBusy?: boolean;
    // private parserTimeout?: number;
    n(this, "monacoEditor");
    n(this, "decorations");
    var s;
    this.editorState = Object.assign(
      {
        element: null,
        mode: "javascript",
        theme: "dark",
        fontSize: 24,
        code: ((s = e.element) == null ? void 0 : s.textContent) || "",
        readOnly: !1,
        disableSelect: !1,
        showLineNumbers: !["css", "svg"].includes(e.mode || ""),
        minLines: 4,
        showInvisibles: e.mode === "python",
        maxLines: 20,
        showGutter: !0
      },
      e
    );
    const {
      element: o = document.documentElement.appendChild(
        document.createElement("div")
      ),
      code: d,
      minLines: y,
      maxLines: b,
      theme: z,
      mode: l,
      showGutter: c,
      showLineNumbers: h,
      readOnly: m,
      fontSize: u,
      showInvisibles: g
    } = this.editorState;
    this.editorState.element.innerHTML = "", this.monacoEditor = t.create(o, {
      value: d || "//missing code :-)",
      language: l,
      theme: "vs-dark",
      readOnly: m,
      fontSize: u,
      tabSize: 2,
      insertSpaces: !1,
      renderWhitespace: g ? "boundary" : "none",
      ...(!c || !h) && {
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
      wrappingStrategy: "advanced",
      minimap: {
        enabled: !1
      },
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: !0,
      overviewRulerBorder: !1,
      lineNumbersMinChars: 3
    }), this.decorations = [], this.monacoEditor.onDidContentSizeChange(() => this.updateHeight()), this.updateHeight();
  }
  static async create(e) {
    let t = await v;
    return new a(e, t);
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
  //collab functions
  addRemoteCursor(e, t, o) {
    this.editorState.element.style.setProperty("--name", `'${e}'`), this.decorations = this.monacoEditor.deltaDecorations(this.decorations, [
      {
        range: new monaco.Range(t, o, t, o + 1),
        options: {
          isWholeLine: !1,
          inlineClassName: "cursorDecoration",
          hoverMessage: {
            value: "This is the content of the bubble",
            isTrusted: !0
          },
          stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges
        }
      }
    ]);
  }
}
export {
  a as Editor
};

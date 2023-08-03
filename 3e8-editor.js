var f = Object.defineProperty;
var w = (i, e, t) => e in i ? f(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var s = (i, e, t) => (w(i, typeof e != "symbol" ? e + "" : e, t), t);
function v(i) {
  return new Promise((e, t) => {
    const o = document.createElement("script");
    o.src = i, o.onload = e, o.onerror = t, document.head.appendChild(o);
  });
}
const n = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs";
document.head.insertAdjacentHTML("beforeend", `
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="${n}/editor/editor.main.min.css">
`);
async function b() {
  await v(`${n}/loader.min.js`);
  const i = window.require;
  return i.config({ paths: { vs: n } }), new Promise((e) => {
    i(["vs/editor/editor.main"], () => {
      e(monaco.editor);
    });
  });
}
let y = b();
console.log("3e8-edi github v1.1.0");
class h {
  constructor(e, t) {
    s(this, "editorState");
    // private _maxLines: number | undefined;
    // private pythonCodeCheckWorker?: Worker;
    // private pythonCodeCheckWorkerBusy?: boolean;
    // private parserTimeout?: number;
    s(this, "monacoEditor");
    s(this, "decorations");
    s(this, "cursors");
    var d;
    this.editorState = Object.assign(
      {
        element: null,
        mode: "javascript",
        theme: "dark",
        fontSize: 24,
        code: ((d = e.element) == null ? void 0 : d.textContent) || "",
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
      code: r,
      minLines: a,
      maxLines: z,
      theme: E,
      mode: l,
      showGutter: u,
      showLineNumbers: m,
      readOnly: g,
      fontSize: p,
      showInvisibles: S
    } = this.editorState;
    this.editorState.element.innerHTML = "", this.monacoEditor = t.create(o, {
      value: r || "//missing code :-)",
      language: l,
      theme: "vs-dark",
      readOnly: g,
      fontSize: p,
      tabSize: 2,
      insertSpaces: !1,
      renderWhitespace: S ? "boundary" : "none",
      ...(!u || !m) && {
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
    }), this.decorations = [], this.cursors = [], this.monacoEditor.onDidContentSizeChange(() => this.updateHeight()), this.updateHeight(), window.addEventListener("resize", () => this.resize());
  }
  static async create(e) {
    let t = await y;
    return new h(e, t);
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
  updateDecorations() {
    this.decorations = this.monacoEditor.deltaDecorations(this.decorations, this.renderCursors());
  }
  renderCursors() {
    return this.cursors.map((e) => ({
      range: new monaco.Range(e.l, e.c, e.l, e.c + 1),
      options: {
        isWholeLine: !1,
        inlineClassName: `cursorDecoration cursor-${c(e.id)}`,
        hoverMessage: {
          value: "This is the content of the bubble",
          isTrusted: !0
        },
        stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges
      }
    }));
  }
  //collab functions
  addRemoteCursor(e, t, o) {
    const r = this.cursors.find((a) => a.id === e);
    r ? (r.l = t, r.c = o) : (this.cursors.push({ id: e, l: t, c: o }), document.head.insertAdjacentHTML("beforeend", `
				<style>.cursor-${c(e)}:before {content: "${e}";}</style>
			`)), this.updateDecorations();
  }
  removeRemoteCursor(e) {
    this.cursors = this.cursors.filter((t) => t.id !== e), this.updateDecorations();
  }
}
function c(i) {
  return [...i].map((e) => e.charCodeAt(0).toString(16).padStart(2, "0")).join("");
}
export {
  h as Editor
};

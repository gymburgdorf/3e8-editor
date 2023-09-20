var f = Object.defineProperty;
var w = (o, e, t) => e in o ? f(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var n = (o, e, t) => (w(o, typeof e != "symbol" ? e + "" : e, t), t);
function v(o) {
  return new Promise((e, t) => {
    const i = document.createElement("script");
    i.src = o, i.onload = e, i.onerror = t, document.head.appendChild(i);
  });
}
const s = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs";
document.head.insertAdjacentHTML("beforeend", `
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="${s}/editor/editor.main.min.css">
`);
async function b() {
  await v(`${s}/loader.min.js`);
  const o = window.require;
  return o.config({ paths: { vs: s } }), new Promise((e) => {
    o(["vs/editor/editor.main"], () => {
      e(monaco.editor);
    });
  });
}
let y = b();
console.log("3e8-edi github v1.1.0");
class l {
  constructor(e, t) {
    n(this, "editorState");
    // private _maxLines: number | undefined;
    // private pythonCodeCheckWorker?: Worker;
    // private pythonCodeCheckWorkerBusy?: boolean;
    // private parserTimeout?: number;
    n(this, "monacoEditor");
    n(this, "decorations");
    n(this, "cursors");
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
      element: i = document.documentElement.appendChild(
        document.createElement("div")
      ),
      code: r,
      minLines: a,
      maxLines: z,
      theme: E,
      mode: h,
      showGutter: u,
      showLineNumbers: m,
      readOnly: g,
      fontSize: p,
      showInvisibles: S
    } = this.editorState;
    this.editorState.element.innerHTML = "", this.monacoEditor = t.create(i, {
      value: r || "//missing code :-)",
      language: h,
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
    }), this.decorations = this.monacoEditor.createDecorationsCollection(), this.cursors = [], this.monacoEditor.onDidContentSizeChange(() => this.updateHeight()), this.updateHeight(), window.addEventListener("resize", () => this.resize());
  }
  static async create(e) {
    let t = await y;
    return new l(e, t);
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
    this.decorations.clear(), this.decorations = this.monacoEditor.createDecorationsCollection(this.renderCursors());
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
  addRemoteCursor(e, t, i) {
    const r = this.cursors.find((a) => a.id === e);
    r ? (r.l = t, r.c = i) : (this.cursors.push({ id: e, l: t, c: i }), document.head.insertAdjacentHTML("beforeend", `
				<style>.cursor-${c(e)}:before {content: "${e}";}</style>
			`)), this.updateDecorations();
  }
  removeRemoteCursor(e) {
    this.cursors = this.cursors.filter((t) => t.id !== e), this.updateDecorations();
  }
}
function c(o) {
  return [...o].map((e) => e.charCodeAt(0).toString(16).padStart(2, "0")).join("");
}
export {
  l as Editor
};

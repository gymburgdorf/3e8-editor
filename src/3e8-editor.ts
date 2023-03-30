import { loadMonaco } from "./loadMonaco";

let monacoEditorPromise = loadMonaco();

export type TMode = "javascript" | "python" | "html";

export interface IEditorState {
	element: HTMLElement;
	mode: TMode;
	theme: "light" | "dark" | string;
	fontSize: number;
	code: string;
	readOnly: boolean;
	disableSelect: boolean;
	showLineNumbers: boolean;
	minLines: number;
	maxLines: number;
	showGutter: boolean;
	showInvisibles: boolean;
}

export interface IEditor {
	readonly editorState: IEditorState;
}

export class Editor implements IEditor {
	readonly editorState: IEditorState;
	// private _maxLines: number | undefined;
	// private pythonCodeCheckWorker?: Worker;
	// private pythonCodeCheckWorkerBusy?: boolean;
	// private parserTimeout?: number;
	private monacoEditor: monaco.editor.IStandaloneCodeEditor;
	private decorations: string[]

	constructor(
		config: Partial<IEditorState>,
		monacoBinding: typeof monaco.editor
	) {
		this.editorState = Object.assign(
			{
				element: null,
				mode: "javascript",
				theme: "dark",
				fontSize: 24,
				code: config.element?.textContent || "",
				readOnly: false,
				disableSelect: false,
				showLineNumbers: !["css", "svg"].includes(config.mode || ""),
				minLines: 4,
				showInvisibles: config.mode === "python",
				maxLines: 20,
				showGutter: true,
			},
			config
		);

		const {
			element = document.documentElement.appendChild(
				document.createElement("div")
			),
			code,
			minLines,
			maxLines,
			theme,
			mode,
			showGutter,
			showLineNumbers,
			readOnly,
			fontSize,
			showInvisibles,
		} = this.editorState;
		this.editorState.element.innerHTML = ""
		this.monacoEditor = monacoBinding.create(element, {
			value: code || "//missing code :-)",
			language: mode,
			theme: "vs-dark",
			readOnly,
			fontSize,
			tabSize: 2,
			insertSpaces: false,
			renderWhitespace: showInvisibles ? "boundary" : "none",
			...((!showGutter || !showLineNumbers) && {
				lineNumbers: "off",
				glyphMargin: false,
				folding: false,
				lineDecorationsWidth: 0,
				lineNumbersMinChars: 0,
			}),
			scrollbar: {
				useShadows: true,
				verticalHasArrows: true,
				horizontalHasArrows: true,
				verticalScrollbarSize: 8,
				horizontalScrollbarSize: 8,
				arrowSize: 12,
			},
			renderLineHighlight: "none",
			scrollBeyondLastLine: false,
			wrappingStrategy: "advanced",
			minimap: {
				enabled: false,
			},
			overviewRulerLanes: 0,
			hideCursorInOverviewRuler: true,
			overviewRulerBorder: false,
			lineNumbersMinChars: 3,
		});
		this.decorations = []
		//const todoOptions = {maxLines,minLines};
		this.monacoEditor.onDidContentSizeChange(() => this.updateHeight());
		this.updateHeight();
		// this.setRules();
		// if(mode === "python") {
		//   this.addPythonCodeCheckWorker()
		// }
		// if(this.editorState.disableSelect) {
		//   editor.getSession().selection.on('changeSelection', function () {
		//     editor.getSession().selection.clearSelection();
		//   });
		// }
		//save
		// editor.commands.addCommand({
		//   name: 'save',
		//   bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
		//   exec: function() {
		//     element.dispatchEvent(new CustomEvent("my-save", { bubbles: true, "detail": ""}));
		//   }
		// })
	}

	static async create(config: Partial<IEditorState>) {
		let monacoEditor = await monacoEditorPromise;
		const eddy = new Editor(config, monacoEditor);
		return eddy;
	}

	updateHeight() {
		const contentHeight = Math.min(500, this.monacoEditor.getContentHeight());
		this.editorState.element.style.height = `${contentHeight}px`;
		this.monacoEditor.layout({
			width: this.editorState.element.getBoundingClientRect().width,
			height: contentHeight,
		});
	}

	resize() {
		return this.updateHeight()
	}

	setValue(code: string) {
		return this.monacoEditor.getModel()?.setValue(code);
	}

	getValue() {
		return this.monacoEditor.getModel()?.getValue();
	}

	undo() {
		return this.monacoEditor.trigger("myedits", "redo", "myedits");
	}

	redo() {
		// disable redo: https://xy2401.com/local-web-util/lib/monaco-editor-samples/browser-undo-redo-controls/
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

	setFontSize(val: number) {
		this.editorState.fontSize = val;
		return this.monacoEditor.updateOptions({ fontSize: val });
	}

	//collab functions
	addRemoteCursor(id: string, l: number, c: number) {
		this.editorState.element.style.setProperty("--name", id)
		this.decorations = this.monacoEditor.deltaDecorations(this.decorations, [
			{
				range: new monaco.Range(l, c, l, c+1),
				options: {
					isWholeLine: false,
					inlineClassName: 'cursorDecoration',
					hoverMessage: {
						value: 'This is the content of the bubble',
						isTrusted: true
					},
					stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges
				}
			}
		]);
	}
}

//// @ ts-ignore
////import TJPWorker from "./external/tigerjython-parser-worker.js?worker"
//import {tjpWorkerString} from "./inlinedTJP.js"

// export class Editor implements IEditor {

//   addPythonCodeCheckWorker() {
//     let lastErrors = ""
//     if (typeof(window.Worker) !== "undefined" && tjpWorkerString) {
//       if(!this.pythonCodeCheckWorker) {
//         var blob = new Blob([tjpWorkerString]);
//         this.pythonCodeCheckWorker = new Worker(window.URL.createObjectURL(blob)) as Worker
//       }
//       this.pythonCodeCheckWorker.onmessage = (event) => {
//         this.pythonCodeCheckWorkerBusy = false
//         let errs = event.data
//         const errorString = errs.map((e: { text: any; })=>e.text).join("-")
//         if(errorString != lastErrors) {
//           lastErrors = errorString
//           this.aceEditor.getSession().setAnnotations(errs);
//         }

//       };
//       const scheduleWorker = () => {
//         clearTimeout(this.parserTimeout)
//         this.parserTimeout = setTimeout(checkPython, 200)
//       }
//       const checkPython = () => {
//         if(this.pythonCodeCheckWorkerBusy) scheduleWorker()
//         const pycode = this.aceEditor.getSession().getValue()
//         this.pythonCodeCheckWorker?.postMessage(pycode)
//         this.pythonCodeCheckWorkerBusy = true
//       }

//       scheduleWorker()
//       // @ts-ignore
//       this.aceEditor.getSession().on("change", scheduleWorker)
//     }
//   }

//   setRules() {
//     // let regexesToIgnore = [
//     //   /doctype first\. Expected/, //html
//     //   /Unexpected End of file\. Expected/, //html
//     //   /'-' after '--' found in comment/, //html
//     //   /Unexpected character in comment found/, //html
//     //   /Missing ";" before statement/, //js await
//     //   /\*/, //** operator
//     // ];
//     // @ts-ignore

//     this.aceEditor.getSession().on('changeAnnotation', () => {
//       const rawAnnotations = this.getAnnotations() || []
//       const filtered = rawAnnotations.filter((a: { text: string; })=> !regexesToIgnore.some(r=>r.test(a.text)))
//       if(rawAnnotations.length > filtered.length) {
//         this.aceEditor.session.setAnnotations(filtered)
//       }
//     });
//     if(this.editorState.mode === "javascript") this.changeOptionsJS()
//   }

//   private changeOptionsJS() {
//     // @ts-ignore
//     const worker = this.aceEditor.session.$worker
//     if(worker) {
//       return worker.send('changeOptions', [{ asi: true }])
//     }
//     else {
//       return setTimeout(()=>this.changeOptionsJS(), 100)
//     }
//   }
// }

/***
this._beautify =  ace.require("ace/ext/beautify");
// @check: window.beautifyOptions = this._beautify.options;


beautify() {
	this._beautify.beautify(this.editor.session);
}

 const langTools = ace.require("ace/ext/language_tools");
console.log(langTools);
		 enableBasicAutocompletion: true,
		enableLiveAutocompletion: true,
		enableSnippets: false
**/

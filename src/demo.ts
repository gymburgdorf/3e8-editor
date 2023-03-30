//@ts-ignore
//import {initMonaco} from "./lib.ts"
//@ts-ignore
import {Editor} from "./3e8-editor"

//initMonaco(document.querySelector(".app")!)

const eddy = await Editor.create({
	element: document.querySelector(".js") as HTMLElement,
	code: `function x() {
	let a = 1
	let b = 2
	return a + b
	}`
})

const eddypy = await Editor.create({
	element: document.querySelector(".py") as HTMLElement,
	mode: "python",
	code: "" && `def x():
	🚑 = 1
	b = 2
	return a + b`
})

const eddyreadonly = await Editor.create({
	element: document.querySelector(".readonly") as HTMLElement,
	readOnly: true,
	code: `//readonly`
})

const eddynogutts = await Editor.create({
	element: document.querySelector(".nogutter") as HTMLElement,
	showGutter: false,
	code: `//no Gutter`
})

const eddyhtml = await Editor.create({
	element: document.querySelector(".html") as HTMLElement,
	mode: "html",
	code: `<h1>Hello</h1>
<span>ok</error>`
})

const contenteddy = await Editor.create({
	element: document.querySelector(".codefromcontent") as HTMLElement
})


console.log(eddy);

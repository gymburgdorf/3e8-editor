//@ts-ignore
//import {initMonaco} from "./lib.ts"
//@ts-ignore
import {Editor} from "./3e8-editor"

//initMonaco(document.querySelector(".app")!)

const eddy = await Editor.create({
    element: document.querySelector(".app") as HTMLElement,
    showGutter: false
})

console.log(eddy);

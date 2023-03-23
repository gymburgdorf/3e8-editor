//@ts-ignore
//import {initMonaco} from "./lib.ts"
//@ts-ignore
import {Editor} from "./Editor"

//initMonaco(document.querySelector(".app")!)

const eddy = await Editor.create(document.querySelector(".app")!)

console.log(eddy);

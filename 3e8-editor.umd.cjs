(function(t,o){typeof exports=="object"&&typeof module<"u"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(t=typeof globalThis<"u"?globalThis:t||self,o(t["3e8-editor"]={}))})(this,function(t){"use strict";function o(n){return new Promise((i,a)=>{const e=document.createElement("script");e.src=n,e.onload=i,e.onerror=a,document.head.appendChild(e)})}const r="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs";document.head.insertAdjacentHTML("beforeend",`
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="${r}/editor/editor.main.min.css">
`);async function d(){await o(`${r}/loader.min.js`);const n=window.require;return n.config({paths:{vs:r}}),new Promise(i=>{n(["vs/editor/editor.main"],()=>{i(monaco.editor)})})}let c=d();const s=`function x() {
    let a = 1
    let b = 2
    return a + b
}`;class l{static async create(i){const e=(await c).create(i,{value:s,language:"javascript",theme:"vs-dark",automaticLayout:!0});var u=e.getOption(monaco.editor.EditorOption.lineHeight),m=e.getModel().getLineCount(),f=u*m;return e.getDomNode().style.height=f+10+"px",e}}t.Editor=l,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});

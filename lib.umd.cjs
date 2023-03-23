(function(o,t){typeof exports=="object"&&typeof module<"u"?t(exports):typeof define=="function"&&define.amd?define(["exports"],t):(o=typeof globalThis<"u"?globalThis:o||self,t(o.lib={}))})(this,function(o){"use strict";function t(i){return new Promise((n,r)=>{const e=document.createElement("script");e.src=i,e.onload=n,e.onerror=r,document.head.appendChild(e)})}document.head.insertAdjacentHTML("beforeend",`
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/editor/editor.main.min.css">
`);async function a(i){await t("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/loader.min.js");const n=window.require;return n.config({paths:{vs:"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs"}}),new Promise(r=>{n(["vs/editor/editor.main"],()=>{const e=monaco.editor.create(i,{value:`function x() {
                console.log("Hello world!!!");
            }`,language:"javascript",theme:"vs-dark",automaticLayout:!0});var d=e.getOption(monaco.editor.EditorOption.lineHeight),s=e.getModel().getLineCount(),c=d*s;e.getDomNode().style.height=c+10+"px",r(e)})})}o.initMonaco=a,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});

(function(e,t){typeof exports=="object"&&typeof module<"u"?t(exports):typeof define=="function"&&define.amd?define(["exports"],t):(e=typeof globalThis<"u"?globalThis:e||self,t(e.lib={}))})(this,function(e){"use strict";function t(a){return new Promise((i,n)=>{const o=document.createElement("script");o.src=a,o.onload=i,o.onerror=n,document.head.appendChild(o)})}document.head.insertAdjacentHTML("beforeend",`
    <link rel="stylesheet"
    data-name="vs/editor/editor.main"
    href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/editor/editor.main.min.css">
`);async function d(a){await t("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/loader.min.js");const i=window.require;i.config({paths:{vs:"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs"}}),i(["vs/editor/editor.main"],()=>{const n=monaco.editor.create(a,{value:`function x() {
          console.log("Hello world!!!");
      }`,language:"javascript",theme:"vs-dark",automaticLayout:!0});var o=n.getOption(monaco.editor.EditorOption.lineHeight),r=n.getModel().getLineCount(),c=o*r;n.getDomNode().style.height=c+10+"px"})}e.initMonaco=d,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});

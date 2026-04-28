/**
 * Gemini Math Mobile Fixer (iOS Version)
 * Author: [Your Name]
 * License: MIT
 */

// 🌐 1. Internationalization (i18n) Logic
// Detect system language automatically
const deviceLang = Device.language(); 
const isChinese = deviceLang.startsWith("zh");

const i18n = {
  en: {
    errTitle: "No Input",
    errMsg: "Clipboard is empty. Please copy the LaTeX source in Gemini first.",
    resultTitle: "Parsed Result:"
  },
  zh: {
    errTitle: "无输入",
    errMsg: "剪贴板为空，请先在 Gemini 中复制公式源码。",
    resultTitle: "解析结果："
  }
};

const t = isChinese ? i18n.zh : i18n.en;

// 2. Main Logic
let text = Pasteboard.paste();

if (!text) {
  let alert = new Alert();
  alert.title = t.errTitle;
  alert.message = t.errMsg;
  alert.presentAlert();
  Script.complete();
} else {
  let formattedText = text.replace(/\n/g, "<br>");
  
  // Render using MathJax
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
      <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
      <style>
          body { font-family: -apple-system, sans-serif; font-size: 16px; padding: 20px; line-height: 1.6; color: #333; }
          h3 { color: #007AFF; border-bottom: 1px solid #eee; padding-bottom: 10px; }
      </style>
  </head>
  <body>
      <h3>${t.resultTitle}</h3>
      <div id="content">${formattedText}</div>
  </body>
  </html>
  `;

  let webView = new WebView();
  await webView.loadHTML(html);
  await webView.present(); 
  Script.complete();
}

// ⚙️ 基础配置 / Configuration
// 选择插件语言 / Select Plugin Language: "zh" (中文) or "en" (English)
const UI_LANG = "zh";

// 🌐 语言包 / Language Pack
const i18n = {
  "zh": {
    alertTitle: "出错了",
    alertMsg: "剪贴板是空的，请先在 Gemini 里复制带有公式的文本。",
    resultTitle: "解析结果："
  },
  "en": {
    alertTitle: "Error",
    alertMsg: "Clipboard is empty. Please copy text with formulas in Gemini first.",
    resultTitle: "Parsed Result:"
  }
};

const t = i18n[UI_LANG]; // 加载当前选择的语言文本

// 获取系统剪贴板里的文本
let text = Pasteboard.paste();

if (!text) {
  let alert = new Alert();
  alert.title = t.alertTitle;
  alert.message = t.alertMsg;
  alert.presentAlert();
  Script.complete();
} else {
  let formattedText = text.replace(/\n/g, "<br>");
  
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
      <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
      <style>
          body { font-family: sans-serif; font-size: 16px; padding: 20px; line-height: 1.6; color: #333; }
      </style>
  </head>
  <body>
      <h3 style="color: #007AFF;">${t.resultTitle}</h3>
      ${formattedText}
  </body>
  </html>
  `;

  let webView = new WebView();
  await webView.loadHTML(html);
  await webView.present(); 
  
  Script.complete(); 
}

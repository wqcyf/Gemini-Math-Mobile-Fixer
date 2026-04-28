/**
 * Gemini Math Mobile Fixer (iOS Version)
 * 修复版：增加智能识别与容错补全机制
 */

// 🌐 自动识别系统语言
const deviceLang = Device.language(); 
const isChinese = deviceLang.startsWith("zh");

const i18n = {
  en: {
    errTitle: "No Input",
    errMsg: "Clipboard is empty. Please copy the LaTeX source.",
    resultTitle: "Parsed Result:"
  },
  zh: {
    errTitle: "无输入",
    errMsg: "剪贴板为空，请先复制公式源码。",
    resultTitle: "解析结果："
  }
};

const t = isChinese ? i18n.zh : i18n.en;

let text = Pasteboard.paste();

if (!text) {
  let alert = new Alert();
  alert.title = t.errTitle;
  alert.message = t.errMsg;
  alert.presentAlert();
  Script.complete();
} else {
  
  // 💡 核心修复：智能补全机制
  // 如果文本里包含反斜杠 "\"（LaTeX的特征），但没有包裹 "$$"，我们就在后台自动帮它套上一层 "$$"
  if (!text.includes("$$") && !text.includes("\\[") && text.includes("\\")) {
      text = "$$\n" + text + "\n$$";
  }

  // 构建网页，添加了明确的 MathJax 配置，并使用 pre-wrap 保留原始换行
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script>
        // 强制配置引擎识别各种常见公式符号
        MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
            displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
          }
        };
      </script>
      <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
      <style>
          body { 
              font-family: -apple-system, sans-serif; 
              font-size: 16px; 
              padding: 20px; 
              line-height: 1.6; 
              color: #333; 
          }
          h3 { 
              color: #007AFF; 
              border-bottom: 1px solid #eee; 
              padding-bottom: 10px; 
          }
          /* 使用 CSS 原生属性保留换行，比字符串替换更稳定 */
          #content {
              white-space: pre-wrap; 
              word-break: break-all;
          }
      </style>
  </head>
  <body>
      <h3>${t.resultTitle}</h3>
      <div id="content">${text}</div>
  </body>
  </html>
  `;

  let webView = new WebView();
  await webView.loadHTML(html);
  await webView.present(); 
  Script.complete();
}

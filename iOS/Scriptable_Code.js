/**
 * Gemini Math Mobile Fixer (iOS Version) - Ultimate Edition
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

// 💡 修复1：极其稳妥的参数获取机制（优先从快捷指令取值，退而求其次读剪贴板）
let text = "";
if (args.shortcutParameter) {
  text = String(args.shortcutParameter);
} else if (args.plainTexts && args.plainTexts.length > 0) {
  text = String(args.plainTexts[0]);
} else {
  text = Pasteboard.paste();
}

if (!text) {
  // 💡 修复2：全方位的后台环境拦截，防止 Alert 导致 Siri 或快捷指令崩溃
  // config.runsInApp 为 true 说明是在 Scriptable App 里面点击播放键运行的
  if (!config.runsInApp) { 
    // 不在 App 内（如 Siri、搜索框、桌面点击快捷指令运行），改用静默系统通知
    let n = new Notification();
    n.title = t.errTitle;
    n.body = t.errMsg;
    n.schedule();
    Script.complete();
  } else {
    // 正常前台调试运行（App内），使用常规弹窗
    let alert = new Alert();
    alert.title = t.errTitle;
    alert.message = t.errMsg;
    alert.presentAlert();
    Script.complete();
  }
} else {
  
  // 💡 核心修复：智能补全机制
  if (!text.includes("$$") && !text.includes("\\[") && text.includes("\\")) {
      text = "$$\n" + text + "\n$$";
  }

  // 构建网页，添加明确的 MathJax 配置
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script>
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

  // 💡 修复3：如果是在后台运行，直接展示网页可能会卡住，加一层保护
  if (!config.runsInApp) {
      // 告诉系统这个脚本有 UI 需要展示
      Safari.openDataDictionary(html); // 使用 Safari 预览更稳定
  } else {
      let webView = new WebView();
      await webView.loadHTML(html);
      await webView.present(); 
  }
  
  Script.complete();
}

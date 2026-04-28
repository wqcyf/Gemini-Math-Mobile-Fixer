"ui";

/**
 * Gemini Math Mobile Fixer (Android Version)
 */

// 🌐 1. Language Configuration
var deviceLang = java.util.Locale.getDefault().getLanguage();
var UI_LANG = deviceLang.indexOf("zh") != -1 ? "zh" : "en";

var i18n = {
    zh: {
        permReq: "请开启悬浮窗和无障碍权限",
        started: "✅ 监听已开启，请打开 Gemini App",
        detecting: "检测到公式，正在解析...",
        winTitle: "自动解析 (点击整个框关闭)"
    },
    en: {
        permReq: "Please enable Overlay and Accessibility permissions",
        started: "✅ Listener active. Open Gemini App now.",
        detecting: "Formula detected, parsing...",
        winTitle: "Auto-Parsed (Click to Close)"
    }
};

var t = i18n[UI_LANG];

// 2. Permission Check
if (!floaty.checkPermission()) {
    toast(t.permReq);
    floaty.requestPermission();
    exit();
}
auto.waitFor();
toast(t.started);

var lastText = "";
var mathWin = null;

// 3. Background Loop
setInterval(function() {
    // 遍历屏幕上的所有文本节点
    var nodes = className("android.widget.TextView").find();
    var content = "";
    
    for (var i = 0; i < nodes.length; i++) {
        var txt = nodes[i].text();
        if (!txt) continue;
        
        // 💡 核心修复 1：更聪明的触发条件
        // 匹配包含 $$ 的文本，或者包含反斜杠 "\" 且带有常见数学特征（如 ^, _, { ）的文本
        if (txt.indexOf("$$") !== -1 || txt.indexOf("\\[") !== -1 || 
           (txt.indexOf("\\") !== -1 && (txt.indexOf("_") !== -1 || txt.indexOf("^") !== -1 || txt.indexOf("{") !== -1))) {
            content += txt + "\n\n";
        }
    }

    if (content !== "" && content !== lastText) {
        lastText = content;
        toast(t.detecting);
        showPop(content);
    }
}, 2000);

// 4. 显示与渲染逻辑
function showPop(raw) {
    if (mathWin) mathWin.close();
    mathWin = floaty.window(
        <vertical bg="#ffffff" padding="12">
            <text text="{{t.winTitle}}" textSize="12sp" textColor="#999999" gravity="center" />
            <webview id="web" w="{{Math.floor(device.width * 0.9)}}px" h="{{Math.floor(device.height * 0.5)}}px" />
        </vertical>
    );
    
    mathWin.setPosition(Math.floor(device.width * 0.05), Math.floor(device.height * 0.2));

    // 💡 核心修复 2：智能补全机制
    // 如果提取出来的文本没有包含公式环境包裹符，强制给它套上一层 "$$"
    if (raw.indexOf("$$") === -1 && raw.indexOf("\\[") === -1 && raw.indexOf("\\") !== -1) {
        raw = "$$\n" + raw + "\n$$";
    }

    // 组装带有 MathJax 配置的 HTML，并使用 pre-wrap 保证换行稳定
    var html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            // 强制配置引擎识别公式符号
            MathJax = {
                tex: {
                    inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                    displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
                }
            };
        </script>
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
        <style>
            body { 
                font-family: sans-serif; 
                font-size: 16px; 
                padding: 10px; 
                line-height: 1.6;
                color: #333;
            }
            #content {
                white-space: pre-wrap; 
                word-break: break-all;
            }
        </style>
    </head>
    <body>
        <div id="content">${raw}</div>
    </body>
    </html>`;

    mathWin.web.loadDataWithBaseURL(null, html, "text/html", "UTF-8", null);
    
    // 点击关闭
    mathWin.click(() => { 
        mathWin.close(); 
        mathWin = null; 
    });
}

// 保持脚本主线程运行
setInterval(() => {}, 1000);

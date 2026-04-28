"ui";

// ⚙️ 基础配置 / Configuration
// 选择插件语言 / Select Plugin Language: "zh" (中文) or "en" (English)
var UI_LANG = "zh";

// 🌐 语言包 / Language Pack
var i18n = {
    "zh": {
        reqPerm: "请先在系统设置中开启悬浮窗权限！",
        started: "✅ 自动监听已开启，请放心打开 Gemini App",
        detecting: "检测到公式源码，正在解析...",
        winTitle: "自动解析结果 (点击整个框关闭)"
    },
    "en": {
        reqPerm: "Please enable floating window permission in settings!",
        started: "✅ Auto-listener started. Ready for Gemini App.",
        detecting: "Formula detected, parsing...",
        winTitle: "Parsed Result (Click box to close)"
    }
};

var t = i18n[UI_LANG]; // 加载当前选择的语言文本

if (!floaty.checkPermission()) {
    toast(t.reqPerm);
    floaty.requestPermission();
    exit();
}
auto.waitFor(); 
toast(t.started);

var lastParsedText = ""; 
var mathWindow = null;   

setInterval(function() {
    var textNodes = textContains("$$").find();
    
    if (textNodes.length > 0) {
        var currentText = "";
        for (var i = 0; i < textNodes.length; i++) {
            currentText += textNodes[i].text() + "\n";
        }

        if (currentText !== "" && currentText !== lastParsedText) {
            lastParsedText = currentText; 
            toast(t.detecting);
            showMathWindow(currentText);  
        }
    }
}, 2000);

function showMathWindow(rawText) {
    if (mathWindow !== null) {
        mathWindow.close(); 
    }

    mathWindow = floaty.window(
        <vertical bg="#ffffff" padding="10">
            <text text="{{t.winTitle}}" textSize="14sp" textColor="#888888" gravity="center" />
            <webview id="web" w="{{Math.floor(device.width * 0.9)}}px" h="{{Math.floor(device.height * 0.5)}}px" />
        </vertical>
    );
    
    mathWindow.setPosition(
        Math.floor(device.width * 0.05), 
        Math.floor(device.height * 0.25)
    );

    var htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    </head>
    <body style="font-family: sans-serif; padding: 10px;">
        ${rawText.replace(/\n/g, "<br>")}
    </body>
    </html>
    `;

    mathWindow.web.loadDataWithBaseURL(null, htmlContent, "text/html", "UTF-8", null);

    mathWindow.click(() => {
        mathWindow.close();
        mathWindow = null;
    });
}

setInterval(() => {}, 1000);

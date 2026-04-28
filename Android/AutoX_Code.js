"ui";

/**
 * Gemini Math Mobile Fixer (Android Version)
 * Author: [Your Name]
 */

// 🌐 1. Language Configuration
var deviceLang = java.util.Locale.getDefault().getLanguage();
var UI_LANG = deviceLang.indexOf("zh") != -1 ? "zh" : "en";

var i18n = {
    zh: {
        permReq: "请开启悬浮窗和无障碍权限",
        started: "✅ 监听已开启，请打开 Gemini App",
        detecting: "检测到公式，正在解析...",
        winTitle: "自动解析 (点击关闭)"
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
    var nodes = textContains("$$").find();
    if (nodes.length > 0) {
        var content = "";
        nodes.forEach(n => { content += n.text() + "\n"; });

        if (content != "" && content != lastText) {
            lastText = content;
            toast(t.detecting);
            showPop(content);
        }
    }
}, 2000);

function showPop(raw) {
    if (mathWin) mathWin.close();
    mathWin = floaty.window(
        <vertical bg="#ffffff" padding="12">
            <text text="{{t.winTitle}}" textSize="12sp" textColor="#999999" gravity="center" />
            <webview id="web" w="{{Math.floor(device.width * 0.9)}}px" h="{{Math.floor(device.height * 0.5)}}px" />
        </vertical>
    );
    
    mathWin.setPosition(device.width * 0.05, device.height * 0.2);

    var html = `
    <html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    </head>
    <body style="font-size:16px; padding:10px;">${raw.replace(/\n/g, "<br>")}</body>
    </html>`;

    mathWin.web.loadDataWithBaseURL(null, html, "text/html", "UTF-8", null);
    mathWin.click(() => { mathWin.close(); mathWin = null; });
}

setInterval(() => {}, 1000);

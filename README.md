# Gemini Math Mobile Fixer 🪄

[English](#english) | [中文说明](#chinese)

---

<a name="english"></a>
## English Description

Solve the issue where the Gemini mobile app displays raw LaTeX source code (e.g., `$$...$$`) instead of rendered formulas. This project provides non-Root/non-Jailbreak automation solutions for both iOS and Android.

### 🍎 iOS Solution (Shortcuts + Scriptable)
1. **Setup**: Install the **Scriptable** app from the App Store.
2. **Script**: Create a new script in Scriptable named `GeminiMathFixer` and paste the code from `iOS/Scriptable_Code.js`.
3. **Shortcut**: Create a new Shortcut: 
   - Action 1: `Get Clipboard`
   - Action 2: `Run Scriptable Script` (Select `GeminiMathFixer`, pass Clipboard as parameter).
4. **Quick Trigger**: Go to `Settings` -> `Accessibility` -> `Touch` -> `Back Tap`. Set `Double Tap` to run your shortcut.
5. **Usage**: Copy the raw text in Gemini, then **Double Tap the back of your iPhone**.

### 🤖 Android Solution (AutoX.js)
1. **Setup**: Install [AutoX.js](https://github.com/kkevsekk1/AutoX).
2. **Script**: Import `Android/AutoX_Code.js` and run it.
3. **Permission**: Enable **Accessibility** and **Floating Window** permissions.
4. **Usage**: Just browse Gemini. The script will automatically pop up a window when a formula is detected.

---

<a name="chinese"></a>
## 中文说明

解决 Gemini 手机端 App 裸露输出 LaTeX 公式源码（如 `$$...$$`）的问题。提供双端免 Root/免越狱的自动化解决方案。

### 🍎 iOS 端方案 (快捷指令 + Scriptable)
1. **安装**：在 App Store 下载 **Scriptable** 软件。
2. **脚本**：新建名为 `GeminiMathFixer` 的脚本，粘贴 `iOS/Scriptable_Code.js` 中的代码。
3. **快捷指令**：新建指令，添加 `获取剪贴板` 和 `运行 Scriptable 脚本`（参数选择剪贴板）。
4. **快速触发**：在系统 `设置` -> `辅助功能` -> `触控` -> `轻点背面` 中，将 `轻点两下` 绑定为该指令。
5. **使用**：在 Gemini 复制文本后，**轻点手机背面两下**即可。

### 🤖 Android 端方案 (AutoX.js)
1. **安装**：安装 [AutoX.js](https://github.com/kkevsekk1/AutoX)。
2. **脚本**：运行本仓库中的 `Android/AutoX_Code.js`。
3. **权限**：开启 **无障碍服务** 与 **悬浮窗** 权限。
4. **使用**：在后台保持运行，浏览 Gemini 时遇到公式会自动弹出解析窗口。

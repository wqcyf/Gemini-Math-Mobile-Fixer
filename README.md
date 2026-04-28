# Gemini Math Mobile Fixer 🪄

[English](#english) | [中文说明](#chinese)

---

<a name="english"></a>
## English Description

Solve the issue where the Gemini mobile app displays raw LaTeX source code (e.g., `$$...$$`) instead of rendered formulas. This project provides non-Root/non-Jailbreak automation solutions for both iOS and Android.

### 🍎 iOS Solution (Shortcuts + Scriptable)
1. **Setup**: Install the **Scriptable** app from the App Store.
2. **Script**: Create a new script in Scriptable named `GeminiMathFixer` and paste the code from `iOS/Scriptable_Code.js`.
3. **Shortcut Config**: Create a new Shortcut and add the action: `Run Scriptable Script` (Select `GeminiMathFixer`). 
   * **⚠️ Crucial Fix**: Tap the arrow `>` on the action and enable **"Run In App"** or **"Show When Run"**. (This prevents iOS from blocking the UI in the background).
4. **Trigger Setup (Two Options)**: 
   * **Option A - Share Sheet (Highly Recommended)**: Tap `ⓘ` (Info) at the bottom of the Shortcut, and enable **"Show in Share Sheet"**.
   * **Option B - Back Tap**: Go to `Settings` -> `Accessibility` -> `Touch` -> `Back Tap`. Set `Double Tap` to run your shortcut.
5. **Usage**: Copy the raw LaTeX text in Gemini. Then either tap the **Share** button to run the shortcut, or **Double Tap** the back of your iPhone.

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
2. **脚本**：新建名为 `GeminiMathFixer` 的脚本，粘贴 `iOS/Scriptable_Code.js` 中的完整代码。
3. **快捷指令**：新建指令，添加操作 `运行 Scriptable 脚本`（选择 `GeminiMathFixer`）。
   * **⚠️ 避坑关键**：点击该操作模块的小箭头 `>` 展开选项，**务必开启“在 App 中运行”或“运行时显示”**（否则解析弹窗会被系统后台强制拦截）。
4. **触发配置 (二选一)**：
   * **方案 A - 共享菜单 (强烈推荐)**：点击底部 `ⓘ` (信息) 按钮，开启 **“在共享表单中显示”**。
   * **方案 B - 轻点背面**：在系统 `设置` -> `辅助功能` -> `触控` -> `轻点背面` 中，将 `轻点两下` 绑定为该指令。
5. **使用**：在 Gemini 复制公式源码后，通过系统自带的 **分享 (Share)** 按钮触发，或 **轻点手机背面两下** 即可秒出解析。

### 🤖 Android 端方案 (AutoX.js)
1. **安装**：安装 [AutoX.js](https://github.com/kkevsekk1/AutoX)。
2. **脚本**：运行本仓库中的 `Android/AutoX_Code.js`。
3. **权限**：开启 **无障碍服务** 与 **悬浮窗** 权限。
4. **使用**：在后台保持运行，浏览 Gemini 时遇到公式会自动弹出解析窗口。

/*CMD
  command: webapp.html
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0", "user-scalable=no">
    <title>Telegram Mini App Demo</title>
    <script src="https://telegram.org/js/telegram-web-app.js?59"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--tg-theme-bg-color, #fff);
            color: var(--tg-theme-text-color, #000);
            padding-bottom: 80px;
        }
        .header {
            position: sticky;
            top: 0;
            background: var(--tg-theme-bg-color, #fff);
            border-bottom: 2px solid var(--tg-theme-section-separator-color, #e0e0e0);
            padding: 16px;
            z-index: 101;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .header-logo {
            width: 40px;
            height: 40px;
            flex-shrink: 0;
        }
        .header-content {
            flex: 1;
        }
        .header-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--tg-theme-text-color, #000);
            margin-bottom: 2px;
        }
        .header-subtitle {
            font-size: 13px;
            color: var(--tg-theme-hint-color, #999);
        }
        .container { max-width: 800px; margin: 0 auto; padding: 16px; }
        .tabs {
            display: flex;
            overflow-x: auto;
            border-bottom: 2px solid var(--tg-theme-section-separator-color, #e0e0e0);
            position: sticky;
            top: 72px;
            background: var(--tg-theme-bg-color, #fff);
            z-index: 100;
            padding: 8px 0;
            gap: 4px;
        }
        .tabs::-webkit-scrollbar { height: 0; }
        .tab {
            padding: 10px 16px;
            cursor: pointer;
            white-space: nowrap;
            border: none;
            background: none;
            color: var(--tg-theme-hint-color, #999);
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
            border-radius: 8px;
            transition: all 0.2s;
        }
        .tab-icon {
            width: 18px;
            height: 18px;
            opacity: 0.6;
        }
        .tab.active {
            color: var(--tg-theme-link-color, #3390ec);
            background: var(--tg-theme-secondary-bg-color, #f0f0f0);
        }
        .tab.active .tab-icon {
            opacity: 1;
        }
        .section {
            margin: 16px 0;
            padding: 16px;
            background: var(--tg-theme-secondary-bg-color, #f0f0f0);
            border-radius: 12px;
        }
        .section-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--tg-theme-section-header-text-color, #000);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .section-icon {
            width: 20px;
            height: 20px;
        }
        .btn {
            padding: 12px 20px;
            margin: 4px;
            border: none;
            border-radius: 8px;
            background: var(--tg-theme-button-color, #3390ec);
            color: var(--tg-theme-button-text-color, #fff);
            font-size: 14px;
            cursor: pointer;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: opacity 0.2s;
        }
        .btn:active { opacity: 0.8; }
        .btn-secondary {
            background: var(--tg-theme-secondary-bg-color, #f0f0f0);
            color: var(--tg-theme-text-color, #000);
        }
        .btn-danger {
            background: var(--tg-theme-destructive-text-color, #ff3b30);
            color: #fff;
        }
        .btn-icon {
            width: 16px;
            height: 16px;
        }
        .input-group {
            margin: 8px 0;
        }
        .input-group label {
            display: block;
            margin-bottom: 4px;
            font-size: 13px;
            color: var(--tg-theme-hint-color, #999);
        }
        .input-group input, .input-group select, .input-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--tg-theme-section-separator-color, #e0e0e0);
            border-radius: 8px;
            background: var(--tg-theme-bg-color, #fff);
            color: var(--tg-theme-text-color, #000);
            font-size: 14px;
        }
        .log-container {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 12px;
            border-radius: 8px;
            max-height: 300px;
            overflow-y: auto;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            margin-top: 12px;
        }
        .log-entry {
            margin: 4px 0;
            padding: 4px;
            border-left: 3px solid #4ec9b0;
        }
        .log-entry.error { border-left-color: #f48771; }
        .log-entry.success { border-left-color: #89d185; }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 8px;
            margin: 8px 0;
        }
        .info-item {
            padding: 8px;
            background: var(--tg-theme-bg-color, #fff);
            border-radius: 6px;
            font-size: 12px;
        }
        .info-label {
            color: var(--tg-theme-hint-color, #999);
            font-weight: 500;
        }
        .info-value {
            color: var(--tg-theme-text-color, #000);
            word-break: break-all;
        }
        .status-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 6px;
        }
        .status-green { background: #4caf50; }
        .status-red { background: #f44336; }
        .btn-group {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 8px 0;
        }
    </style>
</head>
<body>
    <div id="app">
        <div class="header" style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
  <!-- Telegram Official-Style Logo -->
  <svg class="header-logo" width="48" height="48" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#37AEE2" />
        <stop offset="100%" stop-color="#1E96C8" />
      </linearGradient>
    </defs>
    <!-- Circle Background -->
    <circle cx="120" cy="120" r="120" fill="url(#tg-gradient)" />
    <!-- Paper Airplane Shape -->
    <path fill="#C8DAEA" d="M98 168c-3.5 0-2.9-1.3-4.1-4.5l-11.3-37.2L165 76.5" />
    <path fill="#A9C9DD" d="M98 168c2.7 0 3.9-1.2 5.4-2.7l14.3-13.9-17.8-10.8" />
    <path fill="#fff" d="M99.9 140.7l42.9 31.7c4.9 2.7 8.5 1.3 9.7-4.5l17.6-82.7c1.8-7.3-2.8-10.6-7.5-8.5L62.2 109c-7 2.8-6.9 6.6-1.3 8.3l31.6 9.9 73.2-46.1c3.5-2.1 6.7-1 4.1 1.3" />
  </svg>

  <div class="header-content" style="text-align:left;">
    <div class="header-title" style="font-size:20px;font-weight:700;">Telegram Mini App Demo</div>
    <div class="header-subtitle" style="font-size:14px;color:var(--tg-theme-hint-color,#666);">
      Comprehensive API Testing Tool
    </div>
  </div>
</div>

        <div class="container">
            <div class="tabs">
                <button v-for="tab in tabs" 
                        :key="tab.name" 
                        :class="['tab', {active: activeTab === tab.name}]"
                        @click="activeTab = tab.name">
                    <span class="tab-icon" v-html="tab.icon"></span>
                    <span>{{ tab.name }}</span>
                </button>
            </div>

            <!-- Overview Tab -->
            <div v-show="activeTab === 'Overview'">
                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        WebApp Info
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Version</div>
                            <div class="info-value">{{ webAppInfo.version }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Platform</div>
                            <div class="info-value">{{ webAppInfo.platform }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Color Scheme</div>
                            <div class="info-value">{{ webAppInfo.colorScheme }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Is Active</div>
                            <div class="info-value">
                                <span :class="['status-indicator', webAppInfo.isActive ? 'status-green' : 'status-red']"></span>
                                {{ webAppInfo.isActive }}
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Is Expanded</div>
                            <div class="info-value">
                                <span :class="['status-indicator', webAppInfo.isExpanded ? 'status-green' : 'status-red']"></span>
                                {{ webAppInfo.isExpanded }}
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Is Fullscreen</div>
                            <div class="info-value">
                                <span :class="['status-indicator', webAppInfo.isFullscreen ? 'status-green' : 'status-red']"></span>
                                {{ webAppInfo.isFullscreen }}
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Viewport Height</div>
                            <div class="info-value">{{ webAppInfo.viewportHeight }}px</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Stable Height</div>
                            <div class="info-value">{{ webAppInfo.viewportStableHeight }}px</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        User Info
                    </div>
                    <div class="info-grid">
                        <div class="info-item" v-for="(value, key) in userInfo" :key="key">
                            <div class="info-label">{{ key }}</div>
                            <div class="info-value">{{ value || 'N/A' }}</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14zM6 10h2v2H6zm0 4h8v2H6zm10-4h2v6h-2zm-6 0h2v2h-2z"/>
                        </svg>
                        Init Data
                    </div>
                    <textarea readonly :value="initData" style="width: 100%; height: 100px; font-size: 11px;"></textarea>
                </div>
            </div>

            <!-- Basic Methods Tab -->
            <div v-show="activeTab === 'Basic'">
                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h16v16H4V4m2 2v12h12V6H6z"/>
                        </svg>
                        Window Controls
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="expand">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                            </svg>
                            Expand
                        </button>
                        <button class="btn btn-danger" @click="close">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                            Close
                        </button>
                        <button class="btn" @click="requestFullscreen">Request Fullscreen</button>
                        <button class="btn" @click="exitFullscreen">Exit Fullscreen</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32z"/>
                        </svg>
                        Orientation
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="lockOrientation">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                            </svg>
                            Lock
                        </button>
                        <button class="btn" @click="unlockOrientation">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                            </svg>
                            Unlock
                        </button>
                    </div>
                    <div class="info-item" style="margin-top: 8px;">
                        <span :class="['status-indicator', webAppInfo.isOrientationLocked ? 'status-green' : 'status-red']"></span>
                        Locked: {{ webAppInfo.isOrientationLocked }}
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                        </svg>
                        Swipes & Confirmation
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="enableVerticalSwipes">Enable Swipes</button>
                        <button class="btn" @click="disableVerticalSwipes">Disable Swipes</button>
                        <button class="btn" @click="enableClosingConfirmation">Enable Close Confirm</button>
                        <button class="btn" @click="disableClosingConfirmation">Disable Close Confirm</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/>
                        </svg>
                        Colors
                    </div>
                    <div class="input-group">
                        <label>Header Color</label>
                        <input type="color" v-model="headerColor" @change="setHeaderColor">
                    </div>
                    <div class="input-group">
                        <label>Background Color</label>
                        <input type="color" v-model="backgroundColor" @change="setBackgroundColor">
                    </div>
                    <div class="input-group">
                        <label>Bottom Bar Color</label>
                        <input type="color" v-model="bottomBarColor" @change="setBottomBarColor">
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/>
                        </svg>
                        Keyboard
                    </div>
                    <div class="input-group">
                        <label>Test Input (tap to show keyboard)</label>
                        <input type="text" placeholder="Type something...">
                    </div>
                    <button class="btn" @click="hideKeyboard">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 3H4c-1.1 0-1.99.9-1.99 2L2 15c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 3h2v2h-2V6zm0 3h2v2h-2V9zM8 6h2v2H8V6zm0 3h2v2H8V9zm-1 2H5V9h2v2zm0-3H5V6h2v2zm9 7H8v-2h8v2zm0-4h-2V9h2v2zm0-3h-2V6h2v2zm3 3h-2V9h2v2zm0-3h-2V6h2v2z"/>
                        </svg>
                        Hide Keyboard
                    </button>
                </div>
            </div>

            <!-- Buttons Tab -->
            <div v-show="activeTab === 'Buttons'">
                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                        </svg>
                        Main Button
                    </div>
                    <div class="input-group">
                        <label>Button Text</label>
                        <input v-model="mainButtonText" placeholder="Button text">
                    </div>
                    <div class="input-group">
                        <label>Button Color</label>
                        <input type="color" v-model="mainButtonColor">
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="updateMainButton">Update</button>
                        <button class="btn" @click="showMainButton">Show</button>
                        <button class="btn" @click="hideMainButton">Hide</button>
                        <button class="btn" @click="enableMainButton">Enable</button>
                        <button class="btn" @click="disableMainButton">Disable</button>
                        <button class="btn" @click="showMainProgress">Show Progress</button>
                        <button class="btn" @click="hideMainProgress">Hide Progress</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                        </svg>
                        Secondary Button
                    </div>
                    <div class="input-group">
                        <label>Button Text</label>
                        <input v-model="secondaryButtonText" placeholder="Button text">
                    </div>
                    <div class="input-group">
                        <label>Position</label>
                        <select v-model="secondaryButtonPosition">
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                        </select>
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="updateSecondaryButton">Update</button>
                        <button class="btn" @click="showSecondaryButton">Show</button>
                        <button class="btn" @click="hideSecondaryButton">Hide</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                        Back Button
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="showBackButton">Show</button>
                        <button class="btn" @click="hideBackButton">Hide</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                        </svg>
                        Settings Button
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="showSettingsButton">Show</button>
                        <button class="btn" @click="hideSettingsButton">Hide</button>
                    </div>
                </div>
            </div>

            <!-- Popups Tab -->
            <div v-show="activeTab === 'Popups'">
                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        </svg>
                        Alert
                    </div>
                    <div class="input-group">
                        <label>Message</label>
                        <input v-model="alertMessage" placeholder="Alert message">
                    </div>
                    <button class="btn" @click="showAlert">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                        </svg>
                        Show Alert
                    </button>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        Confirm
                    </div>
                    <div class="input-group">
                        <label>Message</label>
                        <input v-model="confirmMessage" placeholder="Confirm message">
                    </div>
                    <button class="btn" @click="showConfirm">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Show Confirm
                    </button>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Custom Popup
                    </div>
                    <div class="input-group">
                        <label>Title</label>
                        <input v-model="popupTitle" placeholder="Popup title">
                    </div>
                    <div class="input-group">
                        <label>Message</label>
                        <textarea v-model="popupMessage" placeholder="Popup message"></textarea>
                    </div>
                    <button class="btn" @click="showPopup">Show Popup</button>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5zM22 7h-2V4h-3V2h5v5zm0 15v-5h-2v3h-3v2h5zM2 22h5v-2H4v-3H2v5zM2 2v5h2V4h3V2H2z"/>
                        </svg>
                        QR Scanner
                    </div>
                    <div class="input-group">
                        <label>Scanner Text</label>
                        <input v-model="qrText" placeholder="Scan QR code">
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="showScanQrPopup">Show Scanner</button>
                        <button class="btn" @click="closeScanQrPopup">Close Scanner</button>
                    </div>
                </div>
            </div>

            <!-- Links Tab -->
            <div v-show="activeTab === 'Links'">
                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                        </svg>
                        Open Link
                    </div>
                    <div class="input-group">
                        <label>URL</label>
                        <input v-model="externalUrl" placeholder="https://example.com">
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="openLink(false)">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                            </svg>
                            Open Link
                        </button>
                        <button class="btn" @click="openLink(true)">Instant View</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                        </svg>
                        Telegram Link
                    </div>
                    <div class="input-group">
                        <label>Telegram URL</label>
                        <input v-model="telegramUrl" placeholder="https://t.me/...">
                    </div>
                    <button class="btn" @click="openTelegramLink">Open Telegram Link</button>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
                        </svg>
                        Inline Query
                    </div>
                    <div class="input-group">
                        <label>Query</label>
                        <input v-model="inlineQuery" placeholder="inline query">
                    </div>
                    <div class="input-group">
                        <label>Chat Types</label>
                        <select v-model="chatTypes" multiple>
                            <option value="users">Users</option>
                            <option value="bots">Bots</option>
                            <option value="groups">Groups</option>
                            <option value="channels">Channels</option>
                        </select>
                    </div>
                    <button class="btn" @click="switchInlineQuery">Switch Inline Query</button>
                </div>
            </div>

            <!-- Share Tab -->
            <div v-show="activeTab === 'Share'">
                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                        </svg>
                        Share to Story
                    </div>
                    <div class="input-group">
                        <label>Media URL (Image/Video HTTPS)</label>
                        <input v-model="storyMediaUrl" placeholder="https://example.com/image.jpg">
                    </div>
                    <div class="input-group">
                        <label>Caption (Optional, 0-200 chars)</label>
                        <textarea v-model="storyCaption" placeholder="Story caption" maxlength="200"></textarea>
                    </div>
                    <div class="input-group">
                        <label>Widget Link URL (Optional, Premium only)</label>
                        <input v-model="storyWidgetUrl" placeholder="https://example.com">
                    </div>
                    <div class="input-group">
                        <label>Widget Name (Optional, 0-48 chars)</label>
                        <input v-model="storyWidgetName" placeholder="Widget name" maxlength="48">
                    </div>
                    <button class="btn" @click="shareToStory">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                        </svg>
                        Share to Story
                    </button>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                        Share Message
                    </div>
                    <div class="input-group">
                        <label>Message ID (from Bot API savePreparedInlineMessage)</label>
                        <input v-model="shareMessageId" placeholder="message_id">
                    </div>
                    <button class="btn" @click="shareMessage">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                        Share Message
                    </button>
                </div>
            </div>

            <!-- Haptics Tab -->
            <div v-show="activeTab === 'Haptics'">
                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/>
                        </svg>
                        Impact
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="hapticImpact('light')">Light</button>
                        <button class="btn" @click="hapticImpact('medium')">Medium</button>
                        <button class="btn" @click="hapticImpact('heavy')">Heavy</button>
                        <button class="btn" @click="hapticImpact('rigid')">Rigid</button>
                        <button class="btn" @click="hapticImpact('soft')">Soft</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                        </svg>
                        Notification
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-danger" @click="hapticNotification('error')">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                            Error
                        </button>
                        <button class="btn" @click="hapticNotification('success')" style="background: #4caf50;">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Success
                        </button>
                        <button class="btn" @click="hapticNotification('warning')" style="background: #ff9800;">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                            </svg>
                            Warning
                        </button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Selection
                    </div>
                    <button class="btn" @click="hapticSelection">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Selection Changed
                    </button>
                </div>
            </div>

            <!-- Storage Tab -->
            <div v-show="activeTab === 'Storage'">
                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                        </svg>
                        Cloud Storage
                    </div>
                    <div class="input-group">
                        <label>Key</label>
                        <input v-model="cloudKey" placeholder="storage_key">
                    </div>
                    <div class="input-group">
                        <label>Value</label>
                        <input v-model="cloudValue" placeholder="value">
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="cloudSetItem">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                            Set
                        </button>
                        <button class="btn" @click="cloudGetItem">Get</button>
                        <button class="btn btn-danger" @click="cloudRemoveItem">Remove</button>
                        <button class="btn btn-secondary" @click="cloudGetKeys">Get Keys</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                        </svg>
                        Device Storage
                    </div>
                    <div class="input-group">
                        <label>Key</label>
                        <input v-model="deviceKey" placeholder="device_key">
                    </div>
                    <div class="input-group">
                        <label>Value</label>
                        <input v-model="deviceValue" placeholder="value">
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="deviceSetItem">Set</button>
                        <button class="btn" @click="deviceGetItem">Get</button>
                        <button class="btn btn-danger" @click="deviceRemoveItem">Remove</button>
                        <button class="btn btn-danger" @click="deviceClear">Clear All</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                        </svg>
                        Secure Storage
                    </div>
                    <div class="input-group">
                        <label>Key</label>
                        <input v-model="secureKey" placeholder="secure_key">
                    </div>
                    <div class="input-group">
                        <label>Value</label>
                        <input v-model="secureValue" placeholder="secure value">
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="secureSetItem">Set</button>
                        <button class="btn" @click="secureGetItem">Get</button>
                        <button class="btn btn-danger" @click="secureRemoveItem">Remove</button>
                    </div>
                </div>
            </div>

            <!-- Sensors Tab -->
            <div v-show="activeTab === 'Sensors'">
                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-12.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 5.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                        </svg>
                        Accelerometer
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Status</div>
                            <div class="info-value">
                                <span :class="['status-indicator', accelerometerData.isStarted ? 'status-green' : 'status-red']"></span>
                                {{ accelerometerData.isStarted ? 'Active' : 'Inactive' }}
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">X (m/sÂ²)</div>
                            <div class="info-value">{{ accelerometerData.x }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Y (m/sÂ²)</div>
                            <div class="info-value">{{ accelerometerData.y }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Z (m/sÂ²)</div>
                            <div class="info-value">{{ accelerometerData.z }}</div>
                        </div>
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="startAccelerometer">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            Start
                        </button>
                        <button class="btn btn-danger" @click="stopAccelerometer">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 6h12v12H6z"/>
                            </svg>
                            Stop
                        </button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        </svg>
                        Gyroscope
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Status</div>
                            <div class="info-value">
                                <span :class="['status-indicator', gyroscopeData.isStarted ? 'status-green' : 'status-red']"></span>
                                {{ gyroscopeData.isStarted ? 'Active' : 'Inactive' }}
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">X (rad/s)</div>
                            <div class="info-value">{{ gyroscopeData.x }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Y (rad/s)</div>
                            <div class="info-value">{{ gyroscopeData.y }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Z (rad/s)</div>
                            <div class="info-value">{{ gyroscopeData.z }}</div>
                        </div>
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="startGyroscope">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            Start
                        </button>
                        <button class="btn btn-danger" @click="stopGyroscope">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 6h12v12H6z"/>
                            </svg>
                            Stop
                        </button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        Device Orientation
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Status</div>
                            <div class="info-value">
                                <span :class="['status-indicator', orientationData.isStarted ? 'status-green' : 'status-red']"></span>
                                {{ orientationData.isStarted ? 'Active' : 'Inactive' }}
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Alpha (rad)</div>
                            <div class="info-value">{{ orientationData.alpha }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Beta (rad)</div>
                            <div class="info-value">{{ orientationData.beta }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Gamma (rad)</div>
                            <div class="info-value">{{ orientationData.gamma }}</div>
                        </div>
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="startOrientation">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            Start
                        </button>
                        <button class="btn btn-danger" @click="stopOrientation">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 6h12v12H6z"/>
                            </svg>
                            Stop
                        </button>
                    </div>
                </div>
            </div>

            <!-- Advanced Tab -->
            <div v-show="activeTab === 'Advanced'">
                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                        </svg>
                        Biometrics
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Available</div>
                            <div class="info-value">
                                <span :class="['status-indicator', biometricInfo.isAvailable ? 'status-green' : 'status-red']"></span>
                                {{ biometricInfo.isAvailable }}
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Type</div>
                            <div class="info-value">{{ biometricInfo.type }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Access Granted</div>
                            <div class="info-value">
                                <span :class="['status-indicator', biometricInfo.isAccessGranted ? 'status-green' : 'status-red']"></span>
                                {{ biometricInfo.isAccessGranted }}
                            </div>
                        </div>
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="biometricInit">Init</button>
                        <button class="btn" @click="biometricRequestAccess">Request Access</button>
                        <button class="btn" @click="biometricAuthenticate">Authenticate</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        Location
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Available</div>
                            <div class="info-value">
                                <span :class="['status-indicator', locationInfo.isAvailable ? 'status-green' : 'status-red']"></span>
                                {{ locationInfo.isAvailable }}
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Access Granted</div>
                            <div class="info-value">
                                <span :class="['status-indicator', locationInfo.isAccessGranted ? 'status-green' : 'status-red']"></span>
                                {{ locationInfo.isAccessGranted }}
                            </div>
                        </div>
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="locationInit">Init</button>
                        <button class="btn" @click="getLocation">Get Location</button>
                        <button class="btn" @click="locationOpenSettings">Open Settings</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                        </svg>
                        Permissions
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="requestWriteAccess">Request Write Access</button>
                        <button class="btn" @click="requestContact">Request Contact</button>
                        <button class="btn" @click="readClipboard">Read Clipboard</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        Home Screen
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="addToHomeScreen">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                            Add to Home Screen
                        </button>
                        <button class="btn" @click="checkHomeScreenStatus">Check Status</button>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                        Download File
                    </div>
                    <div class="input-group">
                        <label>Download URL (HTTPS)</label>
                        <input v-model="downloadUrl" placeholder="https://example.com/file.pdf">
                    </div>
                    <div class="input-group">
                        <label>File Name</label>
                        <input v-model="downloadFileName" placeholder="document.pdf">
                    </div>
                    <button class="btn" @click="downloadFile">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                        Download File
                    </button>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                        </svg>
                        Emoji Status
                    </div>
                    <div class="input-group">
                        <label>Custom Emoji ID</label>
                        <input v-model="emojiId" placeholder="5368324170671202286">
                    </div>
                    <div class="input-group">
                        <label>Duration (seconds, optional)</label>
                        <input v-model="emojiDuration" type="number" placeholder="3600">
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="setEmojiStatus">Set Emoji Status</button>
                        <button class="btn" @click="requestEmojiStatusAccess">Request Access</button>
                    </div>
                </div>
            </div>

            <!-- Theme Tab -->
            <div v-show="activeTab === 'Theme'">
                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/>
                        </svg>
                        Theme Parameters
                    </div>
                    <div class="info-grid">
                        <div class="info-item" v-for="(value, key) in themeParams" :key="key">
                            <div class="info-label">{{ key }}</div>
                            <div class="info-value" :style="{background: value, color: getContrastColor(value), padding: '4px', borderRadius: '4px'}">
                                {{ value }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 5v14h18V5H3zm16 12H5V7h14v10z"/>
                        </svg>
                        Safe Area Insets
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Top</div>
                            <div class="info-value">{{ safeAreaInset.top }}px</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Bottom</div>
                            <div class="info-value">{{ safeAreaInset.bottom }}px</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Left</div>
                            <div class="info-value">{{ safeAreaInset.left }}px</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Right</div>
                            <div class="info-value">{{ safeAreaInset.right }}px</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 5v14h18V5H3zm16 12H5V7h14v10z"/>
                        </svg>
                        Content Safe Area Insets
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">Top</div>
                            <div class="info-value">{{ contentSafeAreaInset.top }}px</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Bottom</div>
                            <div class="info-value">{{ contentSafeAreaInset.bottom }}px</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Left</div>
                            <div class="info-value">{{ contentSafeAreaInset.left }}px</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Right</div>
                            <div class="info-value">{{ contentSafeAreaInset.right }}px</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Debug Log -->
            <div class="section">
                <div class="section-title">
                    <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/>
                    </svg>
                    Debug Log
                </div>
                <button class="btn btn-secondary" @click="clearLog">
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    Clear Log
                </button>
                <div class="log-container" ref="logContainer">
                    <div v-for="(log, index) in logs" :key="index" :class="['log-entry', log.type]">
                        <strong>[{{ log.time }}]</strong> {{ log.message }}
                        <div v-if="log.data" style="margin-top: 4px; opacity: 0.8;">
                            {{ JSON.stringify(log.data, null, 2) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const { createApp } = Vue;

        createApp({
            data() {
                return {
                    activeTab: 'Overview',
                    tabs: [
                        { name: 'Overview', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>' },
                        { name: 'Basic', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>' },
                        { name: 'Buttons', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>' },
                        { name: 'Popups', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' },
                        { name: 'Links', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>' },
                        { name: 'Share', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>' },
                        { name: 'Haptics', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/></svg>' },
                        { name: 'Storage', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>' },
                        { name: 'Sensors', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-12.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 5.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>' },
                        { name: 'Advanced', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>' },
                        { name: 'Theme', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"/></svg>' }
                    ],
                    logs: [],
                    webAppInfo: {},
                    userInfo: {},
                    initData: '',
                    themeParams: {},
                    safeAreaInset: {},
                    contentSafeAreaInset: {},
                    
                    // UI State
                    headerColor: '#3390ec',
                    backgroundColor: '#ffffff',
                    bottomBarColor: '#ffffff',
                    mainButtonText: 'Continue',
                    mainButtonColor: '#3390ec',
                    secondaryButtonText: 'Cancel',
                    secondaryButtonPosition: 'left',
                    
                    // Popup inputs
                    alertMessage: 'This is an alert!',
                    confirmMessage: 'Are you sure?',
                    popupTitle: 'Custom Popup',
                    popupMessage: 'This is a custom popup message',
                    qrText: 'Scan a QR code',
                    
                    // Link inputs
                    externalUrl: 'https://telegram.org',
                    telegramUrl: 'https://t.me/telegram',
                    inlineQuery: 'test',
                    chatTypes: [],
                    
                    // Share inputs
                    storyMediaUrl: 'https://telegram.org/img/t_logo.png',
                    storyCaption: '',
                    storyWidgetUrl: '',
                    storyWidgetName: '',
                    shareMessageId: '',
                    
                    // Storage inputs
                    cloudKey: 'test_key',
                    cloudValue: 'test_value',
                    deviceKey: 'device_key',
                    deviceValue: 'device_value',
                    secureKey: 'secure_key',
                    secureValue: 'secure_value',
                    
                    // Sensor data
                    accelerometerData: { isStarted: false, x: 0, y: 0, z: 0 },
                    gyroscopeData: { isStarted: false, x: 0, y: 0, z: 0 },
                    orientationData: { isStarted: false, alpha: 0, beta: 0, gamma: 0 },
                    
                    // Advanced
                    biometricInfo: { isAvailable: false, type: 'unknown', isAccessGranted: false },
                    locationInfo: { isAvailable: false, isAccessGranted: false },
                    downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                    downloadFileName: 'sample.pdf',
                    emojiId: '5368324170671202286',
                    emojiDuration: 3600,
                };
            },
            mounted() {
                this.log('App mounted', 'success');
                this.initTelegramWebApp();
                this.setupEventListeners();
                this.updateWebAppInfo();
                
                // Update info periodically
                setInterval(() => {
                    this.updateWebAppInfo();
                    this.updateSensorData();
                }, 500);
            },
            methods: {
                initTelegramWebApp() {
                    if (!window.Telegram || !window.Telegram.WebApp) {
                        this.log('Telegram WebApp not available', 'error');
                        return;
                    }
                    
                    const tg = window.Telegram.WebApp;
                    tg.ready();
                    
                    this.log('Telegram WebApp initialized', 'success', {
                        version: tg.version,
                        platform: tg.platform
                    });
                    
                    this.initData = tg.initData;
                    this.updateWebAppInfo();
                },
                
                setupEventListeners() {
                    const tg = window.Telegram.WebApp;
                    
                    const events = [
                        'themeChanged', 'viewportChanged', 'mainButtonClicked', 'secondaryButtonClicked',
                        'backButtonClicked', 'settingsButtonClicked', 'invoiceClosed', 'popupClosed',
                        'qrTextReceived', 'scanQrPopupClosed', 'clipboardTextReceived', 'writeAccessRequested',
                        'contactRequested', 'biometricManagerUpdated', 'biometricAuthRequested',
                        'biometricTokenUpdated', 'activated', 'deactivated', 'safeAreaChanged',
                        'contentSafeAreaChanged', 'fullscreenChanged', 'fullscreenFailed', 'homeScreenAdded',
                        'homeScreenChecked', 'accelerometerStarted', 'accelerometerStopped', 'accelerometerChanged',
                        'accelerometerFailed', 'deviceOrientationStarted', 'deviceOrientationStopped',
                        'deviceOrientationChanged', 'deviceOrientationFailed', 'gyroscopeStarted',
                        'gyroscopeStopped', 'gyroscopeChanged', 'gyroscopeFailed', 'locationManagerUpdated',
                        'locationRequested', 'shareMessageSent', 'shareMessageFailed', 'emojiStatusSet',
                        'emojiStatusFailed', 'emojiStatusAccessRequested', 'fileDownloadRequested'
                    ];
                    
                    events.forEach(eventType => {
                        tg.onEvent(eventType, (data) => {
                            this.log(`Event: ${eventType}`, 'success', data);
                            this.updateWebAppInfo();
                        });
                    });
                },
                
                updateWebAppInfo() {
                    const tg = window.Telegram.WebApp;
                    
                    this.webAppInfo = {
                        version: tg.version,
                        platform: tg.platform,
                        colorScheme: tg.colorScheme,
                        isActive: tg.isActive,
                        isExpanded: tg.isExpanded,
                        isFullscreen: tg.isFullscreen,
                        viewportHeight: tg.viewportHeight,
                        viewportStableHeight: tg.viewportStableHeight,
                        isOrientationLocked: tg.isOrientationLocked,
                        isClosingConfirmationEnabled: tg.isClosingConfirmationEnabled,
                        isVerticalSwipesEnabled: tg.isVerticalSwipesEnabled
                    };
                    
                    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
                        this.userInfo = {
                            id: tg.initDataUnsafe.user.id,
                            first_name: tg.initDataUnsafe.user.first_name,
                            last_name: tg.initDataUnsafe.user.last_name,
                            username: tg.initDataUnsafe.user.username,
                            language_code: tg.initDataUnsafe.user.language_code,
                            is_premium: tg.initDataUnsafe.user.is_premium,
                            photo_url: tg.initDataUnsafe.user.photo_url
                        };
                    }
                    
                    this.themeParams = tg.themeParams || {};
                    this.safeAreaInset = tg.safeAreaInset || { top: 0, bottom: 0, left: 0, right: 0 };
                    this.contentSafeAreaInset = tg.contentSafeAreaInset || { top: 0, bottom: 0, left: 0, right: 0 };
                },
                
                updateSensorData() {
                    const tg = window.Telegram.WebApp;
                    
                    if (tg.Accelerometer) {
                        this.accelerometerData = {
                            isStarted: tg.Accelerometer.isStarted,
                            x: tg.Accelerometer.x?.toFixed(2) || 0,
                            y: tg.Accelerometer.y?.toFixed(2) || 0,
                            z: tg.Accelerometer.z?.toFixed(2) || 0
                        };
                    }
                    
                    if (tg.Gyroscope) {
                        this.gyroscopeData = {
                            isStarted: tg.Gyroscope.isStarted,
                            x: tg.Gyroscope.x?.toFixed(2) || 0,
                            y: tg.Gyroscope.y?.toFixed(2) || 0,
                            z: tg.Gyroscope.z?.toFixed(2) || 0
                        };
                    }
                    
                    if (tg.DeviceOrientation) {
                        this.orientationData = {
                            isStarted: tg.DeviceOrientation.isStarted,
                            alpha: tg.DeviceOrientation.alpha?.toFixed(2) || 0,
                            beta: tg.DeviceOrientation.beta?.toFixed(2) || 0,
                            gamma: tg.DeviceOrientation.gamma?.toFixed(2) || 0
                        };
                    }
                },
                
                // Basic Methods
                expand() {
                    window.Telegram.WebApp.expand();
                    this.log('expand() called');
                },
                
                close() {
                    window.Telegram.WebApp.close();
                    this.log('close() called');
                },
                
                requestFullscreen() {
                    window.Telegram.WebApp.requestFullscreen();
                    this.log('requestFullscreen() called');
                },
                
                exitFullscreen() {
                    window.Telegram.WebApp.exitFullscreen();
                    this.log('exitFullscreen() called');
                },
                
                lockOrientation() {
                    window.Telegram.WebApp.lockOrientation();
                    this.log('lockOrientation() called');
                },
                
                unlockOrientation() {
                    window.Telegram.WebApp.unlockOrientation();
                    this.log('unlockOrientation() called');
                },
                
                enableVerticalSwipes() {
                    window.Telegram.WebApp.enableVerticalSwipes();
                    this.log('enableVerticalSwipes() called');
                },
                
                disableVerticalSwipes() {
                    window.Telegram.WebApp.disableVerticalSwipes();
                    this.log('disableVerticalSwipes() called');
                },
                
                enableClosingConfirmation() {
                    window.Telegram.WebApp.enableClosingConfirmation();
                    this.log('enableClosingConfirmation() called');
                },
                
                disableClosingConfirmation() {
                    window.Telegram.WebApp.disableClosingConfirmation();
                    this.log('disableClosingConfirmation() called');
                },
                
                setHeaderColor() {
                    window.Telegram.WebApp.setHeaderColor(this.headerColor);
                    this.log('setHeaderColor() called', 'success', { color: this.headerColor });
                },
                
                setBackgroundColor() {
                    window.Telegram.WebApp.setBackgroundColor(this.backgroundColor);
                    this.log('setBackgroundColor() called', 'success', { color: this.backgroundColor });
                },
                
                setBottomBarColor() {
                    window.Telegram.WebApp.setBottomBarColor(this.bottomBarColor);
                    this.log('setBottomBarColor() called', 'success', { color: this.bottomBarColor });
                },
                
                hideKeyboard() {
                    if (window.Telegram.WebApp.hideKeyboard) {
                        window.Telegram.WebApp.hideKeyboard();
                        this.log('hideKeyboard() called');
                    } else {
                        this.log('hideKeyboard() not available', 'error');
                    }
                },
                
                // Button Methods
                updateMainButton() {
                    window.Telegram.WebApp.MainButton.setParams({
                        text: this.mainButtonText,
                        color: this.mainButtonColor
                    });
                    this.log('Main button updated', 'success', { text: this.mainButtonText });
                },
                
                showMainButton() {
                    window.Telegram.WebApp.MainButton.show();
                    this.log('Main button shown');
                },
                
                hideMainButton() {
                    window.Telegram.WebApp.MainButton.hide();
                    this.log('Main button hidden');
                },
                
                enableMainButton() {
                    window.Telegram.WebApp.MainButton.enable();
                    this.log('Main button enabled');
                },
                
                disableMainButton() {
                    window.Telegram.WebApp.MainButton.disable();
                    this.log('Main button disabled');
                },
                
                showMainProgress() {
                    window.Telegram.WebApp.MainButton.showProgress();
                    this.log('Main button progress shown');
                },
                
                hideMainProgress() {
                    window.Telegram.WebApp.MainButton.hideProgress();
                    this.log('Main button progress hidden');
                },
                
                updateSecondaryButton() {
                    window.Telegram.WebApp.SecondaryButton.setParams({
                        text: this.secondaryButtonText,
                        position: this.secondaryButtonPosition
                    });
                    this.log('Secondary button updated', 'success', { text: this.secondaryButtonText });
                },
                
                showSecondaryButton() {
                    window.Telegram.WebApp.SecondaryButton.show();
                    this.log('Secondary button shown');
                },
                
                hideSecondaryButton() {
                    window.Telegram.WebApp.SecondaryButton.hide();
                    this.log('Secondary button hidden');
                },
                
                showBackButton() {
                    window.Telegram.WebApp.BackButton.show();
                    this.log('Back button shown');
                },
                
                hideBackButton() {
                    window.Telegram.WebApp.BackButton.hide();
                    this.log('Back button hidden');
                },
                
                showSettingsButton() {
                    window.Telegram.WebApp.SettingsButton.show();
                    this.log('Settings button shown');
                },
                
                hideSettingsButton() {
                    window.Telegram.WebApp.SettingsButton.hide();
                    this.log('Settings button hidden');
                },
                
                // Popups
                showAlert() {
                    window.Telegram.WebApp.showAlert(this.alertMessage, () => {
                        this.log('Alert closed by user');
                    });
                    this.log('showAlert() called', 'success', { message: this.alertMessage });
                },
                
                showConfirm() {
                    window.Telegram.WebApp.showConfirm(this.confirmMessage, (confirmed) => {
                        this.log('Confirm result', 'success', { confirmed });
                    });
                    this.log('showConfirm() called', 'success', { message: this.confirmMessage });
                },
                
                showPopup() {
                    window.Telegram.WebApp.showPopup({
                        title: this.popupTitle,
                        message: this.popupMessage,
                        buttons: [
                            { id: 'ok', type: 'ok' },
                            { id: 'cancel', type: 'cancel' },
                            { id: 'custom', type: 'default', text: 'Custom' }
                        ]
                    }, (buttonId) => {
                        this.log('Popup button clicked', 'success', { buttonId });
                    });
                    this.log('showPopup() called', 'success');
                },
                
                showScanQrPopup() {
                    window.Telegram.WebApp.showScanQrPopup({ text: this.qrText }, (data) => {
                        this.log('QR Code scanned', 'success', { data });
                        return true;
                    });
                    this.log('showScanQrPopup() called');
                },
                
                closeScanQrPopup() {
                    window.Telegram.WebApp.closeScanQrPopup();
                    this.log('closeScanQrPopup() called');
                },
                
                // Links
                openLink(instantView) {
                    const options = instantView ? { try_instant_view: true } : {};
                    window.Telegram.WebApp.openLink(this.externalUrl, options);
                    this.log('openLink() called', 'success', { url: this.externalUrl, instantView });
                },
                
                openTelegramLink() {
                    window.Telegram.WebApp.openTelegramLink(this.telegramUrl);
                    this.log('openTelegramLink() called', 'success', { url: this.telegramUrl });
                },
                
                switchInlineQuery() {
                    window.Telegram.WebApp.switchInlineQuery(this.inlineQuery, this.chatTypes);
                    this.log('switchInlineQuery() called', 'success', { query: this.inlineQuery, chatTypes: this.chatTypes });
                },
                
                // Share Methods
                shareToStory() {
                    if (!this.storyMediaUrl) {
                        this.log('Media URL is required', 'error');
                        return;
                    }
                    
                    const params = {
                        text: this.storyCaption || undefined
                    };
                    
                    if (this.storyWidgetUrl) {
                        params.widget_link = {
                            url: this.storyWidgetUrl,
                            name: this.storyWidgetName || undefined
                        };
                    }
                    
                    window.Telegram.WebApp.shareToStory(this.storyMediaUrl, params);
                    this.log('shareToStory() called', 'success', { media_url: this.storyMediaUrl, params });
                },
                
                shareMessage() {
                    if (!this.shareMessageId) {
                        this.log('Message ID is required', 'error');
                        return;
                    }
                    
                    if (window.Telegram.WebApp.shareMessage) {
                        window.Telegram.WebApp.shareMessage(this.shareMessageId, (success) => {
                            this.log('Share message result', success ? 'success' : 'error', { success });
                        });
                        this.log('shareMessage() called', 'success', { msg_id: this.shareMessageId });
                    } else {
                        this.log('shareMessage() not available', 'error');
                    }
                },
                
                // Haptics
                hapticImpact(style) {
                    window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
                    this.log(`Haptic impact: ${style}`, 'success');
                },
                
                hapticNotification(type) {
                    window.Telegram.WebApp.HapticFeedback.notificationOccurred(type);
                    this.log(`Haptic notification: ${type}`, 'success');
                },
                
                hapticSelection() {
                    window.Telegram.WebApp.HapticFeedback.selectionChanged();
                    this.log('Haptic selection changed', 'success');
                },
                
                // Cloud Storage
                cloudSetItem() {
                    window.Telegram.WebApp.CloudStorage.setItem(this.cloudKey, this.cloudValue, (error, success) => {
                        if (error) {
                            this.log('Cloud storage set failed', 'error', { error });
                        } else {
                            this.log('Cloud storage set success', 'success', { key: this.cloudKey, value: this.cloudValue });
                        }
                    });
                },
                
                cloudGetItem() {
                    window.Telegram.WebApp.CloudStorage.getItem(this.cloudKey, (error, value) => {
                        if (error) {
                            this.log('Cloud storage get failed', 'error', { error });
                        } else {
                            this.log('Cloud storage get success', 'success', { key: this.cloudKey, value });
                            this.cloudValue = value || '';
                        }
                    });
                },
                
                cloudRemoveItem() {
                    window.Telegram.WebApp.CloudStorage.removeItem(this.cloudKey, (error, success) => {
                        if (error) {
                            this.log('Cloud storage remove failed', 'error', { error });
                        } else {
                            this.log('Cloud storage remove success', 'success', { key: this.cloudKey });
                        }
                    });
                },
                
                cloudGetKeys() {
                    window.Telegram.WebApp.CloudStorage.getKeys((error, keys) => {
                        if (error) {
                            this.log('Cloud storage get keys failed', 'error', { error });
                        } else {
                            this.log('Cloud storage keys', 'success', { keys });
                        }
                    });
                },
                
                // Device Storage
                deviceSetItem() {
                    if (window.Telegram.WebApp.DeviceStorage) {
                        window.Telegram.WebApp.DeviceStorage.setItem(this.deviceKey, this.deviceValue, (error, success) => {
                            if (error) {
                                this.log('Device storage set failed', 'error', { error });
                            } else {
                                this.log('Device storage set success', 'success', { key: this.deviceKey });
                            }
                        });
                    } else {
                        this.log('DeviceStorage not available', 'error');
                    }
                },
                
                deviceGetItem() {
                    if (window.Telegram.WebApp.DeviceStorage) {
                        window.Telegram.WebApp.DeviceStorage.getItem(this.deviceKey, (error, value) => {
                            if (error) {
                                this.log('Device storage get failed', 'error', { error });
                            } else {
                                this.log('Device storage get success', 'success', { value });
                                this.deviceValue = value || '';
                            }
                        });
                    } else {
                        this.log('DeviceStorage not available', 'error');
                    }
                },
                
                deviceRemoveItem() {
                    if (window.Telegram.WebApp.DeviceStorage) {
                        window.Telegram.WebApp.DeviceStorage.removeItem(this.deviceKey, (error, success) => {
                            if (error) {
                                this.log('Device storage remove failed', 'error', { error });
                            } else {
                                this.log('Device storage remove success', 'success');
                            }
                        });
                    } else {
                        this.log('DeviceStorage not available', 'error');
                    }
                },
                
                deviceClear() {
                    if (window.Telegram.WebApp.DeviceStorage) {
                        window.Telegram.WebApp.DeviceStorage.clear((error, success) => {
                            if (error) {
                                this.log('Device storage clear failed', 'error', { error });
                            } else {
                                this.log('Device storage cleared', 'success');
                            }
                        });
                    } else {
                        this.log('DeviceStorage not available', 'error');
                    }
                },
                
                // Secure Storage
                secureSetItem() {
                    if (window.Telegram.WebApp.SecureStorage) {
                        window.Telegram.WebApp.SecureStorage.setItem(this.secureKey, this.secureValue, (error, success) => {
                            if (error) {
                                this.log('Secure storage set failed', 'error', { error });
                            } else {
                                this.log('Secure storage set success', 'success');
                            }
                        });
                    } else {
                        this.log('SecureStorage not available', 'error');
                    }
                },
                
                secureGetItem() {
                    if (window.Telegram.WebApp.SecureStorage) {
                        window.Telegram.WebApp.SecureStorage.getItem(this.secureKey, (error, value) => {
                            if (error) {
                                this.log('Secure storage get failed', 'error', { error });
                            } else {
                                this.log('Secure storage get success', 'success', { value });
                                this.secureValue = value || '';
                            }
                        });
                    } else {
                        this.log('SecureStorage not available', 'error');
                    }
                },
                
                secureRemoveItem() {
                    if (window.Telegram.WebApp.SecureStorage) {
                        window.Telegram.WebApp.SecureStorage.removeItem(this.secureKey, (error, success) => {
                            if (error) {
                                this.log('Secure storage remove failed', 'error', { error });
                            } else {
                                this.log('Secure storage remove success', 'success');
                            }
                        });
                    } else {
                        this.log('SecureStorage not available', 'error');
                    }
                },
                
                // Sensors
                startAccelerometer() {
                    if (window.Telegram.WebApp.Accelerometer) {
                        window.Telegram.WebApp.Accelerometer.start({ refresh_rate: 100 }, (success) => {
                            this.log('Accelerometer started', success ? 'success' : 'error', { success });
                        });
                    } else {
                        this.log('Accelerometer not available', 'error');
                    }
                },
                
                stopAccelerometer() {
                    if (window.Telegram.WebApp.Accelerometer) {
                        window.Telegram.WebApp.Accelerometer.stop((success) => {
                            this.log('Accelerometer stopped', success ? 'success' : 'error', { success });
                        });
                    }
                },
                
                startGyroscope() {
                    if (window.Telegram.WebApp.Gyroscope) {
                        window.Telegram.WebApp.Gyroscope.start({ refresh_rate: 100 }, (success) => {
                            this.log('Gyroscope started', success ? 'success' : 'error', { success });
                        });
                    } else {
                        this.log('Gyroscope not available', 'error');
                    }
                },
                
                stopGyroscope() {
                    if (window.Telegram.WebApp.Gyroscope) {
                        window.Telegram.WebApp.Gyroscope.stop((success) => {
                            this.log('Gyroscope stopped', success ? 'success' : 'error', { success });
                        });
                    }
                },
                
                startOrientation() {
                    if (window.Telegram.WebApp.DeviceOrientation) {
                        window.Telegram.WebApp.DeviceOrientation.start({ refresh_rate: 100, need_absolute: false }, (success) => {
                            this.log('Device orientation started', success ? 'success' : 'error', { success });
                        });
                    } else {
                        this.log('DeviceOrientation not available', 'error');
                    }
                },
                
                stopOrientation() {
                    if (window.Telegram.WebApp.DeviceOrientation) {
                        window.Telegram.WebApp.DeviceOrientation.stop((success) => {
                            this.log('Device orientation stopped', success ? 'success' : 'error', { success });
                        });
                    }
                },
                
                // Biometrics
                biometricInit() {
                    if (window.Telegram.WebApp.BiometricManager) {
                        window.Telegram.WebApp.BiometricManager.init(() => {
                            const bm = window.Telegram.WebApp.BiometricManager;
                            this.biometricInfo = {
                                isAvailable: bm.isBiometricAvailable,
                                type: bm.biometricType,
                                isAccessGranted: bm.isAccessGranted
                            };
                            this.log('Biometric manager initialized', 'success', this.biometricInfo);
                        });
                    } else {
                        this.log('BiometricManager not available', 'error');
                    }
                },
                
                biometricRequestAccess() {
                    if (window.Telegram.WebApp.BiometricManager) {
                        window.Telegram.WebApp.BiometricManager.requestAccess({ reason: 'Test biometric access' }, (granted) => {
                            this.log('Biometric access request', granted ? 'success' : 'error', { granted });
                        });
                    } else {
                        this.log('BiometricManager not available', 'error');
                    }
                },
                
                biometricAuthenticate() {
                    if (window.Telegram.WebApp.BiometricManager) {
                        window.Telegram.WebApp.BiometricManager.authenticate({ reason: 'Test authentication' }, (success, token) => {
                            this.log('Biometric authentication', success ? 'success' : 'error', { success, token });
                        });
                    } else {
                        this.log('BiometricManager not available', 'error');
                    }
                },
                
                // Location
                locationInit() {
                    if (window.Telegram.WebApp.LocationManager) {
                        window.Telegram.WebApp.LocationManager.init(() => {
                            const lm = window.Telegram.WebApp.LocationManager;
                            this.locationInfo = {
                                isAvailable: lm.isLocationAvailable,
                                isAccessGranted: lm.isAccessGranted
                            };
                            this.log('Location manager initialized', 'success', this.locationInfo);
                        });
                    } else {
                        this.log('LocationManager not available', 'error');
                    }
                },
                
                getLocation() {
                    if (window.Telegram.WebApp.LocationManager) {
                        window.Telegram.WebApp.LocationManager.getLocation((locationData) => {
                            if (locationData) {
                                this.log('Location received', 'success', locationData);
                            } else {
                                this.log('Location access denied', 'error');
                            }
                        });
                    } else {
                        this.log('LocationManager not available', 'error');
                    }
                },
                
                locationOpenSettings() {
                    if (window.Telegram.WebApp.LocationManager) {
                        window.Telegram.WebApp.LocationManager.openSettings();
                        this.log('Location settings opened');
                    } else {
                        this.log('LocationManager not available', 'error');
                    }
                },
                
                // Permissions
                requestWriteAccess() {
                    window.Telegram.WebApp.requestWriteAccess((granted) => {
                        this.log('Write access request', granted ? 'success' : 'error', { granted });
                    });
                },
                
                requestContact() {
                    window.Telegram.WebApp.requestContact((shared) => {
                        this.log('Contact request', shared ? 'success' : 'error', { shared });
                    });
                },
                
                readClipboard() {
                    window.Telegram.WebApp.readTextFromClipboard((text) => {
                        this.log('Clipboard read', 'success', { text });
                    });
                },
                
                // Home Screen
                addToHomeScreen() {
                    if (window.Telegram.WebApp.addToHomeScreen) {
                        window.Telegram.WebApp.addToHomeScreen();
                        this.log('addToHomeScreen() called');
                    } else {
                        this.log('addToHomeScreen() not available', 'error');
                    }
                },
                
                checkHomeScreenStatus() {
                    if (window.Telegram.WebApp.checkHomeScreenStatus) {
                        window.Telegram.WebApp.checkHomeScreenStatus((status) => {
                            this.log('Home screen status', 'success', { status });
                        });
                    } else {
                        this.log('checkHomeScreenStatus() not available', 'error');
                    }
                },
                
                // Download
                downloadFile() {
                    if (window.Telegram.WebApp.downloadFile) {
                        window.Telegram.WebApp.downloadFile({
                            url: this.downloadUrl,
                            file_name: this.downloadFileName
                        }, (status) => {
                            this.log('Download file', status === 'downloading' ? 'success' : 'error', { status });
                        });
                    } else {
                        this.log('downloadFile() not available', 'error');
                    }
                },
                
                // Emoji Status
                setEmojiStatus() {
                    if (window.Telegram.WebApp.setEmojiStatus) {
                        const params = this.emojiDuration ? { duration: parseInt(this.emojiDuration) } : {};
                        window.Telegram.WebApp.setEmojiStatus(this.emojiId, params, (success) => {
                            this.log('Set emoji status', success ? 'success' : 'error', { success });
                        });
                    } else {
                        this.log('setEmojiStatus() not available', 'error');
                    }
                },
                
                requestEmojiStatusAccess() {
                    if (window.Telegram.WebApp.requestEmojiStatusAccess) {
                        window.Telegram.WebApp.requestEmojiStatusAccess((granted) => {
                            this.log('Emoji status access', granted ? 'success' : 'error', { granted });
                        });
                    } else {
                        this.log('requestEmojiStatusAccess() not available', 'error');
                    }
                },
                
                // Utilities
                log(message, type = '', data = null) {
                    const time = new Date().toLocaleTimeString();
                    this.logs.push({ time, message, type, data });
                    
                    if (this.logs.length > 100) {
                        this.logs.shift();
                    }
                    
                    this.$nextTick(() => {
                        const container = this.$refs.logContainer;
                        if (container) {
                            container.scrollTop = container.scrollHeight;
                        }
                    });
                    
                    console.log(`[${time}] ${message}`, data);
                },
                
                clearLog() {
                    this.logs = [];
                    this.log('Log cleared', 'success');
                },
                
                getContrastColor(hexColor) {
                    if (!hexColor) return '#000000';
                    const color = hexColor.replace('#', '');
                    const r = parseInt(color.substr(0, 2), 16);
                    const g = parseInt(color.substr(2, 2), 16);
                    const b = parseInt(color.substr(4, 2), 16);
                    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                    return luminance > 0.5 ? '#000000' : '#ffffff';
                }
            }
        }).mount('#app');
    </script>
</body>
</html>

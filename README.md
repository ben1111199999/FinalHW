Copy# 報名與參加者管理系統

## 專案簡介
這是一個基於 MERN (MongoDB、Express.js、React、Node.js) 技術棧開發的活動報名與管理系統。本系統提供完整的活動管理功能，包括活動發布、報名管理以及參加者資訊管理等功能。系統採用雙重角色設計，管理員可進行全面管理，一般用戶則可瀏覽活動並進行報名。

## 主要功能
本系統提供以下核心功能：

使用者管理：
- 帳號登入與權限控制
- 管理員與一般用戶雙重角色
- 安全的身份驗證機制

活動管理：
- 管理員可進行活動的新增、編輯與刪除
- 活動資訊完整展示
- 活動搜尋與篩選功能

報名管理：
- 一般用戶活動報名
- 參加者資訊管理
- 報名狀態追蹤

## 技術架構

前端技術：
- React.js：用戶界面開發框架
- Tailwind CSS：樣式設計與響應式布局
- Lucide React：圖標組件庫

後端技術：
- Node.js：執行環境
- Express.js：Web 應用框架
- MongoDB：資料庫系統
- JWT：身份驗證機制

## 安裝說明

### 系統需求
- Node.js（建議版本 14.0 以上）
- MongoDB 資料庫
- npm 或 yarn 套件管理器

### 安裝步驟

1. 下載專案
```bash
git clone [專案網址]

安裝後端依賴

bashCopycd backend
npm install

安裝前端依賴

bashCopycd frontend
npm install

環境設定
需在前後端目錄分別建立 .env 檔案：

後端 （.env）：
CopyMONGODB_URI=mongodb://localhost:27017/event_management
JWT_SECRET=your_jwt_secret
PORT=5000
前端 （.env）：
CopyVITE_APP_API_URL=http://localhost:5000/api

啟動系統
後端啟動：

bashCopycd backend
npm run dev

前端啟動：
bashCopycd frontend
npm run dev

使用說明

系統存取


開啟瀏覽器訪問：http://localhost:5173
使用提供的測試帳號登入：

管理員帳號：admin / password
一般用戶：user / password




功能操作


管理員功能：

活動管理：可新增、編輯、刪除活動
參加者管理：審核報名、管理參加者資訊
系統管理：用戶權限控制


一般用戶功能：

活動瀏覽：查看活動詳情
活動報名：填寫報名資訊
報名查詢：查看報名狀態



API 檔
身份驗證相關：

POST /api/auth/login - 用戶登入
POST /api/auth/register - 用戶註冊

活動管理：

GET /api/events - 獲取活動列表
POST /api/events - 新增活動（限管理員）
PUT /api/events/：id - 更新活動（限管理員）
DELETE /api/events/：id - 除活動（限管理員）

參加者管理：

GET /api/participants - 獲取參加者列表
POST /api/participants - 新增報名
PUT /api/participants/：id - 更新參加者資訊（限管理員）
DELETE /api/participants/：id - 除參加者記錄（限管理員）

系統特色

安全性


JWT 身份驗證
密碼加密儲存
權限分級管理


使用者體驗


響應式設計，支援多種設備
直覺化操作介面
即時的操作反饋


系統效能


資料快取優化
非同步處理機制
資料庫查詢優化

版本資訊

目前版本：1.0.0
最後更新：2024/01/10

未來規劃

整合電子郵件通知系統
新增活動數據分析功能
支援多語言界面
擴充報名表單自定義功能

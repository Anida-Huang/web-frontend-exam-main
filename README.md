## 如何執行此專案 

1. 架設相關環境 ( 安裝Node.js / NPM )

2. 建立自己的分支，下載專案檔案並使用 VS Code 開啟專案目錄

3. 開啟專案後使用終端機安裝 Sass、Boorstrap 等套件

4. 使用指令 npm start 啟動專案開始開發

5. 將專案透過 Git 進行版控

6. 透過指令將專案放置 GitHub Page

## 專案架構、邏輯說明

### 目錄結構

```
/WEB-FRONTEND-EXAM-MAIN
│
├── /src
│   │
│   ├── /components
│   │   ├── JobCard.js             # 工作職缺項目
│   │   ├── Modal.js               # 工作職缺項目詳情
│   │   ├── Pagination.js          # 分頁設定
│   │   └── SearchForm.js          # 搜尋功能 (整併分頁設定、工作職缺項目、工作職缺項目詳情)
│   │
│   ├── /constants
│   │   ├── educationList.js       # 教育程度
│   │   ├── salaryList.js          # 薪水範圍
│   │   └── jobList.js             # 工作職缺
│   │
│   ├── /images
│   │   ├── Background-01.png      # 背景
│   │   ├── Character-01.png       # 人物
│   │   ├── Character-02.png       # 人物剪影
│   │   ├── Left-Eye-01.png        # 左眼
│   │   ├── Logo-01.png            # Logo
│   │   └── Right-Eye-01.png       # 右眼
│   │
│   ├── /styles
│   │   └── app.scss               # 樣式
│   │
│   ├── App.js                     # 主應用
│   └── index.js                   # 專案入口，渲染 App 組件
│
├── .gitignore                     # Git 文件
├── package.json                   # 專案配置和依賴
├── README.md                      # 專案說明文檔
└── yarn.lock / package-lock.json  # 依賴鎖定文件
```

## 專案遇到的困難、問題

1. 缺乏框架使用經驗導致框架與工具的熟悉度不足：
    在專案開始之前，沒有使用過框架（例如 React）開發的經驗，導致開發難度上升

2. 開發與摸索同步進行：
   同步進行導致開發進度緩慢

3. 功能開發的多次嘗試：
   借助工具輔助開發也需要多次嘗試才能達成

## 解決方法

1. 通過此次實戰案例瞭解 React 框架的基礎概念

2. 拆分需求以逐步進行功能開發，避免同時面對過多技術挑戰

3. AI工具使用以及主動請教曾經撰寫過的夥伴

## Github Repositories Link

<https://github.com/Anida-Huang/web-frontend-exam-main>

## Github Page Link

<https://anida-huang.github.io/web-frontend-exam-main/>

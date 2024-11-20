## 如何執行此專案 

1. 架設相關環境 ( 安裝Node.js / NPM )

2. 建立自己的分支，下載專案檔案並使用 VS Code 開啟專案目錄

3. 開啟專案後使用終端機安裝 Sass、Boorstrap 等套件

4. 使用指令 npm start 啟動專案開始開發

5. 將專案透過 Git 進行版控

6. 透過指令將專案放置 GitHub Page

## 專案架構

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
│   │   └── SearchForm.js          # 搜尋功能
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

### 邏輯說明

```
1. 搜尋：

   【SearchForm.js】條件搜尋：
      (1) 引用【jobList.js】工作職缺、【educationList.js】教育程度、【salaryList.js】薪水範圍
      (2) 引用【JobCard.js】工作卡片、引用【Pagination.js】分頁功能、引用【Modal.js】詳細資訊
      (3) 整合搜尋、篩選條件（如公司名稱、教育程度、薪水範圍）和分頁功能
      (4) 使用 React 的狀態管理 (useState) 儲存搜索條件
      (5) 將分頁、職缺卡片、和模態框等子功能組件整合為完整的使用體驗
      (6) 根據螢幕大小調整顯示隱藏搜尋畫面

   【JobCard】工作卡片：
      (1) 依條件過濾【jobList】中的職缺

   【Pagination】分頁：
      (1) 根據螢幕大小調整職缺數量和當前頁面動態生成分頁按鈕
      (2) 計算當前顯示的職缺範圍
      (3) 提供上一頁、下一頁、直接跳轉頁數的功能

   【Modal】詳細資訊：
      (1) 點擊查看細節跳出視窗顯示所選工作詳情卡片
      (2) 圖片切換瀏覽
      (3) 提供關閉按鈕
``` 

```
2. 職缺相關：

   【JobCard.js】：
      (1) 引用【app.scss】、【bootstrap】、【bootstrapIcon】樣式
      (2) 使用 Bootstrap 將工作職缺以卡片樣式呈現
      (3) 接受搜尋條件【公司名稱、教育程度、薪水範圍】篩選出相符工作
      (4) 點擊按鈕擁有展開【項目詳情卡片】功能

   【Modal.js】
      (1) 引用【app.scss】、【bootstrap】、【bootstrapIcon】樣式
      (1) 工作職缺詳細資訊的彈出視窗
      (2) 職缺的完整描述與圖片
      (3) 圖片瀏覽與切換功能

   【Pagination.js】
      (1) 引用【app.scss】、【bootstrap】、【bootstrapIcon】樣式
      (2) 分頁組件
      (3) 計算當前頁數和總頁數
      (4) 跳轉功能和頁數按鈕
```

```
3. 資料與樣式

   【constants】
      (1) 【jobList.js】：提供工作職缺詳情資訊
      (2) 【educationList.js】：提供教育程度資訊
      (3) 【educationList.js】：提供教育程度資訊

   【styles】
      (1) 【app.scss】：使用 Sass 定義樣式與排版，並提供 RWD 樣式讓不同裝置都能使用

   【img】
      (1) 包含網頁所需的背景圖片
```

```
4. 互動
   (1) 搜尋：使用 filter() 方法進行篩選條件篩選，包含如下：公司名稱(模糊)、教育程度(精準)、薪水範圍(精準)
   (2) 分頁：動態計算當前職缺數量作為分頁條件，設定上一頁與下一頁的切換限制
   (3) RWD：透過 window.innerWidth 判斷螢幕大小，自適應需要呈現的職缺數量
   (4) 彈跳窗：點擊工作卡片查看細節按鈕觸發 handleViewDetails ，以彈跳窗顯示所選職缺詳情
              ，並用關閉按鈕觸發 closeModal 清空所選職缺資訊及關閉彈跳窗
```

```
5. 資料流
   (1) 【SearchForm】為父組件管理主邏輯與數據，並以 props 傳遞數據至【JobCard.js】、【Pagination.js】、【Modal.js】，此三項為子組件
   (2)  使用 React 的 useState 和 useEffect 管理篩選條件、職缺列表、模態框等狀態
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

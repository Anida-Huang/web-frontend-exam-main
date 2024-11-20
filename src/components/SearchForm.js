// useState 用來儲存：1.當前狀態的值、2.更新該狀態的方法
// useEffect 用來進行：監聽事件、數據獲取、訂閱、或手動操作 DOM
import React, { useState, useEffect } from 'react'; 
import Pagination from './Pagination'; // 引用分頁組件
import Modal from './Modal'; // 引用工作詳細資訊組件
import JobCard from './JobCard'; // 引用工作資訊組件
import education from '../constants/educationList'; // 引用教育程度文件
import salary from '../constants/salaryList'; // 引用薪水範圍文件
import job from '../constants/jobList'; // 引用工作資訊文件

const SearchForm = () => { 
  // 公司名稱所輸入的文字
  const [compData, setCompanyName] = useState('');
  // 教育程度當前選擇的值
  const [educationData, setEducation] = useState(''); 
  // 薪水範圍當前選擇的值
  const [salaryData, setSalary] = useState(''); 
  // filteredJobs 目前篩選後的工作清單 
  // setFilteredJobs 為符合篩選條件的值
  const [filteredJobs, setFilteredJobs] = useState([]); 
  // 預設當前分頁顯示為第一頁
  const [currentPage, setCurrentPage] = useState(1);
  // 預設工作數量為 6 個
  // setJobsPerPage 為更新函數
  const [jobsPerPage, setJobsPerPage] = useState(6);
  // 預設彈跳窗為關閉狀態
  const [showModal, setShowModal] = useState(false);
  // 預設尚未選中工作項目
  const [selectedJob, setSelectedJob] = useState(null);
  // 預設顯示第一組圖片
  const [currentPhotoGroup, setCurrentPhotoGroup] = useState(0);

  useEffect(() => {
    // 定義函數檢查當前屏幕大小如果 <= 768 則預設工作數量為 4 個，否則為 6 個
    const handleResize = () => setJobsPerPage(window.innerWidth <= 768 ? 4 : 6);
    // 監聽瀏覽器 'resize' 事件，屏幕大小變化後執行 handleResize
    window.addEventListener('resize', handleResize);
    // 初次執行
    handleResize();
    // 返回清理函數，避免原先更新函數中的數據造成衝突
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // 透過符合篩選條件的值找出相對應的工作項目
    setFilteredJobs(job);
  }, []);

  // 定義【條件篩選】按鈕事件
  const handleSearch = (e) => {
    // 防止表單提交刷新頁面
    e.preventDefault();
    // 執行透過符合篩選條件的值找出相對應的工作項目
    setFilteredJobs(
      // 工作資訊文件過濾陣列中符合條件的值
      job.filter(
        (j) =>
            // 當公司名稱為空 或者 工作資訊文件的 companyName 包含文本所輸入文字
           (compData === '' || j.companyName.toLowerCase().includes(compData.toLowerCase().trim())) &&
           // 當教育程度為空 或者 工作資訊文件的 educationId 與 教育程度資訊文件的 educationData 相符
           (educationData === '' || j.educationId === parseInt(educationData)) &&
           // 當薪水範圍為空 或者 工作資訊文件的 salaryId 與 薪水範圍資訊文件的 salaryData 相符
           (salaryData === '' || j.salaryId === parseInt(salaryData))
      )
    );
  };

  // 定義【關閉】按鈕事件
  const closeModal = () => {
    // 將彈跳窗關閉
    setShowModal(false);
    // 清空所選工作項目資訊
    setSelectedJob(null);
  };

  // 定義【查看細節】按鈕事件
  const handleViewDetails = (job) => {
    // 選中工作項目獲取 工作資訊文件 資料
    setSelectedJob(job);
    // 將彈跳窗開啟
    setShowModal(true);
    // 預設圖片以第一組顯示
    setCurrentPhotoGroup(0);
  };

  //定義函數更新當前頁碼
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // 定義上一頁函數：須符合當前頁碼不是第一頁才執行頁碼-1
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  // 定義下一頁函數：須符合當前頁碼<總頁碼才執行頁碼+1
  // jobsPerPage 每頁顯示的職缺數量
  const nextPage = () => currentPage < Math.ceil(filteredJobs.length / jobsPerPage) && setCurrentPage(currentPage + 1);

  // 定義函數計算總頁數
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  // 定義函數返回當前頁需要的職缺數
  const currentJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

  // 檢查 currentPage 和 jobsPerPage 是否有更新
  useEffect(() => {
    console.log("currentPage: ", currentPage);
    console.log("jobsPerPage: ", jobsPerPage);
    console.log("FL: ", filteredJobs.length);
  }, [currentPage, jobsPerPage, filteredJobs.length]);


  // 計算函數確保圖片數量，計算分頁顯示的圖片群組數量
  const totalPhotoGroups = selectedJob?.companyPhoto ? Math.ceil(selectedJob.companyPhoto.length / 4) : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoGroup((prev) => {
        return prev === totalPhotoGroups - 1 ? 0 : prev + 1; // 循環顯示
      });
    }, 3000); // 每 3 秒自動滑動一次

    return () => clearInterval(interval); // 清除定時器
  }, [selectedJob?.companyPhoto.length, totalPhotoGroups]);


  return (
    <div className="form-container d-flex flex-warp justify-content-center align-items-center mt-0">
      {/* 搜索表單 */}
      {/* 點擊條件篩選表單觸發事件 */}
      <form className="row col-12 d-flex flex-warp" onSubmit={handleSearch}>
        <div id="compTitle" className="col-12 d-flex flex-warp justify-content-start">
          <label className="ps-2">適合前端工程師的好工作</label>
        </div>
        <div className="col-sm-12 col-lg-5 form-group d-none d-sm-block">
          <label htmlFor="comp">公司名稱</label>
          {/*compData 為輸入文本的值，當文本值變換，會更新對應狀態*/}
          <input id="comp" type="text" placeholder="輸入公司名稱" className="form-control" value={compData} onChange={(e) => setCompanyName(e.target.value)}/>
        </div>
        <div className="col-sm-12 col-lg-2 form-group d-none d-sm-block">
          <label htmlFor="education">教育程度</label>
          {/*educationData 為選擇的值，當選擇值變換，會更新對應狀態*/}
          <select id="education" className="form-control" value={educationData} onChange={(e) => setEducation(e.target.value)}>
            <option value="">不限</option>
            {education.map((item) => (
              // 取得教育程度資訊文件的 id / label 值
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-12 col-lg-3 form-group d-none d-sm-block">
          <label htmlFor="salary">薪水範圍</label>
          {/*educationData 為選擇的值，當選擇值變換，會更新對應狀態*/}
          <select id="education" className="form-control" value={salaryData} onChange={(e) => setSalary(e.target.value)}>
            <option value="">不限</option>
            {salary.map((item) => (
              // 取得薪水範圍資訊文件的 id / label 值
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-12 col-lg-2 form-group d-flex align-items-end">
          <div className="w-100 d-none d-sm-block">
            <button type="submit" className="btn btn-primary submit-btn">
              條件搜尋
            </button>
          </div>
        </div>        

        {/* 工作列表 */}
        {/* 將資訊傳遞至【JobCard.js】進行渲染作為其 props */}
        {currentJobs.map((job, index) => (
          <JobCard key={index} job={job} education={education} salary={salary} handleViewDetails={handleViewDetails}/>
        ))}
            
        {/* 分頁 */}
        {/* 將資訊傳遞至【Pagination.js】進行渲染作為其 props */}
        <Pagination currentPage={currentPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} paginate={paginate}/>

        {/* 詳細資訊 */}
        {/* 將資訊傳遞至【Pagination.js】進行渲染作為其 props */}
        <Modal showModal={showModal} selectedJob={selectedJob} currentPhotoGroup={currentPhotoGroup} 
        totalPhotoGroups={totalPhotoGroups} setCurrentPhotoGroup={setCurrentPhotoGroup} closeModal={closeModal}/>
      </form>
    </div>
  );
};

export default SearchForm;

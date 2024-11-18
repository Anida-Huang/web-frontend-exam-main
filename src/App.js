import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // 引入 Bootstrap Icon
import React, { useState, useEffect } from 'react';
import education from "../src/constants/educationList"; //引入 教育程度
import salary from "../src/constants/salaryList"; //引入 薪水範圍
import job from "../src/constants/jobList"; //引入 工作資訊
import './styles/app.scss'; //引入 Sass
// 引入照片 
import Background from './img/Background-01.png';
import Character1 from './img/Character-01.png';
import Character2 from './img/Character-02.png';
import LeftEye from './img/Left-Eye-01.png';
import RightEye from './img/Right-Eye-01.png';
import Logo from './img/Logo-01.png';


function App() {
  // 用于存储用户选择的筛选条件
  const [compData, setCompanyName] = useState('');
  const [educationData, setEducation] = useState('');
  const [salaryData, setSalary] = useState('');
  
  // 用于存储筛选后的工作数据
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [jobsPerPage, setJobsPerPage] = useState(6); // 每页显示的工作数量，默认为6
  
  // 根据窗口大小设置每页显示的工作数量
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setJobsPerPage(4); // 手机屏幕显示 4 个
      } else {
        setJobsPerPage(6); // 平板和电脑显示 6 个
      }
    };
  
    handleResize(); // 初始设置
  
    // 添加窗口大小变化监听器
    window.addEventListener('resize', handleResize);
  
    // 清理监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const [currentPhotoGroup, setCurrentPhotoGroup] = useState(0);
  const photosPerGroup = 3;

  // 状态管理：控制弹出框显示与否
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);  // 打开模态框
    setCurrentPhotoGroup(0); // 每次打开从第一个分页组开始
  };

  const closeModal = () => {
    setShowModal(false); // 关闭模态框
    setSelectedJob(null); // 清除选中的工作
  };

  const totalPhotoGroups = selectedJob
    ? Math.max(0, selectedJob.companyPhoto.length - photosPerGroup + 1)
    : 0;

  // 自动轮播的间隔时间（例如：每3秒切换一次）
  const autoSlideInterval = 3000;

  // 使用 useEffect 设置定时器来自动切换
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhotoGroup((prevGroup) => {
        return prevGroup === totalPhotoGroups ? 0 : prevGroup + 1;
      });
    }, autoSlideInterval);
  
    // 清除定时器
    return () => {
      clearInterval(intervalId);
    };
  }, [totalPhotoGroups]);

  // 处理表单提交
  const handleSearch = (e) => {
    e.preventDefault(); // 阻止表单提交的默认行为

    // 根据筛选条件过滤工作数据
    const filtered = job.filter((job) => {
      console.log('公司名稱：', compData);
      console.log('教育程度：', educationData);
      console.log('薪水範圍：', salaryData);
      return (
        (compData === '' || job.companyName.toLowerCase().includes(compData.toLowerCase().trim())) &&
        (educationData === '' || job.educationId === parseInt(educationData)) &&
        (salaryData === '' || job.salaryId === parseInt(salaryData))
      );
    });

    console.log(filtered);

    // 设置过滤后的工作数据
    setFilteredJobs(filtered);
    setCurrentPage(1); // 搜索后重置到第一页
  };

  // 计算分页数据
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob); 

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // 更新当前页码
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  
  const nextPage = () => {
    const totalPages = Math.ceil((filteredJobs.length > 0 ? filteredJobs.length : job.length) / jobsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="app">
      {/* 圖片區域 */}
      <div className="image-container">
        <img src={Background} className="background-img" alt="Background" />
        <img src={Character2} className="character character2" alt="Character 2" />
        <img src={Character1} className="character character1" alt="Character 1" />
        <img src={LeftEye} className="character LeftEye" alt="LeftEye" />
        <img src={RightEye} className="character RightEye" alt="RightEye" />
        <img src={Logo} className="character Logo" alt="Logo" />
      </div>

      {/* 表單區域 */}
      <div className="form-container d-flex flex-warp justify-content-center align-items-center mt-0 ">
        <form className="row col-12 d-flex flex-warp">
          <div id="compTitle" className="col-12 d-flex flex-warp justify-content-start">
            <label className="ps-2">適合前端工程師的好工作</label>
          </div>
          {/* 公司名稱输入框 */}
          <div className="col-sm-12 col-lg-5 form-group d-none d-sm-block">
          <label htmlFor="comp">公司名稱</label>
            <input id="comp" type="text" placeholder="輸入公司名稱" className="form-control" value={compData} onChange={(e) => setCompanyName(e.target.value)}/>
          </div>

          {/* 教育程度下拉框 */}
          <div className="col-sm-12 col-lg-2 form-group d-none d-sm-block">
            <label htmlFor="education">教育程度</label>
            <select id="education" className="form-control" value={educationData} onChange={(e) => setEducation(e.target.value)}>
              <option value="">不限</option>
              {education.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* 薪水範圍下拉框 */}
          <div className="col-sm-12 col-lg-3 form-group d-none d-sm-block">
            <label htmlFor="salary">薪水範圍</label>
            <select id="education" className="form-control" value={salaryData} onChange={(e) => setSalary(e.target.value)}>
              <option value="">不限</option>
              {salary.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* 按钮 */}
          <div className="col-sm-12 col-lg-2 form-group d-flex align-items-end">
            <div className="w-100 d-none d-sm-block">
              <button type="submit" className="btn btn-primary submit-btn" onClick={handleSearch}>
                條件搜尋
              </button>
            </div>
          </div>  

          {/* 显示工作信息 */}
          <div className="row col-12 flex-wrap justify-content-start m-0 p-0">
            {currentJobs.length > 0 ? (
              currentJobs.map((job, index) => (
                <div key={index} className="col-sm-12 col-md-6 col-lg-4 form-group">
                  <div className="block-card p-3 border hover-effect">
                    <h5>{job.companyName}</h5>
                    <p>
                      <i className="bi bi-person"></i> {job.jobTitle}
                    </p>
                    <p>
                      <i className="bi bi-book"></i> {education.find((e) => e.id === job.educationId)?.label}
                    </p>
                    <p>
                      <i className="bi bi-currency-dollar"></i> 薪水範圍 {salary.find((s) => s.id === job.salaryId)?.label}
                    </p>
                    <p>{job.preview}</p>
                    {/* 查看细节按钮 */}
                    <div className="col-12 flex-wrap text-center m-0 p-0">
                      <button className="btn btn-link text-decoration-none p-0" onClick={(e) => {e.preventDefault(); handleViewDetails(job);}}>
                        查看細節
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // 默认显示所有数据
              job.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage).map((job, index) => (
                <div key={index} className="col-sm-12 col-md-6 col-lg-4 form-group">
                  <div className="block-card p-3 border hover-effect">
                    <h5>{job.companyName}</h5>
                    <p>
                      <i className="bi bi-person"></i> {job.jobTitle}
                    </p>
                    <p>
                      <i className="bi bi-book"></i> {education.find((e) => e.id === job.educationId)?.label}
                    </p>
                    <p>
                      <i className="bi bi-currency-dollar"></i> 薪水範圍 {salary.find((s) => s.id === job.salaryId)?.label}
                    </p>
                    <p>{job.preview}</p>
                    <div className="col-12 flex-wrap text-center m-0 p-0">
                      <button className="btn btn-link text-decoration-none p-0" onClick={(e) => {e.preventDefault(); handleViewDetails(job);}}>
                        查看細節
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 模态框显示详细信息 */}
          {showModal && selectedJob && (
            <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">詳細資訊</h5>
                  </div>
                  <div className="modal-body">
                    <h5>{selectedJob.companyName}</h5>
                    {/* 显示图片 */}
                    {selectedJob.companyPhoto && Array.isArray(selectedJob.companyPhoto) && (
                      <div className="photo-gallery">
                        <div
                          className="col-12 m-0 d-flex justify-content-center"
                          style={{
                            overflow: "hidden",
                          }}
                        >
                          <div
                            className="col-12 d-flex"
                            style={{
                              transform: `translateX(-${currentPhotoGroup * 155}px)`,
                              transition: "transform 0.5s ease",
                            }}
                          >
                            {selectedJob.companyPhoto.map((photoUrl, index) => (
                              <img
                                key={index}
                                src={`${photoUrl}?unique=${index}`}
                                alt={`图片 ${index + 1}`}
                                className="img-thumbnail col-4"
                                style={{
                                  objectFit: "cover",
                                  flex: "0 0 auto",
                                  border: "0",
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                          {Array.from({ length: totalPhotoGroups }).map((_, groupIndex) => (
                            <div
                              key={groupIndex}
                              className={`mx-1 ${
                                currentPhotoGroup === groupIndex ? "bg-primary" : "bg-secondary"
                              }`}
                              onClick={() => setCurrentPhotoGroup(groupIndex)}
                            ></div>
                          ))}
                        </div>
                      </div>
                    )}
                    <h6 style={{fontWeight: 'bolder'}}>工作內容</h6>
                    {/* 动态渲染 description 字段 */}
                      {selectedJob.description && (
                        <div
                          className="job-description"
                          dangerouslySetInnerHTML={{ __html: selectedJob.description }}
                        />
                      )}
                    {/* 可以添加更多详细信息 */}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" style={{backgroundColor: 'transparent', border: '0', color: '#4D4D4D'}} onClick={closeModal}>
                      關閉
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 分页 */}
          {(filteredJobs.length > jobsPerPage || job.length > jobsPerPage) && (
            <div className="pagination mt-4 d-flex align-items-center">
              <div className="col-12 d-flex flex-wrap justify-content-center align-items-center">
                {/* 左箭头 */}
                <button className="btn btn-light mx-1" onClick={(e) => {e.preventDefault(); prevPage();}} disabled={currentPage === 1}  >
                  &lt;
                </button>

                {/* 页码按钮 */}
                {Array.from(
                  { length: Math.ceil((filteredJobs.length > 0 ? filteredJobs.length : job.length) / jobsPerPage) },
                  (_, i) => (
                    <button key={i} className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-light'} mx-1 m-1`} onClick={(e) => {e.preventDefault(); paginate(i + 1);}}>
                      {i + 1}
                    </button>
                  )
                )}

                {/* 右箭头 */}
                <button className="btn btn-light mx-1" onClick={(e) => {e.preventDefault(); nextPage();}} disabled={currentPage === Math.ceil((filteredJobs.length > 0 ? filteredJobs.length : job.length) / jobsPerPage)} >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;

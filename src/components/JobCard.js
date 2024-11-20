import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // 引入 Bootstrap Icon
import '../styles/app.scss'; //引入 Sass

const JobCard = ({ job, education, salary, handleViewDetails }) => (
  <div className="col-sm-12 col-md-6 col-lg-4 form-group">
    <div className="block-card p-3 border hover-effect">
      <h5>{job.companyName}</h5>
      <p>
        <i className="bi bi-person"></i> {job.jobTitle}
      </p>
      <p>
      {/* 當教育程度資訊文件 id 與 工作資訊文件 educationId 相符則顯示對應文本 */}
        <i className="bi bi-book"></i> {education.find((e) => e.id === job.educationId)?.label}
      </p>
      <p>
        {/* 當薪水範圍資訊文件 id 與 工作資訊文件 salaryId 相符則顯示對應文本 */}
        <i className="bi bi-currency-dollar"></i> 薪水範圍 {salary.find((s) => s.id === job.salaryId)?.label}
      </p>
      <p>{job.preview}</p>
      <div className="col-12 flex-wrap text-center m-0 p-0">
        {/* 點擊 查看細節 按鈕觸發事件 */}
        <button className="btn btn-link text-decoration-none p-0" onClick={() => handleViewDetails(job)}>
          查看細節
        </button>
      </div>
    </div>
  </div>
);

export default JobCard;

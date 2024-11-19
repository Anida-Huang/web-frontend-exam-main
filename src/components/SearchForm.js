import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import Modal from './Modal';
import JobCard from './JobCard';
import education from '../constants/educationList';
import salary from '../constants/salaryList';
import job from '../constants/jobList';

const SearchForm = () => {
  const [compData, setCompanyName] = useState('');
  const [educationData, setEducation] = useState('');
  const [salaryData, setSalary] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPhotoGroup, setCurrentPhotoGroup] = useState(0);

  useEffect(() => {
    const handleResize = () => setJobsPerPage(window.innerWidth <= 768 ? 4 : 6);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setFilteredJobs(job);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setFilteredJobs(
      job.filter(
        (j) =>
           (compData === '' || j.companyName.toLowerCase().includes(compData.toLowerCase().trim())) &&
           (educationData === '' || j.educationId === parseInt(educationData)) &&
           (salaryData === '' || j.salaryId === parseInt(salaryData))
      )
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    setCurrentPhotoGroup(0);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const nextPage = () => currentPage < Math.ceil(filteredJobs.length / jobsPerPage) && setCurrentPage(currentPage + 1);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);
  const totalPhotoGroups = selectedJob?.companyPhoto ? Math.ceil(selectedJob.companyPhoto.length / 4) : 0;

  return (
    <div className="form-container d-flex flex-warp justify-content-center align-items-center mt-0">
      {/* 搜索表單 */}
      <form className="row col-12 d-flex flex-warp" onSubmit={handleSearch}>
        <div id="compTitle" className="col-12 d-flex flex-warp justify-content-start">
          <label className="ps-2">適合前端工程師的好工作</label>
        </div>
        <div className="col-sm-12 col-lg-5 form-group d-none d-sm-block">
          <label htmlFor="comp">公司名稱</label>
          <input
            id="comp"
            type="text"
            placeholder="輸入公司名稱"
            className="form-control"
            value={compData}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
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
        <div className="col-sm-12 col-lg-2 form-group d-flex align-items-end">
          <div className="w-100 d-none d-sm-block">
            <button type="submit" className="btn btn-primary submit-btn">
              條件搜尋
            </button>
          </div>
        </div>        

        {/* 工作列表 */}
        {currentJobs.map((job, index) => (
                <JobCard
                key={index}
                job={job}
                education={education}
                salary={salary}
                handleViewDetails={handleViewDetails}
                />
            ))}
            
        {/* 分頁 */}
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            paginate={paginate}
        />

        {/* 詳細資訊模態框 */}
        <Modal
            showModal={showModal}
            selectedJob={selectedJob}
            currentPhotoGroup={currentPhotoGroup}
            totalPhotoGroups={totalPhotoGroups}
            setCurrentPhotoGroup={setCurrentPhotoGroup}
            closeModal={closeModal}
        />
      </form>
    </div>
  );
};

export default SearchForm;

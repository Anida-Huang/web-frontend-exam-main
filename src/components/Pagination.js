import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // 引入 Bootstrap Icon
import '../styles/app.scss'; //引入 Sass

const Pagination = ({ currentPage, totalPages, prevPage, nextPage, paginate }) => (
  <div className="pagination mt-4 d-flex align-items-center">
    <div className="col-12 d-flex flex-wrap justify-content-center align-items-center">
      <button className="btn btn-light mx-1" onClick={prevPage} disabled={currentPage === 1}>
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-light'} mx-1 m-1`}
          onClick={() => paginate(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button className="btn btn-light mx-1" onClick={nextPage} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  </div>
);

export default Pagination;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // 引入 Bootstrap Icon
import '../styles/app.scss'; //引入 Sass

const Modal = ({ showModal, selectedJob, currentPhotoGroup, totalPhotoGroups, setCurrentPhotoGroup, closeModal }) => {
  if (!showModal || !selectedJob) return null;

  return (
    <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">詳細資訊</h5>
          </div>
          <div className="modal-body">
            <h5>{selectedJob.companyName}</h5>
            {selectedJob.companyPhoto && Array.isArray(selectedJob.companyPhoto) && (
              <div className="photo-gallery">
                <div className="col-12 m-0 d-flex justify-content-center" style={{ overflow: 'hidden' }}>
                  <div
                    className="col-12 d-flex"
                    style={{
                      transform: `translateX(-${currentPhotoGroup * 155}px)`,
                      transition: 'transform 0.5s ease',
                    }}
                  >
                    {selectedJob.companyPhoto.map((photoUrl, index) => (
                      <img
                        key={index}
                        src={`${photoUrl}?unique=${index}`}
                        alt={`图片 ${index + 1}`}
                        className="img-thumbnail col-4"
                        style={{
                          objectFit: 'cover',
                          flex: '0 0 auto',
                          border: '0',
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  {Array.from({ length: totalPhotoGroups }).map((_, groupIndex) => (
                    <div
                      key={groupIndex}
                      className={`mx-1 ${currentPhotoGroup === groupIndex ? 'bg-primary' : 'bg-secondary'}`}
                      onClick={() => setCurrentPhotoGroup(groupIndex)}
                    ></div>
                  ))}
                </div>
              </div>
            )}
            <h6 style={{ fontWeight: 'bolder' }}>工作內容</h6>
            {selectedJob.description && (
              <div
                className="job-description"
                dangerouslySetInnerHTML={{ __html: selectedJob.description }}
              />
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              style={{ backgroundColor: 'transparent', border: '0', color: '#4D4D4D' }}
              onClick={closeModal}
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

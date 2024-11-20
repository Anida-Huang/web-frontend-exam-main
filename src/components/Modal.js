import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // 引入 Bootstrap Icon
import '../styles/app.scss'; //引入 Sass

const Modal = ({ showModal, selectedJob, currentPhotoGroup, totalPhotoGroups, setCurrentPhotoGroup, closeModal }) => {
  if (!showModal || !selectedJob) return null;

  return (
    <div className="modal fade show d-block" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">詳細資訊</h5>
          </div>
          <div className="modal-body">
            <h5>{selectedJob.companyName}</h5>
            {selectedJob.companyPhoto && Array.isArray(selectedJob.companyPhoto) && (
              <div className="photo-gallery">
                <div className="col-12 m-0 d-flex justify-content-center overflow-hidden">
                {/* 設定切換頁滑動樣式 */}
                  <div className="col-12 d-flex" style={{transform: `translateX(-${currentPhotoGroup * 155}px)`, transition: 'transform 0.5s ease',}}>
                    {selectedJob.companyPhoto.map((photoUrl, index) => (
                      //設定隨機圖片的唯一值且加上一個唯一參數
                      <img key={index} src={`${photoUrl}?unique=${index}`} alt={`圖片 ${index + 1}`}
                        className="img-thumbnail col-4 border-0" style={{objectFit: 'cover', flex: '0 0 auto'}}/>
                    ))}
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  {/* 根據總頁數動態生成頁碼按鈕 */}
                  {Array.from({ length: totalPhotoGroups }).map((_, groupIndex) => (
                    <div key={groupIndex} className={`mx-1 ${currentPhotoGroup === groupIndex ? 'bg-primary' : 'bg-secondary'}`}
                      onClick={() => setCurrentPhotoGroup(groupIndex)}>                        
                    </div>
                  ))}
                </div>
              </div>
            )}
            <h6 style={{ fontWeight: 'bolder' }}>工作內容</h6>
            {/* 檢查 selectedJob.description 是否有值，如果有就將原始的 HTML 插入到組件中 */}
            {selectedJob.description && (
              <div className="job-description" dangerouslySetInnerHTML={{ __html: selectedJob.description }}/>
            )}
          </div>
          {/* 點擊觸發關閉彈跳窗功能 */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary bg-transparent border-0" style={{ color: '#4D4D4D' }} onClick={closeModal}>
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // 引入 Bootstrap Icon
import React from 'react';
import SearchForm from './components/SearchForm'; // 引用 SearchForm 組件
import './styles/app.scss'; //引入 Sass
// 引入照片 
import Background from './img/Background-01.png';
import Character1 from './img/Character-01.png';
import Character2 from './img/Character-02.png';
import LeftEye from './img/Left-Eye-01.png';
import RightEye from './img/Right-Eye-01.png';
import Logo from './img/Logo-01.png';


function App() {
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

      {/* 主內容區域，渲染 SearchForm */}
      <main>
        <SearchForm />
      </main>
    </div>
  );
}

export default App;

'use client'
import { useState } from 'react';

export default function ProjectPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      alert('파일을 선택해 주세요!');
      return;
    }

    // 파일을 서버로 업로드
    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/file', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('업로드 성공:', data);
      })
      .catch((error) => {
        console.error('업로드 실패:', error);
      });
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div style={{ width: 'auto', height: 'auto', margin: 'auto 0px', textAlign: 'center' }}>
        <h1 style={{ width: 'auto', height: 'auto', display: 'block' }}>프로젝트 페이지</h1>
        <p style={{ width: 'auto', height: 'auto', display: 'block' }}>이곳에서 프로젝트를 업로드하세요.</p>

        {/* 파일 업로드 input hidden */}
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        
        {/* 파일 업로드 버튼 */}
        <button onClick={() => document.getElementById('fileInput').click()}>
          파일 업로드
        </button>

        {/* 파일 이름 표시 */}
        {file && <p>선택된 파일: {file.name}</p>}

        {/* 업로드 버튼 */}
        <button onClick={handleUpload}>업로드</button>
      </div>
    </div>
  );
}

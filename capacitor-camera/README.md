# 글자 인식 (Toy-Project)
> **Google Vision API를 활용한 이미지 텍스트 추출 및 관리 서비스**

사용자가 카메라로 촬영하거나 업로드한 이미지 속의 글자를 AI(Google OCR)가 실시간으로 분석하여 텍스트 데이터로 변환해주는 토이 프로젝트입니다.

---

## ✨ 핵심 기능 (Key Features)
- **📸 이미지 텍스트 인식**: Google Cloud Vision API를 활용한 고정밀 OCR 기능
- **📱 모바일 최적화**: Capacitor SDK를 사용하여 카메라 권한 제어 및 네이티브 환경 대응
- **🔒 보안 강화**: `.gitignore` 설정을 통해 API 키(`google-key.json`) 및 환경 변수 노출 방지
- **⚡ 실시간 통신**: React(Frontend)와 Node.js(Backend) 간의 REST API 통신

## 🛠 사용 기술 (Tech Stack)
- **Frontend**: React.js, Capacitor (Camera/Filesystem)
- **Backend**: Node.js, Express
- **Library**: Axios (API 통신), Google Cloud Vision SDK

---

## 📺 실행 화면 (Screenshots)
<img width="590" height="1278" alt="KakaoTalk_Photo_2026-03-20-05-17-01 001" src="https://github.com/user-attachments/assets/d0ec4964-5bdd-433c-b570-467915141b8b" />
![KakaoTalk_Photo_2026-03-20-05-17-01 002](https://github.com/user-attachments/assets/0a30a993-d712-48e4-a337-23796a14be5e)
![KakaoTalk_Photo_2026-03-20-05-17-01 003](https://github.com/user-attachments/assets/3dcab0ab-0f62-472d-9950-f1e64d16a03a)



---

## 🚀 프로젝트 구조 (Project Structure)
```text
capacitor-camera/
├── frontend/          # React 프론트엔드 코드
├── backend/           # Node.js 백엔드 (Google API 연동)
└── .gitignore         # 보안 및 빌드 제외 설정 파일

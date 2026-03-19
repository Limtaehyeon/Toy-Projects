# 글자 인식 (Toy-Project)
> **Google Vision API를 활용한 이미지 텍스트 추출 및 관리 서비스**

사용자가 카메라로 촬영하거나 업로드한 이미지 속의 글자를 AI(Google OCR)가 실시간으로 분석하여 텍스트 데이터로 변환해주는 토이 프로젝트입니다.

---

## 핵심 기능 
- **이미지 텍스트 인식**: Google Cloud Vision API를 활용한 고정밀 OCR 기능
- **모바일 최적화**: Capacitor SDK를 사용하여 카메라 권한 제어 및 네이티브 환경 대응
- **보안 강화**: `.gitignore` 설정을 통해 API 키(`google-key.json`) 및 환경 변수 노출 방지
- **실시간 통신**: React(Frontend)와 Node.js(Backend) 간의 REST API 통신

## 사용 기술
- **Frontend**: React.js, Capacitor (Camera/Filesystem)
- **Backend**: Node.js, Express
- **Library**: Axios (API 통신), Google Cloud Vision SDK

---

## 실행 화면 (Screenshots)
| 1. 스캔 준비 | 2. 사진 촬영 완료 | 3. 글자 인식 결과 |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/8872452a-1030-450e-9a85-1db34867a84d" width="250"/> | <img src="https://github.com/user-attachments/assets/a59f903a-c6a4-475e-b8e4-80aaae8ff7ea" width="250"/> | <img src="https://github.com/user-attachments/assets/d47a479a-9916-49fc-85d0-8cd56af6971a" width="250"/> |




---

## 프로젝트 구조 (Project Structure)
```text
capacitor-camera/
├── frontend/          # React 프론트엔드 코드
├── backend/           # Node.js 백엔드 (Google API 연동)
└── .gitignore         # 보안 및 빌드 제외 설정 파일
└── README.md

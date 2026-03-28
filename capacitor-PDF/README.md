# PDF 요약 리포트 서비스 (Toy-Project)

> **Capacitor와 jsPDF를 활용한 텍스트 기반 PDF 문서 생성 및 저장 서비스**

사용자가 입력한 텍스트를 분석하여 한 페이지씩 깔끔한 카드 형태의 PDF 리포트로 변환하고, 모바일 기기의 문서 폴더에 직접 저장할 수 있는 유틸리티 도구입니다.

---

## 핵심 기능

- **텍스트-PDF 자동 변환**: 입력된 문장을 감지하여 자동으로 페이지를 분할하고 PDF 문서 생성
- **모바일 미리보기 인터페이스**: `Swiper.js`와 `react-pdf`를 결합하여 생성된 PDF를 실제 리포트처럼 넘겨보는 기능 구현
- **고해상도 캔버스 캡처**: `html2canvas`를 활용하여 웹 UI 디자인을 유지한 채 PDF 내부에 고품질 이미지 삽입
- **네이티브 파일 시스템 저장**: `Capacitor Filesystem` API를 통해 모바일 기기(`Documents` 디렉토리)에 실제 파일 저장
- **상태 자동 초기화**: 리포트 저장 완료 시 사용자의 편의를 위해 입력창 데이터를 자동으로 초기화하는 로직 포함

## 실행 화면

|                             1. 메인 작성 화면                             |                         2. 글 입력                        |                           3. PDF 미리보기                            |                          4. 저장 완료                          |
| :-----------------------------------------------------------------------: | :-----------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :------
-----------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/20ccee20-70d9-4184-8386-2abc1e31e821" width="180"/> | <img src="https://github.com/user-attachments/assets/ca66c8e4-2656-44f0-836b-fb78622dce7e" width="180"/> | <img src=
"https://github.com/user-attachments/assets/5a1214e2-b9c6-4b09-a43d-0005bdfe4869" width="180"/> | <img src= "https://github.com/user-attachments/assets/83408097-6994-4020-ba02-3eb906322a8e" width="180"/> |


## 프로젝트 구조

```text
capacitor-PDF/
├── src/
│   ├── App.jsx        # PDF 생성 엔진, Swiper 미리보기 모달 및 메인 UI
│   ├── main.jsx       # React 엔트리 포인트
│   └── index.css      # 전역 스타일 및 Pretendard 폰트 설정
├── public/            # 정적 리소스 및 PDF 워커 파일
├── capacitor.config.json # 네이티브 앱 설정
└── .gitignore         # node_modules 및 빌드 파일 제외 설정
```

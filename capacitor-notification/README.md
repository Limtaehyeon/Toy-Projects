# 루틴 알림 서비스 (Toy-Project)

> **Capacitor LocalNotifications를 활용한 개인화된 일과 알림 서비스**

사용자가 본인의 일과에 맞춰 아침, 점심, 저녁 알림 시간을 자유롭게 설정하고, 정해진 시간에 모바일 시스템 알림을 받을 수 있도록 돕는 루틴 관리 도구입니다.

---

## 핵심 기능

- **커스텀 루틴 설정**: 사용자가 직접 원하는 시간을 입력하여 아침/점심/저녁 알림 예약
- **스마트 토글 제어**: 메인 스위치를 통해 전체 알림 활성화/비활성화를 실시간으로 제어
- **데이터 영속성 유지**: `localStorage`를 활용하여 앱 종료 후 재실행 시에도 설정값 자동 복원
- **네이티브 알림 연동**: Capacitor SDK를 사용하여 OS 레벨의 로컬 알림 시스템 스케줄링 구현

## 사용 기술

- **Frontend**: React.js (Hooks, Functional Components)
- **Native Bridge**: Capacitor (LocalNotifications, Core)
- **Styling**: Inline CSS (Glassmorphism & Dark Mode UI)
- **Storage**: Web Storage API (localStorage)

---

## 실행 화면

|   1. 초기 화면    |                 2. 알림 비활성 (OFF)                 |                   3. 알림 활성 (ON)                   |           4. 알림 모달                  |
| :-----------------------: | :----------------------------------------------------: | :------------------------------------------------------: |  :----------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/5b311c6e-87d6-4513-a0f2-8e68419ea7fe" width="250"/> | <img src="https://github.com/user-attachments/assets/460cc317-ec9a-4c74-b8d5-f23f6293e44d" width="250"/> | <img src="https://github.com/user-attachments/assets/8d6ff2c2-5a2f-43e4-981c-3bb72fc57398" width="250"/> | <img src="https://github.com/user-attachments/assets/95a22215-6e95-4e5d-9041-0908f4f25d11" width="250"/> |






## 프로젝트 구조 (Project Structure)

```text
capacitor-notification/
├── src/
│   ├── App.js         # 알림 설정 메인 로직 및 UI 디자인
│   └── index.js       # 엔트리 포인트
├── public/            # 정적 리소스 파일
└── .gitignore         # 보안 및 빌드 제외 설정 파일
└── README.md
```

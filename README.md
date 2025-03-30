# 📌 Vue.js 기반 음식 및 메뉴 리뷰 프론트엔드

✅ **Vue 3 + Composition API + Pinia 기반 사용자/관리자용 리뷰 웹 애플리케이션**  
✅ **메뉴 조회, 리뷰 작성, 관리자 승인 기능 제공**  
✅ **Axios를 통한 FastAPI 백엔드 연동**  
✅ **Pinia로 상태 관리, 커스텀 유틸 함수 및 리소스 관리**

---

## 📌 프로젝트 개요

이 프로젝트는 **Vue.js** 기반의 싱글 페이지 웹 애플리케이션으로, 사용자가 음식 메뉴에 대한 리뷰를 작성하고 관리자는 리뷰를 승인할 수 있는 플랫폼입니다.  
**FastAPI 백엔드**와 연동되며, 컴포넌트 기반 구조와 Pinia 상태 관리, Axios API 통신을 활용해 효율적인 UX를 제공합니다.

🚀 **주요 기능**
- 메뉴 목록 조회 및 카드 UI 제공
- 리뷰 작성 및 완료 페이지 제공
- 관리자 리뷰 승인 페이지
- Pinia로 상태 관리
- Axios로 백엔드 API 연동
- 이미지 및 웹폰트 등 정적 리소스 활용

---

## 📁 디렉토리 구조

```plaintext
📂 src/
├── 📂 assets/              # 정적 리소스 (이미지, 폰트 등)
│   ├── bapp.png
│   ├── calendar.png
│   ├── home.png
│   ├── GmarketSansTTFBold.ttf
│   ├── GmarketSansTTFLight.ttf
│   └── GmarketSansTTFMedium.ttf
│
├── 📂 components/          # 재사용 가능한 UI 컴포넌트
│   ├── Header.vue
│   ├── MenuCard.vue
│   └── ReviewCard.vue
│
├── 📂 router/              # Vue Router 설정
│   └── index.js
│
├── 📂 store/               # Pinia 상태 관리 스토어
│   ├── dateStore.js
│   ├── logStore.js
│   └── menuStore.js
│
├── 📂 utils/               # 유틸리티 함수
│   └── KSTDate.js         # 한국 시간 변환 유틸
│
├── 📂 views/               # 주요 페이지(View)
│   ├── AdminView.vue
│   ├── HomeView.vue
│   ├── MenusView.vue
│   ├── ReviewView.vue
│   └── ReviewCompletedView.vue
│
├── main.js                # 애플리케이션 진입점
├── App.vue                # 루트 컴포넌트
└── vite.config.js         # Vite 설정
```

---

## 📦 사용 기술 스택

| 카테고리 | 기술 |
|----------|------|
| **프론트엔드 프레임워크** | Vue 3 (Composition API) |
| **라우팅** | Vue Router |
| **상태 관리** | Pinia |
| **API 통신** | Axios |
| **빌드 도구** | Vite |
| **폰트/이미지** | assets 디렉토리 관리 |

---

## 🚀 실행 방법

### 1️⃣ 프로젝트 클론
```bash
git clone https://github.com/your-repo/front-end.git
cd front-end
```

### 2️⃣ 패키지 설치
```bash
npm install
```

### 3️⃣ 개발 서버 실행
```bash
npm run dev
```

> 기본 주소: `http://localhost:5173`

---

## 🌐 페이지 라우팅 정보

| 경로 | 페이지 컴포넌트 | 설명 |
|------|------------------|------|
| `/` | `HomeView.vue` | 메인 메뉴 카드 페이지 |
| `/menus` | `MenusView.vue` | 메뉴 목록 전체 조회 |
| `/review` | `ReviewView.vue` | 리뷰 작성 폼 |
| `/review-completed` | `ReviewCompletedView.vue` | 리뷰 작성 완료 안내 |
| `/admin` | `AdminView.vue` | 관리자 리뷰 승인 화면 |

---

## 🔄 상태 관리 (Pinia Store)

| 스토어 | 설명 |
|--------|------|
| `dateStore.js` | 선택된 날짜 관리 |
| `logStore.js` | 유저의 리뷰/접속 기록 관련 상태 |
| `menuStore.js` | 메뉴 데이터 관리 및 캐싱 등 |

---

## 🛠 유틸 함수

| 파일 | 설명 |
|------|------|
| `KSTDate.js` | UTC → KST 변환 유틸리티 함수 제공 |

---

## 📌 백엔드 연동

> 이 프론트엔드는 아래 FastAPI 프로젝트와 연동됩니다:

- [🍽️ FastAPI 기반 음식 및 메뉴 관리 시스템](https://github.com/haeri-ne/back-end)

---
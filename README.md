# 실로스 성형외과 홈페이지

> **실리프팅은 실로스** - 나를 위한 커스텀 리프팅

실로스 성형외과의 브랜드 정체성을 반영한 모바일 퍼스트 홈페이지입니다.

## 🎯 프로젝트 개요

- **목표**: 실로스 성형외과의 브랜드 정체성을 반영한 모바일 퍼스트 홈페이지 구축
- **개발 기간**: 30일 (2025.7.30 ~ 2025.8.29)
- **핵심 메시지**: "실리프팅은 실로스" - 리프팅 전문병원으로서의 차별화된 포지셔닝

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod
- **Animation**: Framer Motion
- **Icons**: Lucide React

### Backend Integration
- **API Client**: Axios
- **Data Fetching**: React Query
- **Image Optimization**: Next.js Image + Sharp
- **SEO**: Next SEO

### Development Tools
- **Code Quality**: ESLint + Prettier
- **Type Checking**: TypeScript (strict mode)
- **Package Manager**: npm/yarn/pnpm

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 18 이상
- npm, yarn, 또는 pnpm

### 설치 및 실행

1. **자동 설정 (권장)**
   ```bash
   curl -o setup.sh https://raw.githubusercontent.com/your-repo/silos-clinic-website/main/setup.sh
   chmod +x setup.sh
   ./setup.sh
   ```

2. **수동 설정**
   ```bash
   # 프로젝트 클론
   git clone https://github.com/your-repo/silos-clinic-website.git
   cd silos-clinic-website
   
   # 의존성 설치
   npm install
   # 또는
   yarn install
   # 또는
   pnpm install
   
   # 환경변수 설정
   cp .env.example .env.local
   # .env.local 파일을 편집하여 실제 값으로 변경
   
   # 개발 서버 실행
   npm run dev
   # 또는
   yarn dev
   # 또는
   pnpm dev
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

## 📁 프로젝트 구조

```
silos-clinic-website/
├── public/                     # 정적 파일
│   ├── images/                 # 이미지 파일
│   │   ├── logo/              # 로고
│   │   ├── banners/           # 메인 배너
│   │   ├── procedures/        # 시술 이미지
│   │   └── before-after/      # 전후 사진
│   └── icons/                 # 아이콘
├── src/
│   ├── app/                   # Next.js 13+ App Router
│   │   ├── about/             # 병원소개
│   │   ├── procedures/        # 시술정보
│   │   ├── gallery/           # 전후사진
│   │   └── consultation/      # 상담/예약
│   ├── components/            # 재사용 컴포넌트
│   │   ├── ui/               # 기본 UI 컴포넌트
│   │   ├── layout/           # 레이아웃 컴포넌트
│   │   ├── sections/         # 페이지 섹션
│   │   └── forms/            # 폼 컴포넌트
│   ├── hooks/                # 커스텀 훅
│   ├── lib/                  # 라이브러리 설정
│   ├── types/                # TypeScript 타입
│   └── utils/                # 유틸리티 함수
├── .env.example              # 환경변수 예시
├── tailwind.config.js        # Tailwind 설정
├── next.config.js            # Next.js 설정
└── package.json              # 프로젝트 설정
```

## 🎨 디자인 시스템

### 브랜드 컬러
- **Primary**: 티파니 블루 (#2dd4bf)
- **Secondary**: 의료적 신뢰감 블루 (#3b82f6)
- **Accent**: 골드 (#fbbf24), 로즈 (#f43f5e)

### 타이포그래피
- **폰트**: Pretendard (한글 최적화)
- **반응형 텍스트**: 모바일 퍼스트 접근

### 브레이크포인트
- **xs**: 375px (모바일)
- **sm**: 640px 
- **md**: 768px (태블릿)
- **lg**: 1024px (데스크톱)
- **xl**: 1280px
- **2xl**: 1536px

## 🌟 주요 기능

### 1. 메인 페이지
- 8개 핵심 시술 배너 (캐러셀)
- 빠른 상담 신청 폼
- 병원 소개 섹션
- WHY 실로스 차별화 포인트

### 2. 시술 정보
- 11개 대분류 시술 카테고리
- 시술별 상세 페이지
- Before & After 갤러리
- FAQ 섹션

### 3. 병원 소개
- 실로스 철학 및 가치
- 의료진 소개
- 병원 시설 둘러보기
- 진료시간 및 오시는 길

### 4. 상담/예약 시스템
- 온라인 예약
- 빠른 상담 신청
- 카카오톡 연결
- 전화 상담

## 📱 모바일 최적화

- **모바일 퍼스트 설계**: 70% 이상 모바일 유입 대응
- **터치 친화적 UI**: 44px 이상 터치 타겟
- **빠른 로딩**: 이미지 최적화 및 CDN 활용
- **오프라인 지원**: 기본 콘텐츠 캐싱

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint

# 린트 자동 수정
npm run lint:fix

# 타입 체크
npm run type-check
```

## 🌐 환경변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```bash
# 데이터베이스
DATABASE_URL="mysql://username:password@localhost:3306/silos_clinic"

# API 서버
API_BASE_URL="http://localhost:8080/api"
NEXT_PUBLIC_API_URL="http://localhost:8080/api"

# 사이트 정보
NEXT_PUBLIC_SITE_NAME="실로스 성형외과"
NEXT_PUBLIC_SITE_URL="https://silos-clinic.com"

# 연락처
NEXT_PUBLIC_PHONE_NUMBER="055-123-4567"
NEXT_PUBLIC_EMAIL="info@silos-clinic.com"
NEXT_PUBLIC_KAKAO_TALK_URL="https://pf.kakao.com/_xkTQxd"

# AWS S3 (이미지 업로드)
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_S3_BUCKET="silos-clinic-images"
```

## 🚀 배포

### Vercel (권장)
```bash
npm i -g vercel
vercel --prod
```

### AWS EC2
```bash
npm run build
pm2 start npm --name "silos-clinic" -- start
```

### Docker
```bash
docker build -t silos-clinic-website .
docker run -p 3000:3000 silos-clinic-website
```

## 📊 성능 최적화

### Core Web Vitals 목표
- **LCP (Largest Contentful Paint)**: < 2.5초
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 최적화 기법
- 이미지 레이지 로딩
- 코드 스플리팅
- 프리페치 및 프리로딩
- 캐싱 전략
- CDN 활용

## 🧪 테스트

```bash
# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 커버리지 리포트
npm run test:coverage
```

## 📝 기여 가이드

1. **브랜치 전략**: Git Flow
   - `main`: 프로덕션 코드
   - `develop`: 개발 코드
   - `feature/*`: 기능 개발
   - `hotfix/*`: 긴급 수정

2. **커밋 컨벤션**: Conventional Commits
   ```
   feat: 새로운 기능 추가
   fix: 버그 수정
   docs: 문서 수정
   style: 코드 스타일 변경
   refactor: 코드 리팩토링
   test: 테스트 추가/수정
   chore: 빌드 과정 또는 보조 기능 수정
   ```

3. **코드 리뷰**: Pull Request 필수

## 🐛 문제 해결

### 자주 발생하는 문제

1. **이미지 로딩 오류**
   - AWS S3 설정 확인
   - 이미지 경로 및 권한 확인

2. **API 연결 오류**
   - 백엔드 서버 상태 확인
   - CORS 설정 확인
   - 환경변수 확인

3. **빌드 오류**
   - Node.js 버전 확인 (18 이상)
   - 의존성 재설치: `rm -rf node_modules package-lock.json && npm install`

## 📞 지원

- **이메일**: dev@silos-clinic.com
- **이슈 트래커**: [GitHub Issues](https://github.com/your-repo/silos-clinic-website/issues)
- **문서**: [Wiki](https://github.com/your-repo/silos-clinic-website/wiki)

## 📄 라이선스

이 프로젝트는 실로스 성형외과의 소유입니다. 무단 복제 및 배포를 금지합니다.

---

**실로스 성형외과** - 실리프팅은 실로스 ✨
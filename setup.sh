#!/bin/bash

# 실로스 성형외과 홈페이지 프론트엔드 프로젝트 초기 설정 스크립트

echo "🚀 실로스 성형외과 홈페이지 프로젝트 설정을 시작합니다..."

# 현재 디렉토리에서 silos-clinic-website 폴더가 이미 있는지 확인
if [ -d "silos-clinic-website" ]; then
    echo "📂 기존 프로젝트 폴더 발견. 프로젝트 디렉토리로 이동합니다."
    cd silos-clinic-website || exit 1
else
    echo "❌ silos-clinic-website 폴더를 찾을 수 없습니다."
    echo "💡 먼저 create-next-app으로 프로젝트를 생성해주세요."
    exit 1
fi

# 1. Node.js 버전 확인
echo "📋 Node.js 버전 확인 중..."
node_version=$(node -v 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Node.js 버전: $node_version"
    # Node.js 18 이상 확인
    major_version=$(echo $node_version | cut -d'.' -f1 | sed 's/v//')
    if [ "$major_version" -lt 18 ]; then
        echo "❌ Node.js 18 이상이 필요합니다. 현재 버전: $node_version"
        echo "💡 Node.js 최신 버전을 설치해주세요: https://nodejs.org/"
        exit 1
    fi
else
    echo "❌ Node.js가 설치되어 있지 않습니다."
    echo "💡 Node.js를 설치해주세요: https://nodejs.org/"
    exit 1
fi

# 2. 패키지 매니저 확인 및 선택
echo "📦 패키지 매니저 확인 중..."
if command -v yarn &> /dev/null; then
    echo "✅ Yarn 사용 가능"
    PACKAGE_MANAGER="yarn"
elif command -v pnpm &> /dev/null; then
    echo "✅ pnpm 사용 가능"
    PACKAGE_MANAGER="pnpm"
else
    echo "✅ npm 사용"
    PACKAGE_MANAGER="npm"
fi

echo "🔧 사용할 패키지 매니저: $PACKAGE_MANAGER"

# 3. 추가 의존성 설치
echo "📚 추가 라이브러리 설치 중..."
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn add @tanstack/react-query axios framer-motion react-hook-form @hookform/resolvers zod next-seo sharp lucide-react clsx
    yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier prettier-plugin-tailwindcss @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio
elif [ "$PACKAGE_MANAGER" = "pnpm" ]; then
    pnpm add @tanstack/react-query axios framer-motion react-hook-form @hookform/resolvers zod next-seo sharp lucide-react clsx
    pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier prettier-plugin-tailwindcss @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio
else
    npm install @tanstack/react-query axios framer-motion react-hook-form @hookform/resolvers zod next-seo sharp lucide-react clsx
    npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier prettier-plugin-tailwindcss @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio
fi

echo "✅ 라이브러리 설치 완료"

# # 5. 폴더 구조 생성
# echo "📁 프로젝트 폴더 구조 생성 중..."

# # 기본 폴더 구조 생성
# mkdir -p src/components/{ui,layout,sections,forms,common}
# mkdir -p src/hooks
# mkdir -p src/lib
# mkdir -p src/types
# mkdir -p src/utils
# mkdir -p src/styles
# mkdir -p src/app/{about,why-silos,procedures,gallery,consultation,api}
# mkdir -p public/images/{logo,banners,procedures,doctors,facilities,before-after}
# mkdir -p public/icons
# mkdir -p public/videos

# echo "✅ 폴더 구조 생성 완료"

# 6. 환경변수 파일 생성
echo "🔧 환경변수 파일 생성 중..."
cat > .env.local << EOF
# 데이터베이스 설정
DATABASE_URL="mysql://root:chaemin@localhost:3306/silos_cdb"
API_BASE_URL="http://localhost:8080/api"
NEXT_PUBLIC_API_URL="http://localhost:8080/api"

# 사이트 정보
NEXT_PUBLIC_SITE_NAME="실로스 성형외과"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_DESCRIPTION="실리프팅은 실로스 - 나를 위한 커스텀 리프팅"

# 연락처 정보
NEXT_PUBLIC_PHONE_NUMBER="055-123-4567"
NEXT_PUBLIC_EMAIL="info@silos-clinic.com"
NEXT_PUBLIC_KAKAO_TALK_URL="https://pf.kakao.com/_xkTQxd"

# 개발 환경
NODE_ENV="development"
NEXT_PUBLIC_ENVIRONMENT="development"
EOF

echo "✅ 환경변수 파일 생성 완료"

# # 7. Git 설정
# echo "📝 Git 초기 설정 중..."
# git init
# git add .
# git commit -m "🎉 Initial commit: 실로스 성형외과 홈페이지 프로젝트 초기 설정"

# echo "✅ Git 초기 설정 완료"

# 8. 개발 서버 실행 안내
echo ""
echo "🎉 실로스 성형외과 홈페이지 프로젝트 설정이 완료되었습니다!"
echo ""
echo "📋 다음 단계:"
echo "   1. cd silos-clinic-website"
echo "   2. 환경변수 파일(.env.local) 수정"
echo "   3. 개발 서버 실행:"
if [ "$PACKAGE_MANAGER" = "yarn" ]; then
    echo "      yarn dev"
elif [ "$PACKAGE_MANAGER" = "pnpm" ]; then
    echo "      pnpm dev"
else
    echo "      npm run dev"
fi
echo ""
echo "🌐 개발 서버 주소: http://localhost:3000"
echo ""
echo "📚 추가 설정이 필요한 항목:"
echo "   - 백엔드 API 서버 연결"
echo "   - AWS S3 이미지 업로드 설정"
echo "   - 데이터베이스 연결"
echo "   - Google Analytics 설정 (선택사항)"
echo ""
echo "🔗 유용한 명령어:"
echo "   - 린트 검사: $PACKAGE_MANAGER run lint"
echo "   - 타입 체크: $PACKAGE_MANAGER run type-check"
echo "   - 프로덕션 빌드: $PACKAGE_MANAGER run build"
echo ""
echo "💡 문제가 발생하면 다음을 확인해주세요:"
echo "   - Node.js 버전 (18 이상 필요)"
echo "   - 환경변수 설정"
echo "   - 백엔드 API 서버 상태"
echo ""
echo "Happy coding! 🚀"
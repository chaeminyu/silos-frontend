/** @type {import('next').NextConfig} */
const nextConfig = {
  // React 18 Strict Mode
  reactStrictMode: true,
  
  // SWC 컴파일러 사용 (더 빠른 빌드)
  swcMinify: true,
  
  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'silos-clinic.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.silos-clinic.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1년 캐시
  },
  
  // 실험적 기능 활성화 (Next.js 14에서는 appDir가 기본값)
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // 압축 활성화
  compress: true,
  
  // 정적 파일 최적화
  generateEtags: false,
  
  // 보안 헤더
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // 리다이렉트 설정 (필요시)
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
  // 환경변수 설정
  env: {
    SITE_NAME: '실로스 성형외과',
    SITE_DESCRIPTION: '실리프팅은 실로스 - 나를 위한 커스텀 리프팅',
    SITE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://silos-clinic.com' 
      : 'http://localhost:3000',
  },
  
  // TypeScript 설정
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint 설정
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // 웹팩 설정 커스터마이징
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // SVG 파일을 React 컴포넌트로 사용
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    // 번들 크기 최적화
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
    }
    
    return config;
  },
}

module.exports = nextConfig
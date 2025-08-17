'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageLayout from '../../../components/PageLayout';
import { User, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Using context method (mock implementation)
      await login(email, password);
      router.push('/');
      
      /* 
      // Using actual API service (uncomment when backend is ready)
      const response = await authService.login({ email, password });
      
      if (response.success && response.data) {
        // Update context with user data
        // You might want to update the AuthContext to handle this
        router.push('/');
      } else {
        setError(response.error || '로그인에 실패했습니다.');
      }
      */
    } catch (err: any) {
      setError(err.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-smoke-300 to-elegant-300 rounded-2xl mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-display font-light text-teal-smoke-800">로그인</h2>
              <p className="mt-2 text-sm font-elegant-sans font-light text-teal-smoke-600">
                실로스 회원 서비스를 이용하세요
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-elegant-sans">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-elegant font-medium text-teal-smoke-700 mb-2">
                  이메일
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-teal-smoke-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-teal-smoke-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 focus:border-transparent font-elegant-sans"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-elegant font-medium text-teal-smoke-700 mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-teal-smoke-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-teal-smoke-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 focus:border-transparent font-elegant-sans"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-smoke-600 focus:ring-teal-smoke-500 border-teal-smoke-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-teal-smoke-700 font-elegant-sans">
                    자동 로그인
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-elegant-sans text-teal-smoke-600 hover:text-teal-smoke-800">
                    비밀번호 찾기
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white rounded-xl font-elegant-sans font-medium hover:from-teal-smoke-500 hover:to-elegant-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>

              <div className="text-center pt-4 border-t border-teal-smoke-100">
                <p className="text-sm text-teal-smoke-600 font-elegant-sans">
                  아직 회원이 아니신가요?{' '}
                  <Link href="/auth/signup" className="font-medium text-teal-smoke-700 hover:text-teal-smoke-800">
                    회원가입
                  </Link>
                </p>
              </div>
            </form>

            {/* Admin login hint - Remove in production */}
            <div className="mt-6 p-4 bg-teal-smoke-50 rounded-xl">
              <p className="text-xs text-teal-smoke-600 font-elegant-sans text-center">
                테스트 계정: admin@silos.com / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
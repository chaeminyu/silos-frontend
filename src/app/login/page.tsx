'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import PageLayout from '@/components/PageLayout';
import { User, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(formData.userId, formData.password);
      
      if (result.success) {
        router.push('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-light text-slate-800 mb-4">
              로그인
            </h1>
            <div className="w-24 h-0.5 bg-slate-300 rounded-full mx-auto mb-6"></div>
            <p className="text-lg font-elegant-sans font-light text-slate-700">
              회원 전용 컨텐츠를 이용하시려면 로그인해주세요
            </p>
          </div>
          
          {/* Login Form Card */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-xl border border-slate-200/30">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* User ID Input */}
              <div>
                <label htmlFor="userId" className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                  사용자 ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="userId"
                    name="userId"
                    type="text"
                    required
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-white to-slate-50/30 border border-slate-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent focus:bg-white text-slate-800 placeholder-slate-500 font-elegant-sans transition-all duration-200"
                    placeholder="user123"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-white to-slate-50/30 border border-slate-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent focus:bg-white text-slate-800 placeholder-slate-500 font-elegant-sans transition-all duration-200"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-red-700 font-elegant-sans">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-lg font-elegant-sans font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
            </form>

            {/* Soft Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm text-slate-500 font-elegant-sans rounded-full border border-slate-200/30">또는</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-slate-600 font-elegant-sans mb-3">
                아직 회원이 아니신가요?
              </p>
              <button
                type="button"
                onClick={() => router.push('/auth/signup')}
                className="inline-flex items-center px-6 py-2 bg-white border border-slate-300 text-slate-700 hover:text-slate-900 rounded-lg font-elegant-sans font-medium hover:bg-slate-50 transition-all duration-300"
              >
                <User className="w-4 h-4 mr-2" />
                회원가입하기
              </button>
              
              {/* Consultation Registration Option */}
              <div className="mt-4 p-3 bg-gradient-to-r from-slate-50/40 to-slate-50/40 rounded-lg border border-slate-200/20">
                <p className="text-xs text-slate-600 font-elegant-sans text-center mb-2">
                  상담을 받으시면서 회원가입을 원하시나요?
                </p>
                <button
                  type="button"
                  onClick={() => router.push('/consultation/request')}
                  className="w-full text-slate-600 hover:text-slate-700 font-elegant-sans font-light text-xs underline underline-offset-2 hover:underline-offset-4 transition-all"
                >
                  상담 신청과 함께 회원가입하기 →
                </button>
              </div>
            </div>
          </div>

          {/* Test Accounts Info - Development Only */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-elegant font-semibold text-slate-700 mb-3">
                테스트 계정
              </h3>
              <div className="space-y-2 text-sm font-elegant-sans text-slate-600">
                <div className="flex justify-between items-center p-2 bg-white/60 rounded-lg">
                  <span className="font-medium">관리자</span>
                  <span className="text-xs">admin / admin123</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/60 rounded-lg">
                  <span className="font-medium">테스트 사용자</span>
                  <span className="text-xs">test123 / test123</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
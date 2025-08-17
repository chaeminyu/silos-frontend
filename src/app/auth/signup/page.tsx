'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageLayout from '../../../components/PageLayout';
import { UserPlus, Lock, Mail, Phone, User } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!formData.agreeTerms || !formData.agreePrivacy) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    setIsLoading(true);
    
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/login');
    }, 1000);
  };

  return (
    <PageLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-smoke-300 to-elegant-300 rounded-2xl mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-display font-light text-teal-smoke-800">회원가입</h2>
              <p className="mt-2 text-sm font-elegant-sans font-light text-teal-smoke-600">
                실로스의 회원이 되어 특별한 혜택을 누리세요
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-elegant font-medium text-teal-smoke-700 mb-2">
                  이름
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-teal-smoke-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-teal-smoke-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 focus:border-transparent font-elegant-sans"
                    placeholder="홍길동"
                  />
                </div>
              </div>

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
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-teal-smoke-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 focus:border-transparent font-elegant-sans"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-elegant font-medium text-teal-smoke-700 mb-2">
                  연락처
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-teal-smoke-400" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-teal-smoke-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 focus:border-transparent font-elegant-sans"
                    placeholder="010-0000-0000"
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
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-teal-smoke-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 focus:border-transparent font-elegant-sans"
                    placeholder="8자 이상 입력"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-elegant font-medium text-teal-smoke-700 mb-2">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-teal-smoke-400" />
                  </div>
                  <input
                    type="password"
                    value={formData.passwordConfirm}
                    onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
                    required
                    className="w-full pl-10 pr-3 py-3 border border-teal-smoke-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 focus:border-transparent font-elegant-sans"
                    placeholder="비밀번호 재입력"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3 pt-4 border-t border-teal-smoke-100">
                <div className="flex items-center">
                  <input
                    id="agree-terms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                    className="h-4 w-4 text-teal-smoke-600 focus:ring-teal-smoke-500 border-teal-smoke-300 rounded"
                  />
                  <label htmlFor="agree-terms" className="ml-2 block text-sm text-teal-smoke-700 font-elegant-sans">
                    <span className="text-red-500">*</span> 이용약관 동의 (필수)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="agree-privacy"
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({...formData, agreePrivacy: e.target.checked})}
                    className="h-4 w-4 text-teal-smoke-600 focus:ring-teal-smoke-500 border-teal-smoke-300 rounded"
                  />
                  <label htmlFor="agree-privacy" className="ml-2 block text-sm text-teal-smoke-700 font-elegant-sans">
                    <span className="text-red-500">*</span> 개인정보 처리방침 동의 (필수)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="agree-marketing"
                    type="checkbox"
                    checked={formData.agreeMarketing}
                    onChange={(e) => setFormData({...formData, agreeMarketing: e.target.checked})}
                    className="h-4 w-4 text-teal-smoke-600 focus:ring-teal-smoke-500 border-teal-smoke-300 rounded"
                  />
                  <label htmlFor="agree-marketing" className="ml-2 block text-sm text-teal-smoke-700 font-elegant-sans">
                    마케팅 정보 수신 동의 (선택)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white rounded-xl font-elegant-sans font-medium hover:from-teal-smoke-500 hover:to-elegant-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? '가입 중...' : '회원가입'}
              </button>

              <div className="text-center pt-4 border-t border-teal-smoke-100">
                <p className="text-sm text-teal-smoke-600 font-elegant-sans">
                  이미 회원이신가요?{' '}
                  <Link href="/auth/login" className="font-medium text-teal-smoke-700 hover:text-teal-smoke-800">
                    로그인
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
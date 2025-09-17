'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '../../../components/PageLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { Lock, Mail, Phone, User } from 'lucide-react';

export default function SignupPage() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    userId: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!formData.agreeTerms || !formData.agreePrivacy) {
      setError('필수 약관에 동의해주세요.');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await signup(
        formData.userId,
        formData.password,
        formData.username,
        formData.email,
        formData.phone
      );
      
      console.log('Signup result:', result); // 디버깅용
      console.log('Success:', result.success); // success 값 확인
      console.log('Message:', result.message); // message 값 확인
      
      if (result && result.success === true) {
        // 회원가입 성공 시 홈으로 리다이렉트 (이미 로그인된 상태)
        console.log('Signup successful! Redirecting to home...'); // 디버깅용
        setTimeout(() => {
          window.location.href = '/'; // 약간의 지연 후 리다이렉트
        }, 100);
      } else {
        console.log('Signup failed:', result?.message); // 실패 로그
        setError(result?.message || '회원가입에 실패했습니다.');
        setIsLoading(false); // 로딩 상태 해제
      }
    } catch (error) {
      setError('회원가입 중 오류가 발생했습니다.');
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
              회원가입
            </h1>
            <div className="w-24 h-0.5 bg-slate-300 rounded-full mx-auto mb-6"></div>
            <p className="text-lg font-elegant-sans font-light text-slate-700">
              실로스의 회원이 되어 특별한 혜택을 누리세요
            </p>
          </div>
          
          {/* Signup Form Card */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-xl border border-slate-200/30">

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-red-700 font-elegant-sans">{error}</p>
                </div>
              )}
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
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-800 placeholder-slate-400 font-elegant-sans"
                    placeholder="user123"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                  이름 (본명)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-800 placeholder-slate-400 font-elegant-sans"
                    placeholder="홍길동"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-800 placeholder-slate-400 font-elegant-sans"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                  연락처
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-white to-slate-50/30 border border-slate-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent focus:bg-white text-slate-800 placeholder-slate-500 font-elegant-sans transition-all duration-200"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>

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
                    placeholder="8자 이상 입력"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    required
                    value={formData.passwordConfirm}
                    onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-white to-slate-50/30 border border-slate-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent focus:bg-white text-slate-800 placeholder-slate-500 font-elegant-sans transition-all duration-200"
                    placeholder="비밀번호 재입력"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center">
                  <input
                    id="agree-terms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                    className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded"
                  />
                  <label htmlFor="agree-terms" className="ml-2 block text-sm text-slate-700 font-elegant-sans">
                    <span className="text-red-500">*</span> 이용약관 동의 (필수)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="agree-privacy"
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({...formData, agreePrivacy: e.target.checked})}
                    className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded"
                  />
                  <label htmlFor="agree-privacy" className="ml-2 block text-sm text-slate-700 font-elegant-sans">
                    <span className="text-red-500">*</span> 개인정보 처리방침 동의 (필수)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="agree-marketing"
                    type="checkbox"
                    checked={formData.agreeMarketing}
                    onChange={(e) => setFormData({...formData, agreeMarketing: e.target.checked})}
                    className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded"
                  />
                  <label htmlFor="agree-marketing" className="ml-2 block text-sm text-slate-700 font-elegant-sans">
                    마케팅 정보 수신 동의 (선택)
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-lg font-elegant-sans font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '가입 중...' : '회원가입'}
              </button>

              {/* Soft Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-slate-50/80 to-white/80 backdrop-blur-sm text-slate-500 font-elegant-sans rounded-full border border-slate-200/30">또는</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-slate-600 font-elegant-sans mb-3">
                  이미 회원이신가요?
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center px-6 py-2 bg-white border border-slate-300 text-slate-700 hover:text-slate-900 rounded-lg font-elegant-sans font-medium hover:bg-slate-50 transition-all duration-300"
                >
                  <User className="w-4 h-4 mr-2" />
                  로그인하기
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import { ShoppingCart, X, Calendar, Clock, MessageSquare, CheckCircle } from 'lucide-react';

// Mock cart data
const mockCartItems = [
  { id: '1', name: '실로스 실리프팅', category: '리프팅' },
  { id: '2', name: '실로팻 - 복부', category: '지방추출' },
  { id: '3', name: '울쎄라', category: '레이저' }
];

export default function ConsultationRequestPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    message: '',
    agreePrivacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreePrivacy) {
      alert('개인정보 처리방침에 동의해주세요.');
      return;
    }

    if (cartItems.length === 0) {
      alert('상담받을 시술을 선택해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/consultation/list');
    }, 1500);
  };


  return (
    <PageLayout>
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-light text-teal-smoke-800 mb-4">
              상담 신청
            </h1>
            <div className="w-24 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-6"></div>
            <p className="text-lg font-elegant-sans font-light text-teal-smoke-600">
              선택하신 시술에 대해 전문 의료진과 상담을 받아보세요
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                <h2 className="text-2xl font-display font-light text-teal-smoke-800 mb-6 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-3 text-teal-smoke-600" />
                  선택한 시술 목록
                </h2>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-teal-smoke-600 font-elegant-sans">
                      선택한 시술이 없습니다.
                    </p>
                    <button
                      onClick={() => router.push('/')}
                      className="mt-4 px-6 py-2 bg-teal-smoke-300 text-white rounded-xl font-elegant-sans hover:bg-teal-smoke-400 transition-colors"
                    >
                      시술 둘러보기
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-smoke-50 to-elegant-50 rounded-xl"
                      >
                        <div>
                          <h3 className="font-elegant font-medium text-teal-smoke-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-teal-smoke-600 font-elegant-sans">
                            {item.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-teal-smoke-500" />
                        </button>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-teal-smoke-200">
                      <p className="text-sm text-teal-smoke-600 font-elegant-sans">
                        선택하신 <span className="font-medium">{cartItems.length}개</span>의 시술에 대해 상담을 진행합니다.
                      </p>
                      <p className="text-xs text-teal-smoke-500 mt-2 font-elegant-sans">
                        * 실제 비용은 병원 방문 상담 시 안내됩니다
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Consultation Form */}
              <form onSubmit={handleSubmit} className="mt-8 bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                <h2 className="text-2xl font-display font-light text-teal-smoke-800 mb-6">
                  상담 정보
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-elegant font-medium text-teal-smoke-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        희망 상담 날짜
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-teal-smoke-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 font-elegant-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-elegant font-medium text-teal-smoke-700 mb-2">
                        <Clock className="inline w-4 h-4 mr-1" />
                        희망 시간대
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-teal-smoke-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 font-elegant-sans"
                      >
                        <option value="">선택하세요</option>
                        <option value="morning">오전 (10:00 - 12:00)</option>
                        <option value="afternoon">오후 (14:00 - 17:00)</option>
                        <option value="evening">저녁 (17:00 - 19:00)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-elegant font-medium text-teal-smoke-700 mb-2">
                      <MessageSquare className="inline w-4 h-4 mr-1" />
                      상담 내용
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-3 border border-teal-smoke-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 font-elegant-sans resize-none"
                      placeholder="궁금한 점이나 특별히 상담받고 싶은 내용을 적어주세요"
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      id="agree-privacy"
                      type="checkbox"
                      checked={formData.agreePrivacy}
                      onChange={(e) => setFormData({...formData, agreePrivacy: e.target.checked})}
                      className="h-4 w-4 text-teal-smoke-600 focus:ring-teal-smoke-500 border-teal-smoke-300 rounded mt-1"
                    />
                    <label htmlFor="agree-privacy" className="ml-2 block text-sm text-teal-smoke-700 font-elegant-sans">
                      개인정보 처리방침에 동의합니다 (필수)
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="w-full mt-8 py-4 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white rounded-xl font-elegant-sans font-medium hover:from-teal-smoke-500 hover:to-elegant-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? '신청 중...' : '상담 신청하기'}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-3xl p-6 border border-teal-smoke-200/30">
                  <h3 className="text-lg font-elegant font-medium text-teal-smoke-800 mb-4">
                    상담 진행 과정
                  </h3>
                  <div className="space-y-4">
                    {[
                      '상담 신청서 작성',
                      '병원에서 접수 확인',
                      '상담 일정 확정 연락',
                      '방문 상담 진행'
                    ].map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-teal-smoke-300 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="ml-3 text-sm text-teal-smoke-700 font-elegant-sans pt-1">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/50">
                  <h3 className="text-lg font-elegant font-medium text-teal-smoke-800 mb-4">
                    상담 안내
                  </h3>
                  <ul className="space-y-2 text-sm text-teal-smoke-600 font-elegant-sans">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-teal-smoke-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>상담은 100% 무료입니다</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-teal-smoke-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>전문 의료진이 직접 상담합니다</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-teal-smoke-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>부담 없는 상담 환경을 제공합니다</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-teal-smoke-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>맞춤형 시술 계획을 제안드립니다</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
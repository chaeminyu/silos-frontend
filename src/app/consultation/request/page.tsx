'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import CustomAlert from '../../../components/CustomAlert';
import ProcedureSelectionModal from '../../../components/ProcedureSelectionModal';
import { ShoppingCart, X, Calendar, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';

// Mock cart data (commented out - using real cart context instead)
// const mockCartItems = [
//   { id: '1', name: '실로스 실리프팅', category: '리프팅' },
//   { id: '2', name: '실로팻 - 복부', category: '지방추출' },
//   { id: '3', name: '울쎄라', category: '레이저' }
// ];

interface ConsultationData {
  personalInfo: {
    name: string;
    phone: string;
    email: string;
  };
  selectedProcedures: string[];
  message: string;
}

export default function ConsultationRequestPage() {
  const router = useRouter();
  const { cart, userInfo, removeFromCart, updateUserInfo } = useCart();
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    message: '',
    agreePrivacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'success', title: '', message: '' });

  // 초기 데이터 로드 (카트 컨텍스트와 sessionStorage 통합)
  useEffect(() => {
    // 카트 컨텍스트에서 유저 정보와 메시지 로드
    if (userInfo) {
      setFormData(prev => ({
        ...prev,
        message: userInfo.message || '',
        preferredDate: userInfo.preferredDate || '',
        preferredTime: userInfo.preferredTime || ''
      }));
    }
    
    // sessionStorage에서 추가 데이터 로드 (호환성)
    const consultationDataStr = sessionStorage.getItem('consultationData');
    if (consultationDataStr) {
      try {
        const consultationData: ConsultationData = JSON.parse(consultationDataStr);
        
        // sessionStorage의 사용자 정보로 카트 컨텍스트 업데이트 (없는 경우에만)
        if (!userInfo && consultationData.personalInfo) {
          updateUserInfo({
            name: consultationData.personalInfo.name,
            phone: consultationData.personalInfo.phone,
            email: consultationData.personalInfo.email,
            message: consultationData.message || ''
          });
        }
        
        // 메시지 설정 (편집 가능하게)
        setFormData(prev => ({
          ...prev,
          message: consultationData.message || prev.message
        }));
        
        // 데이터를 사용한 후 sessionStorage에서 제거
        sessionStorage.removeItem('consultationData');
      } catch (error) {
        console.error('상담 데이터를 불러오는 중 오류 발생:', error);
      }
    }
  }, [userInfo, updateUserInfo]);

  // removeFromCart는 이제 useCart에서 제공되므로 삭제

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreePrivacy) {
      setAlertState({
        isOpen: true,
        type: 'warning',
        title: '필수 항목 확인',
        message: '개인정보 처리방침에 동의해주세요.'
      });
      return;
    }

    if (cart.length === 0) {
      setAlertState({
        isOpen: true,
        type: 'warning',
        title: '시술 선택 필요',
        message: '상담받을 시술을 선택해주세요.'
      });
      return;
    }

    if (!userInfo?.name || !userInfo?.phone) {
      setAlertState({
        isOpen: true,
        type: 'warning',
        title: '필수 정보 입력',
        message: '이름과 연락처를 입력해주세요.'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 상담 데이터 준비
      const consultationData = {
        personalInfo: userInfo,
        selectedProcedures: cart.map(item => item.name),
        message: formData.message,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime
      };

      // API 호출
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultationData),
      });

      const result = await response.json();

      if (result.success) {
        setAlertState({
          isOpen: true,
          type: 'success',
          title: '상담 신청 완료',
          message: '상담 신청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.'
        });
      } else {
        setAlertState({
          isOpen: true,
          type: 'error',
          title: '신청 실패',
          message: result.message || '상담 신청 중 오류가 발생했습니다.'
        });
      }
    } catch (error) {
      console.error('상담 신청 오류:', error);
      setAlertState({
        isOpen: true,
        type: 'error',
        title: '네트워크 오류',
        message: '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <PageLayout>
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-light text-slate-800 mb-4">
              상담 신청
            </h1>
            <div className="w-24 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-6"></div>
            <p className="text-lg font-elegant-sans font-light text-slate-700">
              선택하신 시술에 대해 전문 의료진과 상담을 받아보세요
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="glass-consultation-container rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                {/* Glass background overlay */}
                <div className="absolute inset-0 glass-gradient-overlay rounded-3xl"></div>
                <h2 className="text-2xl font-display font-light text-slate-800 mb-6 flex items-center relative z-10 drop-shadow-sm">
                  <ShoppingCart className="w-6 h-6 mr-3 text-slate-600" />
                  선택한 시술 목록
                </h2>

                {cart.length === 0 ? (
                  <div className="text-center py-12 relative z-10">
                    <p className="text-slate-600 font-elegant-sans">
                      선택한 시술이 없습니다.
                    </p>
                    <button
                      onClick={() => setShowProcedureModal(true)}
                      className="mt-4 px-6 py-2 bg-teal-smoke-300 text-white rounded-xl font-elegant-sans hover:bg-teal-smoke-400 transition-colors relative z-10"
                    >
                      시술 둘러보기
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-smoke-50 to-elegant-50 rounded-xl"
                      >
                        <div>
                          <h3 className="font-elegant font-medium text-slate-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-slate-600 font-elegant-sans">
                            {item.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-slate-500" />
                        </button>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-teal-smoke-200">
                      <p className="text-sm text-slate-600 font-elegant-sans">
                        선택하신 <span className="font-medium">{cart.length}개</span>의 시술에 대해 상담을 진행합니다.
                      </p>
                      <p className="text-xs text-slate-500 mt-2 font-elegant-sans">
                        * 실제 비용은 병원 방문 상담 시 안내됩니다
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Consultation Form - Enhanced Glass Effect */}
              <form onSubmit={handleSubmit} className="mt-8 glass-consultation-container rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                {/* Glass background overlay */}
                <div className="absolute inset-0 glass-gradient-overlay rounded-3xl"></div>
                
                {/* Floating decoration elements */}
                <div className="absolute top-4 right-4 w-8 h-8 glass-floating-element rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 glass-floating-element rounded-full"></div>
                <h2 className="text-2xl font-display font-light text-slate-800 mb-6 relative z-10 drop-shadow-sm">
                  상담 정보
                </h2>

                <div className="space-y-6 relative z-10">
                  {/* User Information Section */}
                  <div className="space-y-4 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60">
                    <h3 className="text-lg font-elegant font-medium text-slate-800 mb-4">개인 정보</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                          이름 *
                        </label>
                        <input
                          type="text"
                          value={userInfo?.name || ''}
                          onChange={(e) => updateUserInfo({ name: e.target.value })}
                          placeholder="이름을 입력하세요"
                          required
                          className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800 placeholder-slate-500"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>

                      <div className="relative group">
                        <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                          연락처 *
                        </label>
                        <input
                          type="tel"
                          value={userInfo?.phone || ''}
                          onChange={(e) => updateUserInfo({ phone: e.target.value })}
                          placeholder="연락처를 입력하세요"
                          required
                          className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800 placeholder-slate-500"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                        이메일 (선택)
                      </label>
                      <input
                        type="email"
                        value={userInfo?.email || ''}
                        onChange={(e) => updateUserInfo({ email: e.target.value })}
                        placeholder="이메일을 입력하세요"
                        className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800 placeholder-slate-500"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        희망 상담 날짜
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                        required
                        className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800 placeholder-slate-500"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                        <Clock className="inline w-4 h-4 mr-1" />
                        희망 시간대
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                        required
                        className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800"
                      >
                        <option value="">선택하세요</option>
                        <option value="morning">오전 (10:00 - 12:00)</option>
                        <option value="afternoon">오후 (14:00 - 17:00)</option>
                        <option value="evening">저녁 (17:00 - 19:00)</option>
                      </select>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                      <MessageSquare className="inline w-4 h-4 mr-1" />
                      상담 내용
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans resize-none text-slate-800 placeholder-slate-500"
                      placeholder="궁금한 점이나 특별히 상담받고 싶은 내용을 적어주세요"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  <div className="flex items-start">
                    <input
                      id="agree-privacy"
                      type="checkbox"
                      checked={formData.agreePrivacy}
                      onChange={(e) => setFormData({...formData, agreePrivacy: e.target.checked})}
                      className="h-4 w-4 text-teal-smoke-600 focus:ring-teal-smoke-500 border-teal-smoke-300 rounded mt-1"
                    />
                    <label htmlFor="agree-privacy" className="ml-2 block text-sm text-slate-700 font-elegant-sans">
                      개인정보 처리방침에 동의합니다 (필수)
                    </label>
                  </div>
                </div>

                {/* Submit Button with Glass Effect */}
                <div className="relative group mt-8">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-smoke-300/50 via-cyan-400/50 to-teal-smoke-300/50 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="glass-consultation-button relative w-full py-4 text-slate-900 rounded-xl font-elegant-sans font-medium transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10">{isSubmitting ? '신청 중...' : '상담 신청하기'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-3xl p-6 border border-teal-smoke-200/30">
                  <h3 className="text-lg font-elegant font-medium text-slate-800 mb-4">
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
                        <p className="ml-3 text-sm text-slate-700 font-elegant-sans pt-1">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/50">
                  <h3 className="text-lg font-elegant font-medium text-slate-800 mb-4">
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

      {/* 커스텀 알림 모달 */}
      <CustomAlert
        isOpen={alertState.isOpen}
        onClose={() => {
          setAlertState({ ...alertState, isOpen: false });
          // 성공 시 홈페이지로 이동
          if (alertState.type === 'success') {
            setTimeout(() => router.push('/'), 500);
          }
        }}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        autoClose={false}
      />
      
      {/* Procedure Selection Modal */}
      <ProcedureSelectionModal 
        isOpen={showProcedureModal}
        onClose={() => setShowProcedureModal(false)}
        onProceduresSelected={(procedures) => {
          console.log('Selected procedures:', procedures);
          setShowProcedureModal(false);
        }}
      />
    </PageLayout>
  );
}
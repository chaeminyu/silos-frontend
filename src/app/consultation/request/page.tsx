'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import CustomAlert from '../../../components/CustomAlert';
import ProcedureSelectionModal from '../../../components/ProcedureSelectionModal';
import { ShoppingCart, X, Calendar, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/AuthContext';

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

// 전화번호 포맷팅 함수
function formatPhoneNumber(phone: string): string {
  const numericPhone = phone.replace(/[^0-9]/g, '');
  
  if (numericPhone.length <= 3) {
    return numericPhone;
  } else if (numericPhone.length <= 7) {
    return `${numericPhone.slice(0, 3)}-${numericPhone.slice(3)}`;
  } else {
    return `${numericPhone.slice(0, 3)}-${numericPhone.slice(3, 7)}-${numericPhone.slice(7, 11)}`;
  }
}

export default function ConsultationRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, userInfo, addToCart, removeFromCart, updateUserInfo, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth(); // 로그인 상태 및 사용자 정보 확인
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  
  // 이벤트 상담 관련 상태
  const eventId = searchParams.get('eventId');
  const eventTitle = searchParams.get('eventTitle');
  const isEventConsultation = eventId && eventTitle;
  const [formData, setFormData] = useState({
    preferredDate: '',
    preferredTime: '',
    message: isEventConsultation ? `${decodeURIComponent(eventTitle)} 이벤트 상담을 신청합니다.` : '',
    agreePrivacy: false,
    wantToRegister: false,
    userId: '',
    password: '',
    passwordConfirm: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({ isOpen: false, type: 'success', title: '', message: '' });

  // 초기 데이터 로드 (카트 컨텍스트와 sessionStorage 통합)
  useEffect(() => {
    console.log('useEffect triggered:');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);
    console.log('userInfo:', userInfo);
    
    // 로그인한 회원의 경우 개인정보 자동 입력 (이미 같은 데이터가 있으면 스킵)
    if (isAuthenticated && user && (!userInfo?.name || userInfo.name !== (user.username || user.name))) {
      console.log('Auto-filling user info from auth context');
      console.log('Updating with user data:', {
        name: user.username || user.name || '',
        phone: user.phone || '',
        email: user.email || '',
      });
      updateUserInfo({
        name: user.username || user.name || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
    
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
  }, [isAuthenticated, user?.userId, userInfo?.name]);

  // removeFromCart는 이제 useCart에서 제공되므로 삭제

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== 상담 신청 시작 ===');
    console.log('Form data:', formData);
    console.log('User info:', userInfo);
    console.log('Cart items:', cart);
    
    if (!formData.agreePrivacy) {
      console.log('❌ 개인정보처리방침 미동의');
      setAlertState({
        isOpen: true,
        type: 'warning',
        title: '필수 항목 확인',
        message: '개인정보 처리방침에 동의해주세요.'
      });
      return;
    }
    console.log('✅ 개인정보처리방침 동의 확인');

    // 이벤트 상담이 아닌 경우에만 장바구니 검증
    if (!isEventConsultation && cart.length === 0) {
      console.log('❌ 시술 미선택');
      setAlertState({
        isOpen: true,
        type: 'warning',
        title: '시술 선택 필요',
        message: '상담받을 시술을 선택해주세요.'
      });
      return;
    }
    console.log('✅ 시술 선택 확인:', isEventConsultation ? '이벤트 상담' : `${cart.length}개`);

    if (!userInfo?.name || !userInfo?.phone) {
      console.log('❌ 필수 정보 누락 - name:', userInfo?.name, 'phone:', userInfo?.phone);
      setAlertState({
        isOpen: true,
        type: 'warning',
        title: '필수 정보 입력',
        message: '이름과 연락처를 입력해주세요.'
      });
      return;
    }
    console.log('✅ 필수 정보 확인 - name:', userInfo.name, 'phone:', userInfo.phone);

    // Check password validation for non-authenticated users (both registration and non-registration)
    if (!isAuthenticated) {
      if (!formData.password) {
        setAlertState({
          isOpen: true,
          type: 'warning',
          title: '비밀번호 입력',
          message: '비밀번호를 입력해주세요.'
        });
        return;
      }
      
      if (formData.password.length < 8) {
        setAlertState({
          isOpen: true,
          type: 'warning',
          title: '비밀번호 길이',
          message: '비밀번호는 최소 8자 이상이어야 합니다.'
        });
        return;
      }
      
      // Additional validation for registration (password confirmation)
      if (formData.wantToRegister) {
        if (!formData.passwordConfirm) {
          setAlertState({
            isOpen: true,
            type: 'warning',
            title: '비밀번호 확인',
            message: '비밀번호 확인을 입력해주세요.'
          });
          return;
        }
        
        if (formData.password !== formData.passwordConfirm) {
          setAlertState({
            isOpen: true,
            type: 'warning',
            title: '비밀번호 불일치',
            message: '비밀번호가 일치하지 않습니다.'
          });
          return;
        }
      }
    }

    setIsSubmitting(true);
    
    try {
      // Handle registration if selected
      let registrationSuccess = false;
      if (formData.wantToRegister) {
        const registerResponse = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userInfo.name,
            phone: userInfo.phone,
            email: userInfo.email,
            password: formData.password
          }),
        });

        const registerResult = await registerResponse.json();
        registrationSuccess = registerResult.success;
        
        if (!registrationSuccess && registerResponse.status !== 409) { // 409 means already registered
          setAlertState({
            isOpen: true,
            type: 'error',
            title: '회원가입 실패',
            message: registerResult.message || '회원가입 중 오류가 발생했습니다.'
          });
          setIsSubmitting(false);
          return;
        }
      }

      // 상담 데이터 준비
      const consultationData = {
        personalInfo: userInfo,
        selectedProcedures: isEventConsultation 
          ? [decodeURIComponent(eventTitle)] 
          : cart.map(item => item.name),
        message: formData.message,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        isRegistered: formData.wantToRegister,
        ...(!isAuthenticated && { password: formData.password }), // Include password for non-authenticated users
        ...(isEventConsultation && {
          eventId: eventId,
          eventTitle: decodeURIComponent(eventTitle),
          isEventConsultation: true
        })
      };

      console.log('🚀 API 호출 준비:', consultationData);

      // API 호출
      console.log('📡 Fetch 요청 시작 to /api/consultations');
      console.log('🍪 클라이언트 쿠키 확인:', document.cookie);
      console.log('🔐 로그인 상태 확인 - isAuthenticated:', isAuthenticated, 'user:', user);
      
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultationData),
      });

      console.log('📡 Fetch 응답 받음 - status:', response.status, 'ok:', response.ok);
      
      // 토큰 만료 또는 인증 문제 처리
      if (response.status === 401 || response.status === 403) {
        setAlertState({
          isOpen: true,
          type: 'warning',
          title: '인증 만료',
          message: '로그인이 만료되었습니다. 다시 로그인 후 시도해주세요.',
          onConfirm: () => {
            // 로그아웃 처리
            localStorage.clear();
            sessionStorage.clear();
            setAlertState(prev => ({ ...prev, isOpen: false }));
            window.location.href = '/login';
          }
        });
        return;
      }

      // 서버 에러 처리
      if (!response.ok) {
        let errorMessage = '상담 신청 중 오류가 발생했습니다.';
        let isTokenExpired = false;
        
        try {
          const errorResult = await response.text();
          console.log('서버 에러 응답:', errorResult);
          
          // 토큰 만료 관련 에러 감지
          if (errorResult.includes('JWT') || errorResult.includes('token') || 
              errorResult.includes('Expired') || errorResult.includes('Unauthorized')) {
            isTokenExpired = true;
          }
          
          if (errorResult) {
            try {
              const parsed = JSON.parse(errorResult);
              errorMessage = parsed.message || errorMessage;
            } catch (parseError) {
              // JSON 파싱 실패 시 원본 텍스트에서 토큰 만료 확인
              if (errorResult.toLowerCase().includes('expired') || 
                  errorResult.toLowerCase().includes('jwt')) {
                isTokenExpired = true;
              }
            }
          }
        } catch (parseError) {
          console.error('에러 응답 파싱 실패:', parseError);
        }
        
        // 토큰 만료된 경우 로그인 페이지로 리디렉션
        if (isTokenExpired || response.status === 500) {
          setAlertState({
            isOpen: true,
            type: 'warning',
            title: '인증 만료',
            message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
            onConfirm: () => {
              localStorage.clear();
              sessionStorage.clear();
              setAlertState(prev => ({ ...prev, isOpen: false }));
              window.location.href = '/login';
            }
          });
        } else {
          setAlertState({
            isOpen: true,
            type: 'error',
            title: '서버 오류',
            message: errorMessage
          });
        }
        return;
      }

      const result = await response.json();
      console.log('📡 Fetch 결과:', result);

      if (result.success) {
        // Show multiple success messages if both consultation and registration succeeded
        if (formData.wantToRegister && registrationSuccess) {
          setAlertState({
            isOpen: true,
            type: 'success',
            title: isEventConsultation ? '이벤트 상담 신청 및 회원가입 완료' : '상담 신청 및 회원가입 완료',
            message: isEventConsultation 
              ? `${decodeURIComponent(eventTitle)} 이벤트 상담 신청이 성공적으로 접수되었으며, 회원가입이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.`
              : '상담 신청이 성공적으로 접수되었으며, 회원가입이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.'
          });
        } else {
          setAlertState({
            isOpen: true,
            type: 'success',
            title: isEventConsultation ? '이벤트 상담 신청 완료' : '상담 신청 완료',
            message: isEventConsultation
              ? `${decodeURIComponent(eventTitle)} 이벤트 상담 신청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.`
              : '상담 신청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.'
          });
        }
        
        // 상담 신청 성공 시 장바구니 초기화
        clearCart();
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
              {isEventConsultation ? '이벤트 상담 신청' : '상담 신청'}
            </h1>
            <div className="w-24 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-6"></div>
            <p className="text-lg font-elegant-sans font-light text-slate-700">
              {isEventConsultation 
                ? `${decodeURIComponent(eventTitle)} 이벤트에 대해 전문 의료진과 상담을 받아보세요`
                : '선택하신 시술에 대해 전문 의료진과 상담을 받아보세요'
              }
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
                  {isEventConsultation ? '이벤트 상담' : '선택한 시술 목록'}
                </h2>

                {isEventConsultation ? (
                  // 이벤트 상담 표시
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl relative z-10 border border-blue-200">
                      <div>
                        <h3 className="font-elegant font-medium text-slate-800">
                          {decodeURIComponent(eventTitle)}
                        </h3>
                        <p className="text-sm text-slate-600 font-elegant-sans">
                          이벤트 상담
                        </p>
                      </div>
                      <div className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        EVENT
                      </div>
                    </div>
                    <div className="pt-4 border-t border-blue-200">
                      <p className="text-sm text-slate-600 font-elegant-sans">
                        <span className="font-medium">{decodeURIComponent(eventTitle)}</span> 이벤트에 대한 상담을 진행합니다.
                      </p>
                      <p className="text-xs text-slate-500 mt-2 font-elegant-sans">
                        * 이벤트 혜택 및 자세한 내용은 상담 시 안내됩니다
                      </p>
                    </div>
                  </div>
                ) : cart.length === 0 ? (
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
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-smoke-50 to-elegant-50 rounded-xl relative z-10"
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
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Removing item:', item.id); // 디버깅용
                            removeFromCart(item.id);
                          }}
                          className="min-w-[44px] min-h-[44px] p-2 sm:p-3 hover:bg-white/50 active:bg-white/70 rounded-lg transition-colors relative z-20 touch-manipulation flex items-center justify-center"
                          type="button"
                          aria-label={`${item.name} 삭제`}
                        >
                          <X className="w-5 h-5 sm:w-5 sm:h-5 text-slate-500 pointer-events-none" />
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
                  {/* Registration Banner - Show for non-authenticated users BEFORE personal info */}
                  {!isAuthenticated && (
                    <div className="p-6 bg-gradient-to-r from-teal-smoke-50/80 to-cyan-50/80 backdrop-blur-sm rounded-2xl border border-teal-smoke-200/60">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-elegant font-medium text-slate-800 mb-2">
                              🎁 회원가입 혜택
                            </h3>
                            <p className="text-sm text-slate-700 font-elegant-sans leading-relaxed mb-3">
                              • Before/After 사진 무제한 열람<br/>
                              • 상담 이력 및 예약 관리<br/>
                              • 맞춤형 이벤트 및 할인 혜택 알림
                            </p>
                            <p className="text-sm text-slate-600 font-elegant-sans">
                              <strong>비회원으로 상담 신청하시겠습니까?</strong><br/>
                              간편하게 회원가입하여 더 많은 혜택을 받아보세요!
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <input
                            id="want-register"
                            type="checkbox"
                            checked={formData.wantToRegister}
                            onChange={(e) => setFormData({...formData, wantToRegister: e.target.checked})}
                            className="h-5 w-5 text-teal-smoke-600 focus:ring-teal-smoke-500 border-teal-smoke-300 rounded"
                          />
                          <label htmlFor="want-register" className="text-sm font-elegant-sans text-slate-700">
                            네, 회원가입을 희망합니다
                          </label>
                        </div>

                        {/* User ID Field - Show when registration is selected */}
                        {formData.wantToRegister && (
                          <div className="space-y-4 pt-4 border-t border-teal-smoke-200/40">
                            <div className="relative group">
                              <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                                사용자 ID *
                              </label>
                              <input
                                type="text"
                                value={formData.userId || ''}
                                onChange={(e) => setFormData({...formData, userId: e.target.value})}
                                placeholder="사용하실 아이디를 입력하세요 (영문/숫자 4-20자)"
                                required={formData.wantToRegister}
                                pattern="^[a-zA-Z0-9]{4,20}$"
                                className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800 placeholder-slate-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* User Information Section */}
                  <div className="space-y-4 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-elegant font-medium text-slate-800">개인 정보</h3>
                      {isAuthenticated && (
                        <div className="text-xs text-slate-500 font-elegant-sans">
                          회원정보 수정은 <a href="/mypage" className="text-teal-smoke-600 hover:text-teal-smoke-700 underline">마이페이지</a>에서 가능합니다
                        </div>
                      )}
                    </div>
                    
                    {isAuthenticated ? (
                      // 로그인한 회원 - 정보 표시만
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                              이름
                            </label>
                            <div className="glass-consultation-form w-full px-4 py-3 rounded-xl font-elegant-sans text-slate-800 bg-slate-50/50">
                              {userInfo?.name || user?.username || user?.name || ''}
                            </div>
                          </div>

                          <div className="relative">
                            <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                              연락처
                            </label>
                            <div className="glass-consultation-form w-full px-4 py-3 rounded-xl font-elegant-sans text-slate-800 bg-slate-50/50">
                              {userInfo?.phone || user?.phone || ''}
                            </div>
                          </div>
                        </div>

                        <div className="relative">
                          <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                            이메일
                          </label>
                          <div className="glass-consultation-form w-full px-4 py-3 rounded-xl font-elegant-sans text-slate-800 bg-slate-50/50">
                            {userInfo?.email || user?.email || ''}
                          </div>
                        </div>
                      </>
                    ) : (
                      // 비회원 - 입력 필드
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative group">
                            <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                              이름 *
                            </label>
                            <input
                              type="text"
                              value={userInfo?.name || ''}
                              onChange={(e) => updateUserInfo({...userInfo, name: e.target.value})}
                              placeholder="성함을 입력해주세요"
                              required
                              className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800 placeholder-slate-500"
                            />
                          </div>

                          <div className="relative group">
                            <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                              연락처 *
                            </label>
                            <input
                              type="tel"
                              value={userInfo?.phone ? formatPhoneNumber(userInfo.phone) : ''}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                updateUserInfo({...userInfo, phone: numericValue});
                              }}
                              placeholder="010-0000-0000"
                              required
                              maxLength={13}
                              className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800 placeholder-slate-500"
                            />
                          </div>
                        </div>

                        <div className="relative group">
                          <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                            이메일 *
                          </label>
                          <input
                            type="email"
                            value={userInfo?.email || ''}
                            onChange={(e) => updateUserInfo({...userInfo, email: e.target.value})}
                            placeholder="example@email.com"
                            required
                            className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800 placeholder-slate-500"
                          />
                        </div>

                        {/* Password Field for Non-Member Consultations */}
                        {!formData.wantToRegister && (
                          <div className="relative group">
                            <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                              비밀번호 *
                            </label>
                            <input
                              type="password"
                              value={formData.password}
                              onChange={(e) => setFormData({...formData, password: e.target.value})}
                              placeholder="비밀번호를 입력하세요 (최소 8자)"
                              required
                              minLength={8}
                              className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800 placeholder-slate-500"
                            />
                            <p className="text-xs text-slate-600 mt-2 font-elegant-sans">
                              (* 추후에 &apos;상담 신청 게시판&apos;에서 상담 신청 현황을 확인하시기 위하여 비밀번호가 사용됩니다.)
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Password Fields - Show when registration is selected for non-authenticated users */}
                  {!isAuthenticated && formData.wantToRegister && (
                    <div className="p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60">
                      <h3 className="text-lg font-elegant font-medium text-slate-800 mb-4">비밀번호 설정</h3>
                      <div className="space-y-4">
                        <div className="relative group">
                          <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                            비밀번호 *
                          </label>
                          <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder="비밀번호를 입력하세요 (최소 8자)"
                            required={formData.wantToRegister}
                            minLength={8}
                            className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800 placeholder-slate-500"
                          />
                        </div>

                        <div className="relative group">
                          <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                            비밀번호 확인 *
                          </label>
                          <input
                            type="password"
                            value={formData.passwordConfirm}
                            onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
                            placeholder="비밀번호를 다시 입력하세요"
                            required={formData.wantToRegister}
                            className="glass-consultation-form w-full px-4 py-3 rounded-xl focus:outline-none font-elegant-sans text-slate-800 placeholder-slate-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        희망 상담 날짜
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => {
                          console.log('Date changed:', e.target.value);
                          setFormData({...formData, preferredDate: e.target.value});
                        }}
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
                        onChange={(e) => {
                          console.log('Time changed:', e.target.value);
                          setFormData({...formData, preferredTime: e.target.value});
                        }}
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
                  <div className="mt-4 p-3 bg-teal-smoke-50/50 rounded-lg">
                    <p className="text-xs text-slate-600 font-elegant-sans">
                      * 고객님의 상담 접수 현황은 커뮤니티 {'>'} 상담 내역 조회에서 확인 가능합니다
                    </p>
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
        onConfirm={alertState.onConfirm}
      />
      
      {/* Procedure Selection Modal */}
      <ProcedureSelectionModal 
        isOpen={showProcedureModal}
        onClose={() => setShowProcedureModal(false)}
        onProceduresSelected={(procedureNames) => {
          console.log('Selected procedures:', procedureNames);
          
          // 선택된 시술들을 카트에 추가
          procedureNames.forEach((procedureName, index) => {
            const procedureItem = {
              id: `procedure-${Date.now()}-${index}`, // 고유 ID 생성
              name: procedureName,
              category: '선택한 시술' // 기본 카테고리
            };
            
            // 중복 확인 후 카트에 추가
            const isDuplicate = cart.some(item => item.name === procedureName);
            if (!isDuplicate) {
              addToCart(procedureItem); // useCart 훅의 addToCart 함수 직접 사용
            }
          });
          
          setShowProcedureModal(false);
        }}
      />
    </PageLayout>
  );
}
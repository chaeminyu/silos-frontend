'use client';

import { useState, useEffect } from 'react';
import PageLayout from '../../../components/PageLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, CheckCircle, AlertCircle, MessageSquare, User, Eye, EyeOff, Lock } from 'lucide-react';

// Backend 데이터 타입 정의
interface ConsultationData {
  id: number;
  userId: string;
  userName?: string;
  date: string;
  requestedDate: string;
  requestedTime: string;
  procedures: string[];
  message: string;
  status: string;
  adminResponse?: string;
  isPublic?: boolean;
  views?: number;
  interestedProcedures: string[];
  consultationType: string;
  createdAt: string;
  notes: string;
}

// 시간 변환 함수
function convertTimeToDisplay(timeString: string): string {
  if (timeString.includes('10:00')) return '오전';
  if (timeString.includes('14:00')) return '오후';  
  if (timeString.includes('17:00')) return '저녁';
  return timeString;
}

// 상태 변환 함수
function convertStatusToDisplay(status: string): string {
  switch (status) {
    case 'CONFIRMED':
    case 'COMPLETED':
      return 'confirmed';
    case 'PENDING':
      return 'pending';
    case 'CANCELLED':
      return 'cancelled';
    default:
      return 'pending';
  }
}

// ProcedureCategory enum을 한글로 변환
function mapProcedureCategoryToKorean(category: string): string {
  const procedureMap: { [key: string]: string } = {
    'SILOS_THREAD_LIFTING': '실로스 실리프팅',
    'SILOS_POWER_THREAD_LIFTING': '실로스 파워 실리프팅',
    'NOSE_LIFTING': '코리프팅',
    'JAW_LINE_LIFTING': '턱라인 리프팅',
    'FOREHEAD_LIFTING': '이마 리프팅',
    'BULLDOG_LIFTING': '불독살 리프팅',
    'NASOLABIAL_LIFTING': '팔자주름 리프팅',
    'FACE_LIFTING': '페이스 리프팅',
    'FOREHEAD_EYEBROW_LIFTING': '이마눈썹 리프팅',
    'NECK_LIFTING': '목 리프팅',
    'SILOS_UPPER_EYELID': '실로스 상안검',
    'SILOS_DUAL_UPPER_EYELID': '실로스 듀얼 상안검',
    'SILOS_UNDER_EYEBROW_INCISION': '실로스 눈썹하 절개',
    'SILOS_LOWER_EYELID': '실로스 하안검',
    'UNDER_EYE_FAT_LASER': '눈밑지방 레이저',
    'DARK_CIRCLE_LASER': '다크서클 레이저',
    'ULTHERA': '울쎄라',
    'ONDA': '온다',
    'ULTIGHT': '울타이트',
    'VERO': '브이로',
    'SHRINK': '슈링크',
    'DENSITY': '덴서티',
    'ENCORE': '엔코어',
    'LDM': 'LDM',
    'SILOS_FAT': '실로팻',
    'COLA_FILL': '콜라채움',
    'REJURAN': '리쥬란',
    'OLIDIA': '올리디아',
    'JUVELOOK': '쥬베룩',
    'RADIESSE': '래디어스',
    'VOLLASOME': '볼라썸',
    'SKIN_BOOSTER': '물광주사'
  };
  
  return procedureMap[category] || category;
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

export default function ConsultationListPage() {
  const { user, isAuthenticated } = useAuth();
  const [consultations, setConsultations] = useState<ConsultationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationData | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'my-posts'>('all');
  
  // Non-member verification states
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationData, setVerificationData] = useState({ phone: '', password: '' });
  const [verificationError, setVerificationError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [nonMemberConsultations, setNonMemberConsultations] = useState<ConsultationData[]>([]);
  
  // Use auth context for current user
  const currentUserId = user?.id?.toString() || '';
  const isAdmin = user?.role === 'ADMIN';

  // 백엔드에서 상담 데이터 불러오기
  useEffect(() => {
    const fetchConsultations = async () => {
      // 로그인 상태와 관계없이 데이터 요청 (누구나 리스트는 볼 수 있음)

      try {
        setIsLoading(true);
        const response = await fetch('/api/consultations');
        const result = await response.json();

        if (result.success) {
          // 백엔드 데이터를 프론트엔드 형식으로 변환
          const transformedData: ConsultationData[] = result.data.map((item: any) => ({
            id: item.id,
            userId: item.userId || '',
            userName: item.userName || user?.username || '사용자',
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
            requestedDate: item.requestedDate || '',
            requestedTime: convertTimeToDisplay(item.requestedTime || ''),
            procedures: item.interestedProcedures?.map((proc: string) => mapProcedureCategoryToKorean(proc)) || [],
            message: item.notes || '',
            status: convertStatusToDisplay(item.status || 'PENDING'),
            adminResponse: item.adminResponse || null,
            isPublic: item.isPublic !== false, // 기본값 true
            views: item.views || 0,
            interestedProcedures: item.interestedProcedures || [],
            consultationType: item.consultationType || 'ONLINE',
            createdAt: item.createdAt || '',
            notes: item.notes || ''
          }));

          setConsultations(transformedData);
          console.log('Transformed consultations:', transformedData);
        } else {
          setError(result.message || '상담 내역을 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Failed to fetch consultations:', error);
        setError('상담 내역을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultations();
  }, [isAuthenticated, user]);

  const filteredConsultations = consultations.filter(consultation => {
    // For "my-posts" filter, show different results based on authentication
    if (filterStatus === 'my-posts') {
      if (isAuthenticated) {
        // Authenticated users: show their own posts
        return consultation.userId === currentUserId;
      } else {
        // Non-members: show verified consultations
        return nonMemberConsultations.some(nmc => nmc.id === consultation.id);
      }
    }
    
    // For other filters, apply visibility rules
    if (!isAdmin && !consultation.isPublic && consultation.userId !== currentUserId) {
      return false;
    }
    
    if (filterStatus === 'all') return true;
    return consultation.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            접수 완료
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            대기중
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-light text-slate-800 mb-4">
              상담 문의
            </h1>
            <div className="w-24 h-0.5 bg-teal-smoke-300 rounded-full mx-auto mb-6"></div>
            <p className="text-lg font-elegant-sans font-light text-slate-700">
              {isAdmin ? '모든 상담 신청 내역을 확인하실 수 있습니다' : '상담 신청 현황을 확인하실 수 있습니다'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white/70 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/50">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-2 rounded-lg font-elegant-sans text-sm transition-all ${
                  filterStatus === 'all'
                    ? 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-6 py-2 rounded-lg font-elegant-sans text-sm transition-all ${
                  filterStatus === 'pending'
                    ? 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                대기중
              </button>
              <button
                onClick={() => setFilterStatus('confirmed')}
                className={`px-6 py-2 rounded-lg font-elegant-sans text-sm transition-all ${
                  filterStatus === 'confirmed'
                    ? 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                접수 완료
              </button>
              
              {/* My Posts Tab - Show different content based on authentication */}
              {isAuthenticated ? (
                <button
                  onClick={() => setFilterStatus('my-posts')}
                  className={`px-6 py-2 rounded-lg font-elegant-sans text-sm transition-all ${
                    filterStatus === 'my-posts'
                      ? 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  내가 쓴 글
                </button>
              ) : (
                <button
                  onClick={() => setShowVerificationModal(true)}
                  className={`px-6 py-2 rounded-lg font-elegant-sans text-sm transition-all text-slate-600 hover:text-slate-800`}
                >
                  내가 쓴 글
                </button>
              )}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-smoke-400"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-8 max-w-md mx-auto bg-red-50 rounded-xl p-6 border border-red-200">
              <p className="text-red-700 font-elegant-sans text-center">{error}</p>
            </div>
          )}

          {/* No Data State */}
          {!isLoading && !error && consultations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 font-elegant-sans">아직 상담 신청 내역이 없습니다.</p>
              <button
                onClick={() => window.location.href = '/consultation/request'}
                className="mt-4 px-6 py-2 bg-teal-smoke-300 text-white rounded-xl font-elegant-sans hover:bg-teal-smoke-400 transition-colors"
              >
                상담 신청하기
              </button>
            </div>
          )}

          {/* Non-Member Verification Modal */}
          {showVerificationModal && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowVerificationModal(false);
                setVerificationData({ phone: '', password: '' });
                setVerificationError('');
              }}
            >
              <div 
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-elegant-sans font-medium text-slate-800 mb-2">
                    상담 신청 현황 확인
                  </h3>
                  <p className="text-sm text-slate-600 font-elegant-sans">
                    로그인하여 고객님의 상담 신청 현황을 확인하세요!
                  </p>
                </div>

                {/* Main Login Button */}
                <div className="mb-6">
                  <button
                    onClick={() => {
                      setShowVerificationModal(false);
                      window.location.href = '/login';
                    }}
                    className="w-full py-4 px-6 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white rounded-xl font-elegant-sans font-medium hover:from-teal-smoke-500 hover:to-elegant-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    회원으로 로그인하기
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center mb-6">
                  <div className="flex-1 border-t border-slate-200"></div>
                  <span className="px-4 text-sm text-slate-500 font-elegant-sans">또는</span>
                  <div className="flex-1 border-t border-slate-200"></div>
                </div>

                {/* Non-member section */}
                <div className="mb-6">
                  <p className="text-sm text-slate-600 font-elegant-sans text-center mb-4">
                    비회원의 경우, 전화번호와 비밀번호를 입력하시면<br/>상담 신청 현황이 확인 가능합니다
                  </p>

                  {verificationError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-700 text-sm font-elegant-sans text-center">{verificationError}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                        전화번호
                      </label>
                      <input
                        type="tel"
                        value={verificationData.phone ? formatPhoneNumber(verificationData.phone) : ''}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/[^0-9]/g, '');
                          setVerificationData({...verificationData, phone: numericValue});
                        }}
                        placeholder="010-0000-0000"
                        maxLength={13}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 font-elegant-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-elegant font-medium text-slate-700 mb-2">
                        비밀번호
                      </label>
                      <input
                        type="password"
                        value={verificationData.password}
                        onChange={(e) => setVerificationData({...verificationData, password: e.target.value})}
                        placeholder="상담 신청시 입력한 비밀번호"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-smoke-300 font-elegant-sans"
                      />
                    </div>

                    <button
                      onClick={async () => {
                        if (!verificationData.phone || !verificationData.password) {
                          setVerificationError('전화번호와 비밀번호를 모두 입력해주세요.');
                          return;
                        }
                        
                        setIsVerifying(true);
                        setVerificationError('');
                        
                        try {
                          const response = await fetch('/api/consultations/verify', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              phone: verificationData.phone,
                              password: verificationData.password
                            }),
                          });
                          
                          const result = await response.json();
                          
                          if (result.success) {
                            setNonMemberConsultations(result.data || []);
                            setFilterStatus('my-posts');
                            setShowVerificationModal(false);
                            setVerificationData({ phone: '', password: '' });
                          } else {
                            setVerificationError(result.message || '인증에 실패했습니다. 전화번호와 비밀번호를 확인해주세요.');
                          }
                        } catch (error) {
                          setVerificationError('인증 중 오류가 발생했습니다. 다시 시도해주세요.');
                        } finally {
                          setIsVerifying(false);
                        }
                      }}
                      disabled={isVerifying}
                      className="w-full py-3 px-4 bg-slate-600 text-white rounded-xl font-elegant-sans hover:bg-slate-700 transition-all disabled:opacity-50"
                    >
                      {isVerifying ? '확인 중...' : '비회원 인증'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Consultation List - Desktop Table */}
          <div className="hidden md:block bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-teal-smoke-50 to-elegant-50 border-b border-teal-smoke-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      번호
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      작성자
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      시술 내역
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      희망 날짜
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      공개
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-elegant font-medium text-slate-700 uppercase tracking-wider">
                      조회
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-smoke-100">
                  {filteredConsultations.map((consultation, index) => (
                    <tr
                      key={consultation.id}
                      onClick={() => setSelectedConsultation(consultation)}
                      className="hover:bg-teal-smoke-50/50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-elegant-sans">
                        {filteredConsultations.length - index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-teal-smoke-400 mr-2" />
                          <span className="text-sm text-slate-700 font-elegant-sans">
                            {consultation.userName}
                          </span>
                          {consultation.userId === currentUserId && (
                            <span className="ml-2 text-xs text-teal-smoke-500 font-elegant-sans">(내 글)</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700 font-elegant-sans">
                          {consultation.procedures.slice(0, 2).join(', ')}
                          {consultation.procedures.length > 2 && ` 외 ${consultation.procedures.length - 2}개`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-slate-600 font-elegant-sans">
                          <Calendar className="w-4 h-4 mr-1" />
                          {consultation.requestedDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(consultation.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {consultation.isPublic ? (
                          <Eye className="w-4 h-4 text-teal-smoke-400" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-teal-smoke-300" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-elegant-sans">
                        {consultation.views}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Consultation List - Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredConsultations.map((consultation, index) => (
              <div
                key={consultation.id}
                onClick={() => setSelectedConsultation(consultation)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-smoke-200/30 cursor-pointer hover:bg-white/90 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-smoke-300 to-elegant-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {filteredConsultations.length - index}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-teal-smoke-400 mr-2" />
                        <span className="text-base font-elegant-sans font-medium text-slate-800">
                          {consultation.userName}
                        </span>
                        {consultation.userId === currentUserId && (
                          <span className="ml-2 text-xs text-teal-smoke-500 font-elegant-sans bg-teal-smoke-100 px-2 py-1 rounded-full">(내 글)</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(consultation.status)}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 font-elegant-sans mb-1">시술 내역</p>
                    <p className="text-base text-slate-800 font-elegant-sans font-medium">
                      {consultation.procedures.slice(0, 2).join(', ')}
                      {consultation.procedures.length > 2 && ` 외 ${consultation.procedures.length - 2}개`}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-slate-600 font-elegant-sans">
                      <Calendar className="w-4 h-4 mr-1" />
                      {consultation.requestedDate}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        {consultation.isPublic ? (
                          <Eye className="w-4 h-4 text-teal-smoke-400" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-slate-300" />
                        )}
                      </div>
                      <span className="text-sm text-slate-500 font-elegant-sans">
                        조회 {consultation.views}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Consultation Detail */}
          {selectedConsultation && (
            <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-display font-light text-slate-800 mb-2">
                    상담 상세 내용
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 font-elegant-sans">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {selectedConsultation.userName}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {selectedConsultation.date}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {selectedConsultation.views}회
                    </span>
                  </div>
                </div>
                {getStatusBadge(selectedConsultation.status)}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-elegant font-medium text-slate-700 mb-2">
                    희망 상담 일정
                  </h3>
                  <div className="flex items-center space-x-4 text-slate-600 font-elegant-sans">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {selectedConsultation.requestedDate}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedConsultation.requestedTime}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-elegant font-medium text-slate-700 mb-2">
                    상담 희망 시술
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedConsultation.procedures.map((procedure, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-slate-700 rounded-lg text-sm font-elegant-sans"
                      >
                        {procedure}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-elegant font-medium text-slate-700 mb-2">
                    <MessageSquare className="inline w-4 h-4 mr-1" />
                    상담 내용
                  </h3>
                  <p className="text-slate-600 font-elegant-sans bg-teal-smoke-50 rounded-xl p-4">
                    {selectedConsultation.message}
                  </p>
                </div>

                {selectedConsultation.adminResponse && (
                  <div>
                    <h3 className="text-sm font-elegant font-medium text-slate-700 mb-2">
                      <CheckCircle className="inline w-4 h-4 mr-1 text-green-600" />
                      병원 답변
                    </h3>
                    <p className="text-slate-600 font-elegant-sans bg-green-50 rounded-xl p-4">
                      {selectedConsultation.adminResponse}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedConsultation(null)}
                className="mt-6 px-6 py-2 bg-teal-smoke-200 text-slate-700 rounded-xl font-elegant-sans hover:bg-teal-smoke-300 transition-colors"
              >
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
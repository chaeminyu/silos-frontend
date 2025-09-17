'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import PageLayout from '../../components/PageLayout';
import CustomAlert from '../../components/CustomAlert';
import { User, Edit3, LogOut, Trash2, Save, X, Mail, Phone, UserCircle } from 'lucide-react';

interface UserInfo {
  name: string;
  phone: string;
  email: string;
}

export default function MyPage() {
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    phone: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState<UserInfo>(userInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'warning',
    title: '',
    message: '',
    onConfirm: undefined as (() => void) | undefined
  });

  useEffect(() => {
    if (authLoading) return;
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const loadUserInfo = async () => {
      try {
        if (user) {
          const formattedUserInfo: UserInfo = {
            name: user.username || '',
            phone: user.phone || '',
            email: user.email || ''
          };
          setUserInfo(formattedUserInfo);
          setEditedInfo(formattedUserInfo);
          setIsLoading(false);
          return;
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading user info:', error);
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, [authLoading, isAuthenticated, user, router]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo(userInfo);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedInfo(userInfo);
  };

  const handleSave = async () => {
    // 간단한 유효성 검사
    if (!editedInfo.name.trim()) {
      setAlertState({
        isOpen: true,
        type: 'error',
        title: '입력 오류',
        message: '이름을 입력해주세요.',
        onConfirm: undefined
      });
      return;
    }

    if (!editedInfo.phone.trim()) {
      setAlertState({
        isOpen: true,
        type: 'error',
        title: '입력 오류',
        message: '전화번호를 입력해주세요.',
        onConfirm: undefined
      });
      return;
    }

    if (!editedInfo.email.trim()) {
      setAlertState({
        isOpen: true,
        type: 'error',
        title: '입력 오류',
        message: '이메일을 입력해주세요.',
        onConfirm: undefined
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: editedInfo.name,
          phone: editedInfo.phone,
          email: editedInfo.email
        })
      });

      const result = await response.json();

      if (result.success) {
        setUserInfo(editedInfo);
        setIsEditing(false);
        
        setAlertState({
          isOpen: true,
          type: 'success',
          title: '저장 완료',
          message: '회원 정보가 성공적으로 업데이트되었습니다.',
          onConfirm: undefined
        });
      } else {
        setAlertState({
          isOpen: true,
          type: 'error',
          title: '저장 실패',
          message: result.message || '회원 정보 업데이트에 실패했습니다.',
          onConfirm: undefined
        });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setAlertState({
        isOpen: true,
        type: 'error',
        title: '저장 실패',
        message: '회원 정보 업데이트 중 오류가 발생했습니다.',
        onConfirm: undefined
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setAlertState({
      isOpen: true,
      type: 'warning',
      title: '로그아웃',
      message: '정말 로그아웃하시겠습니까?',
      onConfirm: () => {
        logout();
        router.push('/');
      }
    });
  };

  const handleDeleteAccount = () => {
    setAlertState({
      isOpen: true,
      type: 'warning',
      title: '회원 탈퇴',
      message: '정말로 회원 탈퇴하시겠습니까?\\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.',
      onConfirm: async () => {
        try {
          const response = await fetch('/api/auth/profile', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const result = await response.json();

          if (result.success) {
            logout();
            router.push('/');
          } else {
            setAlertState({
              isOpen: true,
              type: 'error',
              title: '탈퇴 실패',
              message: result.message || '회원 탈퇴 처리에 실패했습니다.',
              onConfirm: undefined
            });
          }
        } catch (error) {
          console.error('Account deletion error:', error);
          setAlertState({
            isOpen: true,
            type: 'error',
            title: '탈퇴 실패',
            message: '회원 탈퇴 중 오류가 발생했습니다.',
            onConfirm: undefined
          });
        }
      }
    });
  };

  if (authLoading || isLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-smoke-200 border-t-teal-smoke-500"></div>
              <p className="text-slate-600 font-elegant-sans font-light">로딩 중...</p>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* 헤더 섹션 */}
        <div className="relative py-20 sm:py-24 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-50/30 via-white/90 to-elegant-50/30"></div>
          <div className="relative container mx-auto px-6 sm:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-smoke-100 to-elegant-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-teal-smoke-200/30">
                <UserCircle className="w-8 h-8 text-teal-smoke-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-slate-800 mb-4">
                마이페이지
              </h1>
              <p className="text-xl text-slate-600 font-elegant-sans font-light mb-8 leading-relaxed">
                회원 정보 관리
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="container mx-auto px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            {/* 프로필 카드 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="bg-gradient-to-br from-teal-smoke-50 to-elegant-50 p-8 border-b border-teal-smoke-100/30">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-display font-light text-slate-800 mb-2">
                      회원 정보
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full"></div>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-slate-700 rounded-xl hover:from-teal-smoke-200 hover:to-elegant-200 transition-all duration-300 font-elegant-sans font-medium text-sm border border-teal-smoke-200/50 shadow-sm hover:shadow-md"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      수정하기
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-smoke-500 to-elegant-500 text-white rounded-xl hover:from-teal-smoke-600 hover:to-elegant-600 transition-all duration-300 font-elegant-sans font-medium text-sm shadow-md hover:shadow-lg"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        저장
                      </button>
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-6 py-3 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-all duration-300 font-elegant-sans font-medium text-sm border border-slate-200 shadow-sm hover:shadow-md"
                      >
                        <X className="w-4 h-4 mr-2" />
                        취소
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 사용자 정보 폼 */}
              <div className="p-8">
                <div className="grid gap-8 md:gap-10">
                  {/* 이름 */}
                  <div className="space-y-3">
                    <label className="block text-lg font-elegant-sans font-light text-slate-700">
                      이름
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-smoke-400/60 transition-colors group-focus-within:text-teal-smoke-500">
                        <UserCircle className="w-full h-full" />
                      </div>
                      <input
                        type="text"
                        value={isEditing ? editedInfo.name : userInfo.name}
                        onChange={(e) => setEditedInfo({...editedInfo, name: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full pl-14 pr-6 py-4 rounded-2xl border font-elegant-sans text-lg transition-all duration-300 ${
                          isEditing 
                            ? 'border-teal-smoke-200 bg-white focus:border-teal-smoke-400 focus:ring-4 focus:ring-teal-smoke-100/30 focus:bg-white shadow-sm' 
                            : 'border-teal-smoke-100/50 bg-teal-smoke-25 text-slate-600'
                        }`}
                        placeholder="이름을 입력하세요"
                      />
                    </div>
                  </div>

                  {/* 전화번호 */}
                  <div className="space-y-3">
                    <label className="block text-lg font-elegant-sans font-light text-slate-700">
                      전화번호
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-smoke-400/60 transition-colors group-focus-within:text-teal-smoke-500">
                        <Phone className="w-full h-full" />
                      </div>
                      <input
                        type="tel"
                        value={isEditing ? editedInfo.phone : userInfo.phone}
                        onChange={(e) => setEditedInfo({...editedInfo, phone: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full pl-14 pr-6 py-4 rounded-2xl border font-elegant-sans text-lg transition-all duration-300 ${
                          isEditing 
                            ? 'border-teal-smoke-200 bg-white focus:border-teal-smoke-400 focus:ring-4 focus:ring-teal-smoke-100/30 focus:bg-white shadow-sm' 
                            : 'border-teal-smoke-100/50 bg-teal-smoke-25 text-slate-600'
                        }`}
                        placeholder="전화번호를 입력하세요"
                      />
                    </div>
                  </div>

                  {/* 이메일 */}
                  <div className="space-y-3">
                    <label className="block text-lg font-elegant-sans font-light text-slate-700">
                      이메일
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-smoke-400/60 transition-colors group-focus-within:text-teal-smoke-500">
                        <Mail className="w-full h-full" />
                      </div>
                      <input
                        type="email"
                        value={isEditing ? editedInfo.email : userInfo.email}
                        onChange={(e) => setEditedInfo({...editedInfo, email: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full pl-14 pr-6 py-4 rounded-2xl border font-elegant-sans text-lg transition-all duration-300 ${
                          isEditing 
                            ? 'border-teal-smoke-200 bg-white focus:border-teal-smoke-400 focus:ring-4 focus:ring-teal-smoke-100/30 focus:bg-white shadow-sm' 
                            : 'border-teal-smoke-100/50 bg-teal-smoke-25 text-slate-600'
                        }`}
                        placeholder="이메일을 입력하세요"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 계정 관리 카드 */}
            <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 p-8 border-b border-slate-200/30">
                <div>
                  <h2 className="text-2xl font-display font-light text-slate-800 mb-2">
                    계정 관리
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid gap-6">
                  {/* 로그아웃 버튼 */}
                  <button
                    onClick={handleLogout}
                    className="group w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-2xl font-elegant-sans font-medium text-base hover:from-slate-200 hover:to-slate-300 transition-all duration-300 border border-slate-300/30 shadow-sm hover:shadow-md transform hover:scale-[1.01]"
                  >
                    <LogOut className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    로그아웃
                  </button>

                  {/* 회원 탈퇴 버튼 */}
                  <button
                    onClick={handleDeleteAccount}
                    className="group w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-50 to-red-50 text-rose-600 rounded-2xl font-elegant-sans font-medium text-base hover:from-rose-100 hover:to-red-100 hover:text-rose-700 transition-all duration-300 border border-rose-200/30 shadow-sm hover:shadow-md transform hover:scale-[1.01]"
                  >
                    <Trash2 className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    회원 탈퇴
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomAlert
        isOpen={alertState.isOpen}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        onClose={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
        onConfirm={alertState.onConfirm}
      />
    </PageLayout>
  );
}
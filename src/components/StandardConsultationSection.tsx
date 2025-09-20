'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProcedureSelectionModal from './ProcedureSelectionModal';
import { useCart } from '@/contexts/CartContext';

interface StandardConsultationSectionProps {
  title?: string;
  description?: string;
  initialProcedureId?: string; // 특정 시술 페이지에서 해당 시술을 자동 선택
  className?: string;
}

export default function StandardConsultationSection({
  title = "온라인 상담 예약",
  description = "전문의와의 1:1 맞춤 상담으로 당신만의 아름다움을 계획하세요",
  initialProcedureId,
  className = ""
}: StandardConsultationSectionProps) {
  const router = useRouter();
  const { updateUserInfo, addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceduresSelected = (procedures: string[]) => {
    setSelectedProcedures(procedures);
  };

  // 이벤트 참여 API 호출 함수
  const participateInEvent = async (eventId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/participate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        console.log('이벤트 참여가 성공적으로 처리되었습니다.');
      } else {
        console.error('이벤트 참여 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('이벤트 참여 API 호출 실패:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    
    if (!formData.phone.trim()) {
      alert('연락처를 입력해주세요.');
      return;
    }
    
    if (selectedProcedures.length === 0) {
      alert('관심 시술을 선택해주세요.');
      return;
    }
    
    // 사용자 정보를 카트 컨텍스트에 저장
    updateUserInfo({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message
    });

    // 선택된 시술을 카트에 추가 - 이때만 카트 아이템 카운트가 증가
    // 시술 이름으로부터 ID와 카테고리를 찾아서 카트에 추가
    selectedProcedures.forEach(procedureName => {
      // Find the procedure by name to get its ID and category
      let foundProcedure = null;
      let foundCategory = '';
      
      // This should match the procedure data structure from ProcedureSelectionModal
      const procedureCategories = [
        { id: 'silos-lifting', name: '실로스 커스터마이징 실리프팅', items: [
          { id: 'thread-lifting', name: '실로스 실리프팅' },
          { id: 'power-lifting', name: '실로스 파워 실리프팅' },
          { id: 'nose-lifting', name: '코리프팅' },
          { id: 'jawline-lifting', name: '턱라인 리프팅' },
          { id: 'forehead-lifting', name: '이마 리프팅' },
          { id: 'jowl-lifting', name: '불독살 리프팅' },
          { id: 'nasolabial-lifting', name: '팔자주름 리프팅' }
        ]},
        { id: 'eyelid-lifting', name: '눈꺼풀 처짐 리프팅', items: [
          { id: 'upper-blepharoplasty', name: '실로스 상안검' },
          { id: 'dual-upper-blepharoplasty', name: '실로스 듀얼 상안검' },
          { id: 'brow-incision', name: '실로스 눈썹하 절개' },
          { id: 'lower-blepharoplasty', name: '실로스 하안검' }
        ]},
        { id: 'laser-lifting', name: '레이저 리프팅', items: [
          { id: 'ulthera', name: '울쎄라' },
          { id: 'shrink', name: '슈링크' },
          { id: 'onda', name: '온다' },
          { id: 'encore', name: '엔코어' },
          { id: 'density', name: '덴서티' },
          { id: 'vero', name: '브이로' }
        ]},
        { id: 'under-eye-laser', name: '눈밑지방 레이저', items: [
          { id: 'fat-laser', name: '눈밑지방레이저' },
          { id: 'dark-circle-laser', name: '다크서클 레이저' }
        ]},
        { id: 'skin-lifting', name: '피부 리프팅', items: [
          { id: 'collagen', name: '콜라채움' },
          { id: 'rejuran', name: '리쥬란' },
          { id: 'olydia', name: '올리디아' },
          { id: 'juvelook', name: '쥬베룩' },
          { id: 'radius', name: '래디어스' },
          { id: 'vollasome', name: '볼라썸' },
          { id: 'skin-booster', name: '물광주사' }
        ]},
        { id: 'special-filler', name: '특수 부위 필러', items: [
          { id: 'elf-ear', name: '요정귀 필러' },
          { id: 'protruding-mouth', name: '돌출입 교정' },
          { id: 'forehead', name: '이마 필러' },
          { id: 'temple', name: '관자 필러' },
          { id: 'jawline', name: '턱라인 필러' },
          { id: 'lip', name: '입술 필러' },
          { id: 'hand', name: '손등 주름 필러' }
        ]},
        { id: 'face-lifting', name: '페이스 리프팅', items: [
          { id: 'full-face', name: '페이스 리프팅' }
        ]},
        { id: 'forehead-lifting', name: '이마 눈썹 리프팅', items: [
          { id: 'endoscopic', name: '내시경 이마 리프팅' }
        ]},
        { id: 'neck-lifting', name: '목 리프팅', items: [
          { id: 'neck-core', name: '넥코어 리프팅' }
        ]},
        { id: 'silofat', name: '실로팻', items: [
          { id: 'fat-extraction', name: '실로팻 지방추출주사' },
          { id: 'fat-grafting', name: '지방 이식술' }
        ]}
      ];
      
      // Find the procedure and its category
      for (const category of procedureCategories) {
        const item = category.items.find((item: any) => item.name === procedureName);
        if (item) {
          foundProcedure = item;
          foundCategory = category.name;
          break;
        }
      }
      
      // Add to cart if found
      if (foundProcedure) {
        addToCart({
          id: foundProcedure.id,
          name: foundProcedure.name,
          category: foundCategory
        });
      } else {
        // Fallback for unknown procedures
        const fallbackId = procedureName.toLowerCase().replace(/\s+/g, '-');
        addToCart({
          id: fallbackId,
          name: procedureName,
          category: '일반 상담'
        });
      }
    });
    
    // 데이터를 sessionStorage에도 저장 (호환성을 위해)
    const consultationData = {
      personalInfo: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      },
      selectedProcedures: selectedProcedures,
      message: formData.message
    };
    
    // 이벤트 참여수 증가 (이벤트 ID 1번으로 가정)
    await participateInEvent(1);
    
    sessionStorage.setItem('consultationData', JSON.stringify(consultationData));
    router.push('/consultation/request');
  };

  return (
    <>
      {/* 온라인 상담 섹션 - 메인 페이지 스타일과 동일 - Full width */}
      <section className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-24 overflow-hidden ${className}`}>
        {/* Glass-like background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-100/70 via-white/50 to-teal-smoke-200/70 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-smoke-300/30 via-transparent to-elegant-300/30"></div>
        
        {/* 배경 장식 요소들 */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/5 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-spin-slow"></div>
        
        <div className="w-full relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-display font-bold mb-6 tracking-wide drop-shadow-lg text-cyan-800">
                {title}
              </h2>
              <div className="w-20 h-0.5 bg-teal-smoke-400 rounded-full mx-auto mb-8 shadow-lg"></div>
              <p className="text-xl font-elegant-sans font-light mb-16 text-slate-700 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                {description}
              </p>
              
              {/* 메인 폼 컨테이너 - 고급 글래스 이펙트 */}
              <div className="max-w-2xl mx-auto relative group">
                {/* 외부 글로우 효과 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-cyan-300/20 to-white/20 rounded-3xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* 메인 글래스 컨테이너 */}
                <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-10 border border-teal-smoke-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                  {/* 내부 그라데이션 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-teal-smoke-50/20 to-white/10 rounded-3xl"></div>
                  
                  {/* 폼 요소들 - 글래스 이펙트 적용 */}
                  <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <input
                          type="text"
                          name="name"
                          placeholder="이름"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-white/30 backdrop-blur-md border border-teal-smoke-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-400/80 focus:border-teal-smoke-300/80 focus:bg-white/40 text-slate-800 placeholder-slate-600 font-elegant-sans font-light transition-all duration-300 hover:bg-white/35 hover:border-teal-smoke-300/70 shadow-lg hover:shadow-xl"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-teal-smoke-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <div className="relative group">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="연락처"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-white/30 backdrop-blur-md border border-teal-smoke-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-400/80 focus:border-teal-smoke-300/80 focus:bg-white/40 text-slate-800 placeholder-slate-600 font-elegant-sans font-light transition-all duration-300 hover:bg-white/35 hover:border-teal-smoke-300/70 shadow-lg hover:shadow-xl"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-teal-smoke-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        placeholder="이메일 (선택)"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-white/30 backdrop-blur-md border border-teal-smoke-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-400/80 focus:border-teal-smoke-300/80 focus:bg-white/40 text-slate-800 placeholder-slate-600 font-elegant-sans font-light transition-all duration-300 hover:bg-white/35 hover:border-teal-smoke-300/70 shadow-lg hover:shadow-xl"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-teal-smoke-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    
                    {/* 시술 선택 버튼 - 모달 트리거 */}
                    <div className="relative group">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="w-full px-5 py-4 bg-white/30 backdrop-blur-md border border-teal-smoke-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-400/80 focus:border-teal-smoke-300/80 focus:bg-white/40 text-slate-800 font-elegant-sans font-light transition-all duration-300 hover:bg-white/35 hover:border-teal-smoke-300/70 shadow-lg hover:shadow-xl text-left"
                      >
                        {selectedProcedures.length > 0 ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-700 font-medium">선택된 시술 ({selectedProcedures.length}개)</span>
                              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {selectedProcedures.slice(0, 3).map((procedure, index) => (
                                <span
                                  key={index}
                                  className="inline-block px-3 py-1 bg-teal-smoke-200/50 text-slate-700 text-sm rounded-full"
                                >
                                  {procedure}
                                </span>
                              ))}
                              {selectedProcedures.length > 3 && (
                                <span className="inline-block px-3 py-1 bg-slate-200/50 text-slate-600 text-sm rounded-full">
                                  +{selectedProcedures.length - 3}개 더
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">관심 시술을 선택해주세요</span>
                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        )}
                      </button>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-teal-smoke-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    
                    <div className="relative group">
                      <textarea
                        name="message"
                        placeholder="상담 내용을 적어주세요"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-white/30 backdrop-blur-md border border-teal-smoke-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-smoke-400/80 focus:border-teal-smoke-300/80 focus:bg-white/40 text-slate-800 placeholder-slate-600 font-elegant-sans font-light transition-all duration-300 hover:bg-white/35 hover:border-teal-smoke-300/70 shadow-lg hover:shadow-xl resize-none"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-teal-smoke-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    
                    {/* 제출 버튼 - 고급 글래스 이펙트 */}
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/30 via-cyan-300/30 to-white/30 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <button
                        type="submit"
                        className="relative w-full bg-white/85 hover:bg-white backdrop-blur-sm text-slate-800 py-4 rounded-xl font-elegant-sans font-medium text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl border border-teal-smoke-200/60 overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-smoke-100/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className="relative z-10">상담 신청하기</span>
                      </button>
                    </div>
                  </form>
                  
                  {/* 하단 장식 바 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-cyan-300/40 to-white/20 rounded-b-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 시술 선택 모달 */}
      <ProcedureSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialProcedureId={initialProcedureId}
        onProceduresSelected={handleProceduresSelected}
      />
    </>
  );
}
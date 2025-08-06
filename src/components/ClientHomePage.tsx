'use client';

export default function ClientHomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">실로스 성형외과</h1>
              <p className="text-xs text-teal-600">실리프팅은 실로스</p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 시술 섹션 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              실로스 <span className="text-teal-500">시그니처</span> 시술
            </h2>
            <p className="text-lg text-gray-600">
              가장 많은 분들이 선택하는 실로스의 대표 시술들
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 8개 시술 카드들 */}
            {[
              { name: '실로스 실리프팅', badge: 'SIGNATURE', color: 'from-teal-400 to-teal-500', desc: '나를 위한 커스텀 리프팅' },
              { name: '이마 눈썹 리프팅', badge: 'HOT', color: 'from-blue-400 to-blue-500', desc: '상안부 리프팅, 동안의 시작점' },
              { name: '눈밑 지방레이저', badge: '10분', color: 'from-purple-400 to-purple-500', desc: '절개 NO! 회복 YES!' },
              { name: '실로팻', badge: 'No Pain', color: 'from-orange-400 to-orange-500', desc: '흡입 대신 주사로!' },
              { name: '눈처짐 리프팅', badge: null, color: 'from-indigo-400 to-indigo-500', desc: '상하안검 전체 케어' },
              { name: '콜라채움', badge: null, color: 'from-emerald-400 to-emerald-500', desc: '주름&탄력 동시 개선' },
              { name: '수면 울쎄라·리쥬란', badge: 'NEW', color: 'from-rose-400 to-rose-500', desc: '편안한 수면 시술' },
              { name: '10min 넥코어 리프팅', badge: '10분', color: 'from-amber-400 to-amber-500', desc: '실로 당기고, 레이저로 채우다' },
            ].map((procedure, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => alert(`${procedure.name} 상세보기`)}
              >
                <div className={`bg-gradient-to-br ${procedure.color} p-6 text-white`}>
                  <div className="w-full h-20 bg-white/20 rounded-lg mb-4 flex items-center justify-center">
                    <span className="font-bold text-lg">{index + 1}</span>
                  </div>
                  
                  {procedure.badge && (
                    <span className="inline-block px-2 py-1 bg-white/30 rounded-full text-xs font-medium mb-2">
                      {procedure.badge}
                    </span>
                  )}
                  
                  <h3 className="font-bold text-lg mb-1">{procedure.name}</h3>
                  <p className="text-sm text-white/90">{procedure.desc}</p>
                </div>
                
                <div className="p-4">
                  <div className="text-center text-gray-600 text-sm font-medium">
                    자세히 보기 →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 상담 섹션 */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">간편한 상담 신청</h2>
              <p className="text-gray-600">전문 상담사가 빠르게 연락드리겠습니다</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <input 
                type="text" 
                placeholder="이름" 
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <input 
                type="tel" 
                placeholder="연락처" 
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400">
                <option>상담 분야 선택</option>
                <option>실로스 실리프팅</option>
                <option>이마 눈썹 리프팅</option>
                <option>눈밑 지방레이저</option>
                <option>실로팻</option>
                <option>기타</option>
              </select>
            </div>
            
            <button 
              onClick={() => alert('상담 신청이 접수되었습니다!')}
              className="w-full bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-bold py-4 rounded-xl transition-all duration-200"
            >
              상담 신청하기
            </button>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-bold text-lg mb-4">실로스 성형외과</h3>
          <p className="text-gray-300 mb-2">실리프팅은 실로스</p>
          <div className="text-sm text-gray-400 space-y-1">
            <p>📞 055-123-4567 | 💬 카카오톡 상담</p>
            <p>&copy; 2025 실로스 성형외과. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
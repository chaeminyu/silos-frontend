'use client';

export default function MainBanners() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            실로스 <span className="text-teal-500">시그니처</span> 시술
          </h2>
          <p className="text-lg text-gray-600">
            가장 많은 분들이 선택하는 실로스의 대표 시술들
          </p>
        </div>

        {/* 8개 시술 그리드 - 버튼 없는 버전 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: '실로스 실리프팅', badge: 'SIGNATURE', color: 'from-teal-400 to-teal-500' },
            { name: '이마 눈썹 리프팅', badge: 'HOT', color: 'from-blue-400 to-blue-500' },
            { name: '눈밑 지방레이저', badge: '10분', color: 'from-purple-400 to-purple-500' },
            { name: '실로팻', badge: 'No Pain', color: 'from-orange-400 to-orange-500' },
            { name: '눈처짐 리프팅', badge: null, color: 'from-indigo-400 to-indigo-500' },
            { name: '콜라채움', badge: null, color: 'from-emerald-400 to-emerald-500' },
            { name: '수면 울쎄라·리쥬란', badge: 'NEW', color: 'from-rose-400 to-rose-500' },
            { name: '10min 넥코어 리프팅', badge: '10분', color: 'from-amber-400 to-amber-500' },
          ].map((procedure, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className={`bg-gradient-to-br ${procedure.color} p-6 text-white`}>
                <div className="aspect-square bg-white/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">{index + 1}</span>
                </div>
                
                {procedure.badge && (
                  <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs font-medium mb-2">
                    {procedure.badge}
                  </span>
                )}
                
                <h3 className="font-bold text-lg mb-2">{procedure.name}</h3>
                <p className="text-sm text-white/90">
                  상세 정보 보기
                </p>
              </div>
              
              <div className="p-4">
                <div className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium text-center">
                  자세히 보기
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
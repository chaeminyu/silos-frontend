export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">관리자메인</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">신규가입회원 5건 목록</h3>
        <div className="mb-4 text-sm text-gray-600">
          총회원수 310명 중 처단 0명, 탈퇴: 0명
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  회원아이디
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이메일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  전화번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  권한
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가입일
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">minji123</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">김민지</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">minji@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">010-1234-5678</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">일반회원</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-12-01</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">jiwon456</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">박지원</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">jiwon@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">010-9876-5432</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">일반회원</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-11-15</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">seoyeon789</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">이서연</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">seoyeon@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">010-5555-7777</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">일반회원</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-10-20</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">harim999</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">정하림</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">harim@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">010-7777-8888</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">일반회원</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-12-10</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">admin001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">관리자</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">admin@silos.com</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">010-0000-0000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">관리자</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">최근 상담 신청</h3>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
            상담 전체보기
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상담 유형
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상담 내용
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  신청자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  신청일
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">실로스 리프팅</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">얼굴 전체적인 리프팅에 관심이 있습니다</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">김민지</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    대기중
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-15</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">스킨 리프팅</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">구리 개선을 위한 상담 원합니다</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">박지원</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    확정
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-14</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">이벤트 상담</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">신년 이벤트 참여 문의</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">이서연</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    대기중
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-13</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">미니 리프팅</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">부분 리프팅 예약 상담</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">정하림</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    완료
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-12</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">실로스 리프팅</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">전체적인 안면 리모델링 상담</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">김민지</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    확정
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">인기 상담 유형</h3>
        <div className="mb-4 text-sm text-gray-600">
          상담 신청이 많은 인기 시술 순위
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  순위
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상담 유형
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  신청 건수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  대기중
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  확정
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  완료
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  인기도
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">실로스 리프팅</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">95%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">스킨 리프팅</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">12</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '76%'}}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">76%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">미니 리프팅</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">8</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '51%'}}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">51%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">4</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">실로팩</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{width: '32%'}}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">32%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">이벤트 상담</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{width: '19%'}}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600">19%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
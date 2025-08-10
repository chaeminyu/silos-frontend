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
                  닉네임
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  권한
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  포인트
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  수신
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  공개
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  인증
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  차단
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  그룹
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">sonsi74</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">손성익</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">부산손사장</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">예</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">예</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">예</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">아니오</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">최근게시물</h3>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
            최근 전체보기
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  구분
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  게시판
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  일시
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">소명물</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">프로모션DB</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">댓글. 이벤트 상품을 신청합니다</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">실로스의원</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-08-08</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 포인트 발생내역</h3>
        <div className="mb-4 text-sm text-gray-600">
          전체 1,265 건 중 5건 목록
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
                  닉네임
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  일시
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  포인트 내용
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  포인트
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  포인트합
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">admin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">최고관리자</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">최고관리자</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-08-10 19:45:04</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-08-10 쳇로그인</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">14,985</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
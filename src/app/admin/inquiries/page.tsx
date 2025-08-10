export default function InquiriesPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">문의관리</h2>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">상담문의 목록</h3>
              <p className="text-sm text-gray-600">총 문의건수: 156건</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                엑셀 다운로드
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
                답변하기
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>전체</option>
                <option>대기중</option>
                <option>답변완료</option>
                <option>보류</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>전체 카테고리</option>
                <option>일반 상담</option>
                <option>수술 문의</option>
                <option>예약 문의</option>
                <option>기타</option>
              </select>
              <input 
                type="text" 
                placeholder="제목, 내용, 이름 검색"
                className="border border-gray-300 rounded-md px-3 py-2 w-64"
              />
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                검색
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이름
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    연락처
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    등록일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    관리
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    156
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    일반 상담
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    안면윤곽 수술에 대해 문의드립니다
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    김○○
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    010-****-1234
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    2025-08-10
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      대기중
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">답변</button>
                    <button className="text-gray-600 hover:text-gray-900 mr-2">보기</button>
                    <button className="text-red-600 hover:text-red-900">삭제</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    155
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    수술 문의
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    코 재수술 가능한지 궁금합니다
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    이○○
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    010-****-5678
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    2025-08-09
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      답변완료
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">답변</button>
                    <button className="text-gray-600 hover:text-gray-900 mr-2">보기</button>
                    <button className="text-red-600 hover:text-red-900">삭제</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    154
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    예약 문의
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    상담 예약 잡고 싶습니다
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    박○○
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    010-****-9012
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    2025-08-08
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      답변완료
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">답변</button>
                    <button className="text-gray-600 hover:text-gray-900 mr-2">보기</button>
                    <button className="text-red-600 hover:text-red-900">삭제</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>선택된 항목에 대해</option>
                <option>답변완료로 변경</option>
                <option>대기중으로 변경</option>
                <option>삭제</option>
              </select>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm">
                실행
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">이전</button>
              <button className="px-3 py-2 text-sm bg-indigo-600 text-white rounded">1</button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">2</button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">3</button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">다음</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
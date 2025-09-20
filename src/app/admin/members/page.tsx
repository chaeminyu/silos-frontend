'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline';

// 실제 User 인터페이스와 일치
interface Member {
  id: number;
  userId: string;
  username: string; // 실제로는 username 필드 사용 (닉네임 없음)
  email: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  createdAt?: string;
  // 추가 관리 정보
  consultationCount: number;
  lastConsultationDate?: string;
  isActive: boolean;
}

export default function MembersManagementPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [updatingRoles, setUpdatingRoles] = useState<Set<number>>(new Set());

  // 회원 데이터 로드
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 임시로 localStorage에서 토큰 가져오기 (실제로는 AuthContext 사용)
        const token = localStorage.getItem('adminToken') || 
                     'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNzU3OTQ4NzE4LCJleHAiOjE3NTgwMzUxMTh9.LoSSq55RTOs99lUeenaVFBfMCu1zwX5JCSUAztoJpbRhTxlJ0dRA0HFrbuQKLbPW781IhiPEqdFrwrahaH7MHA';
        
        const response = await fetch('/api/admin/members', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        
        if (data.success) {
          setMembers(data.data);
        } else {
          setError(data.message || '회원 목록을 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setError('네트워크 오류가 발생했습니다.');
        console.error('Error fetching members:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // 필터링 로직
  useEffect(() => {
    let filtered = members;

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone.includes(searchTerm)
      );
    }

    // 역할 필터
    if (roleFilter !== 'all') {
      filtered = filtered.filter(member => member.role === roleFilter);
    }

    // 상태 필터
    if (statusFilter !== 'all') {
      if (statusFilter === 'active') {
        filtered = filtered.filter(member => member.isActive);
      } else if (statusFilter === 'inactive') {
        filtered = filtered.filter(member => !member.isActive);
      }
    }

    setFilteredMembers(filtered);
  }, [searchTerm, roleFilter, statusFilter, members]);

  // 통계 계산
  const stats = {
    total: members.length,
    users: members.filter(m => m.role === 'USER').length,
    admins: members.filter(m => m.role === 'ADMIN').length,
    active: members.filter(m => m.isActive).length,
    withConsultations: members.filter(m => m.consultationCount > 0).length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  // 역할 변경 함수
  const handleRoleChange = async (memberId: number, newRole: 'USER' | 'ADMIN') => {
    try {
      setUpdatingRoles(prev => new Set(prev).add(memberId));
      
      const token = localStorage.getItem('adminToken') || 
                   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNzU3OTQ4NzE4LCJleHAiOjE3NTgwMzUxMTh9.LoSSq55RTOs99lUeenaVFBfMCu1zwX5JCSUAztoJpbRhTxlJ0dRA0HFrbuQKLbPW781IhiPEqdFrwrahaH7MHA';
      
      const response = await fetch(`/api/admin/users/${memberId}/role`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      });

      const data = await response.json();
      
      if (data.success) {
        // 로컬 상태 업데이트
        setMembers(prev => 
          prev.map(member => 
            member.id === memberId 
              ? { ...member, role: newRole }
              : member
          )
        );
        
        alert(data.message || '권한이 성공적으로 변경되었습니다.');
      } else {
        alert(data.message || '권한 변경에 실패했습니다.');
      }
    } catch (err) {
      console.error('Role update error:', err);
      alert('권한 변경 중 오류가 발생했습니다.');
    } finally {
      setUpdatingRoles(prev => {
        const newSet = new Set(prev);
        newSet.delete(memberId);
        return newSet;
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">회원 관리</h1>
          <p className="text-sm text-gray-600 mt-1">
            총 {members.length}명의 회원이 등록되어 있습니다
          </p>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <UserGroupIcon className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">전체 회원</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <UserIcon className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">일반 회원</p>
              <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <CheckCircleIcon className="w-8 h-8 text-indigo-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">관리자</p>
              <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <CheckCircleIcon className="w-8 h-8 text-emerald-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">활성 회원</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center">
            <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">상담 이용</p>
              <p className="text-2xl font-bold text-gray-900">{stats.withConsultations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 검색 */}
          <div className="lg:col-span-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="이름, 아이디, 이메일, 전화번호로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* 역할 필터 */}
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">모든 역할</option>
              <option value="USER">일반 회원</option>
              <option value="ADMIN">관리자</option>
            </select>
          </div>

          {/* 상태 필터 */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">모든 상태</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
            </select>
          </div>
        </div>
      </div>

      {/* 회원 목록 */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <UserGroupIcon className="mx-auto w-12 h-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {searchTerm || roleFilter !== 'all' || statusFilter !== 'all' 
                ? '검색 조건에 맞는 회원이 없습니다.' 
                : '등록된 회원이 없습니다.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    회원 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    연락처
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    역할
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상담 이용
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가입일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    권한 관리
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => {
                  return (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <UserIcon className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900">
                                {member.username}
                              </p>
                              {!member.isActive && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                  비활성
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">@{member.userId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <PhoneIcon className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-600">{member.phone}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-600">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          member.role === 'ADMIN' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {member.role === 'ADMIN' ? '관리자' : '일반회원'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-center">
                          {member.consultationCount > 0 ? (
                            <Link
                              href={`/admin/consultations?userId=${member.userId}`}
                              className="text-sm font-medium text-blue-600 hover:text-blue-900 hover:underline cursor-pointer"
                            >
                              {member.consultationCount}회
                            </Link>
                          ) : (
                            <div className="text-sm font-medium text-gray-900">
                              0회
                            </div>
                          )}
                          {member.lastConsultationDate && (
                            <div className="text-xs text-gray-500">
                              최근: {new Date(member.lastConsultationDate).toLocaleDateString('ko-KR')}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {member.createdAt ? formatDate(member.createdAt) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          member.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.isActive ? '활성' : '비활성'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={member.role}
                          onChange={(e) => handleRoleChange(member.id, e.target.value as 'USER' | 'ADMIN')}
                          disabled={updatingRoles.has(member.id)}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="USER">일반회원</option>
                          <option value="ADMIN">관리자</option>
                        </select>
                        {updatingRoles.has(member.id) && (
                          <div className="text-xs text-gray-500 mt-1">
                            업데이트 중...
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
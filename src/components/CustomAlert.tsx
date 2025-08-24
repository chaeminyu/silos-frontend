'use client';

import { useEffect } from 'react';
import { CheckCircle, X, AlertTriangle } from 'lucide-react';

interface CustomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export default function CustomAlert({
  isOpen,
  onClose,
  type,
  title,
  message,
  autoClose = false,
  autoCloseDelay = 3000
}: CustomAlertProps) {

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'from-teal-smoke-50 to-elegant-50',
          borderColor: 'border-teal-smoke-300',
          iconBg: 'bg-gradient-to-br from-teal-smoke-400 to-elegant-400',
          titleColor: 'text-teal-smoke-800',
          messageColor: 'text-slate-700'
        };
      case 'error':
        return {
          bgColor: 'from-red-50 to-pink-50',
          borderColor: 'border-red-300',
          iconBg: 'bg-gradient-to-br from-red-400 to-pink-400',
          titleColor: 'text-red-800',
          messageColor: 'text-slate-700'
        };
      case 'warning':
        return {
          bgColor: 'from-yellow-50 to-orange-50',
          borderColor: 'border-yellow-300',
          iconBg: 'bg-gradient-to-br from-yellow-400 to-orange-400',
          titleColor: 'text-yellow-800',
          messageColor: 'text-slate-700'
        };
      default:
        return {
          bgColor: 'from-teal-smoke-50 to-elegant-50',
          borderColor: 'border-teal-smoke-300',
          iconBg: 'bg-gradient-to-br from-teal-smoke-400 to-elegant-400',
          titleColor: 'text-teal-smoke-800',
          messageColor: 'text-slate-700'
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-8 h-8 text-white" />;
      case 'error':
        return <X className="w-8 h-8 text-white" />;
      case 'warning':
        return <AlertTriangle className="w-8 h-8 text-white" />;
      default:
        return <CheckCircle className="w-8 h-8 text-white" />;
    }
  };

  const styles = getAlertStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 메인 알림 모달 */}
      <div className={`relative bg-gradient-to-br ${styles.bgColor} rounded-3xl shadow-2xl border-2 ${styles.borderColor} max-w-md w-full mx-4 overflow-hidden transform transition-all duration-300 scale-100`}>
        
        {/* 글래스 효과 오버레이 */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-3xl"></div>
        
        {/* 상단 장식 바 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-smoke-300 via-cyan-400 to-teal-smoke-300"></div>
        
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>
        
        {/* 콘텐츠 */}
        <div className="relative p-8 text-center">
          
          {/* SILOS 로고/브랜드 */}
          <div className="mb-6">
            <div className="text-2xl font-display font-light text-slate-800 mb-2 tracking-wider">
              SILOS
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto"></div>
          </div>
          
          {/* 아이콘 */}
          <div className={`w-16 h-16 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
            {getIcon()}
          </div>
          
          {/* 제목 */}
          <h3 className={`text-2xl font-elegant font-medium ${styles.titleColor} mb-4`}>
            {title}
          </h3>
          
          {/* 메시지 */}
          <p className={`text-lg font-elegant-sans font-light ${styles.messageColor} mb-8 leading-relaxed`}>
            {message}
          </p>
          
          {/* 확인 버튼 */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-smoke-300/50 via-cyan-400/50 to-teal-smoke-300/50 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
            <button
              onClick={onClose}
              className="relative w-full bg-gradient-to-r from-teal-smoke-400 to-elegant-400 hover:from-teal-smoke-500 hover:to-elegant-500 text-white py-4 rounded-xl font-elegant-sans font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">확인</span>
            </button>
          </div>
          
          {/* 하단 장식 점들 */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-teal-smoke-300 rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-elegant-300 rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-teal-smoke-300 rounded-full opacity-60"></div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
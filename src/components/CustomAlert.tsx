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
  onConfirm?: () => void;
}

export default function CustomAlert({
  isOpen,
  onClose,
  type,
  title,
  message,
  autoClose = false,
  autoCloseDelay = 3000,
  onConfirm
}: CustomAlertProps) {

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

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
          bgColor: 'from-emerald-50/80 via-white/90 to-teal-50/80',
          borderColor: 'border-emerald-200/60',
          iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
          titleColor: 'text-emerald-900',
          messageColor: 'text-slate-700',
          buttonBg: 'from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700',
          glowColor: 'from-emerald-200/40 to-teal-300/40'
        };
      case 'error':
        return {
          bgColor: 'from-rose-50/80 via-white/90 to-pink-50/80',
          borderColor: 'border-rose-200/60',
          iconBg: 'bg-gradient-to-br from-rose-400 to-pink-500',
          titleColor: 'text-rose-900',
          messageColor: 'text-slate-700',
          buttonBg: 'from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700',
          glowColor: 'from-rose-200/40 to-pink-300/40'
        };
      case 'warning':
        return {
          bgColor: 'from-amber-50/80 via-white/95 to-orange-50/80',
          borderColor: 'border-amber-200/60',
          iconBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
          titleColor: 'text-amber-900',
          messageColor: 'text-slate-700',
          buttonBg: 'from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
          glowColor: 'from-amber-200/40 to-orange-300/40'
        };
      default:
        return {
          bgColor: 'from-slate-50/80 via-white/90 to-gray-50/80',
          borderColor: 'border-slate-200/60',
          iconBg: 'bg-gradient-to-br from-slate-400 to-gray-500',
          titleColor: 'text-slate-900',
          messageColor: 'text-slate-700',
          buttonBg: 'from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700',
          glowColor: 'from-slate-200/40 to-gray-300/40'
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
      {/* 배경 오버레이 - 더 부드러운 블러 효과 */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/50 to-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* 메인 알림 모달 - 완전히 새로운 디자인 */}
      <div className={`relative bg-gradient-to-br ${styles.bgColor} rounded-3xl shadow-2xl border ${styles.borderColor} max-w-md w-full mx-4 overflow-hidden transform transition-all duration-500 scale-100 backdrop-blur-xl`}>
        
        {/* 글로우 효과 */}
        <div className={`absolute -inset-0.5 bg-gradient-to-br ${styles.glowColor} rounded-3xl blur-sm opacity-60`}></div>
        
        {/* 메인 컨테이너 */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20">
          
          {/* 상단 장식 라인 - 타입별 색상 */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${styles.buttonBg} rounded-t-3xl`}></div>
          
          {/* 닫기 버튼 - 더 세련됨 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm transition-all duration-200 z-10 group"
          >
            <X className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
          </button>
          
          {/* 콘텐츠 */}
          <div className="relative p-8 text-center">
            
            {/* SILOS 브랜드 - 더 미니멀하게 */}
            <div className="mb-8">
              <div className="text-xl font-display font-light text-slate-700 mb-3 tracking-wider">
                SILOS CLINIC
              </div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto"></div>
            </div>
            
            {/* 아이콘 - 더 큰 크기와 부드러운 그림자 */}
            <div className={`w-20 h-20 ${styles.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/10 transform hover:scale-105 transition-transform duration-300`}>
              {getIcon()}
            </div>
            
            {/* 제목 - 더 우아한 타이포그래피 */}
            <h3 className={`text-2xl font-elegant font-semibold ${styles.titleColor} mb-4 leading-tight`}>
              {title}
            </h3>
            
            {/* 메시지 - 더 읽기 쉬운 스타일 */}
            <p className={`text-base font-elegant-sans ${styles.messageColor} mb-8 leading-relaxed max-w-sm mx-auto`}>
              {message}
            </p>
            
            {/* 확인 버튼 - 완전히 새로운 디자인 */}
            <div className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${styles.glowColor} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <button
                onClick={handleConfirm}
                className={`relative w-full bg-gradient-to-r ${styles.buttonBg} text-white py-4 px-8 rounded-2xl font-elegant-sans font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  확인
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full ml-2 animate-pulse"></div>
                </span>
              </button>
            </div>
            
            {/* 하단 장식 - 더 세련된 스타일 */}
            <div className="flex justify-center items-center space-x-1 mt-6 opacity-40">
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-6 h-px bg-gradient-to-r from-transparent via-current to-transparent"></div>
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
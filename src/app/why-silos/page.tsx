'use client';

import Image from 'next/image';
import { ArrowDown, Play, CheckCircle, Star, Award } from 'lucide-react';
import PageLayout from '../../components/PageLayout';

export default function WhySilosPage() {
  return (
    <PageLayout>
      {/* Hero Section - Main Message Box */}
      <div className="relative py-24 overflow-hidden bg-gradient-to-br from-teal-smoke-100 via-white to-elegant-100">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-teal-smoke-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-elegant-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-smoke-200 to-elegant-200 rounded-full text-sm font-elegant-sans font-medium mb-8 text-teal-smoke-700">
              <Award className="w-4 h-4 mr-2" />
              Why SILOS Lifting
            </div>
          </div>
          
          {/* Main Message Box */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 lg:p-16 shadow-2xl border border-white/50 text-center">
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-teal-smoke-800 leading-tight mb-8 whitespace-pre-line">
                실리프팅? 다 똑같다?{'\n'}
                <span className="text-elegant-600">No!</span>{'\n'}
                내 얼굴선을 아는 실리프팅, 실로스니까!
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 bg-gradient-to-b from-white to-teal-smoke-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg lg:text-xl font-elegant-sans font-light text-teal-smoke-700 leading-relaxed whitespace-pre-line max-w-5xl mx-auto">
              실로스는 20년 이상 다양한 안면부 리프팅 수술 케이스와{'\n'}
              국내외 의료진을 교육하는 성령 세미나 및 학술 강의를 바탕으로{'\n'}
              실로스만의 시그니처 실리프팅 솔루션을 개발했습니다.{'\n'}{'\n'}
              개인의 얼굴 형태와 주름에 대한 지속적인 연구를 통해 한번의 시술로도 만족스러운 결과를 누리실 수 있습니다.{'\n'}{'\n'}
              반복적이고, 효과 없는 리프팅 수술(시술)로 지친{'\n'}
              당신을 위한 맞춤형 커스텀 리프팅!{'\n'}{'\n'}
              <span className="font-bold text-teal-smoke-800">실리프팅은 실로스입니다.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Don't Worry Section */}
      <div className="py-24 bg-gradient-to-br from-teal-smoke-50 to-elegant-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-teal-smoke-800 mb-6">
              실로스라면 고민하지 않으셔도 됩니다.
            </h2>
            <p className="text-xl font-elegant-sans font-light text-teal-smoke-600 mb-4">
              피부 속까지 탄탄하게, 안전하고 입체적인 리프팅 효과!
            </p>
            <p className="text-lg font-elegant-sans font-medium text-teal-smoke-700">
              실로스는 <span className="font-bold">임상 결과와 누적된 데이터로 증명</span>합니다.
            </p>
          </div>

          {/* Before/After Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-teal-smoke-200/30">
              <div className="aspect-[4/3] relative">
                <Image 
                  src="/images/why-silos/why-silos-before-after.jpg"
                  alt="실로스 비포 애프터 결과"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.image-placeholder')?.classList.remove('hidden');
                  }}
                />
                {/* Fallback placeholder */}
                <div className="hidden image-placeholder absolute inset-0 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-teal-smoke-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Star className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-teal-smoke-700 font-elegant-sans font-light">
                      비포 애프터 이미지를 추가해주세요
                    </p>
                    <p className="text-teal-smoke-500 font-elegant-sans font-light text-sm mt-1">
                      why-silos-before-after.jpg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More Before/After Button */}
          <div className="text-center">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white rounded-xl font-elegant-sans font-medium text-lg hover:from-teal-smoke-500 hover:to-elegant-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Play className="w-5 h-5 mr-3" />
              비포 에프터 더 보기 클릭
            </button>
          </div>
        </div>
      </div>

      {/* Seminar/Education Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* First Large Poster Image */}
          <div className="mb-16">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-teal-smoke-200/30">
              <div className="aspect-[3/2] relative">
                <Image 
                  src="/images/why-silos/why-silos-seminar-main.jpg"
                  alt="실로스 세미나 메인 포스터"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.image-placeholder')?.classList.remove('hidden');
                  }}
                />
                {/* Fallback placeholder */}
                <div className="hidden image-placeholder absolute inset-0 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-teal-smoke-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Award className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-teal-smoke-700 font-elegant-sans font-light text-lg">
                      세미나 포스터 이미지를 추가해주세요
                    </p>
                    <p className="text-teal-smoke-500 font-elegant-sans font-light text-sm mt-1">
                      why-silos-seminar-main.jpg
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-lg font-elegant-sans font-light text-teal-smoke-700 leading-relaxed whitespace-pre-line">
                실로스는 리프팅에 대한 기술력을{'\n'}
                의료진 대상으로 세미나와 강연을 진행함으로써 전수하고 있습니다.
              </p>
            </div>
          </div>

          {/* Two Additional Poster Images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-elegant-200/30">
              <div className="aspect-[4/3] relative">
                <Image 
                  src="/images/why-silos/why-silos-seminar-2.jpg"
                  alt="실로스 세미나 포스터 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.image-placeholder')?.classList.remove('hidden');
                  }}
                />
                {/* Fallback placeholder */}
                <div className="hidden image-placeholder absolute inset-0 bg-gradient-to-br from-elegant-100 to-teal-smoke-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-elegant-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-teal-smoke-700 font-elegant-sans font-light">
                      세미나 포스터 2
                    </p>
                    <p className="text-teal-smoke-500 font-elegant-sans font-light text-xs mt-1">
                      why-silos-seminar-2.jpg
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-teal-smoke-200/30">
              <div className="aspect-[4/3] relative">
                <Image 
                  src="/images/why-silos/why-silos-seminar-3.jpg"
                  alt="실로스 세미나 포스터 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.image-placeholder')?.classList.remove('hidden');
                  }}
                />
                {/* Fallback placeholder */}
                <div className="hidden image-placeholder absolute inset-0 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-teal-smoke-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-teal-smoke-700 font-elegant-sans font-light">
                      세미나 포스터 3
                    </p>
                    <p className="text-teal-smoke-500 font-elegant-sans font-light text-xs mt-1">
                      why-silos-seminar-3.jpg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lifting Philosophy Section */}
      <div className="py-24 bg-gradient-to-br from-teal-smoke-50 to-elegant-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-teal-smoke-800 mb-6">
              리프팅은 단순히 올리는 것이 아닙니다.
            </h2>
            <p className="text-lg font-elegant-sans font-light text-teal-smoke-700 leading-relaxed whitespace-pre-line max-w-4xl mx-auto">
              내 얼굴의 선과 흐름을 이해하고,{'\n'}
              그에 맞는 실의 종류와 방향을 설계합니다.{'\n'}
              그래야 <span className="font-bold">'자연스럽고 오래가는 리프팅'</span>이 가능합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Process Image - Round Oval */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-80 h-80 overflow-hidden rounded-full shadow-2xl border-4 border-white bg-white">
                <Image 
                  src="/images/why-silos/why-silos-lifting-process.jpg"
                  alt="실로스 리프팅 프로세스"
                  fill
                  className="object-cover"
                  sizes="320px"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.image-placeholder')?.classList.remove('hidden');
                  }}
                />
                {/* Fallback placeholder */}
                <div className="hidden image-placeholder absolute inset-0 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 flex items-center justify-center rounded-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-teal-smoke-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-teal-smoke-700 font-elegant-sans font-light text-sm">
                      이미지를 추가해주세요
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Chart */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                <div className="relative">
                  {/* Vertical line - straight down through center */}
                  <div className="absolute left-8 top-6 bottom-16 w-0.5 bg-gradient-to-b from-teal-smoke-400 to-elegant-400"></div>
                  
                  <div className="space-y-8 pl-20">
                    {[
                      '얼굴(안면학적 구조와 피부 타입) 분석',
                      '실의 종류 선택',
                      '튼튼한 고정점',
                      '리프팅 방향',
                      '리프팅 강도',
                      '20년 이상의 노하우'
                    ].map((step, index) => (
                      <div key={index} className="flex items-center group relative">
                        {/* Oval node - exactly centered on the line */}
                        <div className="absolute w-6 h-10 bg-gradient-to-b from-teal-smoke-400 to-elegant-400 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 z-10" style={{ left: '-77px' }}></div>
                        
                        <div className="flex-1">
                          <p className="text-teal-smoke-800 font-elegant-sans font-medium text-lg group-hover:text-teal-smoke-900 transition-colors duration-300">
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Arrow pointing down - aligned with the line */}
                <div className="absolute left-8 bottom-8">
                  <ArrowDown className="w-4 h-4 text-teal-smoke-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
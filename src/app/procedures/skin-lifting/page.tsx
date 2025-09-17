'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import StandardConsultationSection from '../../../components/StandardConsultationSection';
import { Droplets, Clock, ShoppingCart, Check, Sparkles, Target, Shield, Star, Zap, Gem, Layers, AlertCircle, ArrowDown } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';

const skinLiftingProcedures = [
  {
    id: 'skin-botox',
    title: '스킨 보톡스',
    subtitle: 'SKIN BOTOX (더모톡신)',
    tagline: '스킨보톡스란?',
    description: [
      '더모톡신을 일반적으로 스킨보톡스라고도 부르며 피부를 뜻하는 \'더모\' 와 보튤리늄 톡신의 \'톡신\' 의 합성어로 기존 보톡스 시술과는 달리 피부의 얇은 층에 얕게 주입하여 피부 잔주름을 개선하고, 피부톤 개선, 피부 리프팅 효과를 얻을 수 있습니다.'
    ],
    features: ['모공축소', '피부결개선', '리프팅'],
    targetAudience: [
      '눈가, 팔자주름이 고민이신 분',
      '피부가 푸석푸석 하신 분', 
      '늘어진 모공의 수축과 리프팅을 원하시는 분',
      '얼굴 전체적으로 잔주름이 많으신 분'
    ],
    characteristics: [
      '시술 1~2주 경과 후 부터 피부 탄력 증가!',
      '근막과 진피층에 소량의 주사제 주입으로 부작용 NO!',
      '30분 내외의 짧은 회복시간으로 바로 일상생활 가능!',
      '자연스럽게 주름을 완화시키고 표정이 어색하지 않음!'
    ],
    additionalInfo: 'SILOS의 스킨보톡스시술은 피부 층에 보튤리늄을 주입해 리프팅/탄력/주름/모공 흉터 등을 치료하며 얼굴 전체에 시술이 가능합니다.',
    procedureInfo: {
      hospitalization: '없음',
      duration: '10분',
      anesthesia: '연고마취',
      followUp: '없음'
    },
    precautions: [
      '시술 후 3~5일은 뜨거운 사우나, 음주, 흡연, 과격한 운동 등을 삼가해주세요.',
      '시술 후 하루 정도 피부가 붓고 붉을 수 있으나 이내 사라지므로 안심해도 괜찮습니다.',
      '외출 시 자외선 차단제를 반드시 사용해 주세요.',
      '시술 부위를 힘주어 누르거나 만지는 것은 피해주세요.',
      '세안이나 메이크업은 시술 후 다음날 부터 가능합니다.',
      '시술 부위가 심하기 빨갛게 되거나 붓는 등의 증상이 시술 직후보다 더 심해진다면 즉시 병원에 연락해주세요.'
    ],
    icon: Sparkles
  },
  {
    id: 'aqua-shine',
    title: '물광주사',
    subtitle: 'WATERLIGHT INJECTION',
    tagline: 'SILOS 물광주사',
    description: [
      '환절기 시즌과 겨울이 되면 푸석해 지는 피부에 아무리 보습제를 사용해도 효과가 없다면 피부 속을 채워야 합니다.',
      '다량의 수분을 함유하고 있는 히알루론산을 피부 진피층에 직접 주사하여 마치 물을 머금은 듯한 탄력 있고 생기 있는 피부로 만들어 주는 시술입니다.',
      '피부층에 수분감이 직접적으로 전달되기 때문에 즉각적인 보습 효과와 더불어 피부 탄력 증대 및 잔주름 개선 효과를 볼 수 있습니다.',
      'SILOS의 물광주사는 완성도 높은 효과를 위해 별도의 피부 검사는 물론 인체에 안전한 천연 물질 성분 만을 사용하여 높은 안전성을 자랑합니다.'
    ],
    features: ['수분충족', '탄력회복', '모공축소'],
    procedureInfo: {
      duration: '약 10분',
      effectTime: '2~3주 후',
      anesthesia: '마취크림 도포',
      recovery: '시술 직후 일상생활 가능'
    },
    treatmentAreas: [
      '이마',
      '미간', 
      '팔자주름',
      '처진 볼, 입가',
      '콧대, 코끝',
      '턱 주름, 목 주름'
    ],
    advantages: [
      {
        number: '01',
        title: '다름을 찾아내는 능력',
        description: '오랜 경험과 풍부한 노하우를 보유한 의료진이 보다 정확한 진단을 바탕으로 개인이 가진 생활 습관까지 생각하는 맞춤 치료를 약속합니다.'
      },
      {
        number: '02', 
        title: '숲을 바라보는 눈',
        description: '시술 부위, 개인별 피부타입, 피부 고민 등을 고려하는 시술 노하우로 탄력, 수분감 개선 효과는 물론, 오랜 유지력으로 만족도 높은 결과를 완성하는 시술 계획을 수립합니다.'
      },
      {
        number: '03',
        title: '신뢰할 수 있는 정직함', 
        description: '당연시될 수 있는 인증된 정품, 정량 사용을 원칙으로 꾸준한 관리에 믿음을 드리겠습니다.'
      },
      {
        number: '04',
        title: '피부를 생각하는 노하우',
        description: '시술의 효과는 물론, 체계적인 통증 시스템으로 통증 감소를 통한 편안한 시술 과정은 물론, 빠른 일상 복귀까지 생각하는 솔루션을 제공합니다.'
      }
    ],
    treatmentProcess: [
      {
        step: '01',
        title: '1:1 맞춤 상담 진행',
        description: '개인이 가진 피부 고민을 바탕으로 SILOS 원장의 1:1 상담을 진행합니다.'
      }
    ],
    treatmentEffects: [
      '직접적인 수분 충족으로 건조함 개선',
      '피부 탄력 회복으로 잔주름 개선', 
      '넓어진 모공 축소 및 색소 개선'
    ],
    targetAudience: [
      '건조하고 칙칙한 피부가 고민이신 분',
      '즉각적인 수분 공급이 필요하신 분',
      '잔주름과 모공이 신경쓰이는 분',
      '자연스러운 피부 개선을 원하시는 분'
    ],
    icon: Droplets
  },
  {
    id: 'rejuran',
    title: '리쥬란힐러',
    subtitle: 'REJURAN HEALER',
    tagline: '연어 세포에서 얻은 DNA 조각 PN (Polynucleotide)',
    subtitle2: '피부 세포 속부터 재생 시켜주는 피부세포재생술',
    definition: {
      title: '리쥬란힐러란?',
      content: [
        '리쥬란힐러의 주성분은 PN (Polynucleotide)으로 연어의 생식세포에서 얻은 특정 크기의 DNA 조각으로 만든 생체적합 물질입니다.',
        'PN을 주사하면 피부 재생능력을 활성화시키고 피부 속 환경을 개선하여 피부 구조를 복원시키는 능력이 있습니다.',
        '피부 내부의 생리적 조건을 개선하여 건강한 피부로 되돌려주는 \'피부 힐러 (Healer)\'입니다.'
      ]
    },
    effectsTitle: '건강하고 자연스러운 피부 탄력! 리쥬란힐러 효과',
    effectsDescription: '피부 진피의 치밀도 및 두께가 증가하여 탄력을 증가시키며, 피부가 전체적으로 건강하고 자연스럽게 개선됩니다.',
    effects: [
      {
        title: '잔주름 개선',
        description: '자가 피부재생능력 활성화 피부 잔주름 개선'
      },
      {
        title: '피부 탄력 개선',
        description: '표피, 진피 치밀도 및 두께 증가 피부 탄력 개선'
      },
      {
        title: '피지 감소, 모공 축소',
        description: '유수분 밸런스를 통해 피지 감소, 모공 축소'
      },
      {
        title: '흉터재생',
        description: '모공, 흉터, 잔주름은 물론, 피부결과 피부톤 효과적 개선'
      }
    ],
    principleTitle: '피부의 표피, 진피 두께 및 전체 탄력을 증가',
    principleDescription: [
      '노화되거나 손상된 피부는 피부 자체의 활성이 떨어져 잔주름이 늘어나고 탄력이 저하됩니다.',
      '시중에 시판되고 있는 필러들은 피부에 부족한 외부 물질로 채움으로써 볼륨을 증대 시키는 것이 주된 원리입니다.',
      '이와 달리 리쥬란힐러는 \'인위적 자극 없이 얇고 늘어진 피부의 자가 피부 재생능력을 활성화\'하여 피부의 표피, 진피 두께 및 전체 탄력을 증가시키는 데 도움을 줍니다.'
    ],
    mechanismTitle: '리쥬란힐러 시술 원리',
    mechanismSubtitle: '얇아진 속 피부를 개선하고 피부 장벽을 탄탄하게!',
    mechanism: [
      '피부 재생 능력을 활성화하여 피부 속 환경을 개선하고 피부 구조를 복원',
      '표피 및 진피의 치밀도 및 두께를 증가시켜 피부탄력을 증가 시키고, 노화, 자외선 및 피부 자극으로 손상된 피부를 정상적으로 복원'
    ],
    targetAudience: [
      '노화가 빨라지는 연령대의 분들',
      '얇아지고 탄력을 잃어 건조하고 칙칙한 피부',
      '모공 (피지 분비 불균형), 홍조 등 밸런스를 잃은 피부',
      '레이저를 많이 받아 예민한 피부',
      '주름 개선 시술로, 필러나 톡신을 원하지 않는 분들',
      '인위적이지 않고 자연스럽게 피부를 개선하고자 하는 분들'
    ],
    procedureInfo: {
      duration: '주사시술만 15분 / 마취크림부터 진정팩까지 1시간',
      anesthesia: '마취 크림',
      frequency: '4주 간격 3회 이상 시술 권장',
      swelling: '붓기 거의 없어요',
      pain: '약간 아파요',
      recovery: '일상 생활 가능 (엠보싱 2-3일 정도 생길 수 있음)'
    },
    qna: [
      {
        question: '리쥬란 연어를 사용하는 이유는 무엇인가요?',
        answer: '연어의 DNA는 사람의 DNA와 95% 이상 일치하기 때문에 그만큼 이물 반응이 없고 안전하다는 장점이 있습니다. DNA는 우리 몸에 상처가 생겼을 때 조직 재생을 담당하는 세포를 활성화시켜 상처를 치유시키는 역할을 합니다. 그래서 연어주사 성분은 처음에는 관절염 염증을 치료 및 관절 부위 재생에 사용되다가 피부 재생에도 효과가 있다는 것이 알려지게 되면서 피부 미용 분야에서도 널리 사용되게 되었죠.'
      },
      {
        question: '리쥬란과 일반 연어주사 PDRN이라 불리는 연어주사와의 차이점은?',
        answer: '리쥬란 (PN)과 일반 연어주사 (PDRN)와의 차이점은 쉽게 말해 DNA의 농축 정도가 달라 조직재생 활성도에 차이가 생기며 리쥬란이 훨씬 우수하다고 보시면 됩니다.'
      },
      {
        question: '일상 생활이 바로 가능한가요?',
        answer: '가능합니다. 피부에 엠보싱이 1일 정도 생기실 수 있고 주사로 하는 시술이기 때문에 멍이 있을 수 있습니다. 알러지 반응이 아주 간혹가다 있을 수 있지만 일반적인 약물에 비해 그 비율이 현저히 낮습니다.'
      }
    ],
    precautions: [
      '시술 후 가벼운 세안이나 화장은 가능합니다.',
      '시술 후 약 1주일 정도는 사우나나 찜질방, 과격한 운동은 피하시는게 좋습니다.',
      '시술 직후 홍반 및 붓기가 있을 수 있으나 일반적으로 수 시간 내에 사라집니다.'
    ],
    icon: Shield
  },
  {
    id: 'juvelook',
    title: '쥬베룩',
    subtitle: 'JUVELOOK',
    tagline: '콜라겐 부스터로 탄력과 물광 효과를 한번에!',
    subtitle2: '자가 조직 재생 콜라겐 부스터 쥬베룩은 피부 본연의 건강함과 아름다움을 되찾아주는 자가 조직 재생 콜라겐 부스터로, 스킨부스터와 볼륨 두 가지 라인으로 나뉩니다.',
    definition: {
      title: '쥬베룩이란?',
      content: [
        '쥬베룩은 피부 본연의 건강함과 아름다움을 되찾아주는 자가 조직 재생 콜라겐 부스터로, 스킨부스터와 볼륨 두 가지 라인으로 나뉩니다.',
        '쥬베룩 스킨부스터는 피부 속 콜라겐 생성을 활성화하여 잔주름 개선, 피부 탄력 증가, 피부결 개선에 효과적이며, 얼굴 전체에 적용할 수 있어 전반적인 피부 컨디션을 개선하는 데 도움을 줍니다.',
        '반면, 쥬베룩 볼륨은 특정 부위의 자연스러운 볼륨 형성과 윤곽 보안을 위한 제품으로, 시간이 지날수록 점진적으로 볼륨이 차오르는 효과가 있습니다.'
      ]
    },
    technologyTitle: '특허 받은 쥬베룩의 다공성 망상구조 PDLLA',
    technologyDescription: '다공성 원형구조 미세분자: 크기가 굉장히 작고 둥글기 때문에 결절이 잘 생기지 않고 생분해성으로 체외로 모두 배출되기 때문에 체내에 잔존물이 거의 남지 않습니다.',
    componentsTitle: '쥬베룩 성분 및 원리',
    components: [
      {
        type: '쥬베룩 스킨부스터',
        description: '피부 전반적인 탄력과 보습을 위한 제품으로, PLA 입자가 작고 농도가 낮아 피부 전체에 고르게 주입 가능합니다.'
      },
      {
        type: '쥬베룩 볼륨',
        description: '깊은 층에서 볼륨을 형성하는 제품으로, PLA 입자가 크고 농도가 높아 특정 부위에서 더욱 확실한 볼륨 효과를 제공합니다.'
      }
    ],
    effectsTitle: '쥬베룩 효과',
    effects: ['모공 축소', '여드름 흉터 개선', '탄력 개선', '잔주름 완화', '피부 재생', '피부결 개선', '자연스러운 볼륨감'],
    typesTitle: '쥬베룩 종류: 나의 피부 고민에 맞게 선택!',
    typesNote: '(두가지 사진을 첨부할거야 - horizontal하게 넣어야해)',
    targetAudience: [
      '여드름 흉터가 고민이신 분',
      '늘어진 모공 및 피부 탄력이 고민이신 분',
      '눈가, 이마 잔주름이 고민이신 분',
      '피부결 및 톤 개선을 원하시는 분',
      '자연스러운 볼륨을 원하시는 분'
    ],
    procedureInfo: {
      duration: '주사시술인 15분 / 마취크림부터 진정팩까지 1시간',
      anesthesia: '마취크림',
      frequency: '4주 간격 3회 이상 시술 권장',
      swelling: '붓기 거의 없어요',
      pain: '약간 아파요',
      recovery: '일상 생활 가능 (엠보싱 2-3일 정도 생길 수 있음)'
    },
    qna: [
      {
        question: '쥬베룩 스킨부스터는 어디에 좋나요?',
        answer: '쥬베룩은 피부 탄력에 가장 좋습니다. 쥬베룩을 PDLLA 성분으로 유효성과 안전성이 확인된 콜라겐 생성 촉진제입니다. 잔주름 개선에도 효과가 좋습니다.'
      },
      {
        question: '쥬베룩 볼륨의 장점은 무엇인가요?',
        answer: '쥬베룩 볼륨은 우리 몸의 콜라겐 생성을 자극하여 볼륨을 채우는 시술입니다. 스컬트라에 비해 결정의 위험성이 낮고, 필러처럼 혈관 부작용을 일으킬 가능성이 거의 없습니다. 이러한 장점으로 인해 인기가 많은 시술입니다.'
      },
      {
        question: '쥬베룩은 믹스하고 바로 사용해도 되나요?',
        answer: '쥬베룩은 가루 형태로 나오기 때문에 식염수와 믹스를 하여 사용합니다. 수화라는 과정을 통해 가루와 물이 잘 섞인 상태로 시술을 받는 것이 결절이 생길 확률을 줄입니다. 1-2시간의 수화보다는 하루 이상의 수화 시간을 가지는 것이 좋습니다.'
      },
      {
        question: '병원마다 시술 방법이 다른 것 같은데, 무슨 차이가 있나요?',
        answer: '병원마다 믹스하는 용액의 양이 다릅니다. 수화하는 시간과 방법도 다릅니다. 본원에서는 한 병에 8cc로 희석합니다. 그리고 시술 부위에 따라 원액에서 좀 더 희석하여 시술하기도 합니다. 시술 자체도 필러처럼 방식의 차이가 있습니다. 이런 것들이 모여 결과의 차이를 만드는 것입니다.'
      }
    ],
    precautions: [
      '시술 후 가벼운 세안이나 화장은 가능합니다.',
      '시술 후 약 1주일 정도는 사우나나 찜질방, 과격한 운동은 피하시는게 좋습니다.',
      '시술 직후 홍반 및 붓기가 있을 수 있으나 일반적으로 수 시간 내에 사라집니다.'
    ],
    icon: Star
  },
  {
    id: 'olydia',
    title: '올리디아',
    subtitle: 'OLYDIA MAYO/365',
    tagline: '콜라겐이 만들어내는 놀라운 탄력과 볼륨!',
    description: [
      '올리디아는 PLLA 성분의 콜라겐 생성 촉진제로, 올리디아 마요와 올리디아 365 두 가지 타입으로 구분됩니다.',
      '올리디아 마요(120)는 안전한 성분 PLLA로 진피층까지 도달하여 콜라겐 생성을 촉진합니다.',
      '올리디아 365는 24개월 이상 유지되는 강력한 볼륨 유지효과를 제공하는 콜라겐 생성 촉진제입니다.',
      '최대 2년까지 지속되는 효과로 유럽 CE와 한국 식약처 인증을 받은 안전성과 효과가 인정된 브랜드입니다.'
    ],
    features: ['콜라겐생성', '장기지속', 'PLLA성분'],
    targetAudience: [
      '노화로 인한 피부 탄력 저하가 고민이신 분',
      '잔주름이 많고 모공 늘어짐이 신경쓰이는 분',
      '여드름 흉터를 개선하고자 하시는 분',
      '오랜 지속 효과의 시술을 희망하시는 분'
    ],
    olidiaMayoInfo: {
      title: '올리디아 마요 (OLIDIA MAYO 120)',
      description: '콜라겐이 만들어내는 놀라운 탄력과 볼륨!',
      process: [
        {
          step: '시술 전',
          title: '초기 상태',
          description: '노화로 인해 얼굴 볼륨이 꺼지고 주름이 생긴 상태'
        },
        {
          step: '시술 직후',
          title: '즉각적 효과',
          description: '피부에 주입된 PLLA 성분과 수분으로 주름과 볼륨이 채워짐'
        },
        {
          step: '수분 흡수',
          title: '자연스러운 정착',
          description: '시간이 지남에 따라 수분이 흡수되면서 볼륨이 약간 감소'
        },
        {
          step: 'PLLA 분해',
          title: '콜라겐 생성 촉진',
          description: 'PLLA가 분해되면서 콜라겐 생성 촉진'
        },
        {
          step: '효과 발현',
          title: '지속적 개선',
          description: '약 6주 후부터 콜라겐 생성으로 인한 개선 효과가 보이기 시작함'
        }
      ],
      characteristics: [
        '안전한 성분 PLLA로 진피층까지 도달',
        '최대 2년까지 지속되는 오래가는 효과',
        '유럽 CE와 한국 식약처 인증 안전성',
        '자연스러운 콜라겐 생성 촉진'
      ]
    },
    olidia365Info: {
      title: '올리디아 365',
      subtitle: '꺼짐 부위 볼륨을 자연스럽게 채워주는 안정적인 콜라겐 생성 촉진제',
      points: [
        'PLLA성분의 콜라겐 생성 촉진제',
        '24개월 이상 유지되는 강력한 볼륨 유지효과',
        '유럽 CE, 한국 KFDA 승인',
        '미 FDA 승인 받은 PLLA성분'
      ],
      plus: [
        '즉각적인 볼륨 효과 : 히알루론산 필러',
        '눈밑, 눈꺼풀, 눈가 등 얇은피부 : 울트라콜200',
        '리프팅 시술'
      ],
      collagenInfo: {
        title: '콜라겐 생성 촉진제란?',
        subtitle: '내 몸속 콜라겐 생성 능력을 끌어올리는 콜라겐 생성 촉진 부스터!',
        description: '채우기만 하는 히알루론산 필러와는 달리 미국 FDA에서 승인한 Poly-L-Lactic-Acid(PLLA)를 주원료로 하는 식약처 허가를 받은 의료기기로 피부내에서 자연스럽게 콜라겐을 생성하는 능력을 촉진시켜 볼륨을 증가시키는 효과가 있는 제품입니다.'
      },
      safetyInfo: {
        title: '안전한 입자 크기 및 구조',
        description: '입자의 크기가 균일하고 제품 Granule Powder의 형태가 유선형으로 부작용 감소. 올리디아는 스컬트라와 동일 L-form이기는 하지만 입자의 형태가 유선형으로 이루어져 있어서 결절 및 뭉침현상 등의 부작용 확률은 낮추고 쥬베룩볼륨과 같은 D-form보다는 볼륨생성 효과는 높인 제품입니다. 수화시간 30분으로 당일 시술이 가능합니다.'
      },
      recommendedFor: [
        '볼꺼짐 등 꺼진 부위로 인해서 스트레스 받으시는 분',
        '필러의 이질감이 싫고 안정적인 성분으로 꺼짐을 해결하고 싶으신 분',
        '오래 지속되는 효과의 꺼진 부위 시술을 찾고있는 분'
      ],
      expectedEffects: [
        { title: '자연스러운볼륨증가', icon: '📈' },
        { title: '오래가는지속효과', icon: '⏰' },
        { title: '매끈한컨투어링효과', icon: '✨' },
        { title: '새로운콜라겐생성', icon: '🔄' },
        { title: '지속적인타이트닝', icon: '💪' }
      ]
    },
    procedureInfo: {
      frequency: '4주 간격으로 3회 이상 시술 권장',
      duration: '수화시간 30분으로 당일 시술 가능',
      persistance: '최대 2년까지 지속',
      note: '콜라겐 생성 촉진제는 일반적인 필러와 같이 즉각적인 볼륨 효과를 나타내는 것이 아니라 내 몸속의 볼륨이 생성되는 시간이 필요합니다.'
    },
    qna: [
      {
        question: '올리디아 추천 부위는 어디?',
        answer: '올리디아는 얼굴 모든 부위에 시술이 가능한 안정적인 콜라겐 생성 촉진제 입니다. 그러나 눈밑이나 눈꺼풀, 눈가처럼 피부가 매우 얇은 부위는 울트라콜200을 추천드리고 볼륨이 많이 꺼진 부위에는 올리디아를 선택하시면만족도가 매우 높습니다.'
      },
      {
        question: '시술횟수 및 주기는 어떻게 되나요?',
        answer: '개인의 상태에 따라 다를 수 있으나 일반적으로 4주 간격으로 3회 이상 시술 받으시는 것을 권장드립니다. 콜라겐 생성 촉진제는 일반적인 필러와 같이 즉각적인 볼륨 효과를 나타내는 것이 아니라 내 몸속의 볼륨이 생성되는시간이 필요하다는 점 참고해주세요.'
      },
      {
        question: '스컬트라와 올리디아 뭐가 다른가요?',
        answer: '둘 다 PLLA 성분의 콜라겐 생성 촉진제 입니다. 그러나 올리디아는 입자의 형태가 유선형으로 이루어져 있어서 결절 및 뭉침현상 등의 부작용 확률은 낮추고 쥬베룩볼륨과 같은 D-form보다는 볼륨생성 효과는 높인 제품입니다.'
      },
      {
        question: '히알루론산 필러와 뭐가 다른가요?',
        answer: '빠른 시간안에 얼굴 전체에 많은 볼륨 개선을 원하신다면 히알루론산필러 시술을 권장드리며, 티안나게 조금씩 자연스럽게 더 안전하게 볼륨증가를 원하실 경우에는 올리디아를 권장드립니다.'
      }
    ],
    precautions: [
      '시술 후 가벼운 세안이나 화장은 가능합니다.',
      '시술 후 약 1주일 정도는 사우나나 찜질방, 과격한 운동은 피하시는게 좋습니다.',
      '시술 직후 홍반 및 붓기가 있을 수 있으나 일반적으로 수 시간 내에 사라집니다.'
    ],
    icon: Gem
  },
  {
    id: 'sculptra',
    title: '스컬트라',
    subtitle: 'SCULPTRA',
    tagline: '개인 맞춤형 볼륨 케어',
    subtitle2: '피부 본연의 자연스러운 볼륨감, 스컬트라',
    description: [
      '스컬트라는 FDA 승인과 식약처 허가를 받은 콜라겐 형성 물질입니다.',
      '스컬트라의 PLLA 성분은 체내 콜라겐 형성을 유도하며 피부의 탄력과 볼륨을 증가시킵니다.',
      '스컬트라를 통해 피부 스스로 새롭게 생성된 콜라겐은 자연스러운 볼륨 형성뿐 아니라 피부 탄력, 잔주름 개선, 리프팅 효과를 보여줍니다.'
    ],
    features: ['콜라겐재생', '장기지속', '자연볼륨'],
    sculpturaCharacteristics: {
      title: '스컬트라 특징',
      description: '스컬트라는 피부 조직에 주사하여 이물질을 통해 볼륨을 차오르게 하는 일반 HA 필러와 다르게 PLLA 성분이 분해되면서 콜라겐 자가 생성을 촉진해 피부 탄력을 되찾게 해 주어 주름 완화에 도움을 주는 시술로 시간이 지날수록 점차 볼륨이 차오르기 때문에 자연스러운 볼륨 및 탄력을 개선시켜 줍니다.',
      features: [
        {
          number: '01',
          title: '스컬트라 특징',
          description: '스컬트라는 PLLA 성분이 자가 콜라겐 생성을 촉진해 피부 속에서부터 지속적으로 볼륨이 차오르기 때문에 오랜 유지 기간과 보다 자연스러운 효과를 기대할 수 있습니다.',
          hashtags: ['콜라겐 생성 기대', '자연스러운 볼륨 개선', '잔주름 개선 기대', '피부 탄력 개선 기대']
        },
        {
          number: '02',
          title: '인증받은 안전함',
          description: '스컬트라는 국내 식약처뿐만 아니라 유럽 CE 인증,미국 FDA 승인 제품으로 안전성을 입증한 PLLA(성분)의료기기 입니다.',
          hashtags: ['유럽 CE인증', '미국 FDA 승인', '한국 식약처 허가']
        }
      ]
    },
    timeline: [
      {
        year: '2021',
        event: '미 FDA 및 유럽 허가사항 추가 윤곽 및 주름 개선 효과 유럽 재런칭'
      },
      {
        year: '2011',
        event: '스컬트라® 국내 출시'
      },
      {
        year: '2010',
        event: '안면주름 개선용도 국내 식약처 허가'
      },
      {
        year: '2009',
        event: 'Non-HIV 환자들의 Facial Wrinkle 치료 목적으로 미 FDA 승인'
      },
      {
        year: '2004',
        event: 'HIV-associated ilpoatrophy로 인한 Facial Volume Loss clfy 목적으로 미국 FDA 승인'
      },
      {
        year: '1999',
        event: '유럽에서 주름 치료 용도 사용(CE 인증) *New Fill이라는 이름으로 사용 시작'
      },
      {
        year: '1954',
        event: '프랑스에서 최초로 PLLA 합성'
      }
    ],
    fillerVssculptra: {
      title: '필러 VS 스컬트라',
      description: '스컬트라는 자가 콜라겐 합성을 촉진하여 자연스러운 볼륨 및 주름 개선을 기대할 수 있습니다. 특히 꺼진 얼굴에 볼륨을 주며 생기있고 자연스러운 인상으로 개선할 수 있습니다.',
      comparison: [
        {
          category: '성분',
          filler: 'HA(히알루론산)',
          sculptra: 'PLLA(콜라겐 합성 촉진제)'
        },
        {
          category: '유지기간',
          filler: '1년이내',
          sculptra: '2년이상'
        },
        {
          category: '효과시기',
          filler: '즉각적인 볼륨감',
          sculptra: '시술 3~4주 후 서서히'
        },
        {
          category: '장점',
          filler: '즉각적인 볼륨감\n윤곽 개선 기대',
          sculptra: '자연스러운 볼륨감\n탄력, 주름 개선\n흉터 개선 기대'
        }
      ]
    },
    procedurePrinciple: {
      title: '스컬트라 시술원리',
      steps: [
        {
          step: 'STEP01',
          title: '치료전',
          description: '탄력이 없어 꺼진 피부'
        },
        {
          step: 'STEP02',
          title: '스컬트라의 주입 후',
          description: 'PLLA와 수분이 피부 내의 볼륨 형성'
        },
        {
          step: 'STEP03',
          title: '시간이 지나면서',
          description: '수분이 체내에 흡수 PLLA 입자만 존재'
        },
        {
          step: 'STEP04',
          title: 'PLLA 성분 분해',
          description: '남아있던 PLLA 성분 분해되면서 섬유아세포 지속적 자극'
        },
        {
          step: 'STEP05',
          title: '새로운 콜라겐 형성',
          description: '새로운 콜라겐 형성'
        },
        {
          step: 'STEP06',
          title: '효과 발현',
          description: '약 6~8주 후 피부 주름, 볼륨 개선 자연스러운 볼륨 형성'
        }
      ],
      benefits: [
        '진피 내 콜라겐을 만들어내는 세포인 섬유아 세포를 자극해 콜라겐 자가 생성 촉진',
        '환자 진피층의 콜라겐이 증식하여 여드름 흉터와 피부 결 개선',
        '콜라겐 재생을 통한 볼륨, 탄력 개선',
        '자연스러운 볼륨 회복, 넓은 부위에도 부담 없이 사용 가능'
      ]
    },
    afterCare: {
      title: '스컬트라 시술 후',
      subtitle: '실로스에서는 스컬트라를 통해 자연스러운 볼륨이 재생성 될 수 있도록 만듭니다.',
      timeline: [
        {
          number: '1',
          category: '일상생활',
          description: '일상생활 지장 주지 않음'
        },
        {
          number: '2',
          category: '붓기',
          description: '평균 3~4일 이내'
        },
        {
          number: '3',
          category: '볼륨효과',
          description: '시술 후 5~6주'
        },
        {
          number: '4',
          category: '볼륨감 유지',
          description: '평균 2년'
        }
      ]
    },
    precautions: [
      '시술 후 음주 및 흡연 운동을 자제해 주세요',
      '시술 후 안내에 따라 하루 뒤부터 부드러운 마사지를 통해 뭉치는 증상을 완화시켜주세요',
      '시술 당일부터 가벼운 세안은 가능합니다. 시술 부위가 자극받지 않도록 과격한 세안은 조심해 주세요',
      '시술 부위 후 사우나/ 찜질방, 열탕 목욕 과도한 햇빛과 자외선 노출과 같이 고온에 노출되지 않도록 해주세요'
    ],
    icon: Zap
  },
  {
    id: 'radiesse',
    title: '레디어스',
    subtitle: 'RADIESSE',
    tagline: '생체적합성이 높은 성분으로 스킨&콜라겐부스터를 동시에',
    subtitle2: '무너진 피부 구조를 바로 잡는 피부 속 코어의 힘, 레디어스',
    description: [
      '스킨, 코어부터 가득 채우다.',
      '레디어스는 우리 체내에 존재하는 미네랄 성분 CaHA를 주입하여 피부결, 피부톤, 주름 등 피부 속부터 채워 안에서 시작되는 변화로 보다 더 자연스럽게 피부를 개선시켜 줍니다.'
    ],
    features: ['즉각효과', 'CaHA성분', '깊은주름'],
    radiesseCore: {
      title: '레디어스 핵심 효과',
      subtitle: '피부 속부터 근본적으로 개선하는 스킨부스터입니다.',
      effects: [
        {
          number: '1',
          title: '볼륨 & 리프팅',
          subtitle: 'Volume & Lifting',
          description: '주입 후 피부 속에서 볼륨을 형성해 얼굴의 전체 볼륨과 자연스러운 리프팅을 선사합니다.'
        },
        {
          number: '2',
          title: '콜라겐 촉진',
          subtitle: 'Collagen',
          description: '레디어스의 CaHA 미세 입자가 피부 속에 들어가며 콜라겐 생성을 촉진시켜줍니다.'
        },
        {
          number: '3',
          title: '피부결 및 모공 개선',
          subtitle: 'Skin & Pore',
          description: '콜라겐이 증가하면서 피부가 건강해지고 모공이 수축돼 매끄러워지는데 도움됩니다.'
        }
      ]
    },
    treatmentAreas: [
      '미간', '이마', '눈가/눈밑', '볼', '턱선', '팔자주름', '목', '손등'
    ],
    radiesseFeatures: {
      title: '무너진 피부 코어엔? 레디어스!',
      description: '레디어스는 5가지 재생 성분 생성을 통해 무너진 피부 코어를 탄탄하게 채워줍니다.',
      regenerativeComponents: [
        '콜라겐 타입 1 & 3',
        '엘라스틴',
        '프로테오글리칸',
        '신혈관'
      ],
      collagenBoost: {
        title: '콜라겐 & 엘라스틴 생성 촉진',
        description: '필러 시술과는 다르게 피부 속 콜라겐 및 엘라스틴 생성을 촉진시킴으로써 주름 및 피부 탄력 개선과 자연스러운 볼륨감 형성에도 효과적입니다.'
      }
    },
    clinicExpertise: {
      title: '처음부터 SILOS의 꼼꼼한 시술 테크닉',
      description: '간단해보이는 시술이더라도 의료진의 실력에 따라 결과는 천차만별이기에 처음부터 SILOS에서는 개개인의 특성에 맞는 맞춤 시술을 진행하고 있습니다.'
    },
    safetyInfo: {
      title: '통증과 부작용이 걱정되신다면?',
      description: '염증 반응을 줄여 부작용의 위험을 낮췄으며, 전세계 80여개 국가에서 승인 및 사용되고 있음은 물론 FDA, CE, 식약처 인증을 통해 안정성을 입증 받았습니다.'
    },
    targetAudience: [
      '안정성과 부작용을 걱정하시는 분',
      '잔주름이 많아 생기있는 피부를 원하시는 분',
      '자연스럽게 오래가는 볼륨감을 원하시는 분',
      '자연스러운 피부톤과 결 개선 원하시는 분',
      '탄력 잃고 처진 피부가 고민이신 분',
      '무너진 피부 구조 개선하고 싶으신 분'
    ],
    promotionalText: {
      title: '볼륨부터 탄력까지 한번에',
      subtitle: '레디어스로 피부 리셋을 경험하세요.'
    },
    icon: Target
  },
  {
    id: 'collagen-fill',
    title: '콜라채움',
    subtitle: 'COLLAGEN FILL',
    tagline: '피부 속 시간을 되돌리다',
    subtitle2: 'SILOS만의 노화방지 "콜라(겐)채움주사"',
    description: [
      '콜라겐이 부족한 부위에 직접 콜라겐을 주입해 피부 속부터 차오르는 볼륨감과 탄력을 기대할 수 있는 시술로, 피부 치유 능력을 활성화하여 건강한 피부로 만들어줍니다.'
    ],
    features: ['리포좀기술', '깊은침투', '종합개선'],
    collagenComponents: {
      title: '콜라채움',
      subtitle: '세 가지 핵심 성분이 하나로',
      components: [
        '자가형 줄기 세포',
        '콜라겐',
        '히알루론산'
      ]
    },
    treatmentEffects: {
      title: '시술 효과',
      effects: [
        {
          number: '1',
          title: '볼륨 회복',
          description: '자연스러운 볼륨'
        },
        {
          number: '2',
          title: '피부 탄력/주름 개선',
          description: ''
        },
        {
          number: '3',
          title: '피부 노화개선',
          description: ''
        }
      ]
    },
    collagenReduction: {
      title: '연령대별 피부 속 콜라겐 감소',
      marketingPhrase: '콜라겐이 줄어들면 피부는 주름이 지고 쉽게 탄력을 잃어버리게 됩니다. 지금이 바로 콜라채움이 필요한 시기입니다!',
      chartPlaceholder: true,
      imagePlaceholder: true
    },
    silosDifference: {
      title: 'SILOS 차별점',
      subtitle: '속부터 채우는 콜라겐 근본적인 피부 노화 개선',
      description: '본인의 콜라겐으로 볼륨을 재생성하는 원리로 노화 진행 전의 피부로 돌아가는 것을 추구하는 시술',
      highlight: {
        title: '효과는 올리고 부작용은 줄이고',
        description: 'SILOS만의 차별화된 시술 방식과 테크닉으로 최상의 결과를 만들어 냅니다.'
      }
    },
    icon: Layers
  }
];

export default function SkinLiftingPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('skin-botox');
  const { addToCart, removeFromCart, isInCart } = useCart();
  
  // Handle URL parameter for direct access
  useEffect(() => {
    const procedureParam = searchParams.get('procedure');
    if (procedureParam) {
      setActiveTab(procedureParam);
    }
  }, [searchParams]);

  const handleToggleCart = (procedure: typeof skinLiftingProcedures[0]) => {
    if (isInCart(procedure.id)) {
      removeFromCart(procedure.id);
    } else {
      addToCart({
        id: procedure.id,
        name: procedure.title,
        category: '피부리프팅'
      });
    }
  };

  const activeProcedure = skinLiftingProcedures.find(proc => proc.id === activeTab) || skinLiftingProcedures[0];

  return (
    <PageLayout>
      {/* 히어로 섹션 */}
      <div className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/procedures/skin-lifting/skin-lifting-header.png" 
            alt="피부 리프팅 헤더" 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlays for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Text Content */}
              <div className="text-left text-white lg:pr-8">
                <div className="inline-flex items-center px-6 py-3 bg-white/15 backdrop-blur-md rounded-full text-sm font-elegant-sans font-medium mb-6 border border-white/20 shadow-lg">
                  <Droplets className="w-4 h-4 mr-2" />
                  SILOS SKIN LIFTING
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light mb-6 tracking-wide leading-tight drop-shadow-lg">
                  피부 리프팅
                </h1>
                <div className="w-24 h-1 bg-white/80 rounded-full mb-8 shadow-sm"></div>
                <div className="space-y-4 mb-8">
                  <p className="text-2xl sm:text-3xl font-display font-light text-white/95 leading-tight drop-shadow-md">
                    시간을 되돌리는 마법
                  </p>
                  <p className="text-lg sm:text-xl font-elegant-sans font-light text-white/90 leading-relaxed drop-shadow-sm max-w-lg">
                    당신의 아름다움을 깨워내는<br />
                    프리미엄 안티에이징 솔루션
                  </p>
                </div>
                
                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => handleToggleCart(activeProcedure)}
                    className={`px-8 py-4 font-elegant-sans font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                      isInCart(activeProcedure.id)
                        ? 'bg-green-500/90 hover:bg-green-500 text-white'
                        : 'bg-white/90 hover:bg-white text-slate-800'
                    }`}
                  >
                    {isInCart(activeProcedure.id) ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>상담 신청됨</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>무료 상담 받기</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => {
                      const treatmentsSection = document.getElementById('treatments-section');
                      if (treatmentsSection) {
                        treatmentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="px-8 py-4 border-2 border-white/60 hover:border-white text-white hover:bg-white/10 font-elegant-sans font-medium rounded-full transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2"
                  >
                    <ArrowDown className="w-5 h-5" />
                    <span>시술 정보 보기</span>
                  </button>
                </div>
              </div>
              
              {/* Right side - Reserved for lady image showcase */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/5 rounded-3xl backdrop-blur-sm"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-display font-light mb-4">
                        전문의가 직접 진행하는
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="font-bold mb-1">개인맞춤</div>
                          <div className="text-white/80">1:1 맞춤 설계</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="font-bold mb-1">안전시술</div>
                          <div className="text-white/80">FDA 인증 제품</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="font-bold mb-1">자연결과</div>
                          <div className="text-white/80">부작용 최소화</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="font-bold mb-1">지속효과</div>
                          <div className="text-white/80">최대 2년 유지</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 섹션 */}
      <div className="relative pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          
          {/* 탭 네비게이션 */}
          <div id="treatments-section" className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-light text-slate-800 mb-4">
                TREATMENTS
              </h3>
              <h4 className="text-2xl font-elegant font-light text-slate-700 mb-6">
                피부 리프팅 시술
              </h4>
              <div className="w-20 h-0.5 bg-teal-smoke-300 rounded-full mx-auto"></div>
            </div>

            {/* 4x2 그리드 버튼들 */}
            <div className="grid grid-cols-4 gap-2 lg:gap-4 mb-12">
              {skinLiftingProcedures.map((procedure) => {
                const IconComponent = procedure.icon;
                return (
                  <button
                    key={procedure.id}
                    onClick={() => {
                      console.log('Button clicked:', procedure.id);
                      setActiveTab(procedure.id);
                    }}
                    className={`p-2 lg:p-4 rounded-lg font-elegant-sans font-medium transition-all duration-300 text-center group relative z-10 ${
                      activeTab === procedure.id
                        ? 'bg-gradient-to-br from-teal-smoke-500 to-elegant-500 text-white shadow-lg'
                        : 'bg-white text-slate-600 border-2 border-teal-smoke-200 hover:border-teal-smoke-300 hover:bg-teal-smoke-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1 lg:space-y-2">
                      <div className={`p-1 lg:p-2 rounded-full transition-colors ${
                        activeTab === procedure.id
                          ? 'bg-white/20'
                          : 'bg-teal-smoke-50 group-hover:bg-teal-smoke-100'
                      }`}>
                        <IconComponent className={`w-4 h-4 lg:w-6 lg:h-6 ${
                          activeTab === procedure.id ? 'text-white' : 'text-teal-smoke-600'
                        }`} />
                      </div>
                      <div className="text-center">
                        <div className={`text-xs lg:text-sm font-bold leading-tight ${
                          activeTab === procedure.id ? 'text-white' : 'text-slate-800'
                        }`}>
                          {procedure.title}
                        </div>
                        <div className={`text-xs mt-1 leading-tight ${
                          activeTab === procedure.id ? 'text-white/80' : 'text-slate-500'
                        }`}>
                          {procedure.subtitle}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 선택된 시술 상세 정보 - 전체 너비 사용 */}
            <div className="mt-16">
              {/* 헤더 */}
              <div className="text-center mb-12">
                <h3 className="text-4xl font-display font-light text-slate-900 mb-4 tracking-wide">
                  {activeProcedure.title}
                </h3>
                <p className="text-xl font-elegant-sans font-light text-slate-600">
                  {activeProcedure.subtitle}
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto mt-6"></div>
              </div>

              {/* 콘텐츠 */}
              <div>
                {/* 전체 comprehensive 레이아웃 */}
                <div className="space-y-12">
                  {/* 태그라인 */}
                  {activeProcedure.tagline && (
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-4">
                        {activeProcedure.tagline}
                      </h3>
                      <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto"></div>
                    </div>
                  )}

                  {/* 기본 설명 섹션 */}
                  {activeProcedure.description && (
                    <div className="space-y-6">
                      {activeProcedure.description.map((desc, i) => (
                        <div key={i} className="flex items-start space-x-4">
                          <div className="w-3 h-3 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-lg text-slate-700 font-elegant-sans font-light leading-relaxed">
                            {desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 리쥬란힐러 정의 섹션 */}
                  {activeProcedure.definition && (
                    <div className="bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-6 text-center flex items-center justify-center">
                        <Shield className="w-6 h-6 mr-3" />
                        {activeProcedure.definition.title}
                      </h3>
                      <div className="space-y-4">
                        {activeProcedure.definition.content.map((desc, i) => (
                          <div key={i} className="flex items-start space-x-4">
                            <div className="w-3 h-3 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-lg text-slate-700 font-elegant-sans font-light leading-relaxed">
                              {desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 특징 배지들 */}
                  {activeProcedure.features && (
                    <div className="flex flex-wrap gap-3 justify-center">
                      {activeProcedure.features.map((feature, i) => (
                        <div key={i} className="inline-flex items-center px-5 py-3 rounded-full text-sm font-elegant-sans font-bold bg-gradient-to-r from-teal-smoke-100 to-elegant-100 text-slate-700 border-2 border-teal-smoke-200 shadow-lg">
                          <Sparkles className="w-4 h-4 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 리쥬란힐러 효과 섹션 */}
                  {activeProcedure.effectsTitle && activeProcedure.effects && typeof activeProcedure.effects[0] === 'object' && (
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-smoke-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-4 text-center">
                        {activeProcedure.effectsTitle}
                      </h3>
                      <p className="text-lg text-slate-600 font-elegant-sans text-center mb-8 leading-relaxed">
                        {activeProcedure.effectsDescription}
                      </p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {(activeProcedure.effects as { title: string; description: string }[]).map((effect, i) => (
                          <div key={i} className="bg-white/80 rounded-xl p-6 shadow-sm">
                            <h4 className="text-lg font-display font-bold text-teal-smoke-700 mb-3">
                              {effect.title}
                            </h4>
                            <p className="text-slate-600 font-elegant-sans leading-relaxed">
                              {effect.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 리쥬란힐러 원리 섹션 */}
                  {activeProcedure.principleTitle && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-6 text-center">
                        {activeProcedure.principleTitle}
                      </h3>
                      <div className="space-y-4">
                        {activeProcedure.principleDescription.map((desc, i) => (
                          <div key={i} className="flex items-start space-x-4">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-lg text-slate-700 font-elegant-sans font-light leading-relaxed">
                              {desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 리쥬란힐러 시술 원리 섹션 */}
                  {activeProcedure.mechanismTitle && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-4 text-center">
                        {activeProcedure.mechanismTitle}
                      </h3>
                      <p className="text-lg text-slate-600 font-elegant-sans text-center mb-8 font-medium">
                        {activeProcedure.mechanismSubtitle}
                      </p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {activeProcedure.mechanism.map((item, i) => (
                          <div key={i} className="bg-white/80 rounded-xl p-6 shadow-sm">
                            <div className="flex items-start space-x-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">{i + 1}</span>
                              </div>
                              <p className="text-slate-700 font-elegant-sans leading-relaxed">
                                {item}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 쥬베룩 기술 섹션 */}
                  {activeProcedure.technologyTitle && (
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-6 text-center">
                        {activeProcedure.technologyTitle}
                      </h3>
                      <div className="bg-white/80 rounded-xl p-6 shadow-sm">
                        <p className="text-lg text-slate-700 font-elegant-sans leading-relaxed">
                          {activeProcedure.technologyDescription}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 쥬베룩 성분 및 원리 섹션 */}
                  {activeProcedure.componentsTitle && (
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-6 text-center">
                        {activeProcedure.componentsTitle}
                      </h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {activeProcedure.components.map((component, i) => (
                          <div key={i} className="bg-white/80 rounded-xl p-6 shadow-sm">
                            <h4 className="text-lg font-display font-bold text-cyan-700 mb-3">
                              {component.type}
                            </h4>
                            <p className="text-slate-600 font-elegant-sans leading-relaxed">
                              {component.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 쥬베룩 효과 섹션 (단순 리스트) */}
                  {activeProcedure.effectsTitle && Array.isArray(activeProcedure.effects) && typeof activeProcedure.effects[0] === 'string' && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-6 text-center">
                        {activeProcedure.effectsTitle}
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {(activeProcedure.effects as string[]).map((effect, i) => (
                          <div key={i} className="bg-white/80 rounded-lg p-4 text-center shadow-sm">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Star className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-base font-elegant-sans font-medium text-slate-800">{effect}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 쥬베룩 종류 섹션 */}
                  {activeProcedure.typesTitle && (
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-4 text-center">
                        {activeProcedure.typesTitle}
                      </h3>
                      {activeProcedure.typesNote && (
                        <p className="text-base text-slate-600 font-elegant-sans text-center mb-6 italic">
                          {activeProcedure.typesNote}
                        </p>
                      )}
                      <div className="bg-white/80 rounded-xl p-6 shadow-sm text-center">
                        <p className="text-lg text-slate-700 font-elegant-sans">
                          쥬베룩 스킨부스터와 쥬베룩 볼륨 중에서 개인의 피부 상태와 목표에 맞는 제품을 선택하여 맞춤 시술을 받으실 수 있습니다.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 올리디아 마요 정보 섹션 */}
                  {activeProcedure.olidiaMayoInfo && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-4 text-center">
                        {activeProcedure.olidiaMayoInfo.title}
                      </h3>
                      <p className="text-lg text-slate-600 font-elegant-sans text-center mb-8 font-medium">
                        {activeProcedure.olidiaMayoInfo.description}
                      </p>
                      
                      {/* 시술 과정 */}
                      <div className="mb-8">
                        <h4 className="text-xl font-display font-bold text-purple-800 mb-6 text-center">시술 과정</h4>
                        <div className="space-y-6">
                          {activeProcedure.olidiaMayoInfo.process.map((step, i) => (
                            <div key={i} className="bg-white/80 rounded-lg p-6 shadow-sm">
                              <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-bold text-sm">{i + 1}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center mb-2">
                                    <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full mr-3">
                                      {step.step}
                                    </span>
                                    <h5 className="text-lg font-display font-bold text-slate-800">{step.title}</h5>
                                  </div>
                                  <p className="text-base text-slate-700 font-elegant-sans leading-relaxed">{step.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 올리디아 마요 특성 */}
                      <div>
                        <h4 className="text-xl font-display font-bold text-purple-800 mb-6 text-center">올리디아 마요 특성 비교</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {activeProcedure.olidiaMayoInfo.characteristics.map((characteristic, i) => (
                            <div key={i} className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-md">
                              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                              <p className="text-base text-slate-700 font-elegant-sans leading-relaxed">
                                {characteristic}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 올리디아 365 정보 섹션 */}
                  {activeProcedure.olidia365Info && (
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-4 text-center">
                        {activeProcedure.olidia365Info.title}
                      </h3>
                      <p className="text-lg text-slate-600 font-elegant-sans text-center mb-8 font-medium">
                        {activeProcedure.olidia365Info.subtitle}
                      </p>

                      {/* POINT 섹션 */}
                      <div className="mb-8">
                        <h4 className="text-xl font-display font-bold text-indigo-800 mb-6 text-center">POINT</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {activeProcedure.olidia365Info.points.map((point, i) => (
                            <div key={i} className="flex items-start space-x-3 bg-white/80 rounded-lg p-4">
                              <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-xs">{i + 1}</span>
                              </div>
                              <p className="text-base text-slate-700 font-elegant-sans font-medium leading-relaxed">
                                {point}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* PLUS 섹션 */}
                      <div className="mb-8">
                        <h4 className="text-xl font-display font-bold text-indigo-800 mb-6 text-center">PLUS</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          {activeProcedure.olidia365Info.plus.map((plus, i) => (
                            <div key={i} className="bg-white/80 rounded-lg p-4 text-center shadow-sm">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Sparkles className="w-5 h-5 text-white" />
                              </div>
                              <p className="text-sm font-elegant-sans font-medium text-slate-800">{plus}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 콜라겐 생성 촉진제 설명 */}
                      {activeProcedure.olidia365Info.collagenInfo && (
                        <div className="mb-8 bg-white/60 rounded-xl p-6">
                          <h4 className="text-xl font-display font-bold text-indigo-800 mb-3 text-center">
                            {activeProcedure.olidia365Info.collagenInfo.title}
                          </h4>
                          <p className="text-lg font-elegant-sans font-bold text-center mb-4 text-indigo-700">
                            {activeProcedure.olidia365Info.collagenInfo.subtitle}
                          </p>
                          <p className="text-base text-slate-700 font-elegant-sans leading-relaxed">
                            {activeProcedure.olidia365Info.collagenInfo.description}
                          </p>
                        </div>
                      )}

                      {/* 안전성 정보 */}
                      {activeProcedure.olidia365Info.safetyInfo && (
                        <div className="mb-8 bg-white/60 rounded-xl p-6">
                          <h4 className="text-xl font-display font-bold text-indigo-800 mb-4 text-center flex items-center justify-center">
                            <Shield className="w-6 h-6 mr-3" />
                            {activeProcedure.olidia365Info.safetyInfo.title}
                          </h4>
                          <p className="text-base text-slate-700 font-elegant-sans leading-relaxed">
                            {activeProcedure.olidia365Info.safetyInfo.description}
                          </p>
                        </div>
                      )}

                      {/* 추천 대상 (365 전용) */}
                      {activeProcedure.olidia365Info.recommendedFor && (
                        <div className="mb-8">
                          <h4 className="text-xl font-display font-bold text-indigo-800 mb-6 text-center">추천 대상</h4>
                          <div className="grid grid-cols-1 gap-3">
                            {activeProcedure.olidia365Info.recommendedFor.map((rec, i) => (
                              <div key={i} className="flex items-start space-x-3 bg-white/80 rounded-lg p-4">
                                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-bold text-sm">{i + 1}</span>
                                </div>
                                <p className="text-base text-slate-800 font-elegant-sans font-medium leading-relaxed">
                                  {rec}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 기대 효과 */}
                      {activeProcedure.olidia365Info.expectedEffects && (
                        <div>
                          <h4 className="text-xl font-display font-bold text-indigo-800 mb-6 text-center">기대 효과</h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {activeProcedure.olidia365Info.expectedEffects.map((effect, i) => (
                              <div key={i} className="bg-white/80 rounded-lg p-4 text-center shadow-sm">
                                <div className="text-2xl mb-2">{effect.icon}</div>
                                <p className="text-base font-elegant-sans font-bold text-slate-800">{effect.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}


                  {/* 레디어스 subtitle2 */}
                  {activeProcedure.subtitle2 && (
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-4">
                        {activeProcedure.subtitle2}
                      </h3>
                      <div className="w-24 h-1 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full mx-auto"></div>
                    </div>
                  )}

                  {/* 레디어스 핵심 효과 섹션 */}
                  {activeProcedure.radiesseCore && (
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 sm:p-6 lg:p-8">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-800 mb-3 sm:mb-4 text-center">
                        {activeProcedure.radiesseCore.title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-elegant-sans text-center mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                        {activeProcedure.radiesseCore.subtitle}
                      </p>
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
                        {activeProcedure.radiesseCore.effects.map((effect, i) => (
                          <div key={i} className="bg-white/80 rounded-lg sm:rounded-xl p-2 sm:p-4 lg:p-6 shadow-sm text-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                              <span className="text-white font-bold text-xs sm:text-sm lg:text-lg">{effect.number}</span>
                            </div>
                            <h4 className="text-xs sm:text-sm lg:text-lg font-display font-bold text-teal-700 mb-1">
                              {effect.title}
                            </h4>
                            <p className="text-[10px] sm:text-xs lg:text-sm text-teal-600 font-elegant-sans mb-1 sm:mb-2 lg:mb-3">
                              {effect.subtitle}
                            </p>
                            <p className="text-[10px] sm:text-xs lg:text-base text-slate-700 font-elegant-sans leading-relaxed">
                              {effect.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 레디어스 특징 섹션 */}
                  {activeProcedure.radiesseFeatures && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 lg:p-8">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-slate-800 mb-3 sm:mb-4 text-center">
                        {activeProcedure.radiesseFeatures.title}
                      </h3>
                      <p className="text-sm sm:text-sm lg:text-base text-slate-600 font-elegant-sans text-center mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                        {activeProcedure.radiesseFeatures.description}
                      </p>
                      
                      {/* 5가지 재생 성분 */}
                      <div className="mb-6 sm:mb-8">
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-4 sm:mb-6">
                          {activeProcedure.radiesseFeatures.regenerativeComponents.map((component, i) => (
                            <div key={i} className="inline-flex items-center px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-full text-[10px] sm:text-xs lg:text-sm font-elegant-sans font-bold bg-gradient-to-r from-blue-100 to-indigo-100 text-slate-700 border sm:border-2 border-blue-200 shadow-lg">
                              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 mr-1 sm:mr-1.5 lg:mr-2" />
                              {component}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 콜라겐 부스트 정보 */}
                      {activeProcedure.radiesseFeatures.collagenBoost && (
                        <div className="bg-white/80 rounded-xl p-6 shadow-sm">
                          <h4 className="text-xl font-display font-bold text-indigo-800 mb-3 text-center flex items-center justify-center">
                            <Zap className="w-5 h-5 mr-2" />
                            {activeProcedure.radiesseFeatures.collagenBoost.title}
                          </h4>
                          <p className="text-base text-slate-700 font-elegant-sans leading-relaxed">
                            {activeProcedure.radiesseFeatures.collagenBoost.description}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 클리닉 전문성 섹션 */}
                  {activeProcedure.clinicExpertise && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 lg:p-8">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-slate-800 mb-3 sm:mb-4 text-center flex items-center justify-center">
                        <Star className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-2.5 lg:mr-3" />
                        {activeProcedure.clinicExpertise.title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-elegant-sans text-center leading-relaxed">
                        {activeProcedure.clinicExpertise.description}
                      </p>
                    </div>
                  )}

                  {/* 안전성 정보 섹션 */}
                  {activeProcedure.safetyInfo && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 lg:p-8">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-slate-800 mb-3 sm:mb-4 text-center flex items-center justify-center">
                        <Shield className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-2.5 lg:mr-3" />
                        {activeProcedure.safetyInfo.title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-elegant-sans text-center leading-relaxed">
                        {activeProcedure.safetyInfo.description}
                      </p>
                    </div>
                  )}

                  {/* 프로모션 텍스트 섹션 */}
                  {activeProcedure.promotionalText && (
                    <div className="bg-gradient-to-r from-teal-smoke-500 to-elegant-500 rounded-2xl p-4 sm:p-6 lg:p-8 text-center">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white mb-2 sm:mb-3">
                        {activeProcedure.promotionalText.title}
                      </h3>
                      <p className="text-sm sm:text-lg lg:text-xl font-elegant-sans font-light text-white/90">
                        {activeProcedure.promotionalText.subtitle}
                      </p>
                    </div>
                  )}

                  {/* 콜라채움 성분 다이어그램 섹션 */}
                  {activeProcedure.collagenComponents && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 lg:p-8">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-800 mb-2 sm:mb-3 text-center">
                        {activeProcedure.collagenComponents.title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-elegant-sans text-center mb-6 sm:mb-8">
                        {activeProcedure.collagenComponents.subtitle}
                      </p>
                      
                      {/* Venn Diagram */}
                      <div className="flex justify-center mb-6 sm:mb-8">
                        <div className="w-full max-w-md lg:max-w-lg">
                          <img 
                            src="/images/procedures/skin-lifting/collagen/venn-diagram.jpg" 
                            alt="콜라채움 3가지 성분 다이어그램" 
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 콜라채움 시술 효과 섹션 */}
                  {activeProcedure.treatmentEffects && typeof activeProcedure.treatmentEffects === 'object' && 'effects' in activeProcedure.treatmentEffects && (
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-6 lg:p-8">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-800 mb-6 sm:mb-8 text-center">
                        {activeProcedure.treatmentEffects.title}
                      </h3>
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
                        {activeProcedure.treatmentEffects.effects.map((effect, i) => (
                          <div key={i} className="bg-white/80 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm text-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                              <span className="text-white font-bold text-sm sm:text-base lg:text-lg">{effect.number}</span>
                            </div>
                            <h4 className="text-xs sm:text-sm lg:text-lg font-display font-bold text-slate-800 mb-1">
                              {effect.title}
                            </h4>
                            {effect.description && (
                              <p className="text-[10px] sm:text-xs lg:text-sm text-slate-600 font-elegant-sans">
                                {effect.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 콜라겐 감소 차트 섹션 */}
                  {activeProcedure.collagenReduction && (
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 sm:p-6 lg:p-8">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-800 mb-6 sm:mb-8 text-center">
                        {activeProcedure.collagenReduction.title}
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        {/* Collagen Reduction Chart */}
                        <div className="bg-white/60 rounded-xl p-4 sm:p-6 shadow-sm">
                          <div className="h-48 sm:h-64 lg:h-72 rounded-lg overflow-hidden">
                            <img 
                              src="/images/procedures/skin-lifting/collagen-fill/collagen-reduction-chart.png" 
                              alt="연령대별 콜라겐 감소 차트" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                        
                        {/* Collagen Image */}
                        <div className="bg-white/60 rounded-xl p-4 sm:p-6 shadow-sm">
                          <div className="h-48 sm:h-64 lg:h-72 rounded-lg overflow-hidden">
                            <img 
                              src="/images/procedures/skin-lifting/collagen-fill/collagen-image.png" 
                              alt="콜라겐 이미지" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Marketing Phrase */}
                      <div className="relative bg-white rounded-xl p-6 sm:p-8 text-center shadow-lg border-l-4 border-teal-smoke-500">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className="bg-teal-smoke-500 text-white px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                            중요
                          </div>
                        </div>
                        <div className="flex items-center justify-center mb-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-100 to-orange-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-red-500 text-lg sm:text-xl">⚠️</span>
                          </div>
                          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                        </div>
                        <p className="text-slate-800 font-elegant-sans font-bold text-sm sm:text-base lg:text-lg leading-relaxed">
                          {activeProcedure.collagenReduction.marketingPhrase}
                        </p>
                        <div className="mt-4 flex justify-center">
                          <div className="bg-gradient-to-r from-teal-smoke-100 to-elegant-100 px-4 py-2 rounded-full">
                            <span className="text-teal-smoke-700 font-bold text-xs sm:text-sm">하나뿐인 피부, 지금 관리하세요!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SILOS 차별점 섹션 */}
                  {activeProcedure.silosDifference && (
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-6 lg:p-8">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-800 mb-4 sm:mb-6 text-center">
                        {activeProcedure.silosDifference.title}
                      </h3>
                      
                      <div className="bg-white/60 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                        <h4 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-indigo-800 mb-3 text-center">
                          {activeProcedure.silosDifference.subtitle}
                        </h4>
                        <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-elegant-sans text-center leading-relaxed">
                          {activeProcedure.silosDifference.description}
                        </p>
                      </div>
                      
                      {activeProcedure.silosDifference.highlight && (
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-4 sm:p-6 text-center">
                          <h4 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-white mb-2 sm:mb-3">
                            {activeProcedure.silosDifference.highlight.title}
                          </h4>
                          <p className="text-sm sm:text-base lg:text-lg text-white/90 font-elegant-sans">
                            {activeProcedure.silosDifference.highlight.description}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 스컬트라 특징 섹션 */}
                  {activeProcedure.sculpturaCharacteristics && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-4 text-center">
                        {activeProcedure.sculpturaCharacteristics.title}
                      </h3>
                      <p className="text-base text-slate-600 font-elegant-sans text-center mb-8 leading-relaxed">
                        {activeProcedure.sculpturaCharacteristics.description}
                      </p>
                      <div className="space-y-8">
                        {activeProcedure.sculpturaCharacteristics.features.map((feature, i) => (
                          <div key={i} className="bg-white/80 rounded-xl p-6 shadow-sm">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">{feature.number}</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-display font-bold text-slate-800 mb-3">{feature.title}</h4>
                                <p className="text-base text-slate-700 font-elegant-sans leading-relaxed mb-4">{feature.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {feature.hashtags.map((hashtag, j) => (
                                    <span key={j} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                                      #{hashtag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 스컬트라 연혁 타임라인 */}
                  {activeProcedure.timeline && (
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-6 text-center">스컬트라 역사</h3>
                      <div className="space-y-4">
                        {activeProcedure.timeline.map((item, i) => (
                          <div key={i} className="flex items-start space-x-4 bg-white/80 rounded-lg p-4">
                            <div className="w-16 h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">{item.year}</span>
                            </div>
                            <p className="text-base text-slate-700 font-elegant-sans leading-relaxed pt-1">
                              {item.event}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 필러 VS 스컬트라 비교 */}
                  {activeProcedure.fillerVssculptra && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-4 text-center">
                        {activeProcedure.fillerVssculptra.title}
                      </h3>
                      <p className="text-base text-slate-600 font-elegant-sans text-center mb-8 leading-relaxed">
                        {activeProcedure.fillerVssculptra.description}
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-lg shadow-sm">
                          <thead>
                            <tr className="bg-gradient-to-r from-green-100 to-emerald-100">
                              <th className="p-4 text-left font-display font-bold text-slate-800">구분</th>
                              <th className="p-4 text-center font-display font-bold text-slate-800">필러</th>
                              <th className="p-4 text-center font-display font-bold text-slate-800">스컬트라</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeProcedure.fillerVssculptra.comparison.map((comp, i) => (
                              <tr key={i} className={`border-t ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                <td className="p-4 font-elegant-sans font-bold text-slate-700">{comp.category}</td>
                                <td className="p-4 text-center font-elegant-sans text-slate-600 whitespace-pre-line">{comp.filler}</td>
                                <td className="p-4 text-center font-elegant-sans text-slate-600 whitespace-pre-line">{comp.sculptra}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 스컬트라 시술원리 */}
                  {activeProcedure.procedurePrinciple && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-6 text-center">
                        {activeProcedure.procedurePrinciple.title}
                      </h3>
                      
                      {/* 시술 단계 */}
                      <div className="mb-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {activeProcedure.procedurePrinciple.steps.map((step, i) => (
                            <div key={i} className="bg-white/80 rounded-lg p-4 shadow-sm">
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-bold text-xs">{i + 1}</span>
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded mb-2 inline-block">
                                    {step.step}
                                  </div>
                                  <h4 className="text-base font-display font-bold text-slate-800 mb-1">{step.title}</h4>
                                  <p className="text-sm text-slate-600 font-elegant-sans leading-relaxed">{step.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 효과 및 장점 */}
                      <div>
                        <h4 className="text-xl font-display font-bold text-purple-800 mb-4 text-center">주요 효과</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {activeProcedure.procedurePrinciple.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start space-x-3 bg-white/80 rounded-lg p-4">
                              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                              <p className="text-base text-slate-700 font-elegant-sans leading-relaxed">
                                {benefit}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 시술 후 관리 */}
                  {activeProcedure.afterCare && (
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-4 text-center">
                        {activeProcedure.afterCare.title}
                      </h3>
                      <p className="text-base text-slate-600 font-elegant-sans text-center mb-8 leading-relaxed">
                        {activeProcedure.afterCare.subtitle}
                      </p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {activeProcedure.afterCare.timeline.map((item, i) => (
                          <div key={i} className="bg-white/80 rounded-lg p-6 text-center shadow-sm">
                            <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-white font-bold">{item.number}</span>
                            </div>
                            <h4 className="text-lg font-display font-bold text-slate-800 mb-2">{item.category}</h4>
                            <p className="text-base text-slate-600 font-elegant-sans leading-relaxed">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 추천 대상 섹션 - 강조된 스타일 */}
                  {activeProcedure.targetAudience && (
                    <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 rounded-2xl p-4 sm:p-6 lg:p-8 border sm:border-2 border-orange-200 shadow-lg">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-orange-800 mb-4 sm:mb-6 text-center flex items-center justify-center">
                        <Target className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-2.5 lg:mr-3" />
                        추천 대상
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                        {activeProcedure.targetAudience.map((audience, i) => (
                          <div key={i} className="flex items-start space-x-2 sm:space-x-3 bg-white/60 rounded-lg p-2 sm:p-3 lg:p-4">
                            <div className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-[10px] sm:text-xs lg:text-sm">{i + 1}</span>
                            </div>
                            <p className="text-xs sm:text-sm lg:text-base text-slate-800 font-elegant-sans font-medium leading-relaxed">
                              {audience}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 스킨보톡스 특징 섹션 */}
                  {activeProcedure.id === 'skin-botox' && activeProcedure.characteristics && (
                    <div className="bg-gradient-to-br from-teal-smoke-50 to-elegant-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-6 text-center">스킨보톡스의 특징</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {activeProcedure.characteristics.map((characteristic, i) => (
                          <div key={i} className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-md">
                            <div className="w-6 h-6 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">{i + 1}</span>
                            </div>
                            <p className="text-base text-slate-700 font-elegant-sans leading-relaxed">
                              {characteristic}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 추가 정보 섹션 */}
                  {activeProcedure.additionalInfo && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                      <p className="text-lg text-slate-700 font-elegant-sans font-medium leading-relaxed text-center">
                        {activeProcedure.additionalInfo}
                      </p>
                    </div>
                  )}

                  {/* 시술 정보 섹션 */}
                  {activeProcedure.procedureInfo && (
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-smoke-200/30">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-6 text-center">시술 정보</h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(activeProcedure.procedureInfo).map(([key, value]) => {
                          let label = '';
                          let icon = Clock;
                          switch (key) {
                            case 'duration': label = '시술시간'; icon = Clock; break;
                            case 'anesthesia': label = '마취'; icon = Shield; break;
                            case 'frequency': label = '시술빈도'; icon = Target; break;
                            case 'recovery': label = '회복기간'; icon = Star; break;
                            case 'hospitalization': label = '입원'; icon = AlertCircle; break;
                            case 'followUp': label = '추후관리'; icon = Check; break;
                            case 'effectTime': label = '효과발현'; icon = Sparkles; break;
                            case 'swelling': label = '붓기'; icon = Droplets; break;
                            case 'pain': label = '통증'; icon = AlertCircle; break;
                            case 'persistance': label = '지속기간'; icon = Clock; break;
                            case 'note': label = '특이사항'; icon = AlertCircle; break;
                            default: label = key; icon = Clock;
                          }
                          return (
                            <div key={key} className="text-center">
                              <div className="w-12 h-12 bg-gradient-to-br from-teal-smoke-100 to-elegant-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                {React.createElement(icon, { className: 'w-6 h-6 text-teal-smoke-600' })}
                              </div>
                              <p className="text-sm font-elegant-sans font-bold text-slate-800 mb-1">{label}</p>
                              <p className="text-sm text-slate-600 font-elegant-sans">{value}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 시술 부위 섹션 */}
                  {activeProcedure.treatmentAreas && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 lg:p-8">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-800 mb-4 sm:mb-6 text-center">시술 부위</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                        {activeProcedure.treatmentAreas.map((area, i) => (
                          <div key={i} className="bg-white/80 rounded-lg p-2 sm:p-3 lg:p-4 text-center">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                              <span className="text-white font-bold text-[10px] sm:text-xs lg:text-sm">{String(i + 1).padStart(2, '0')}</span>
                            </div>
                            <p className="text-xs sm:text-sm lg:text-base font-elegant-sans font-medium text-slate-800">{area}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 장점 섹션 */}
                  {activeProcedure.advantages && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-display font-bold text-slate-800 text-center">장점</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {activeProcedure.advantages.map((advantage, i) => (
                          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-teal-smoke-200/30">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">{advantage.number}</span>
                              </div>
                              <div>
                                <h4 className="text-lg font-display font-bold text-slate-800 mb-3">{advantage.title}</h4>
                                <p className="text-base text-slate-700 font-elegant-sans leading-relaxed">{advantage.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 시술 과정 섹션 */}
                  {activeProcedure.treatmentProcess && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-6 text-center">시술 과정</h3>
                      <div className="space-y-4">
                        {activeProcedure.treatmentProcess.map((process, i) => (
                          <div key={i} className="bg-white/80 rounded-lg p-6">
                            <div className="flex items-start space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">{process.step}</span>
                              </div>
                              <div>
                                <h4 className="text-lg font-display font-bold text-slate-800 mb-2">{process.title}</h4>
                                <p className="text-base text-slate-700 font-elegant-sans leading-relaxed">{process.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 시술 효과 섹션 */}
                  {activeProcedure.treatmentEffects && Array.isArray(activeProcedure.treatmentEffects) && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
                      <h3 className="text-2xl font-display font-bold text-slate-800 mb-6 text-center">시술 효과</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {activeProcedure.treatmentEffects.map((effect, i) => (
                          <div key={i} className="bg-white/80 rounded-lg p-4 text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-base font-elegant-sans font-medium text-slate-800">{effect}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Q&A 섹션 */}
                  {activeProcedure.qna && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-display font-bold text-slate-800 text-center">자주 묻는 질문</h3>
                      <div className="space-y-4">
                        {activeProcedure.qna.map((qa, i) => (
                          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-teal-smoke-200/30">
                            <div className="flex items-start space-x-4 mb-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-teal-smoke-400 to-elegant-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">Q</span>
                              </div>
                              <h4 className="text-lg font-display font-bold text-slate-800 leading-tight">{qa.question}</h4>
                            </div>
                            <div className="flex items-start space-x-4 pl-12">
                              <p className="text-base text-slate-700 font-elegant-sans leading-relaxed">{qa.answer}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 주의사항 섹션 */}
                  {activeProcedure.precautions && (
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8">
                      <div className="flex items-center mb-6 justify-center">
                        <AlertCircle className="w-6 h-6 text-orange-600 mr-3" />
                        <h3 className="text-2xl font-display font-bold text-slate-800">주의사항</h3>
                      </div>
                      <div className="space-y-3">
                        {activeProcedure.precautions.map((precaution, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <span className="text-orange-600 mt-1 flex-shrink-0">•</span>
                            <p className="text-base text-slate-700 font-elegant-sans leading-relaxed">
                              {precaution}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 장바구니 버튼 */}
                  <div className="text-center">
                    <button
                      onClick={() => handleToggleCart(activeProcedure)}
                      className={`py-4 px-8 rounded-xl font-elegant-sans font-bold text-base transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto ${
                        isInCart(activeProcedure.id)
                          ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-800 hover:from-green-300 hover:to-green-400 border-2 border-green-400'
                          : 'bg-gradient-to-r from-teal-smoke-400 to-elegant-400 text-white hover:from-teal-smoke-500 hover:to-elegant-500 border-2 border-transparent'
                      }`}
                    >
                      {isInCart(activeProcedure.id) ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>상담 리스트에 담김</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          <span>상담 신청하기</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 표준화된 상담 섹션 */}
      <StandardConsultationSection
        title="피부 리프팅 상담 신청"
        description="나에게 가장 적합한 피부 리프팅을 찾아보세요"
        initialProcedureId="skin-lifting"
      />
    </PageLayout>
  );
}
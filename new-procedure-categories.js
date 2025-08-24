// 새로운 15개 카테고리 기반 시술 데이터 구조 - 완전 버전
const procedureCategories = [
  {
    id: 'silos-signature',
    name: '실로스 시그니처',
    image: '/images/procedures/silos-signature/main.jpg',
    description: '실로스만의 대표 시술로 개인맞춤 아름다움을 완성합니다',
    isSignature: true,
    items: [
      { id: 'silos-lifting', name: '실로프팅(실리프팅)', description: '실로스 특허 실리프팅' },
      { id: 'silofat', name: '실로팻(지방추출주사)', description: '지방세포 직접 제거' },
      { id: 'under-eye-laser', name: '반달레이저(눈밑지방레이저)', description: '10분 완성 눈밑개선' },
      { id: 'neck-lifting', name: '넥리프팅(목리프팅)', description: '목라인 완성' }
    ]
  },
  {
    id: 'silos-lifting',
    name: '실로프팅',
    subtitle: '(SILOS 실리프팅)',
    image: '/images/procedures/silos-lifting/main.jpg',
    description: '시술 부위, 피부 처짐, 지방량, 골격, 니즈 등을 고려해 다양한 실을 복합적으로 활용',
    items: [
      { id: 'custom-thread', name: '커스텀 실로프팅', description: '개인맞춤 실리프팅' },
      { id: 'upper-face', name: '상안면부(이마)', description: '이마 부위 리프팅' },
      { id: 'mid-face', name: '중안면부(팔자/애플존)', description: '중안면 리프팅' },
      { id: 'lower-face', name: '하안면부', description: '하안면 리프팅' },
      { id: 'eye-area', name: '눈밑/눈가/입가', description: '섬세 부위 리프팅' },
      { id: 'nose-lifting', name: '코프팅(코실리프팅)', description: '코 라인 개선' },
      { id: 'aftercare', name: '실로케어(애프터케어)', description: '시술 후 관리' }
    ]
  },
  {
    id: 'custom-lifting',
    name: '커스텀 리프팅',
    image: '/images/procedures/custom-lifting/main.jpg',
    description: 'FDA 승인 의료 장비를 통한 안전하고 효과적인 리프팅',
    items: [
      { id: 'ulthera', name: '울쎄라', description: 'HIFU 리프팅의 대표주자' },
      { id: 'density', name: '덴서티', description: '볼륨 리프팅' },
      { id: 'oltight', name: '올타이트', description: '탄력 개선 리프팅' },
      { id: 'onda', name: '온다', description: '마이크로파 리프팅' },
      { id: 'virtue-rf', name: '버츄RF', description: 'RF 리프팅' },
      { id: 'vro-advance', name: '브이로어드밴스', description: 'V라인 전용 리프팅' },
      { id: 'shrink-universe', name: '슈링크유니버스', description: '한국형 HIFU' },
      { id: 'encore3d', name: '엔코어3D', description: '고강도 집속 초음파' },
      { id: 'revive', name: '리바이브', description: '재생 리프팅' }
    ]
  },
  {
    id: 'face-lifting',
    name: '안면리프팅',
    image: '/images/procedures/face-lifting/main.jpg',
    description: '얼굴 전체를 젊게 만드는 종합적인 리프팅',
    items: [
      { id: 'smas-lift', name: 'SMAS안면거상', description: '깊은층 안면거상술' },
      { id: 'smas-neck-lift', name: 'SMAS안면거상+목거상', description: '안면+목 복합거상술' }
    ]
  },
  {
    id: 'mini-lifting',
    name: '미니리프팅',
    image: '/images/procedures/mini-lifting/main.jpg',
    description: '최소 절개로 자연스러운 리프팅 효과',
    items: [
      { id: 'siloquick-mini', name: '실로퀵미니거상', description: '빠른 미니 거상술' },
      { id: 'mini-lift', name: '미니거상', description: '자연스러운 미니 리프팅' }
    ]
  },
  {
    id: 'forehead-lifting',
    name: '이마리프팅',
    image: '/images/procedures/forehead-lifting/main.jpg',
    description: '내시경을 통한 최소 절개 이마 리프팅',
    items: [
      { id: 'endoscopic-forehead', name: '내시경 이마거상', description: '최소 절개 내시경 수술' }
    ]
  },
  {
    id: 'droopy-eye-lifting',
    name: '처진눈리프팅',
    image: '/images/procedures/droopy-eye-lifting/main.jpg',
    description: '상안검과 하안검을 통한 젊고 또렷한 눈매 완성',
    items: [
      { id: 'upper-lower-bleph', name: '상/하안검', description: '처진 눈꺼풀 개선' },
      { id: 'virtue-rf-eye', name: '버츄RF(눈꺼풀리프팅)', description: 'RF 눈꺼풀 리프팅' }
    ]
  },
  {
    id: 'neck-lifting',
    name: '넥(Neck)리프팅',
    image: '/images/procedures/neck-lifting/main.jpg',
    description: '목주름과 이중턱을 동시에 개선',
    items: [
      { id: 'custom-neck', name: '커스텀 넥리프팅', description: '맞춤형 목 리프팅' },
      { id: 'neck-wrinkles', name: '목주름(가로밴드/세로주름)', description: '목주름 집중 개선' }
    ]
  },
  {
    id: 'petit-lifting',
    name: '쁘띠리프팅',
    image: '/images/procedures/petit-lifting/main.jpg',
    description: '얼굴의 특별한 부위까지 세심하게 개인의 매력을 극대화',
    items: [
      { id: 'advanced-filler', name: '고난도필러', description: '고난도 필러 시술' },
      { id: 'special-area-filler', name: '특수부위필러', description: '특수 부위 필러' },
      { id: 'botox', name: '보톡스', description: '주름 개선 보톡스' },
      { id: 'melting-injection', name: '멜팅주사/슬림멜팅주사', description: '지방 분해 주사' },
      { id: 'violet', name: '브이올렛', description: '브이올렛 시술' }
    ]
  },
  {
    id: 'skin-lifting',
    name: '스킨리프팅',
    image: '/images/procedures/skin-lifting/main.jpg',
    description: '근본부터 다른 피부 개선으로 건강하고 젊은 피부 완성',
    items: [
      { id: 'skin-botox', name: '스킨보톡스', description: '피부 전용 보톡스' },
      { id: 'skin-booster', name: '물광주사', description: '즉각적인 수분 공급' },
      { id: 'rejuran', name: '리쥬란힐러(힐러/HB/아이)', description: '연어 DNA 피부 재생' },
      { id: 'juvelook', name: '쥬베룩(스킨/볼륨)', description: 'PDLLA 성분 리프팅' },
      { id: 'olydia', name: '올리디아마요/올리디아아365', description: '히알루론산과 아미노산 조합' },
      { id: 'sculptra', name: '스컬트라', description: '콜라겐 재생 시술' },
      { id: 'radius', name: '레디어스', description: 'CaHA 성분 볼륨업' },
      { id: 'collagen-fill', name: '콜라채움', description: '콜라겐 생성 촉진' }
    ]
  },
  {
    id: 'body-lifting',
    name: '복부리프팅',
    image: '/images/procedures/body-lifting/main.jpg',
    description: '복부와 체형 개선을 위한 전문 시술',
    items: [
      { id: 'abdomen-plastic', name: '복벽성형(처진뱃살)', description: '처진 복부 성형술' },
      { id: 'silocut', name: '실로컷주사(지방분해주사)', description: '지방 분해 주사' },
      { id: 'body-onda', name: '바디온다', description: '바디 전용 온다' }
    ]
  },
  {
    id: 'homme-lifting',
    name: '옴므리프팅',
    image: '/images/procedures/homme-lifting/main.jpg',
    description: '남성 전용 맞춤 케어 시술',
    items: [
      { id: 'homme-skin-care', name: '옴므피부케어', description: '남성 피부 관리' },
      { id: 'homme-lifting-care', name: '옴므리프팅케어', description: '남성 리프팅 케어' },
      { id: 'homme-premium', name: '옴므프리미엄풀케어', description: '남성 프리미엄 케어' }
    ]
  },
  {
    id: 'skin-all-in-one',
    name: '피부올인원',
    image: '/images/procedures/skin-all/main.jpg',
    description: '다양한 피부 고민을 한 번에 해결',
    items: [
      { id: 'pigmentation', name: '색소(기미/흑자/점)', description: '색소 질환 개선' },
      { id: 'pores-scars', name: '모공/흉터', description: '모공과 흉터 개선' },
      { id: 'skin-lesions', name: '비립종/쥐젖/편평사마귀', description: '피부 병변 제거' },
      { id: 'personal-care', name: '퍼스널스킨케어', description: '개인 맞춤 케어' }
    ]
  },
  {
    id: 'hyperhidrosis-cyst',
    name: '액취증 피지낭종',
    image: '/images/procedures/treatment/main.jpg',
    description: '액취증과 피지낭종 전문 치료',
    items: [
      { id: 'hyperhidrosis', name: '액취증', description: '액취증 치료' },
      { id: 'sebaceous-cyst', name: '피지낭종', description: '피지낭종 제거' }
    ]
  },
  {
    id: 'stem-cell',
    name: '줄기세포',
    image: '/images/procedures/stem-cell/main.jpg',
    description: '줄기세포를 이용한 재생 치료',
    items: [
      { id: 'stem-cell-consult', name: '줄기세포 상담문의', description: '줄기세포 치료 상담' }
    ]
  }
];
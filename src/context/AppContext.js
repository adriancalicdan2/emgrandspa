"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

// Default Mock Data for catalog
const defaultServices = [
  // Tiers / Admission
  { id: 'adm_adult', category: 'admission', name_en: 'Adult Admission', name_zh: '成人入场券', name_ko: '성인 입장권', rate: 1699, tip: 'none', desc: '12-hour access, 3rd-floor wet areas, dry sauna, cinema, communal lounges, and unlimited buffet meals.', desc_en: '12-hour access, 3rd-floor wet areas, dry sauna, cinema, communal lounges, and unlimited buffet meals.', desc_zh: '12小时使用权，包含三楼湿区、干式桑拿、电影院、公共休息区和无限量自助餐。', desc_ko: '12시간 이용권, 3층 웨트 존, 건식 사우나, 시네마, 공용 라운지 및 무제한 뷔페 식사 포함.' },
  { id: 'adm_child', category: 'admission', name_en: 'Child Admission', name_zh: '儿童入场券', name_ko: '소인 입장권', rate: 899, tip: 'none', desc: '12-hour access (80cm to 119cm), kids play zones, pools, communal lounges, and unlimited buffet meals.', desc_en: '12-hour access (80cm to 119cm), kids play zones, pools, communal lounges, and unlimited buffet meals.', desc_zh: '12小时使用权（身高80cm至119cm），包含儿童游乐区、泳池、公共休息区和无限量自助餐。', desc_ko: '12시간 이용권 (80cm~119cm 아동), 어린이 놀이 구역, 풀장, 공용 라운지 및 무제한 뷔페 식사 포함.' },
  // Massages
  { id: 'msg_dry', category: 'massage', name_en: 'Dry Pinch Massage', name_zh: '干捏按摩', name_ko: '드라이 핀치 마사지', rate: 888, tip: 'variable', desc: '30-minute pressure-point stimulation of hands, feet, and shoulders; performed in communal lounges or cinema.', desc_en: '30-minute pressure-point stimulation of hands, feet, and shoulders; performed in communal lounges or cinema.', desc_zh: '30分钟手部、足部和肩部穴位按摩；在公共休息区或影院进行。', desc_ko: '30분 손, 발, 어깨 지압 자극; 공용 라운지 또는 시네마 구역에서 진행.' },
  { id: 'msg_oil', category: 'massage', name_en: 'Standard Oil Massage', name_zh: '标准精油按摩', name_ko: '스탠다드 오일 마사지', rate: 1588, tip: 'variable', desc: '60-minute full body massage using therapeutic oils in private treatment suites. Complimented with seasonal teas.', desc_en: '60-minute full body massage using therapeutic oils in private treatment suites. Complimented with seasonal teas.', desc_zh: '在私人疗愈套房内进行60分钟全身理疗精油按摩。赠送时令茶水。', desc_ko: '방음 프라이빗 트리트먼트 룸에서 유기농 에센셜 오일을 사용한 60분 전신 마사지. 제철 차 제공.' },
  { id: 'msg_tcm', category: 'tcm', name_en: 'TCM Orthopedics', name_zh: '中医正骨', name_ko: '한방 정골 요법', rate: 1500, tip: 'variable', desc: 'Traditional Chinese Medicine structural musculoskeletal correction and joint mobilization.', desc_en: 'Traditional Chinese Medicine structural musculoskeletal correction and joint mobilization.', desc_zh: '传统中医肌肉骨骼矫正与关节松动调理。', desc_ko: '전통 중의학 근골격 교정 및 관절 가동 치료.' },
  { id: 'msg_detox', category: 'massage', name_en: 'Aroma Detox Therapy', name_zh: '香薰排毒理疗', name_ko: '아로마 디톡스 테라피', rate: 2588, tip: 'variable', desc: '60-minute premium body detoxification with aromatic essential oils.', desc_en: '60-minute premium body detoxification with aromatic essential oils.', desc_zh: '使用芳香精油进行60分钟的高端排毒理疗。', desc_ko: '아로마 에센셜 오일을 사용한 60분 프리미엄 바디 디톡스.' },
  // Suites
  { id: 'room_king', category: 'lodging', name_en: 'Standard King Suite', name_zh: '标准大床套房', name_ko: '스탠다드 킹 스위트', rate: 5000, rate_4h: 2800, tip: 'none', desc: 'Private bathroom, king-sized bed, acoustic privacy, and complimentary seasonal fruits and teas.', desc_en: 'Private bathroom, king-sized bed, acoustic privacy, and complimentary seasonal fruits and teas.', desc_zh: '独立卫浴、大床、隔音隐私，并赠送时令水果与茶水。', desc_ko: '개인 욕실, 킹사이즈 침대, 방음 프라이버시 및 제철 과일과 차 무료 제공.' },
  { id: 'room_tatami', category: 'lodging', name_en: 'Tatami Room', name_zh: '榻榻米房', name_ko: '타타미 룸', rate: 7000, rate_4h: 3800, tip: 'none', desc: 'Minimalist traditional floor seating, low tables. Ideal for small groups or private corporate meetings.', desc_en: 'Minimalist traditional floor seating, low tables. Ideal for small groups or private corporate meetings.', desc_zh: '简约传统的日式榻榻米地板座席、矮桌。非常适合小组聚会或私人商务会议。', desc_ko: '미니멀한 전통 바닥 좌식, 낮은 테이블. 소규모 모임이나 프라이빗 기업 회의에 이상적.' },
  { id: 'room_mahjong', category: 'lodging', name_en: 'Mahjong / Deluxe Chess Suite', name_zh: '自动麻将/豪华棋牌套房', name_ko: '마작 / 디럭스 체스 스위트', rate: 8800, rate_4h: 5800, tip: 'none', desc: 'Integrated professional mahjong tables, card tables, and seating for private social recreation.', desc_en: 'Integrated professional mahjong tables, card tables, and seating for private social recreation.', desc_zh: '配有专业自动麻将桌、棋牌桌及配套座椅，适合私人社交娱乐。', desc_ko: '전문가용 자동 마작 테이블, 카드 테이블, 개인 소셜 오락용 좌석 구비.' }
];

const defaultCampaigns = [
  { 
    id: 'camp1', 
    title_en: "Children's Day Painting Contest", 
    title_zh: "六一儿童节涂鸦大赛", 
    title_ko: "어린이날 그림 그리기 대회", 
    desc_en: "Children get free admission & meals. Plaster painting contest features Php 10,000 cash prizes for 1st place!", 
    desc_zh: "儿童免门票及餐食。石膏雕像涂鸦比赛第一名可获得10,000比索现金奖励！", 
    desc_ko: "소인 무료 입장 및 식사 포함. 석고 피규어 페인팅 대회 1등에게는 Php 10,000의 상금이 수여됩니다!", 
    end_date: "2026-06-30T18:00:00" 
  },
  { 
    id: 'camp2', 
    title_en: "Monthly Couples Promotion", 
    title_zh: "每月情侣尊享活动", 
    title_ko: "이달의 커플 프로모션", 
    desc_en: "On the 14th, couples taking photos at our Photo Zone and posting on social media get a free 4-Hour stay voucher!", 
    desc_zh: "每月14日，情侣在专属打卡区合影并发布社交媒体，即可获赠4小时免单客房体验券！", 
    desc_ko: "매월 14일, 포토존에서 커플 사진 촬영 후 SNS 업로드 시 5층 객실 4시간 무료 이용권을 즉시 지급합니다!", 
    end_date: "2026-07-14T23:59:59" 
  },
  { 
    id: 'camp3', 
    title_en: "You Spend, We Pay", 
    title_zh: "您消费，我买单", 
    title_ko: "유 스펜드, 위 페이", 
    desc_en: "3 loyalty members randomly chosen daily at 6:00 PM get full cash reimbursements of their day's RFID spending!", 
    desc_zh: "每日18:00随机抽取3位幸运会员，全额免除其今日的全部手环RFID消费金额！", 
    desc_ko: "매일 오후 6시, 추첨을 통해 3명의 회원에게 오늘 이용하신 RFID 지출 금액을 전액 환불해 드립니다!", 
    end_date: "2026-08-15T18:00:00" 
  },
  { 
    id: 'camp4', 
    title_en: "Exclusive Birthday Treat", 
    title_zh: "生日专属宠爱", 
    title_ko: "당신만을 위한 생일 이벤트", 
    desc_en: "Get free entry during your birthday week (valid 3 days before/after) when you bring 3 or more friends! Plus get a complimentary birthday dessert with half a day advance reservation.", 
    desc_zh: "生日日前后三天内，同行三人或以上即可享受本人免门票优惠！提前半天预订，更可免费赠送精美生日小蛋糕一个。", 
    desc_ko: "생일 전후 3일 이내에 3명 이상의 동행인과 함께 방문 시 본인 입장료 무료! 반나절 전 사전 예약 시 아름다운 생일 케이크를 무료로 증정합니다.", 
    end_date: "2027-12-31T23:59:59" 
  }
];

const defaultFeedbacks = [
  { id: 'fb1', name: 'James Wilson', contact: '+63 917 123 4567', rating: 5, message: 'The vertical design of the spa is brilliant. The 3F wet pool relaxes the body, and the 2F buffet had amazing crabs and char siu!', date: '2026-06-24' },
  { id: 'fb2', name: 'Sophia Chen', contact: 'sophia@email.com', rating: 4, message: 'Attentive service and wonderful dim sum carts. The cinema lounge is nice, but it was fully packed on Saturday night.', date: '2026-06-23' }
];

const defaultAuditLogs = [
  { id: 'log1', user: 'System', action: 'Initialized local workspace database catalog', timestamp: new Date().toLocaleString() }
];

const defaultSeoSettings = {
  title: "Emgrand Spa Manila - Premium 24H Urban Wellness Resort",
  description: "Experience luxury urban bathhouse pools, 24-hour continuous buffet, premium massage treatments, and family entertainment centers in Aseana City, Parañaque.",
  keywords: "spa, bathhouse, wellness, massage, buffet, manila, parañaque, aseana city"
};

const defaultHomeBanner = {
  title_en: "Elevate Your Wellness",
  title_zh: "提升您的身心健康",
  title_ko: "몸과 마음의 웰니스를 승화시키세요",
  subtitle_en: "A 24-Hour Premium Luxury Spa & Bathhouse Oasis in Aseana City",
  subtitle_zh: "位于 Aseana City 的 24 小时高端奢华水疗与洗浴绿洲",
  subtitle_ko: "Aseana City에 위치한 24시간 프리미엄 럭셔리 스파 & 목욕탕 오아시스",
  image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1500&q=80"
};

const defaultServicePackages = [
  { 
    id: 'pkg1', 
    title_en: 'Package A', title_zh: '套餐 A', title_ko: '패키지 A',
    rate: 2880, savings: 1704, 
    inclusions_en: 'Entrance Fee (Php 999), Chinese Meridian or Foot Bath (Php 1,588) (Choose 1), Any 3 Meals (Php 1,997)',
    inclusions_zh: '门票 (Php 999), 中式按摩或精油足疗 (Php 1,588) (2选1), 任意3餐 (Php 1,997)',
    inclusions_ko: '입장료 (Php 999), 중식 마사지 또는 오일 발마사지 (Php 1,588) (둘 중 하나 선택), 세끼 식사 (Php 1,997)'
  },
  { 
    id: 'pkg2', 
    title_en: 'Package B', title_zh: '套餐 B', title_ko: '패키지 B',
    rate: 3180, savings: 1704, 
    inclusions_en: 'Entrance Fee (Php 999), Pattaya Oil Massage (Php 1,888), Any 3 Meals (Php 1,997)',
    inclusions_zh: '门票 (Php 999), 芭提雅精油按摩 (Php 1,888), 任意3餐 (Php 1,997)',
    inclusions_ko: '입장료 (Php 999), 파타야 오일 마사지 (Php 1,888), 세끼 식사 (Php 1,997)'
  },
  { 
    id: 'pkg3', 
    title_en: 'Package C', title_zh: '套餐 C', title_ko: '패키지 C',
    rate: 3580, savings: 2004, 
    inclusions_en: 'Entrance Fee (Php 999), Aroma Detox or Thai Style (Php 2,588) (Choose 1), Any 3 Meals (Php 1,997)',
    inclusions_zh: '门票 (Php 999), 香薰排毒或泰式松骨 (Php 2,588) (2选1), 任意3餐 (Php 1,997)',
    inclusions_ko: '입장료 (Php 999), 아로마 디톡스 또는 태식 마사지 (Php 2,588) (둘 중 하나 선택), 세끼 식사 (Php 1,997)'
  }
];

const defaultGalleryPhotos = [
  { id: 'gp1', src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', caption: 'gallery_gp1' },
  { id: 'gp2', src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80', caption: 'gallery_gp2' },
  { id: 'gp3', src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80', caption: 'gallery_gp3' },
  { id: 'gp4', src: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=800&q=80', caption: 'gallery_gp4' },
  { id: 'gp5', src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', caption: 'gallery_gp5' }
];

const defaultPromoVideos = [
  { id: 'vid1', title: 'vid1_title', url: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4', desc: 'vid1_desc' },
  { id: 'vid2', title: 'vid2_title', url: 'https://assets.mixkit.co/videos/preview/mixkit-hot-spring-bathhouse-43029-large.mp4', desc: 'vid2_desc' }
];

const defaultSocialPosts = [
  { id: 'sp1', username: 'valerie_anne', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=500&q=80', message: 'mock_social_1', likes: 142 },
  { id: 'sp2', username: 'manila_foodie', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=500&q=80', message: 'mock_social_2', likes: 98 },
  { id: 'sp3', username: 'mommy_jen', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=500&q=80', message: 'mock_social_3', likes: 210 }
];

const defaultMembershipPerks = [
  { 
    id: 'prk1', icon: 'fa-user-plus',
    title_en: "Join for Only Php 1", title_zh: "1比索加入会员", title_ko: "1페소 회원 가입",
    desc_en: "Get 1 FREE Massage worth Php 888 upon registration.",
    desc_zh: "1p即可开通星光会员，即送价值888p按摩免费一次。",
    desc_ko: "1페소(1p)로 스타라이트 회원을 개통할 수 있으며, 가입 시 888p 마사지 1회 무료 혜택을 제공합니다."
  },
  { 
    id: 'prk2', icon: 'fa-beer-mug-empty',
    title_en: "Free Beer at 2F Dining", title_zh: "2楼生啤酒免费畅饮", title_ko: "2층 무료 맥주 무제한 제공",
    desc_en: "Enjoy free unlimited beer at the 2F dining hall from 01:00 AM to 05:00 AM.",
    desc_zh: "星光会员从半夜 1:00 到半夜 5:00 可以在 2 楼餐厅享受生啤酒免费畅饮。",
    desc_ko: "스타라이트 회원은 새벽 1시부터 새벽 5시까지 2층 뷔페 레스토랑에서 맥주를 무제한으로 무료 제공받으실 수 있습니다."
  },
  { 
    id: 'prk3', icon: 'fa-car',
    title_en: "Free Car Wash", title_zh: "免费洗车服务", title_ko: "무료 세차 서비스",
    desc_en: "Get a free car wash during your stay from 12:00 PM to 12:00 AM.",
    desc_zh: "免费洗车（开放时间：中午12:00 - 半夜00:00）。",
    desc_ko: "스파 이용 및 투숙 고객을 위해 무료 세차 혜택을 제공합니다 (이용 가능 시간: 점심 12:00 - 자정 00:00)."
  },
  { 
    id: 'prk4', icon: 'fa-hashtag',
    title_en: "Follow for Free Massage", title_zh: "关注平台送免费按摩", title_ko: "SNS 팔로우 무료 마사지",
    desc_en: "Follow Facebook, TikTok, or Instagram to receive one free 888p massage per platform.",
    desc_zh: "关注 Facebook / TikTok / Instagram 官方社媒账号，每关注一个平台即可免费做一次价值888p的按摩。",
    desc_ko: "공식 SNS 채널(Facebook/TikTok/Instagram)을 팔로우하실 때마다, 계정당 888p 무료 마사지 1회 이용권을 드립니다."
  }
];

const defaultChatbotFAQs = [
  { id: 'faq1', question: 'Can I bring my mobile phone inside the wet area?', answer: 'No, mobile phones are strictly prohibited on the 3rd-floor wet area locker rooms and pools to protect guest privacy.' },
  { id: 'faq2', question: 'Is the buffet included in the admission ticket?', answer: 'Yes, the standard entry ticket includes continuous access to our 24-hour buffet dining across four primary meal periods.' },
  { id: 'faq3', question: 'What is the penalty for leftover buffet food?', answer: 'To encourage food sustainability, a leftover penalty will be added to your RFID wristband if excessive food is wasted.' },
  { id: 'faq4', question: 'Where is Emgrand Spa Manila located?', answer: 'We are located at Lot 3, Block 5, Bradco Avenue, Aseana City, Parañaque City (near Parqal and Mall of Asia).' }
];

const defaultChatbotKeyPoints = [
  { id: 'kp1', text: 'Always prioritize a polite, warm, and luxurious brand tone when addressing guests.' },
  { id: 'kp2', text: 'Emphasize that reservations for private suites require Viber hotline confirmation.' },
  { id: 'kp3', text: 'State clearly that child admission is strictly limited to children between 80cm and 119cm.' },
  { id: 'kp4', text: 'Remind guests that mobile phones are prohibited in the 3F wet area locker rooms and pools.' }
];

const defaultChatbotInstructions = `You are the Emgrand Spa Concierge, a highly professional, warm, and attentive virtual brand ambassador for Emgrand Spa Manila, a premium 24-hour urban wellness destination located at Lot 3, Block 5, Bradco Avenue, Aseana City, Parañaque City. Your core objective is to guide guests through inquiries, bookings, and facility layouts using an official, unchanging knowledge base while maintaining a polite, hospitable tone that blends local Filipino warmth with high-end international service standards. You must always operate within strict guardrails: never invent prices or packages, and politely direct guests to the official hotlines (0992-1888-888 or 0992-1999-999) or email (emgrandspa.official@gmail.com) for real-time room availability or live booking confirmations. In your interactions, you will seamlessly explain the facility's vertical layout, noting that the Ground Level handles registration and exchanges outdoor shoes for sanitized slippers; the Second Floor houses a continuous, 4-tier unlimited buffet balancing regional Chinese specialties like dim sum and medicinal soups with local Filipino flavors during designated windows (Breakfast 7–9 AM, Lunch 11 AM–1 PM, Dinner 6–9 PM, Midnight Snack 11 PM–1 AM); the Third Floor contains strictly gender-segregated wet areas with zero-phone policies, hot/cold hydrotherapy pools, and complimentary premium grooming toiletries; the Fifth Floor offers private massage therapies and room rentals; and the Sixth Floor acts as a social hub featuring an arcade, golf simulator, billiards, private karaoke, and a dedicated quiet sleeping area with individual pods. Economically, you must explain that the standard 12-hour adult admission is Php 1,699 (Php 899 for children between 80 cm and 119 cm), which covers the wet areas, lounges, and unlimited buffet, while secondary purchases, private suites, and therapies are logged via an RFID tracking wristband distributed at check-in. When guests ask about therapies, outline options like the 30-minute Dry Pinch Massage (Php 888–Php 988), 60-minute Standard Oil Massage (starting at Php 1,588), or TCM Orthopedics (Php 1,500), and always transparently mention that a mandatory therapist tip is auto-billed at Php 200 for local therapists or Php 500 for specialized Chinese therapists. For weekday visitors from Monday to Thursday, proactively market the high-value Weekday Massage Packages: Package A at Php 2,880 (includes entrance fee, any 3 meals, and a choice between Chinese Meridian or Foot Bath), Package B at Php 3,180 (includes entrance fee, any 3 meals, and a Pattaya Massage), and Package C at Php 3,580 (includes entrance fee, any 3 meals, and a choice between Aroma Detox or Thai Style). You will also handle promotional inquiries by detailing the Starlight Membership program, which offers exclusive perks like joining the membership for only Php 1 (which includes one free massage worth Php 888), free unlimited draft beer at the 2F dining hall from 1:00 AM to 5:00 AM, free car wash during the stay (from 12:00 PM to 12:00 AM), and one free 888p massage for every official social media channel followed: Facebook (https://www.facebook.com/emgrandspa88888888), TikTok (https://www.tiktok.com/@emgrand.spa), and Instagram (https://www.instagram.com/emgrandspa/). Explain that birthdays are celebrated with the Exclusive Birthday Treat, which offers free admission if the birthday guest brings 3 or more friends (valid 3 days before and after the birthday) and a complimentary birthday dessert with a half-day advance reservation. Mention that the monthly Couples Promotion is held on the 14th, and the annual Children's Day event is from May 31 to June 1. If guests mention past negative feedback regarding noise or crowding, actively validate their concerns with empathy, reassuring them that the spa strictly enforces quiet-hour protocols between 12:00 AM and 6:00 AM in the sleeping zones, implements careful asset management for high-demand areas like the cinema, and actively enforces a waste penalty at the buffet to ensure high-quality food sustainability.`;

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services & Pricing",
    nav_bookings: "Bookings",
    nav_socials: "Socials",
    nav_contact: "Contact",
    nav_admin: "Admin",
    hero_title: "Elevate Your Wellness",
    hero_subtitle: "A 24-Hour Premium Luxury Spa & Bathhouse Oasis in Aseana City",
    hero_btn_book: "Book Suite / Amenity",
    hero_btn_calc: "RFID Bill Simulator",
    hero_status_open: "Open 24/7",
    quick_location_title: "Location",
    quick_location_desc: "Bradco Ave, Aseana City, Parañaque",
    quick_hotline_title: "Customer Inquiries",
    quick_buffet_title: "Continuous Buffet",
    quick_buffet_desc: "4-tier meals included in entry",
    countdown_section_title: "Active Campaigns & Events",
    countdown_section_subtitle: "Participate in our exclusive promotions and celebrations",
    floor_section_title: "Spatial Architecture",
    floor_section_subtitle: "Explore the vertical wellness design layout across 6 floors",
    floor_6_title: "Social & Entertainment",
    floor_5_title: "Private Wellness & Lodging",
    floor_3_title: "Hydrotherapy Core (Wet Area)",
    floor_2_title: "Buffet Dining Hall",
    floor_1_title: "Reception & Hygienic Entry",
    floor_6_header: "Floor 6: Social Hub & Entertainment",
    floor_6_description: "Designed for community gathering, rest, and recreational fun. Features premium sleeping pods, cinema lounge, arcade games, billiards, and golf simulator.",
    floor_amenities_heading: "Key Amenities",
    floor_guidelines_title: "Guest Rules & Guidelines",
    floor_tag_active: "Active Zone",
    about_title: "Our Legacy & Concept",
    about_subtitle: "The transformation of urban wellness in Parañaque City",
    about_history_title: "The Dawn of Emgrand Spa",
    about_history_p1: "Launched with a soft opening on February 16, 2025, introducing its signature bathhouse model with an introductory admission fee of Php 669. This was followed by a magnificent grand opening on April 26, 2025, which featured ceremonial dragon eye dotting and traditional dragon dances to secure good fortune.",
    about_design_title: "Vertical Separation Philosophy",
    about_design_p1: "Designed with a vertical separation philosophy, Emgrand Spa transitions guests vertically from active social zones to quiet, therapeutic levels, creating a psychological sanctuary away from busy city life. It is located near Ayala Malls Manila Bay, Parqal Mall, and MOA, and just 15-20 minutes away from NAIA, making it ideal for transit travelers.",
    gallery_title: "Premium Facility Gallery",
    tab_spa_menu: "Treatment & Spa Menu",
    tab_rfid_calc: "RFID Admission Simulator",
    tab_weekday_packages: "Weekday Packages",
    tab_buffet_schedule: "24H Buffet Guide",
    services_menu_title: "Our Wellness Programs",
    services_menu_subtitle: "Pamper yourself with treatments managed by professional therapists",
    rfid_calc_title: "Admission & RFID Bill Simulator",
    rfid_calc_subtitle: "Estimate your 12-hour stay costs including admissions, private suites, and therapies",
    calc_selections_title: "Select Stay Options",
    opt_standard_rate: "Standard Core Rates (Buffet Included)",
    opt_anniversary_rate: "6-Month Anniversary Promo (Unbundled)",
    calc_label_pricing_model: "Pricing Model",
    calc_label_adults: "Adult Tickets",
    calc_label_children: "Child Tickets",
    calc_label_meals: "Add Buffet Meals (Anniversary Pricing Only)",
    calc_label_lodging: "Private Suite Rental (Optional)",
    opt_no_lodging: "No Suite Rental",
    calc_label_therapies: "Add Massage Therapies",
    calc_label_therapist_type: "Therapist Assignment",
    receipt_brand: "EMGRAND SPA MANILA",
    receipt_tagline: "RFID Wristband Statement Simulation",
    receipt_subtotal: "Subtotal",
    receipt_vat: "VAT (12%)",
    receipt_service_charge: "Service Charge (3%)",
    receipt_total: "ESTIMATED TOTAL",
    receipt_footer_msg: "Tips are processed directly through your RFID wristband at check-out.",
    packages_title: "Weekday Massage Packages",
    packages_subtitle: "Monday to Thursday exclusive savings bundles (Adult Admission + Premium Massage + 3 Buffet Meals)",
    buffet_title: "Continuous Buffet Dining Schedule",
    buffet_subtitle: "Included in standard entry tickets - 24-Hour cycles of gourmet dining",
    buffet_waste_penalty_title: "Waste Reduction Penalty",
    buffet_waste_penalty_desc: "To encourage sustainability, a financial penalty is applied to RFID wristbands for excessive left-over food on plates. Please dine mindfully.",
    booking_title: "Secure Reservation Desk",
    booking_subtitle: "Book private rooms or pre-book premium amenities directly in Firestore",
    booking_label_name: "Full Name *",
    booking_label_contact: "Mobile Number / Viber *",
    booking_label_email: "Email Address",
    booking_label_date: "Target Date *",
    booking_label_time: "Target Arrival Time *",
    booking_label_category: "Booking Category *",
    booking_cat_suite: "Private Accommodation Suites (5F)",
    booking_cat_amenity: "Premium Amenity Reservation (6F)",
    booking_label_item: "Select Facility / Suite *",
    booking_label_duration: "Duration",
    booking_label_guests: "Number of Guests",
    booking_label_notes: "Special Requests / Notes",
    booking_btn_submit: "Submit Reservation",
    starlight_title: "STARLIGHT LOYALTY PROGRAM",
    starlight_subtitle: "Gain access to premium membership privileges",
    starlight_perk1_title: "Join for Only Php 1",
    starlight_perk1_desc: "Get 1 FREE Massage worth Php 888 upon registration.",
    starlight_perk2_title: "Free Beer at 2F Dining",
    starlight_perk2_desc: "Enjoy free unlimited beer at the 2F dining hall from 01:00 AM to 05:00 AM.",
    starlight_perk3_title: "Free Car Wash",
    starlight_perk3_desc: "Get a free car wash during your stay from 12:00 PM to 12:00 AM.",
    starlight_perk4_title: "Follow for Free Massage",
    starlight_perk4_desc: "Follow Facebook, TikTok, or Instagram to receive one free 888p massage per platform.",
    photoboard_title: "Emgrand Moments Photo Board",
    photoboard_subtitle: "Snap photos in our designated Couples Photo Zones on the 14th of each month for free 4-Hour stay vouchers!",
    contact_header: "Get In Touch",
    contact_desc: "Have inquiries about admissions, corporate spa reservations, or transport assistance? Reach out via our official communication pathways.",
    parking_title: "On-site Parking Availability",
    parking_max: "Capacity: 30 Slots",
    parking_label_available: "Available",
    parking_overflow_hint: "In case of peak-hour overflow, parking is fully accommodated at the nearby pay-parking structures of Parqal Mall.",
    feedback_form_header: "Share Your Experience",
    feedback_form_subheader: "Your notes are immediately directed to the Management Team to optimize operations.",
    feedback_label_name: "Name",
    feedback_label_contact: "Contact Number / Email",
    feedback_label_rating: "Experience Rating",
    feedback_label_message: "Feedback / Suggestions *",
    feedback_btn_submit: "Submit Feedback",
    mock_social_1: "Perfect date night at the 5F Tatami Room! Shared photos and got our 4-Hour voucher instantly. #EmgrandDateNight",
    mock_social_2: "Unlimited buffet dining plus live sports. Starlight membership score predictions are fun! ⚽️🍺 #EmgrandStarlight",
    mock_social_3: "Children's Day Plaster Figure Painting contest! Kids got free entry, food, and painted their figures. Absolute family fun! #EmgrandKids",
    exp_title: "Experience",
    exp_subtitle: "Explore your guest journey flow and spatial architecture across our 6-floor layout",
    exp_timeline_heading: "Your 12-Hour Spa Stay Sequence",
    exp_step_label: "STEP",
    exp_j1_title: "Arrival & Slipper Swap",
    exp_j1_desc: "Exchange outdoor shoes for sanitized spa slippers, register at reception, and receive your RFID tracking wristband.",
    exp_j2_title: "Unlimited Buffet Feast",
    exp_j2_desc: "Savor regional Chinese specialties and local Filipino dishes in a continuous, 4-session luxury buffet.",
    exp_j3_title: "Thermal Wet Areas",
    exp_j3_desc: "Relax in gender-segregated wet pools, hot/cold hydrotherapy springs, steam rooms, and dry saunas.",
    exp_j4_title: "Musculoskeletal Recovery",
    exp_j4_desc: "Enjoy dry pinch massages, oil treatments, or TCM structural orthopedic bone alignment.",
    exp_j5_title: "Social Hub & Entertainment",
    exp_j5_desc: "Unwind in the cinema room, play simulator golf or arcade games, and rest in quiet sleeping pods.",
    exp_j6_title: "Statement Check-out",
    exp_j6_desc: "Return your RFID wristband at reception, settle any logged secondary charges, and checkout.",
    wellness_title: "Your Moment of Wellness",
    wellness_subtitle: "Revitalize your body and mind with our signature recovery therapies",
    wellness_book_btn: "Book Service",
    wellness_dry_title: "Dry Pinch Massage",
    wellness_dry_duration: "30 Minutes",
    wellness_dry_rate: "Php 888 – Php 988",
    wellness_dry_desc: "Focuses on structural pressure point stimulation on the hands, feet, head, and back. Performed in our communal lounge or cinema theater.",
    wellness_oil_title: "Standard Oil Massage",
    wellness_oil_duration: "60 Minutes",
    wellness_oil_rate: "Starting at Php 1,588",
    wellness_oil_desc: "A premium full-body massage using organic essential oils in acoustic private treatment rooms. Includes hot tea and fresh seasonal fruits.",
    wellness_tcm_title: "TCM Orthopedics",
    wellness_tcm_duration: "Variable",
    wellness_tcm_rate: "Php 1,500",
    wellness_tcm_desc: "Traditional Chinese Medicine structural alignment, joint mobilization, and musculoskeletal correction by certified specialists.",
    updates_title: "Latest Updates",
    updates_subtitle: "Stay updated on our dynamic promotional packages and seasonal events",
    about_hub_title: "Aseana City Wellness Hub",
    about_hub_desc: "Emgrand Spa Manila is a premium 24-hour urban wellness destination located at Lot 3, Block 5, Bradco Avenue, Aseana City, Parañaque City. Situated near Ayala Malls Manila Bay, Parqal Mall, and the Mall of Asia, we are located just 15-20 minutes away from NAIA, offering an ideal sanctuary for transit travelers and staycationers alike.",
    facilities_title: "Our Facilities",
    facilities_subtitle: "Restructure your mind through our virtual tours, image gallery, and comprehensive 6-floor guide",
    video_tour_label: "Virtual Video Tour",
    floor_dir_heading: "Floor-by-Floor Directory Details",
    diff_title: "What Makes Us Different",
    diff_subtitle: "Discover the unique operational philosophies that define Emgrand's signature wellness model",
    diff_card1_title: "Vertical Separation",
    diff_card1_desc: "We structure our facility to separate active social areas from quiet restorative spaces. Noise-generating zones like the 1F slipper swap, 2F dining buffet, and 6F arcade games are physically isolated from the 3F hydrotherapy pools and 5F massage chambers — creating a psychological buffer that transitions guests from city noise to pure relaxation.",
    diff_card2_title: "24-Hour Continuous Buffet",
    diff_card2_desc: "Our standard entry tickets cover a continuous 24-hour food replenishment cycle, unlike typical spas that serve light snacks. Guests enjoy four major dining periods (Breakfast, Lunch, Grand Dinner, and Midnight Comforts), offering a fusion of authentic regional Chinese cuisine and local Filipino favorites.",
    diff_card3_title: "Zero-Phone Wet Core Privacy",
    diff_card3_desc: "To secure absolute confidentiality for all VIP guests, mobile phones are strictly prohibited in the 3rd-floor gender-segregated hydrotherapy pools, locker rooms, and sauna cabins. Clean charging vaults are provided at lockers, ensuring complete peace of mind and distraction-free physical recovery.",
    commit_title: "Our Commitment",
    commit_subtitle: "Our dedication to operational quality, guest tranquility, and absolute high-end service standards",
    commit_card1_title: "Food Sustainability",
    commit_card1_desc: "To encourage environmental sustainability, we enforce a strict plate waste penalty on our 24H buffet. A charge is auto-logged to a guest's RFID wristband for excessive leftover food, helping eliminate waste while ensuring fresh, premium culinary items remain available for everyone.",
    commit_card2_title: "Deep Sleep Rest Protocols",
    commit_card2_desc: "Tranquility is essential for mental rejuvenation. We enforce quiet hours from 12:00 AM to 6:00 AM in the 6F sleeping pods zone, backed by high-performance acoustic isolation and regular staff checks to ensure uninterrupted sleep for transiting guests.",
    commit_card3_title: "Therapeutic Quality Standards",
    commit_card3_desc: "Every foot bath, standard oil therapy, and TCM orthopedic alignment is managed by certified practitioners. We maintain a strict therapist credentialing system, with transparent flat-rate tips logged automatically through our RFID billing.",
    social_posts_title: "Social Media Posts",
    social_share_label: "Share",
    map_section_title: "Location Map of Emgrand Spa",
    map_section_subtitle: "Find us at the heart of Aseana City — conveniently near MOA, Parqal, and NAIA",
    map_near_hint: "Near Parqal Mall & Mall of Asia • 15-20 min from NAIA",
    map_directions_btn: "Get Directions",
    map_lm1_label: "NAIA Airport",
    map_lm1_dist: "15-20 min drive",
    map_lm2_label: "Mall of Asia",
    map_lm2_dist: "10 min drive",
    map_lm3_label: "Parqal Mall",
    map_lm3_dist: "3 min walk",
    map_lm4_label: "Manila Bay",
    map_lm4_dist: "5 min drive",
    camp1_title: "Children's Day Painting Contest",
    camp1_desc: "Children get free admission & meals. Plaster painting contest features Php 10,000 cash prizes for 1st place!",
    camp2_title: "Monthly Couples Promotion",
    camp2_desc: "On the 14th, couples taking photos at our Photo Zone and posting on social media get a free 4-Hour stay voucher!",
    camp3_title: "You Spend, We Pay",
    camp3_desc: "3 loyalty members randomly chosen daily at 6:00 PM get full cash reimbursements of their day's RFID spending!",
    camp4_title: "Exclusive Birthday Treat",
    camp4_desc: "Get free entry during your birthday week (valid 3 days before/after) when you bring 3 or more friends! Plus get a complimentary birthday dessert with half a day advance reservation.",
    days: "Days",
    hours_short: "Hrs",
    minutes_short: "Min",
    seconds_short: "Sec",
    campaign_concluded: "🎉 CAMPAIGN CONCLUDED",
    loading_timer: "Loading timer...",
    gallery_gp1: "Luxurious 3F Hydrotherapy Core & Thermal Pools",
    gallery_gp2: "High-Volume 2F Buffet Dining Restaurant Hall",
    gallery_gp3: "5F Private Massage Therapy & Recovery Suites",
    gallery_gp4: "6F Group Leisure Lounge & Social Entertainment Hub",
    gallery_gp5: "Premium 6F Quiet Sleeping Pod Accommodations",
    vid1_title: "Grand Opening Ceremony Tour",
    vid1_desc: "Dragon Eye Dotting & Lion Dance Celebration",
    vid2_title: "Facility Walkthrough Tour Video",
    vid2_desc: "A quick tour of the 6-Floor layout and pools",
    floor_1_tag: "Welcome Zone",
    floor_1_desc: "The transition sequence focuses on hygienic transition and guest registration. Outdoor footwear is exchanged for sanitized slippers, and registration equips guests with their RFID wristbands.",
    floor_1_am1: "Reception & RFID Distribution",
    floor_1_am2: "Sanitized Slipper Exchange",
    floor_1_am3: "Secure Baggage & Lockers",
    floor_1_guide: "External footwear must be exchanged before entering. Ensure RFID wristband is kept securely on the wrist at all times.",
    floor_2_tag: "Dining & Food",
    floor_2_desc: "Spacious dining facility designed for high-volume replenishment. Balances authentic regional Chinese cuisine with local Filipino dishes, operating throughout a continuous 24-hour cycle.",
    floor_2_am1: "Chinese-Filipino Buffet Station",
    floor_2_am2: "Premium Brewed Coffee & Tea Bar",
    floor_2_am3: "Customized Buffet Plate Carts",
    floor_2_guide: "Leftover food on plates will incur a financial penalty logged onto the guest’s RFID wristband. Please select portions mindfully.",
    floor_3_tag: "Quiet / Privacy Core",
    floor_3_desc: "The core physical recovery area, strictly separated by gender to guarantee guest privacy. Equipped with diverse hot springs, steam baths, and scrubbing cabins.",
    floor_3_am1: "Hot Spring Pools (2 temps)",
    floor_3_am2: "Cold Plunge Pool",
    floor_3_am3: "Body Scrubbing & Exfoliation Zones",
    floor_3_am4: "Wet Steam & Sauna Rooms",
    floor_3_guide: "Mobile phone usage is strictly prohibited in the 3rd-floor wet areas. Showering is mandatory before pool entrance.",
    floor_5_tag: "Rest & Lodging",
    floor_5_desc: "A quiet, acoustically insulated environment designed for deep muscle relaxation therapies, specialized TCM orthopedic adjustment, and extended rest stays.",
    floor_5_am1: "Standard King Accommodation Suites",
    floor_5_am2: "Tatami Rooms & Meeting Suites",
    floor_5_am3: "Mahjong / Deluxe Chess Suites",
    floor_5_am4: "TCM Musculoskeletal Alignment Rooms",
    floor_5_guide: "Lodging suites are available for 4-hour or 12-hour rentals. Mandatory tips (Php 200/Php 500) apply for all therapeutic services.",
    floor_6_tag: "Social & Fun Hub",
    floor_6_desc: "The primary social hub of the complex designed to encourage group interactions, child play, and entertainment during the stay block.",
    floor_6_am1: "Movie Cinema Lounge",
    floor_6_am2: "Arcade Game Room",
    floor_6_am3: "Indoor Golf Simulator",
    floor_6_am4: "Indoor Kids Playground",
    floor_6_am5: "Pigeon & Phoenix Rest Nests (Bean Bags)",
    floor_6_am6: "Quiet Sleeping Pods (Individual)",
    floor_6_guide: "Enforced quiet hours apply from 12:00 AM to 6:00 AM in the sleeping pods area. Convenience store items are billed separately.",
    buffet_bf_title: "Breakfast Session",
    buffet_bf_desc: "Warm local congees, fresh local breads, pastries, and hot premium coffee selections.",
    buffet_ln_title: "Lunch Feast",
    buffet_ln_desc: "Chinese dim sum carts, regional stir-fries, handmade noodle stations, cold cuts, and assorted desserts.",
    buffet_dn_title: "Grand Dinner Buffet",
    buffet_dn_desc: "Premium carved meats, seafood stations (fresh prawns, crabs), sushi, sashimi, and live musical entertainment.",
    buffet_ms_title: "Midnight Comforts",
    buffet_ms_desc: "Late-night comfort broths, fresh dumplings, dim sum, and light congees for transit travelers.",
    label_address: "Address",
    label_viber: "Viber Hotlines (Primary)",
    label_secondary_hotline: "Secondary Mobile Hotlines",
    label_email: "Email Address",
    hint_parking_overflow: "In case of peak-hour overflow, parking is fully accommodated at the nearby pay-parking structures of",
    opt_rate_excellent: "⭐⭐⭐⭐⭐ Excellent stay",
    opt_rate_good: "⭐⭐⭐⭐ Good service",
    opt_rate_neutral: "⭐⭐⭐ Neutral / Average",
    opt_rate_fair: "⭐⭐ Fair",
    opt_rate_poor: "⭐ Needs improvement",
    placeholder_feedback: "Let us know how your visit, spa treatment, or dining experience went...",
    toast_feedback_success: "🎉 Feedback Submitted! Management has received your valuable notes.",
    toast_feedback_error: "❌ Error submitting feedback. Please try again.",
    toast_booking_success: "🎉 Booking Submitted Successfully! The management has logged your request.",
    toast_booking_error: "❌ Error submitting booking. Please try again.",
    label_hours: "Hours",
    label_duration_4h: "4 Hours",
    label_duration_12h: "12 Hours",
    label_placeholder_notes: "Dietary adjustments, specific massage requests, layout needs...",
    label_reels_title: "Emgrand Reels & Videos",
    label_reels_subtitle: "Watch opening ceremony reels, walk-through tours, and highlight clips from our social media channels",
    label_no_reels: "No video tours configured at this moment.",
    chat_welcome: "Welcome to Emgrand Spa Manila! I am your Wellness Assistant. Ask me anything about our facilities, services, packages, dynamic buffet schedules, or pricing rules.",
    chat_title: "Emgrand Chat Assistant",
    chat_subtitle: "Online Wellness Guide",
    chat_chip_price: "🎟️ Entry Price",
    chat_chip_buffet: "🍲 Buffet Schedule",
    chat_chip_packages: "🎁 Weekday Packages",
    chat_chip_location: "📍 Location & Contacts",
    chat_placeholder: "Type a message...",
    chat_err_groq: "⚠️ Connection error. Please verify the API settings inside the Admin Console.",
    chat_err_network: "⚠️ Network connectivity failure. Unable to contact services.",
    chat_offline_mode: "I am operating in Mock/Offline mode. Please configure a valid API Key in the Admin Console -> App Settings to enable automated responses.\n\n",
    chat_mock_price: "Standard 12-hour Adult admission is Php 1,699. Child admission is Php 899 (for children between 80cm and 119cm). These base tickets include continuous 4-session buffet dining, hot pools, film cinema, and dry saunas.",
    chat_mock_buffet: "Our 24-hour buffet operations include: Breakfast (7:00 AM - 9:00 AM), Lunch (11:00 AM - 1:00 PM), Dinner (6:00 PM - 9:00 PM), and Midnight Snacks (11:00 PM - 1:00 AM). Standard tickets include unlimited access to all four meals!",
    chat_mock_packages: "We offer three exclusive Weekday Packages (Mon-Thu): Package A (Php 2,880 - save Php 2,404), Package B (Php 3,180 - save Php 2,404), and Package C (Php 3,580 - save Php 2,704). They bundle admission, buffet, and premium massage.",
    chat_mock_location: "We are located at Lot 3, Block 5, Bradco Avenue, Aseana City, Parañaque City (near Parqal and MOA, 15 minutes from NAIA). You can contact us via Viber hotlines at 0992-1888-888 or 0992-1999-999.",
    chat_mock_default: "Emgrand Spa Manila is a 24-hour wellness destination offering hydrotherapy core pools (3F), premium massage therapies and TCM bone alignment (5F), and social leisure gaming zone (6F). How can I assist you today?",
    footer_copy: "&copy; 2026 Emgrand Spa Manila. All rights reserved.",
    service_cat_admission: "Admission & Stay Tickets",
    service_cat_massage: "Therapeutic Massage Treatments",
    service_cat_tcm: "TCM Orthopedic Rehabilitations",
    service_cat_lodging: "Lodging & Accommodation Suites",
    service_cat_special: "Specialized Operations",
    calc_adult_stay_ticket: "Adult Stay Ticket",
    calc_child_stay_ticket: "Child Stay Ticket",
    calc_addon_breakfast: "Add-on Breakfast",
    calc_addon_lunch: "Add-on Lunch",
    calc_addon_dinner: "Add-on Dinner",
    calc_addon_midnight: "Add-on Midnight Snack",
    calc_mand_tips: "Mandatory Tips",
    calc_chinese_spec: "Chinese Specialist",
    calc_local: "Local",
    calc_therapist_local_desc: "Local Therapist (Php 200 mandatory tip per service)",
    calc_therapist_chinese_desc: "Chinese Specialist (Php 500 mandatory tip per service)",
    calc_save: "Save",
    calc_book_pkg: "Book",
    calc_spa_pass_inclusions: "12-Hour Spa Pass Inclusions",
    calc_spa_pass_desc: "Enjoy full access to our world-class urban wellness facilities during your stay block:",
    calc_spa_pass_pool: "Heated Pool & Cold Tubs",
    calc_spa_pass_sauna: "Sauna & Korean-Style Steaming",
    calc_spa_pass_resting: "Resting Hall & Lounge Areas",
    calc_spa_pass_cinema: "Cinema Room, Book Bar & Free WiFi",
    calc_spa_pass_billiards: "Billiards & Children's Playground",
    calc_spa_pass_pigeon: "Pigeon House & Phoenix Nest",
    calc_spa_pass_toiletries: "Premium Toiletries, Bath Towels & Spa Garments",
    calc_unlimited_buffet_title: "Unlimited Buffet Dining",
    calc_unlimited_buffet_desc: "Eat all you can, as many times as you like! Enjoy a wide variety of:",
    calc_unlimited_buffet_seafood: "Fresh Seafood & Premium Meat Selections",
    calc_unlimited_buffet_cuisine: "Asian & International Cuisine",
    calc_unlimited_buffet_desserts: "Desserts, Pastries & Seasonal Favorites",
    calc_buffet_schedule_sessions: "Buffet Schedule Sessions:",
    adm_sidebar_services: "Services Catalog",
    adm_sidebar_packages: "Service Packages",
    adm_sidebar_bookings: "Bookings Manager",
    adm_sidebar_campaigns: "Events & Campaigns",
    adm_sidebar_seo: "SEO Settings",
    adm_sidebar_banners: "Home Banners",
    adm_sidebar_gallery: "Gallery Photos",
    adm_sidebar_videos: "Videos",
    adm_sidebar_socials: "Social Posts",
    adm_sidebar_perks: "Memberships",
    adm_sidebar_chatbot: "Chatbot Training",
    adm_sidebar_feedback: "Guest Feedback",
    adm_sidebar_analytics: "Analytics & Logs",
    adm_sidebar_settings: "App Settings & Keys",
    adm_sidebar_accounts: "User Accounts",
    adm_sidebar_logout: "Log Out",
    adm_title_services: "Manage Services Catalog",
    adm_title_packages: "Weekday Massage Packages",
    adm_title_bookings: "Guest Reservations Manager",
    adm_title_campaigns: "Dynamic Countdown Event Banners",
    adm_title_seo: "SEO Configurations",
    adm_title_banners: "Home Hero Banner Settings",
    adm_title_gallery: "Virtual Tour Gallery Photos",
    adm_title_videos: "Walkthrough Tour Videos",
    adm_title_socials: "Mock Social Photo Board Posts",
    adm_title_perks: "Starlight Membership Loyalty Perks",
    adm_title_chatbot: "Concierge AI Chatbot Training & Instructions",
    adm_title_feedback: "Guest Feedback Submissions",
    adm_title_analytics: "Analytics & System Logs",
    adm_title_settings: "App Settings & API Keys",
    adm_title_accounts: "Manage User Accounts & Roles",
    adm_btn_add: "Add New",
    adm_btn_save: "Save",
    adm_btn_delete: "Delete",
    adm_btn_edit: "Edit",
    adm_th_title: "Title",
    adm_th_category: "Category",
    adm_th_price: "Price (Php)",
    adm_th_tips: "Tips",
    adm_th_actions: "Actions",
    adm_th_name: "Name",
    adm_lbl_title_en: "Title (English)",
    adm_lbl_title_zh: "Title (Chinese)",
    adm_lbl_title_ko: "Title (Korean)",
    adm_lbl_desc_en: "Description (English)",
    adm_lbl_desc_zh: "Description (Chinese)",
    adm_lbl_desc_ko: "Description (Korean)",
    adm_lbl_inclusions_en: "Inclusions (English - Comma separated)",
    adm_lbl_inclusions_zh: "Inclusions (Chinese - Comma separated)",
    adm_lbl_inclusions_ko: "Inclusions (Korean - Comma separated)",
    adm_lbl_rate: "Rate / Cost (Php)",
    adm_lbl_savings: "Estimated Savings (Php)",
    adm_lbl_image: "Image URL",
    adm_lbl_url: "URL / Link",
    adm_lbl_likes: "Likes Count",
    adm_lbl_username: "Username",
    adm_lbl_message: "Message / Content",
    adm_lbl_email: "Email Address",
    adm_lbl_role: "Role / Level"
  },
  zh: {
    nav_home: "首页",
    nav_about: "关于我们",
    nav_services: "服务与价格",
    nav_bookings: "预约系统",
    nav_socials: "社交动态",
    nav_contact: "联系我们",
    nav_admin: "管理员后台",
    hero_title: "升华您的健康生活",
    hero_subtitle: "位于Aseana City的24小时高端奢华水疗与洗浴绿洲",
    hero_btn_book: "预订套房/设施",
    hero_btn_calc: "RFID消费计算器",
    hero_status_open: "24/7 营业",
    quick_location_title: "位置",
    quick_location_desc: "帕拉尼亚克市 Bradco Ave",
    quick_hotline_title: "客房与预约热线",
    quick_buffet_title: "全天候自助餐",
    quick_buffet_desc: "门票已包含四餐豪华自助餐",
    countdown_section_title: "进行中的活动与推广",
    countdown_section_subtitle: "参与我们的专属活动赢取丰厚奖励",
    floor_section_title: "空间布局规划",
    floor_section_subtitle: "探索六层楼的垂直健康空间设计",
    floor_6_title: "社交与娱乐中心",
    floor_5_title: "私人水疗与客房套房",
    floor_3_title: "水疗水疗核心区（湿区）",
    floor_2_title: "豪华自助餐厅",
    floor_1_title: "接待处与换鞋区",
    floor_6_header: "六层：社交与娱乐中心",
    floor_6_description: "专为团队社交和家庭团聚设计。配备高端睡眠太空舱、电影放映厅、电玩城、台球桌和室内模拟高尔夫。",
    floor_amenities_heading: "核心设施",
    floor_guidelines_title: "宾客须知与规则",
    floor_tag_active: "活跃区域",
    about_title: "品牌传承与理念",
    about_subtitle: "马尼拉大都会区城市养生体验的华丽转折",
    about_history_title: "帝皇水疗的诞生",
    about_history_p1: "于2025年2月16日试营业，推出洗浴模式，门票特价669比索（不含餐）。随后于2025年4月26日隆重开业，举办了传统的点睛仪式和舞龙表演以祈求吉祥好运。",
    about_design_title: "垂直分区设计理念",
    about_design_p1: "帝皇水疗采用独特的垂直分区设计理念，将社交活跃区与静谧疗愈区作垂直方向上的物理隔离，为都市喧嚣中的宾客营造心理避难所。临近 Ayala Malls Manila Bay 和 Parqal，距离 NAIA 机场仅 15-20 分钟，非常适合中转旅客。",
    gallery_title: "奢华设施画册",
    tab_spa_menu: "水疗与按摩菜单",
    tab_rfid_calc: "RFID消费账单模拟",
    tab_weekday_packages: "工作日特惠套餐",
    tab_buffet_schedule: "自助餐时间指南",
    services_menu_title: "我们的健康理疗项目",
    services_menu_subtitle: "由中菲两国专业理疗师为您提供尊贵理疗体验",
    rfid_calc_title: "门票与RFID消费账单模拟器",
    rfid_calc_subtitle: "估算您12小时 stay 的消费情况（包含门票、私人套房及理疗项目）",
    calc_selections_title: "选择消费选项",
    opt_standard_rate: "标准核心费率 (包含全包自助餐)",
    opt_anniversary_rate: "半周年特惠费率 (餐食自选/未捆绑)",
    calc_label_pricing_model: "价格方案",
    calc_label_adults: "成人人数",
    calc_label_children: "儿童人数",
    calc_label_meals: "加购自助餐 (仅适用于半周年价格方案)",
    calc_label_lodging: "私人套房预订 (可选)",
    opt_no_lodging: "无套房预订",
    calc_label_therapies: "加购按摩理疗",
    calc_label_therapist_type: "理疗师指派",
    receipt_brand: "帝皇水疗中心 (EMGRAND SPA)",
    receipt_tagline: "RFID 手环账单模拟清单",
    receipt_subtotal: "小计",
    receipt_vat: "增值税 (12%)",
    receipt_service_charge: "服务费 (3%)",
    receipt_total: "预估总金额",
    receipt_footer_msg: "理疗师小费将直接记录在您的 RFID 手环中，并在结账处统一结算。",
    packages_title: "工作日尊享按摩套餐",
    packages_subtitle: "周一至周四专属超值优惠组合（成人门票 + 专属理疗 + 三餐自助餐）",
    buffet_title: "全天候自助餐时间表",
    buffet_subtitle: "标准门票已包含以下四餐不限量供应",
    buffet_waste_penalty_title: "光盘行动罚款政策",
    buffet_waste_penalty_desc: "为倡导节约，如盘中留有过多剩菜，将在您的 RFID 手环中扣除食物浪费罚金。请适量取餐，感恩同行。",
    booking_title: "尊享在线预约台",
    booking_subtitle: "预订私人大床套房/棋牌榻榻米或高尔夫模拟器设施",
    booking_label_name: "真实姓名 *",
    booking_label_contact: "手机号 / Viber *",
    booking_label_email: "电子邮箱",
    booking_label_date: "预订日期 *",
    booking_label_time: "预估抵达时间 *",
    booking_label_category: "预约类别 *",
    booking_cat_suite: "私人留宿套房 (5F)",
    booking_cat_amenity: "娱乐设施预约 (6F)",
    booking_label_item: "选择房间/设施 *",
    booking_label_duration: "预订时长",
    booking_label_guests: "宾客人数",
    booking_label_notes: "特别备注 / 需求",
    booking_btn_submit: "确认提交预约",
    starlight_title: "星光尊客会 (STARLIGHT LOYALTY)",
    starlight_subtitle: "获取至高尊荣的会籍特权",
    starlight_perk1_title: "1比索加入会员",
    starlight_perk1_desc: "1p即可开通星光会员，即送价值888p按摩免费一次。",
    starlight_perk2_title: "2楼生啤酒免费畅饮",
    starlight_perk2_desc: "星光会员从半夜 1:00 到半夜 5:00 可以在 2 楼餐厅享受生啤酒免费畅饮。",
    starlight_perk3_title: "免费洗车服务",
    starlight_perk3_desc: "免费洗车（开放时间：中午12:00 - 半夜00:00）。",
    starlight_perk4_title: "关注平台送免费按摩",
    starlight_perk4_desc: "关注 Facebook / TikTok / Instagram 官方社媒账号，每关注一个平台即可免费做一次价值888p的按摩。",
    photoboard_title: "帝皇流光照壁",
    photoboard_subtitle: "每月14日携伴在专属情侣打卡区合照并发布社媒，可获赠4小时免费套房体验券！",
    contact_header: "联系我们",
    contact_desc: "有关企业团建预约、交通协助或入场咨询，请通过以下官方通道与我们取得联系。",
    parking_title: "实时车位状态",
    parking_max: "总容量: 30 席",
    parking_label_available: "空余车位",
    parking_overflow_hint: "若帝皇专属车位已满，车辆可停放至附近的 Parqal 购物中心收费停车场。",
    feedback_form_header: "分享您的体验",
    feedback_form_subheader: "您的意见与宝贵反馈将直接呈报给高管团队以改善运营质量。",
    feedback_label_name: "姓名",
    feedback_label_contact: "联系电话/邮箱",
    feedback_label_rating: "住宿满意度",
    feedback_label_message: "您的反馈/改进意见 *",
    feedback_btn_submit: "提交反馈",
    mock_social_1: "在5F榻榻米房度过了完美的情侣纪念日！合照打卡后顺利拿到了4小时的赠券。 #帝皇情侣之夜",
    mock_social_2: "不限量豪华海鲜自助加上高清赛事直播。星光会员的世界杯竞猜太好玩了！ ⚽️🍺 #帝皇星光会员",
    mock_social_3: "六一儿童节的石膏石像涂鸦大赛！小孩子们免门票和餐食，还拿到了涂鸦奖金。非常推荐家庭周末出行！ #帝皇亲子时光",
    exp_title: "体验之旅",
    exp_subtitle: "探索跨越六层楼的宾客入住动线与空间布局规划",
    exp_timeline_heading: "您的12小时水疗入住全程体验",
    exp_step_label: "步骤",
    exp_j1_title: "换鞋入场",
    exp_j1_desc: "将室外鞋更换为消毒拖鞋，完成前台登记手续，领取专属 RFID 智能追踪手环。",
    exp_j2_title: "豪华自助海鲜盛宴",
    exp_j2_desc: "尽享正宗中华地方特色美食及菲律宾本土风味，全天候四餐豪华自助餐不限量供应。",
    exp_j3_title: "温泉湿区疗愈",
    exp_j3_desc: "在男女严格分隔的湿区中，享受温泉池、冷热水疗、蒸汽室及干蒸桑拿。",
    exp_j4_title: "肌肉骨骼康复理疗",
    exp_j4_desc: "体验干捏按摩、精油全身理疗或中医正骨经络调理，恢复身体最佳状态。",
    exp_j5_title: "社交娱乐中心",
    exp_j5_desc: "在影院放映厅休闲、体验室内高尔夫模拟器或电玩游戏，最后于私享睡眠太空舱中沉睡。",
    exp_j6_title: "尊享结账离场",
    exp_j6_desc: "在前台归还 RFID 手环，完成消费账单结算，正式退场。",
    wellness_title: "您的养生时光",
    wellness_subtitle: "通过我们的标志性康复理疗，重焕身心活力",
    wellness_book_btn: "立即预约",
    wellness_dry_title: "干捏推拿按摩",
    wellness_dry_duration: "30 分钟",
    wellness_dry_rate: "Php 888 – Php 988",
    wellness_dry_desc: "专注于手部、足部、头部及背部的结构性穴位刺激。在公共休闲厅或影院区进行。",
    wellness_oil_title: "标准精油全身按摩",
    wellness_oil_duration: "60 分钟",
    wellness_oil_rate: "起价 Php 1,588",
    wellness_oil_desc: "在隔音私密理疗套房内，由专业治疗师使用有机精华油进行全身深度按摩。附赠热茶及时令水果。",
    wellness_tcm_title: "中医正骨理疗",
    wellness_tcm_duration: "视情况而定",
    wellness_tcm_rate: "Php 1,500",
    wellness_tcm_desc: "由持证专科医师进行传统中医结构性肌肉骨骼矫正及关节松解调理。",
    updates_title: "最新动态",
    updates_subtitle: "持续关注我们精彩纷呈的季节性活动与限时专属优惠",
    about_hub_title: "Aseana City 健康养生中心",
    about_hub_desc: "帝皇水疗馆是位于巴拉那克市 Aseana City Bradco Avenue 3 区 5 号的 24 小时高端城市健康养生目的地。毗邻 Ayala Malls Manila Bay、Parqal 购物中心及 Mall of Asia，距 NAIA 国际机场仅需 15-20 分钟，是过境旅客与度假人士的绝佳放松圣地。",
    facilities_title: "我们的设施",
    facilities_subtitle: "通过虚拟游览、图片画廊和六层楼全面介绍，全方位了解我们的设施",
    video_tour_label: "设施虚拟导览视频",
    floor_dir_heading: "六层楼功能分区详情",
    diff_title: "我们的与众不同",
    diff_subtitle: "探索帝皇水疗馆独特的运营理念，这正是我们品牌签名体验的核心",
    diff_card1_title: "垂直分区设计",
    diff_card1_desc: "我们将设施按照功能进行垂直分隔，将社交活跃区与静谧疗愈空间完全物理隔离。1F换鞋、2F自助餐厅、6F游戏娱乐等噪音区域与3F水疗池及5F按摩套房严格区分，为宾客创造从都市喧嚣过渡到纯粹放松的心理缓冲层。",
    diff_card2_title: "24小时不间断自助美食",
    diff_card2_desc: "与仅提供简单小食的普通水疗馆不同，我们的标准入场票覆盖24小时全天候持续餐饮补充。宾客可享受四大正餐时段（早餐、午餐、豪华晚宴及深夜宵夜），汇聚正宗中华地方美食与菲律宾本土风味的精彩融合。",
    diff_card3_title: "湿区零手机隐私保障",
    diff_card3_desc: "为保障每位尊贵宾客的绝对私密与舒适，3楼男女分区水疗池、更衣室及桑拿区内严禁使用手机。储物柜旁设置专属充电保险箱，让宾客完全放下数字焦虑，享受纯粹无干扰的身体恢复体验。",
    commit_title: "我们的承诺",
    commit_subtitle: "我们对运营品质、宾客舒适体验与高端服务标准的不变坚守",
    commit_card1_title: "光盘行动 · 可持续用餐",
    commit_card1_desc: "为倡导环保可持续理念，我们在24小时自助餐区实施严格的食物浪费罚款制度。如宾客餐盘剩余食物过多，将通过 RFID 手环自动记录相应罚款，有效减少浪费并确保新鲜高品质食材始终充足供应。",
    commit_card2_title: "深度睡眠静音管理",
    commit_card2_desc: "心灵的宁静对精神焕发至关重要。6楼睡眠太空舱区域在凌晨12时至早上6时全面实施静默管理，配合高性能隔音材料及员工巡逻机制，确保过境旅客获得不间断的优质睡眠。",
    commit_card3_title: "顶级理疗品质保障",
    commit_card3_desc: "所有足浴、精油全身按摩及中医正骨项目均由持证专业理疗师操作。我们建立严格的理疗师资质认证体系，理疗师小费按照标准统一计入 RFID 账单，透明清晰，无任何隐形消费。",
    social_posts_title: "社交媒体动态",
    social_share_label: "分享",
    map_section_title: "帝皇水疗馆精准位置地图",
    map_section_subtitle: "坐落于 Aseana City 核心地带 — 毗邻 MOA、Parqal 及 NAIA 机场",
    map_near_hint: "近 Parqal 购物中心及 Mall of Asia • 距 NAIA 仅 15-20 分钟",
    map_directions_btn: "即刻导航",
    map_lm1_label: "NAIA 国际机场",
    map_lm1_dist: "驾车约 15-20 分钟",
    map_lm2_label: "亚洲购物中心 (MOA)",
    map_lm2_dist: "驾车约 10 分钟",
    map_lm3_label: "Parqal 购物中心",
    map_lm3_dist: "步行约 3 分钟",
    map_lm4_label: "马尼拉湾",
    map_lm4_dist: "驾车约 5 分钟",
    camp1_title: "六一儿童节涂鸦大赛",
    camp1_desc: "儿童免门票及餐食。石膏雕像涂鸦比赛第一名可获得10,000比索现金奖励！",
    camp2_title: "每月情侣尊享活动",
    camp2_desc: "每月14日，情侣在专属打卡区合影并发布社交媒体，即可获赠4小时免单客房体验券！",
    camp3_title: "您消费，我买单",
    camp3_desc: "每日18:00随机抽取3位幸运会员，全额免除其今日的全部手环RFID消费金额！",
    camp4_title: "生日专属宠爱",
    camp4_desc: "生日日前后三天内，同行三人或以上即可享受本人免门票优惠！提前半天预订，更可免费赠送精美生日小蛋糕一个。",
    days: "天",
    hours_short: "小时",
    minutes_short: "分",
    seconds_short: "秒",
    campaign_concluded: "🎉 活动已圆满结束",
    loading_timer: "正在加载计时器...",
    gallery_gp1: "奢华三楼温泉湿区与疗愈水疗池",
    gallery_gp2: "高容量二楼海鲜豪华自助餐厅",
    gallery_gp3: "五楼私密理疗套房与养生休息区",
    gallery_gp4: "六楼团队社交沙龙与休闲娱乐中心",
    gallery_gp5: "高端六楼静音睡眠太空舱客房",
    vid1_title: "盛大开业典礼巡礼",
    vid1_desc: "舞龙舞狮与点睛仪式祈福活动",
    vid2_title: "六层楼设施全景导览视频",
    vid2_desc: "带您快速浏览水疗池、客房与娱乐区域",
    floor_1_tag: "换鞋登记区",
    floor_1_desc: "入场过渡流程专注于卫生与宾客登记。将室外鞋更换为消毒拖鞋，登记并为宾客配备RFID手环。",
    floor_1_am1: "前台登记与手环发放",
    floor_1_am2: "消毒拖鞋更换",
    floor_1_am3: "行李寄存与保险柜",
    floor_1_guide: "入场前必须更换室外鞋。请确保RFID手环随时佩戴在手腕上。",
    floor_2_tag: "自助餐饮区",
    floor_2_desc: "宽敞的餐厅设计可满足高客流量用餐。完美融合正宗中式料理与菲律宾本土美食，全天24小时循环供应。",
    floor_2_am1: "中菲风味自助餐台",
    floor_2_am2: "特调咖啡与高档茗茶吧",
    floor_2_am3: "订制自助取餐车",
    floor_2_guide: "盘中留有过多剩菜将产生食物浪费罚款并计入RFID手环。请适量取餐。",
    floor_3_tag: "静谧疗愈湿区",
    floor_3_desc: "核心的身体理疗区域，男女严格分区以保障隐私。配备多种温度的温泉池、蒸汽浴和搓背房。",
    floor_3_am1: "双温温泉水疗池",
    floor_3_am2: "冰水理疗池",
    floor_3_am3: "专业搓背去角质区",
    floor_3_am4: "湿式蒸汽桑拿房",
    floor_3_guide: "三楼湿区更衣室和水疗池内严禁使用手机。进入温泉池前必须淋浴。",
    floor_5_tag: "私密理疗留宿",
    floor_5_desc: "安静隔音的环境，专为深度肌肉放松理疗、专业中医正骨调理以及长时留宿设计。",
    floor_5_am1: "标准大床留宿套房",
    floor_5_am2: "榻榻米多功能会议套房",
    floor_5_am3: "自动麻将棋牌套房",
    floor_5_am4: "中医骨骼经络调理室",
    floor_5_guide: "套房提供4小时或12小时租赁。所有理疗服务需加收标准小费（本地理疗师Php 200/专业中医师Php 500）。",
    floor_6_tag: "社交娱乐区",
    floor_6_desc: "综合大楼的主要社交中心，专为多人聚会、亲子游乐 and 休闲娱乐而设计。",
    floor_6_am1: "电影放映休闲大厅",
    floor_6_am2: "电玩游艺娱乐城",
    floor_6_am3: "室内高尔夫模拟器",
    floor_6_am4: "室内儿童乐园",
    floor_6_am5: "鸽子窝与凤凰巢懒人沙发区",
    floor_6_am6: "单人静音睡眠太空舱",
    floor_6_guide: "睡眠区在凌晨12:00至早上6:00期间实行静音管理。便利店商品将单独结算。",
    buffet_bf_title: "元气早餐时段",
    buffet_bf_desc: "热腾腾的本地靓粥、新鲜面包、糕点以及香醇的精品咖啡。",
    buffet_ln_title: "丰盛午餐盛宴",
    buffet_ln_desc: "广式点心推车、特色小炒、手工面档、各式冷盘及精美甜点。",
    buffet_dn_title: "豪华海鲜晚宴",
    buffet_dn_desc: "现切高档肉类、海鲜档（新鲜海虾、螃蟹）、寿司生鱼片以及现场音乐伴奏。",
    buffet_ms_title: "深夜舒适暖胃宵夜",
    buffet_ms_desc: "暖胃煲汤、新鲜水饺、精致点心以及清淡靓粥，专为中转旅客补充能量。",
    label_address: "地址",
    label_viber: "Viber 预约热线 (主)",
    label_secondary_hotline: "备用移动热线",
    label_email: "电子邮箱",
    hint_parking_overflow: "若帝皇车位已满，车辆可停放至临近购物中心收费停车场：",
    opt_rate_excellent: "⭐⭐⭐⭐⭐ 住宿体验极其完美",
    opt_rate_good: "⭐⭐⭐⭐ 服务非常不错",
    opt_rate_neutral: "⭐⭐⭐ 体验一般/中规中矩",
    opt_rate_fair: "⭐⭐ 体验较差",
    opt_rate_poor: "⭐ 需大力改进",
    placeholder_feedback: "请留下您对本次光临、理疗按摩或自助餐体验的宝贵意见...",
    toast_feedback_success: "🎉 反肤已成功提交！管理团队已收到您的宝贵意见。",
    toast_feedback_error: "❌ 提交反馈失败，请重试。",
    toast_booking_success: "🎉 预约提交成功！管理后台已为您记录本次申请。",
    toast_booking_error: "❌ 提交预约失败，请重试。",
    label_hours: "小时",
    label_duration_4h: "4 小时",
    label_duration_12h: "12 小时",
    label_placeholder_notes: "如：餐食忌口、特定按摩力度需求、客房布置需求等...",
    label_reels_title: "帝皇流光短视频与画册",
    label_reels_subtitle: "观看我们的开业庆典、设施导览以及社媒精彩视频片段",
    label_no_reels: "暂无配置视频导览。",
    chat_welcome: "欢迎光临帝皇水疗中心！我是您的健康助手。您可以向我咨询关于设施、服务、套餐、自助餐时间表或价格的任何问题。",
    chat_title: "帝皇在线客服",
    chat_subtitle: "在线健康向导",
    chat_chip_price: "🎟️ 门票价格",
    chat_chip_buffet: "🍲 自助餐时间表",
    chat_chip_packages: "🎁 工作日套餐",
    chat_chip_location: "📍 位置与联系方式",
    chat_placeholder: "输入消息...",
    chat_err_groq: "⚠️ 连接错误。请在管理员设置中验证接口配置。",
    chat_err_network: "⚠️ 网络连接失败。无法连接云服务。",
    chat_offline_mode: "我目前处于模拟/离线模式。请在管理员后台 -> 应用设置中配置有效的密钥以启用自动回复。\n\n",
    chat_mock_price: "标准12小时成人门票为1,699比索。儿童门票为899比索（适用于80cm至119cm的儿童）。基础门票包含全天候4餐自助餐、温泉池、电影院 and 干桑拿房使用权。",
    chat_mock_buffet: "我们的24小时自助餐时段包括：早餐（7:00 AM - 9:00 AM）、午餐（11:00 AM - 1:00 PM）、晚餐（6:00 PM - 9:00 PM）和深夜宵夜（11:00 PM - 1:00 AM）。标准门票包含无限次享受全部四餐！",
    chat_mock_packages: "我们提供三款独家工作日特惠套餐（周一至周四）：套餐A（Php 2,880 - 省 Php 2,404）、套餐B（Php 3,180 - 省 Php 2,404）和套餐C（Php 3,580 - 省 Php 2,704）。包含门票、自助餐和尊享按摩项目。",
    chat_mock_location: "我们位于帕拉尼亚克市 Aseana City Bradco Avenue 3区5号（临近 Parqal 和 MOA 购物中心，距 NAIA 机场约15分钟路程）。您可以通过 Viber 热线联系我们：0992-1888-888 或 0992-1999-999。",
    chat_mock_default: "帝皇水疗馆（Emgrand Spa Manila）是24小时营业的养生目的地，设有湿区温泉水疗池（3F）、高端按摩理疗与中医正骨（5F）及社交娱乐休闲区（6F）。今天有什么我可以帮您的吗？",
    footer_copy: "&copy; 2026 帝皇水疗中心。保留所有权利。",
    service_cat_admission: "入场及留宿门票",
    service_cat_massage: "专业身体按摩理疗",
    service_cat_tcm: "传统中医正骨理疗",
    service_cat_lodging: "客房及包间套房",
    service_cat_special: "专属特色项目",
    calc_adult_stay_ticket: "成人入场券",
    calc_child_stay_ticket: "儿童入场券",
    calc_addon_breakfast: "加购早餐",
    calc_addon_lunch: "加购午餐",
    calc_addon_dinner: "加购晚餐",
    calc_addon_midnight: "加购午餐宵夜",
    calc_mand_tips: "固定服务小费",
    calc_chinese_spec: "特聘中医师",
    calc_local: "本地技师",
    calc_therapist_local_desc: "本地理疗师 (每项服务强制小费 Php 200)",
    calc_therapist_chinese_desc: "专业中医师 (每项服务强制小费 Php 500)",
    calc_save: "节省",
    calc_book_pkg: "预订",
    calc_spa_pass_inclusions: "12小时入场门票包含项目",
    calc_spa_pass_desc: "您可以在入住期间完全免费使用以下顶级康养设施：",
    calc_spa_pass_pool: "冷热水疗池 & 温泉泡汤",
    calc_spa_pass_sauna: "湿汽房 & 韩式干桑拿",
    calc_spa_pass_resting: "豪华休息大厅 & 懒人沙发区",
    calc_spa_pass_cinema: "多功能电影院、书吧 & 免费高速WiFi",
    calc_spa_pass_billiards: "美式台球 & 儿童游乐区",
    calc_spa_pass_pigeon: "鸽子屋 & 凤凰巢休息营",
    calc_spa_pass_toiletries: "进口高档洗漱用品、浴巾 & 舒适水疗服",
    calc_unlimited_buffet_title: "全天候不限量豪华自助餐",
    calc_unlimited_buffet_desc: "吃你想吃，无限量供应！为您准备了丰富的：",
    calc_unlimited_buffet_seafood: "新鲜海鲜、刺身 & 现场铁板烧",
    calc_unlimited_buffet_cuisine: "精选中华地方美食 & 本地菲式风味",
    calc_unlimited_buffet_desserts: "精美手工甜点、鲜切水果 & 特调茶饮",
    calc_buffet_schedule_sessions: "自助餐供应时段详情：",
    adm_sidebar_services: "服务目录",
    adm_sidebar_packages: "服务套餐",
    adm_sidebar_bookings: "预约管理",
    adm_sidebar_campaigns: "活动与推广",
    adm_sidebar_seo: "SEO 设置",
    adm_sidebar_banners: "首页横幅",
    adm_sidebar_gallery: "画册图片",
    adm_sidebar_videos: "视频",
    adm_sidebar_socials: "社交动态",
    adm_sidebar_perks: "会员特权",
    adm_sidebar_chatbot: "客服机器人训练",
    adm_sidebar_feedback: "宾客反馈",
    adm_sidebar_analytics: "数据分析与日志",
    adm_sidebar_settings: "应用设置与密钥",
    adm_sidebar_accounts: "用户账户",
    adm_sidebar_logout: "退出登录",
    adm_title_services: "管理服务目录",
    adm_title_packages: "工作日按摩套餐",
    adm_title_bookings: "宾客预约管理",
    adm_title_campaigns: "动态活动倒计时横幅",
    adm_title_seo: "SEO 设置",
    adm_title_banners: "首页 Hero 横幅设置",
    adm_title_gallery: "虚拟导览画册图片",
    adm_title_videos: "实体视频导览",
    adm_title_socials: "社交媒体照片墙贴文",
    adm_title_perks: "星光会员专属福利特权",
    adm_title_chatbot: "AI 客服机器人训练与指令配置",
    adm_title_feedback: "宾客反馈意见提交",
    adm_title_analytics: "数据分析与系统日志",
    adm_title_settings: "应用配置与 API 密钥",
    adm_title_accounts: "用户账户与角色权限管理",
    adm_btn_add: "添加新项目",
    adm_btn_save: "保存",
    adm_btn_delete: "删除",
    adm_btn_edit: "编辑",
    adm_th_title: "标题",
    adm_th_category: "类别",
    adm_th_price: "价格 (Php)",
    adm_th_tips: "小费",
    adm_th_actions: "操作",
    adm_th_name: "名称",
    adm_lbl_title_en: "标题 (英文)",
    adm_lbl_title_zh: "标题 (中文)",
    adm_lbl_title_ko: "标题 (韩文)",
    adm_lbl_desc_en: "描述 (英文)",
    adm_lbl_desc_zh: "描述 (中文)",
    adm_lbl_desc_ko: "描述 (韩文)",
    adm_lbl_inclusions_en: "包含内容 (英文 - 用逗号分隔)",
    adm_lbl_inclusions_zh: "包含内容 (中文 - 用逗号分隔)",
    adm_lbl_inclusions_ko: "包含内容 (韩文 - 用逗号分隔)",
    adm_lbl_rate: "价格 / 费率 (Php)",
    adm_lbl_savings: "预估省钱金额 (Php)",
    adm_lbl_image: "图片 URL 链接",
    adm_lbl_url: "URL 链接",
    adm_lbl_likes: "点赞数",
    adm_lbl_username: "用户名",
    adm_lbl_message: "内容 / 消息",
    adm_lbl_email: "电子邮箱地址",
    adm_lbl_role: "角色 / 权限级别"
  },
  ko: {
    nav_home: "홈",
    nav_about: "소개",
    nav_services: "서비스 & 요금",
    nav_bookings: "예약",
    nav_socials: "소셜",
    nav_contact: "문의처",
    nav_admin: "관리자",
    hero_title: "당신의 웰니스를 한 단계 높이세요",
    hero_subtitle: "아시아나 시티에 위치한 24시간 프리미엄 럭셔리 스파 & 사우나 오아시스",
    hero_btn_book: "스위트룸 / 시설 예약",
    hero_btn_calc: "RFID 요금 시뮬레이터",
    hero_status_open: "24/7 영업중",
    quick_location_title: "위치",
    quick_location_desc: "파라냐케시 Bradco Ave",
    quick_hotline_title: "고객 문의",
    quick_buffet_title: "연중무휴 뷔페",
    quick_buffet_desc: "입장권에 4개 시간대 뷔페 식사 무제한 포함",
    countdown_section_title: "진행 중인 캠페인 & 이벤트",
    countdown_section_subtitle: "엠그란드 스파만의 독점 프로모션과 축제에 참여해보세요",
    floor_section_title: "공간 아키텍처",
    floor_section_subtitle: "6개 층에 걸친 수직적 웰니스 디자인 레이아웃을 살펴보세요",
    floor_6_title: "소셜 & 엔터테인먼트",
    floor_5_title: "프라이빗 웰니스 & 객실",
    floor_3_title: "하이드로테라피 코어 (웨트 에어리어)",
    floor_2_title: "뷔페 다이닝 홀",
    floor_1_title: "리셉션 & 슈즈 보관소",
    floor_6_header: "6층: 소셜 허브 & 엔터테인먼트",
    floor_6_description: "그룹 소모임 및 가족 동반 고객을 위해 최적화 설계되었습니다. 프리미엄 수면 캡슐, 영화 감상 라운지, 오락실, 당구대, 실내 골프 시뮬레이터를 갖추고 있습니다.",
    floor_amenities_heading: "주요 시설",
    floor_guidelines_title: "이용 규칙 & 안내",
    floor_tag_active: "액티브 존",
    about_title: "연혁 & 콘셉트",
    about_subtitle: "메트로 마닐라 웰니스 시장의 패러다임 변화",
    about_history_title: "엠그란드 스파의 시작",
    about_history_p1: "2025년 2월 16일 소프트 오프닝을 통해 식사 불포함 Php 669의 파격적인 요금으로 사우나 모델을 선보였습니다. 이어 2025년 4월 26일 사자춤과 용 눈 동공 개안식 등 행운을 기원하는 대대적인 그랜드 오프닝 축제를 개최하였습니다.",
    about_design_title: "수직적 분리 철학",
    about_design_p1: "이 시설은 소음이 발생하는 액티브 소셜 영역과 고요한 치료 영역을 수직으로 엄격히 분리하여 도시 생활로부터 격리된 정서적 안식처를 제공합니다. 아얄라몰 마닐라베이 및 Parqal 몰 인근에 있으며 NAIA 공항에서 15-20분 거리로 공항 환승객들에게 안성맞춤입니다.",
    gallery_title: "프리미엄 갤러리",
    tab_spa_menu: "스파 & 테라피 메뉴",
    tab_rfid_calc: "RFID 입장 요금 시뮬레이터",
    tab_weekday_packages: "주중 특별 패키지",
    tab_buffet_schedule: "24시간 뷔페 가이드",
    services_menu_title: "웰니스 프로그램 안내",
    services_menu_subtitle: "전문화된 로컬 및 중국 전문 테라피스트들이 선사하는 프리미엄 바디 케어",
    rfid_calc_title: "입장권 & RFID 정산액 시뮬레이터",
    rfid_calc_subtitle: "12시간 스테이 요금(입장권, 프라이빗 룸 대여, 마사지 등)을 미리 계산해 보세요.",
    calc_selections_title: "옵션 선택",
    opt_standard_rate: "표준 핵심 요금제 (무제한 뷔페 포함)",
    opt_anniversary_rate: "6주년 기념 프로모션 요금제 (식사 불포함/선택형)",
    calc_label_pricing_model: "요금 모델",
    calc_label_adults: "성인 인원수",
    calc_label_children: "소인 인원수",
    calc_label_meals: "뷔페 식사 추가 (기념 프로모션 요금제 전용)",
    calc_label_lodging: "프라이빗 스위트 대여 (선택)",
    opt_no_lodging: "객실 예약 없음",
    calc_label_therapies: "마사지 테라피 추가",
    calc_label_therapist_type: "테라피스트 지정",
    receipt_brand: "엠그란드 스파 마닐라",
    receipt_tagline: "RFID 손목밴드 모의 정산 내역서",
    receipt_subtotal: "소계",
    receipt_vat: "부가가치세 (VAT 12%)",
    receipt_service_charge: "봉사료 (3%)",
    receipt_total: "최종 예상 정산액",
    receipt_footer_msg: "테라피스트 팁은 체크아웃 시 RFID 손목밴드를 스캔하여 한 번에 결제됩니다.",
    packages_title: "주중 스페셜 패키지",
    packages_subtitle: "월요일부터 목요일까지 전용 할인 혜택 (성인 입장권 + 전문 마사지 + 뷔페 3회 제공)",
    buffet_title: "24시간 연속 다이닝 뷔페 시간표",
    buffet_subtitle: "입장권에 포함된 24시간 식사 타임테이블",
    buffet_waste_penalty_title: "잔반 줄이기 페널티 안내",
    buffet_waste_penalty_desc: "음식물 쓰레기 방지를 위해 남은 잔반 양에 따라 RFID 손목밴드에 환경 부담금이 부과될 수 있습니다. 드실 만큼만 정갈히 가져가 주시기 바랍니다.",
    booking_title: "온라인 예약 서비스",
    booking_subtitle: "프라이빗 룸 또는 고화질 멀티 시네마룸 등 엔터테인먼트 존을 실시간으로 예약하세요.",
    booking_label_name: "예약자 성함 *",
    booking_label_contact: "연락처 / Viber *",
    booking_label_email: "이메일 주소",
    booking_label_date: "이용 예정일 *",
    booking_label_time: "예정 도착 시간 *",
    booking_label_category: "예약 카테고리 *",
    booking_cat_suite: "프라이빗 객실 스위트 대여 (5F)",
    booking_cat_amenity: "프리미엄 엔터테인먼트 존 대여 (6F)",
    booking_label_item: "룸/시설 품목 선택 *",
    booking_label_duration: "이용 시간",
    booking_label_guests: "동반 인원수",
    booking_label_notes: "특별 요청 사항",
    booking_btn_submit: "예약 완료 신청",
    starlight_title: "스타라이트 프리미엄 로열티 (STARLIGHT MEMBERSHIP)",
    starlight_subtitle: "최고급 회원 전용 혜택을 누리세요",
    starlight_perk1_title: "1페소 스타라이트 회원 가입",
    starlight_perk1_desc: "1, 1페소로 스타라이트 회원을 개통할 수 있습니다 (888p 마사지 1회 무료).",
    starlight_perk2_title: "2층 무료 맥주 무제한 제공",
    starlight_perk2_desc: "2, 스타라이트 회원은 새벽 1시부터 새벽 5시까지 2층에서 무료로 맥주를 무제한 마실 수 있습니다 (새벽1:00-5:00).",
    starlight_perk3_title: "무료 세차 서비스",
    starlight_perk3_desc: "3, 무료 세차(점심12:00-새벽00:00).",
    starlight_perk4_title: "SNS 팔로우 무료 마사지",
    starlight_perk4_desc: "공식 SNS 채널(Facebook/TikTok/Instagram)을 팔로우하실 때마다, 계정당 888p 무료 마사지 1회 이용권을 드립니다.",
    photoboard_title: "엠그란드 리포트 포토존",
    photoboard_subtitle: "매월 14일 커플 포토존에서 사진 촬영 후 SNS 업로드 시 5층 객실 4시간 무료 대여권을 선사합니다!",
    contact_header: "문의처 안내",
    contact_desc: "입장권 단체 구매, 기업 제휴 예약, 전용 교통 셔틀 관련 상세 내용은 아래 공식 채널을 통해 친절히 도와드립니다.",
    parking_title: "실시간 주차 현황",
    parking_max: "주차 제한: 30대 수용",
    parking_label_available: "주차 가능 주차면수",
    parking_overflow_hint: "엠그란드 온사이트 주차 면수 부족 시, 인접한 Parqal 몰의 전용 유료 주차 타워를 편리하게 이용하실 수 있습니다.",
    feedback_form_header: "소중한 고객 후기",
    feedback_form_subheader: "보내주신 개선 의견과 후기는 시설 서비스 향상을 위해 임직원 경영 보고서에 적극 반영됩니다.",
    feedback_label_name: "이름",
    feedback_label_contact: "연락처 또는 이메일",
    feedback_label_rating: "종합 평점",
    feedback_label_message: "의견/제안 사항 적어주기 *",
    feedback_btn_submit: "피드백 전송",
    mock_social_1: "5층 타타미 방에서 멋진 데이트를 보냈습니다! 커플 존에서 찍은 사진 덕분에 4시간 무료 이용권을 받았어요. #엠그란드데이트",
    mock_social_2: "맛있는 크랩 뷔페와 맥주를 즐기면서 월드컵을 관람했어요. 스타라이트 스코어 예측 짱! ⚽️🍺 #엠그란드스타라이트",
    mock_social_3: "어린이날 무료 입장 덕에 아이들과 신나는 시간을 보냈어요. 석고 피규어 색칠 대회도 참여했네요. 강력 추천합니다! #엠그란드키즈",
    exp_title: "체험 여정",
    exp_subtitle: "6층 규모의 수직 웰니스 구조를 따라 최적화된 투숙 동선을 탐색해보세요",
    exp_timeline_heading: "12시간 스파 스테이 전체 일정",
    exp_step_label: "단계",
    exp_j1_title: "도착 & 슬리퍼 교환",
    exp_j1_desc: "실내 전용 소독 슬리퍼로 교환하고, 프런트에서 체크인 후 RFID 추적 손목밴드를 수령합니다.",
    exp_j2_title: "무제한 뷔페 다이닝",
    exp_j2_desc: "정통 중화 요리와 필리핀 로컬 음식을 24시간 4세션 무제한 럭셔리 뷔페로 즐기세요.",
    exp_j3_title: "온천 온수 스파 구역",
    exp_j3_desc: "성별 분리된 웨트 풀, 온냉 수치료 스프링, 스팀룸 및 건식 사우나에서 깊은 휴식을 취하세요.",
    exp_j4_title: "근골격계 회복 테라피",
    exp_j4_desc: "드라이 핀치 마사지, 오일 테라피, 또는 TCM 정골 관절 교정으로 신체를 재충전하세요.",
    exp_j5_title: "소셜 허브 & 엔터테인먼트",
    exp_j5_desc: "시네마 라운지에서 영화 감상, 골프 시뮬레이터 및 아케이드 게임을 즐기고, 조용한 수면 캡슐에서 푹 쉬세요.",
    exp_j6_title: "스테이트먼트 체크아웃",
    exp_j6_desc: "프런트에서 RFID 손목밴드를 반납하고, 추가 청구 내역을 정산한 뒤 체크아웃합니다.",
    wellness_title: "당신만의 웰니스 시간",
    wellness_subtitle: "시그니처 회복 테라피로 몸과 마음을 완전히 재충전하세요",
    wellness_book_btn: "테라피 예약",
    wellness_dry_title: "드라이 핀치 마사지",
    wellness_dry_duration: "30분",
    wellness_dry_rate: "Php 888 – Php 988",
    wellness_dry_desc: "손, 발, 머리, 등의 구조적 압점 자극에 집중합니다. 공용 라운지 또는 시네마 극장에서 진행됩니다.",
    wellness_oil_title: "스탠다드 오일 마사지",
    wellness_oil_duration: "60분",
    wellness_oil_rate: "Php 1,588부터",
    wellness_oil_desc: "방음 프라이빗 트리트먼트 룸에서 유기농 에센셜 오일을 사용한 프리미엄 전신 마사지. 핫티 및 제철 과일 제공.",
    wellness_tcm_title: "한방 정골 요법 (TCM)",
    wellness_tcm_duration: "상담 후 결정",
    wellness_tcm_rate: "Php 1,500",
    wellness_tcm_desc: "자격증 취득 전문가가 시행하는 전통 중의학 근골격 교정 및 관절 가동 치료.",
    updates_title: "최신 소식",
    updates_subtitle: "다채로운 시즌 프로모션과 이벤트 소식을 놓치지 마세요",
    about_hub_title: "아시아나 시티 웰니스 허브",
    about_hub_desc: "엠그란드 스파 마닐라는 파라냐케시 아시아나 시티 브라드코 애비뉴에 위치한 24시간 프리미엄 도심 웰니스 목적지입니다. 아얄라몰 마닐라베이, Parqal 몰, Mall of Asia 인근에 위치하며 NAIA 공항에서 15-20분 거리로, 환승 여행객과 스테이케이션을 즐기는 분들에게 이상적인 휴식처입니다.",
    facilities_title: "시설 안내",
    facilities_subtitle: "가상 투어, 이미지 갤러리, 6층 층별 안내로 엠그란드의 모든 시설을 경험하세요",
    video_tour_label: "시설 가상 투어 영상",
    floor_dir_heading: "층별 시설 상세 안내",
    diff_title: "우리만의 차별점",
    diff_subtitle: "엠그란드 스파 시그니처 웰니스 모델을 정의하는 독창적인 운영 철학을 알아보세요",
    diff_card1_title: "수직적 분리 철학",
    diff_card1_desc: "소음이 발생하는 액티브 소셜 구역(1F 슬리퍼 교환, 2F 뷔페, 6F 아케이드)과 고요한 치료 공간(3F 온천 풀, 5F 마사지 룸)을 물리적으로 완전히 분리합니다. 도시 소음에서 완전한 릴렉세이션으로 자연스럽게 전환되는 심리적 완충 구조를 만들어냅니다.",
    diff_card2_title: "24시간 연속 뷔페 다이닝",
    diff_card2_desc: "일반 스파와 달리, 표준 입장권에는 24시간 지속되는 전천후 다이닝 사이클이 포함됩니다. 아침·점심·저녁·심야 총 4회 식사 세션을 통해 정통 중화 요리와 필리핀 로컬 음식을 제공합니다.",
    diff_card3_title: "웨트 존 노폰 프라이버시 보장",
    diff_card3_desc: "VIP 게스트의 절대적인 프라이버시를 위해 3층 성별 분리 온천 풀, 탈의실, 사우나 구역에서 휴대폰 사용이 엄격히 금지됩니다. 사물함 옆 충전 보관함을 제공하여 완전한 안심과 디지털 방해 없는 신체 회복을 보장합니다.",
    commit_title: "우리의 약속",
    commit_subtitle: "운영 품질, 고객 안정감, 최고 수준의 서비스에 대한 엠그란드의 변함없는 헌신",
    commit_card1_title: "지속 가능한 식문화",
    commit_card1_desc: "환경 지속 가능성을 위해 24H 뷔페에서 잔반 페널티를 적용합니다. 지나친 음식 낭비 시 RFID 손목밴드에 자동으로 요금이 추가되며, 이를 통해 불필요한 낭비를 줄이고 신선한 프리미엄 식재료를 지속적으로 유지합니다.",
    commit_card2_title: "깊은 수면 정숙 프로토콜",
    commit_card2_desc: "정신 회복을 위한 정숙함은 필수입니다. 6층 수면 캡슐 구역에서 자정 12시부터 오전 6시까지 엄격한 정숙 시간을 운영합니다. 고성능 방음 자재와 정기적인 직원 순찰로 소음 방해를 철저히 차단합니다.",
    commit_card3_title: "테라피 품질 표준",
    commit_card3_desc: "족욕, 오일 마사지, TCM 정골 요법 모두 자격 취득 전문가가 담당합니다. 엄격한 자격증 심사 시스템을 유지하며, 테라피스트 팁은 RFID 영수증에 투명하게 자동 기록됩니다.",
    social_posts_title: "소셜 미디어 게시물",
    social_share_label: "공유",
    map_section_title: "엠그란드 스파 위치 지도",
    map_section_subtitle: "아시아나 시티 핵심 지역에 위치 — MOA, Parqal, NAIA 인접",
    map_near_hint: "Parqal 몰 & Mall of Asia 인근 • NAIA 공항에서 15-20분",
    map_directions_btn: "길 안내 받기",
    map_lm1_label: "NAIA 국제공항",
    map_lm1_dist: "차로 15-20분",
    map_lm2_label: "Mall of Asia",
    map_lm2_dist: "차로 10분",
    map_lm3_label: "Parqal 몰",
    map_lm3_dist: "도보 3분",
    map_lm4_dist: "차로 5분",
    camp1_title: "어린이날 그림 그리기 대회",
    camp1_desc: "소인 무료 입장 및 식사 포함. 석고 피규어 페인팅 대회 1등에게는 Php 10,000의 상금이 수여됩니다!",
    camp2_title: "이달의 커플 프로모션",
    camp2_desc: "매월 14일, 포토존에서 커플 사진 촬영 후 SNS 업로드 시 5층 객실 4시간 무료 이용권을 즉시 지급합니다!",
    camp3_title: "유 스펜드, 위 페이",
    camp3_desc: "매일 오후 6시, 추첨을 통해 3명의 회원에게 오늘 이용하신 RFID 지출 금액을 전액 환불해 드립니다!",
    camp4_title: "당신만을 위한 생일 이벤트",
    camp4_desc: "생일 전후 3일 이내에 3명 이상의 동행인과 함께 방문 시 본인 입장료 무료! 반나절 전 사전 예약 시 아름다운 생일 케이크를 무료로 증정합니다.",
    days: "일",
    hours_short: "시간",
    minutes_short: "분",
    seconds_short: "초",
    campaign_concluded: "🎉 이벤트가 종료되었습니다",
    loading_timer: "타이머 로딩 중...",
    gallery_gp1: "럭셔리한 3층 온천 스파 & 수치료 풀장",
    gallery_gp2: "다량의 식사가 준비된 2층 고품격 뷔페 홀",
    gallery_gp3: "5층 프라이빗 마사지 치료 및 회복 객실",
    gallery_gp4: "6층 그룹 소셜 라운지 및 엔터테인먼트 허브",
    gallery_gp5: "프리미엄 6층 조용하고 아늑한 수면 캡슐 객실",
    vid1_title: "그랜드 오프닝 세레머니 축제",
    vid1_desc: "용 눈 개안식 및 사자춤 기원 이벤트",
    vid2_title: "시설 가상 가이드 동영상 투어",
    vid2_desc: "사우나, 스위트룸, 엔터존을 둘러보는 가이드",
    floor_1_tag: "웰컴 & 슈즈 보관소",
    floor_1_desc: "외부 신발을 위생적인 전용 슬리퍼로 교환하고 프런트 데스크에서 체크인 후 스마트 RFID 손목밴드를 받습니다.",
    floor_1_am1: "안내 데스크 및 RFID 손목밴드 발급",
    floor_1_am2: "소독 슬리퍼 교환",
    floor_1_am3: "안전 물품 보관소 & 사물함",
    floor_1_guide: "외부 신발을 반드시 교환하십시오. RFID 손목밴드는 항상 손목에 안전하게 착용해야 합니다.",
    floor_2_tag: "뷔페 다이닝 구역",
    floor_2_desc: "많은 고객을 동시에 수용할 수 있는 넓고 쾌적한 뷔페 홀. 정통 중국 지역 요리와 필리핀 현지 요리가 24시간 내내 제공됩니다.",
    floor_2_am1: "중국-필리핀 퓨전 뷔페 코너",
    floor_2_am2: "프리미엄 커피 & 웰빙 티 바",
    floor_2_am3: "식사 전용 카트 구비",
    floor_2_guide: "남은 음식이 많을 경우 환경 부담금이 RFID 손목밴드에 자동 부과됩니다. 드실 만큼만 알맞게 담아주세요.",
    floor_3_tag: "프라이버시 사우나 웨트 존",
    floor_3_desc: "철저히 남녀 분리되어 고객의 프라이버시를 보장하는 핵심 회복 시설. 온천탕, 한증막 및 세신실이 마련되어 있습니다.",
    floor_3_am1: "온천 스파 탕 (두 가지 온도)",
    floor_3_am2: "아이스 냉탕",
    floor_3_am3: "전용 세신 & 바디 스크럽 구역",
    floor_3_am4: "한증막 및 건식 사우나실",
    floor_3_guide: "3층 스파 구역(락커룸, 탕) 내부에서는 휴대폰 사용이 엄격히 금지됩니다. 탕에 들어가기 전 샤워는 필수입니다.",
    floor_5_tag: "휴식 & 프라이빗 객실",
    floor_5_desc: "방음 처리되어 아늑한 환경에서 깊은 마사지 치료, 전문 한방 정골 요법, 장시간 휴식 및 숙박을 취할 수 있습니다.",
    floor_5_am1: "스탠다드 킹 침대 숙박 스위트룸",
    floor_5_am2: "타타미 소회의실 & 모임 방",
    floor_5_am3: "고급 자동 마작/보드게임 룸",
    floor_5_am4: "전통 중의학 정골 척추 치료실",
    floor_5_guide: "객실은 4시간 또는 12시간 대여가 가능합니다. 치료 서비스 이용 시 규정 소팁(현지 테라피스트 Php 200 / 중국 전문의 Php 500)이 적용됩니다.",
    floor_6_tag: "소셜 & 레크리에이션",
    floor_6_desc: "투숙 기간 동안 친구, 연인, 가족과 함께 다양한 즐길 거리와 친목 도모를 할 수 있는 다목적 소셜 공간입니다.",
    floor_6_am1: "고화질 멀티 영화 감상실",
    floor_6_am2: "다양한 오락 기기가 있는 게임 룸",
    floor_6_am3: "실내 스크린 골프 시뮬레이터",
    floor_6_am4: "안전한 실내 키즈 놀이터",
    floor_6_am5: "빈백 소파 휴식 구역 (비둘기 방 & 피닉스 둥지)",
    floor_6_am6: "개인용 안락 수면 캡슐",
    floor_6_guide: "수면 구역은 자정 12시부터 오전 6시까지 에티켓 정숙 시간입니다. 매점 이용 요금은 별도 정산됩니다.",
    buffet_bf_title: "조식 세션",
    buffet_bf_desc: "따뜻한 흰죽, 신선한 로컬 브레드, 페이스트리 및 향긋한 프리미엄 원두 커피.",
    buffet_ln_title: "중식 뷔페",
    buffet_ln_desc: "수제 만두와 딤섬 카트, 아시안 요리, 수제 누들 코너 및 엄선된 디저트.",
    buffet_dn_title: "석식 만찬",
    buffet_dn_desc: "즉석 고기 바비큐, 신선한 새우와 꽃게 해산물 바, 신선한 초밥 및 라이브 공연 감상.",
    buffet_ms_title: "심야 야식 코너",
    buffet_ms_desc: "야간 환승 여행객들을 위해 든든하게 속을 채워줄 따뜻한 국물 요리와 만두, 가벼운 죽 제공.",
    label_address: "주소",
    label_viber: "Viber 예약 핫라인",
    label_secondary_hotline: "모바일 보조 연락처",
    label_email: "이메일 주소",
    hint_parking_overflow: "엠그란드 주차장 만차 시, 차량은 바로 인근의 유료 주차 타워를 편리하게 이용할 수 있습니다:",
    opt_rate_excellent: "⭐⭐⭐⭐⭐ 아주 훌륭한 숙박이었습니다",
    opt_rate_good: "⭐⭐⭐⭐ 아주 좋은 서비스였습니다",
    opt_rate_neutral: "⭐⭐⭐ 보통 / 평이함",
    opt_rate_fair: "⭐⭐ 조금 아쉬웠습니다",
    opt_rate_poor: "⭐ 서비스 개선이 시급합니다",
    placeholder_feedback: "엠그란드에 머무시는 동안 느낀 이용 후기, 마사지 만족도, 식사 경험 등을 자세히 남겨주세요...",
    toast_feedback_success: "🎉 후기가 성공적으로 제출되었습니다! 보내주신 의견은 서비스 개선에 사용됩니다.",
    toast_feedback_error: "❌ 후기 제출 중 오류가 발생했습니다. 다시 시도해 주세요.",
    toast_booking_success: "🎉 예약이 성공적으로 신청되었습니다! 담당 부서에서 확인 후 빠르게 연락드리겠습니다.",
    toast_booking_error: "❌ 예약 신청 중 오류가 발생했습니다. 다시 시도해 주세요.",
    label_hours: "시간",
    label_duration_4h: "4 시간",
    label_duration_12h: "12 시간",
    label_placeholder_notes: "예: 알레르기/식단 조절 요망, 특정 마사지 강도 선호, 기타 요청 사항...",
    label_reels_title: "엠그란드 인스타그램 릴스 & 갤러리 영상",
    label_reels_subtitle: "공식 SNS 채널의 시설 투어, 개업식 축하 영상 등 다양한 클립을 감상해 보세요",
    label_no_reels: "현재 등록된 가상 투어 동영상이 없습니다.",
    chat_welcome: "엠그란드 스파 마닐라에 오신 것을 환영합니다! 저는 웰니스 어시스턴트입니다. 시설, 서비스, 패키지, 뷔페 시간표, 요금 규정 등 궁금한 점을 무엇이든 물어보세요.",
    chat_title: "엠그란드 온라인 상담원",
    chat_subtitle: "온라인 웰니스 가이드",
    chat_chip_price: "🎟️ 입장 요금",
    chat_chip_buffet: "🍲 뷔페 시간표",
    chat_chip_packages: "🎁 주중 패키지",
    chat_chip_location: "📍 위치 & 연락처",
    chat_placeholder: "메시지를 입력하세요...",
    chat_err_groq: "⚠️ 연결 오류가 발생했습니다. 관리자 설정 페이지에서 API 설정을 다시 확인해 주세요.",
    chat_err_network: "⚠️ 네트워크 오류. 서비스에 접속할 수 없습니다.",
    chat_offline_mode: "현재 모의/오프라인 모드로 작동 중입니다. 자동 응답을 활성화하려면 관리자 콘솔 -> 앱 설정에서 올바른 API 키를 설정하십시오.\n\n",
    chat_mock_price: "성인 12시간 표준 입장 요금은 Php 1,699이며 아동 입장 요금은 Php 899(80cm~119cm)입니다. 이 입장권에는 24시간 4회 뷔페 식사 무제한 이용, 3층 스파탕실, 영화 감상 라운지, 건식 사우나가 전부 포함되어 있습니다.",
    chat_mock_buffet: "24시간 무료 다이닝 운영 시간: 조식(오전 7:00 ~ 오전 9:00), 중식(오전 11:00 ~ 오후 1:00), 석식(오후 6:00 ~ 오후 9:00), 심야 스낵(오후 11:00 ~ 오전 1:00). 모든 식사를 마음껏 이용하실 수 있습니다!",
    chat_mock_packages: "주중(월~목) 전용 실속형 할인 패키지 3종이 마련되어 있습니다: 패키지 A(Php 2,880 - Php 2,404 절약), 패키지 B(Php 3,180 - Php 2,404 절약), 패키지 C(Php 3,580 - Php 2,704 절약). 입장권, 뷔페 식사, 프리미엄 마사지가 모두 한 장에 들어있습니다.",
    chat_mock_location: "저희는 파라냐케시 아시아나 시티 브라드코 애비뉴 3구역 5블록(Parqal 몰 바로 옆, MOA와 NAIA 공항에서 차로 10~15분 거리)에 위치해 있습니다. Viber 핫라인 0992-1888-888 또는 0992-1999-999를 통해 24시간 실시간 상담이 가능합니다.",
    chat_mock_default: "엠그란드 스파 마닐라는 3층 온천 스파, 5층 프리미엄 마사지 및 TCM 정골 요법, 6층 소셜 엔터테인먼트 존을 제공하는 24시간 웰니스 목적지입니다. 오늘 어떤 도움을 드릴까요?",
    footer_copy: "&copy; 2026 엠그란드 스파 마닐라. All rights reserved.",
    service_cat_admission: "입장권 & 이용 요금",
    service_cat_massage: "힐링 바디 마사지 테라피",
    service_cat_tcm: "한방 전통 정골 요법",
    service_cat_lodging: "프라이빗 객실 & 스위트",
    service_cat_special: "특별 케어 프로그램",
    calc_adult_stay_ticket: "성인 입장 요금",
    calc_child_stay_ticket: "소인 입장 요금",
    calc_addon_breakfast: "조식 추가 요금",
    calc_addon_lunch: "중식 추가 요금",
    calc_addon_dinner: "석식 추가 요금",
    calc_addon_midnight: "심야 야식 추가",
    calc_mand_tips: "의무 봉사 소팁",
    calc_chinese_spec: "중국인 정골 전문의",
    calc_local: "현지 테라피스트",
    calc_therapist_local_desc: "현지 테라피스트 (서비스당 Php 200 고정 소팁 자동 추가)",
    calc_therapist_chinese_desc: "중국 전문의 (서비스당 Php 500 고정 소팁 자동 추가)",
    calc_save: "절약",
    calc_book_pkg: "예약하기",
    calc_spa_pass_inclusions: "12시간 기본 입장권 포함 내역",
    calc_spa_pass_desc: "엠그란드의 최고급 웰니스 사우나 시설들을 머무시는 동안 제한 없이 마음껏 이용해 보세요:",
    calc_spa_pass_pool: "온탕, 냉탕 및 수치료 전용 온천탕",
    calc_spa_pass_sauna: "습식 사우나실 & 전통 한증막",
    calc_spa_pass_resting: "안락한 단체 수면 라운지 및 빈백 구역",
    calc_spa_pass_cinema: "최신 영화 시네마 극장, 책장 및 기가 무료 와이파이",
    calc_spa_pass_billiards: "당구대, 각종 아케이드 기기 및 키즈존",
    calc_spa_pass_pigeon: "비둘기 하우스 & 피닉스 개인 릴렉스 둥지",
    calc_spa_pass_toiletries: "프리미엄 바디 워시/샴푸 완비, 최고급 타올 및 사우나 의류 제공",
    calc_unlimited_buffet_title: "24시간 4개 타임 무제한 요리 제공 뷔페",
    calc_unlimited_buffet_desc: "이용 시간 동안 제한 없이 몇 번이든 이용해 보세요:",
    calc_unlimited_buffet_seafood: "신선한 바다 게, 새우 해산물과 즉석 그릴 육류",
    calc_unlimited_buffet_cuisine: "정통 차이니즈 요리 및 현지 필리핀 인기 음식",
    calc_unlimited_buffet_desserts: "과일 화채, 고급 조각 케이크 및 프리미엄 탄산음료",
    calc_buffet_schedule_sessions: "뷔페 세부 타임테이블 안내:",
    adm_sidebar_services: "서비스 카탈로그",
    adm_sidebar_packages: "서비스 패키지",
    adm_sidebar_bookings: "예약 관리자",
    adm_sidebar_campaigns: "이벤트 및 캠페인",
    adm_sidebar_seo: "SEO 설정",
    adm_sidebar_banners: "홈 배너",
    adm_sidebar_gallery: "갤러리 사진",
    adm_sidebar_videos: "비디오",
    adm_sidebar_socials: "소셜 포스트",
    adm_sidebar_perks: "멤버십",
    adm_sidebar_chatbot: "챗봇 학습",
    adm_sidebar_feedback: "고객 피드백",
    adm_sidebar_analytics: "분석 및 로그",
    adm_sidebar_settings: "앱 설정 및 키",
    adm_sidebar_accounts: "사용자 계정",
    adm_sidebar_logout: "로그아웃",
    adm_title_services: "서비스 카탈로그 관리",
    adm_title_packages: "평일 마사지 패키지",
    adm_title_bookings: "고객 예약 관리자",
    adm_title_campaigns: "동적 카운트다운 이벤트 배너",
    adm_title_seo: "SEO 환경 설정",
    adm_title_banners: "홈 히어로 배너 설정",
    adm_title_gallery: "가상 투어 갤러리 사진",
    adm_title_videos: "시설 투어 안내 비디오",
    adm_title_socials: "소셜 포토 보드 게시물",
    adm_title_perks: "스타라이트 회원 프리미엄 혜택",
    adm_title_chatbot: "AI 컨시어지 챗봇 교육 및 시스템 지침",
    adm_title_feedback: "고객 의견 제출함",
    adm_title_analytics: "데이터 분석 및 시스템 로그",
    adm_title_settings: "앱 설정 및 API 키 설정",
    adm_title_accounts: "사용자 계정 및 역할 권한 관리",
    adm_btn_add: "새 항목 추가",
    adm_btn_save: "저장",
    adm_btn_delete: "삭제",
    adm_btn_edit: "편집",
    adm_th_title: "제목",
    adm_th_category: "카테고리",
    adm_th_price: "가격 (Php)",
    adm_th_tips: "팁",
    adm_th_actions: "작업",
    adm_th_name: "이름",
    adm_lbl_title_en: "제목 (영어)",
    adm_lbl_title_zh: "제목 (중국어)",
    adm_lbl_title_ko: "제목 (한국어)",
    adm_lbl_desc_en: "설명 (영어)",
    adm_lbl_desc_zh: "설명 (중국어)",
    adm_lbl_desc_ko: "설명 (한국어)",
    adm_lbl_inclusions_en: "포함 내역 (영어 - 쉼표로 구분)",
    adm_lbl_inclusions_zh: "포함 내역 (중국어 - 쉼표로 구분)",
    adm_lbl_inclusions_ko: "포함 내역 (한국어 - 쉼표로 구분)",
    adm_lbl_rate: "가격 / 요금 (Php)",
    adm_lbl_savings: "예상 절약 금액 (Php)",
    adm_lbl_image: "이미지 URL 경로",
    adm_lbl_url: "URL 링크",
    adm_lbl_likes: "좋아요 수",
    adm_lbl_username: "사용자 이름",
    adm_lbl_message: "메시지 / 본문 내용",
    adm_lbl_email: "이메일 주소",
    adm_lbl_role: "역할 / 권한 등급"
  }
};

const defaultFloors = {
  '1': {
    title: 'floor_1_title',
    tag: 'floor_1_tag',
    desc: 'floor_1_desc',
    amenities: [
      { icon: 'fa-ticket', text: 'floor_1_am1' },
      { icon: 'fa-shoe-prints', text: 'floor_1_am2' },
      { icon: 'fa-shield-halved', text: 'floor_1_am3' }
    ],
    guidelines: 'floor_1_guide'
  },
  '2': {
    title: 'floor_2_title',
    tag: 'floor_2_tag',
    desc: 'floor_2_desc',
    amenities: [
      { icon: 'fa-utensils', text: 'floor_2_am1' },
      { icon: 'fa-mug-hot', text: 'floor_2_am2' },
      { icon: 'fa-cart-shopping', text: 'floor_2_am3' }
    ],
    guidelines: 'floor_2_guide'
  },
  '3': {
    title: 'floor_3_title',
    tag: 'floor_3_tag',
    desc: 'floor_3_desc',
    amenities: [
      { icon: 'fa-temperature-arrow-up', text: 'floor_3_am1' },
      { icon: 'fa-snowflake', text: 'floor_3_am2' },
      { icon: 'fa-soap', text: 'floor_3_am3' },
      { icon: 'fa-wind', text: 'floor_3_am4' }
    ],
    guidelines: 'floor_3_guide'
  },
  '5': {
    title: 'floor_5_title',
    tag: 'floor_5_tag',
    desc: 'floor_5_desc',
    amenities: [
      { icon: 'fa-bed', text: 'floor_5_am1' },
      { icon: 'fa-table-cells-large', text: 'floor_5_am2' },
      { icon: 'fa-users', text: 'floor_5_am3' },
      { icon: 'fa-hand-sparkles', text: 'floor_5_am4' }
    ],
    guidelines: 'floor_5_guide'
  },
  '6': {
    title: 'floor_6_title',
    tag: 'floor_6_tag',
    desc: 'floor_6_desc',
    amenities: [
      { icon: 'fa-film', text: 'floor_6_am1' },
      { icon: 'fa-gamepad', text: 'floor_6_am2' },
      { icon: 'fa-golf-ball-tee', text: 'floor_6_am3' },
      { icon: 'fa-child-reaching', text: 'floor_6_am4' },
      { icon: 'fa-moon', text: 'floor_6_am5' },
      { icon: 'fa-bed', text: 'floor_6_am6' }
    ],
    guidelines: 'floor_6_guide'
  }
};

const defaultBuffetTimeline = [
  { id: 'b_bf', time: '7:00 AM - 9:00 AM', title: 'buffet_bf_title', desc: 'buffet_bf_desc' },
  { id: 'b_ln', time: '11:00 AM - 1:00 PM', title: 'buffet_ln_title', desc: 'buffet_ln_desc' },
  { id: 'b_dn', time: '6:00 PM - 9:00 PM', title: 'buffet_dn_title', desc: 'buffet_dn_desc' },
  { id: 'b_ms', time: '11:00 PM - 1:00 AM', title: 'buffet_ms_title', desc: 'buffet_ms_desc' }
];

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Dynamic App State
  const [services, setServices] = useState(defaultServices);
  const [campaigns, setCampaigns] = useState(defaultCampaigns);
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState(defaultFeedbacks);
  const [auditLogs, setAuditLogs] = useState(defaultAuditLogs);
  const [chatLogs, setChatLogs] = useState([]);

  // New admin view dynamic states
  const [seoSettings, setSeoSettings] = useState(defaultSeoSettings);
  const [activeSEO, setActiveSEO] = useState(null);
  const [homeBanner, setHomeBanner] = useState(defaultHomeBanner);
  const [servicePackages, setServicePackages] = useState(defaultServicePackages);
  const [galleryPhotos, setGalleryPhotos] = useState(defaultGalleryPhotos);
  const [promoVideos, setPromoVideos] = useState(defaultPromoVideos);
  const [socialPosts, setSocialPosts] = useState(defaultSocialPosts);
  const [membershipPerks, setMembershipPerks] = useState(defaultMembershipPerks);
  const [chatbotFAQs, setChatbotFAQs] = useState(defaultChatbotFAQs);
  const [chatbotKeyPoints, setChatbotKeyPoints] = useState(defaultChatbotKeyPoints);
  const [chatbotInstructions, setChatbotInstructions] = useState(defaultChatbotInstructions);
  const [userAccounts, setUserAccounts] = useState([]);
  
  // Interactive parking simulation
  const [parkingSpots, setParkingSpots] = useState(24);
  
  // Admin Login State
  const [adminUser, setAdminUser] = useState(null);
  
  // Custom API configurations
  const [fbConfig, setFbConfig] = useState({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ""
  });
  const [groqKey, setGroqKey] = useState(process.env.NEXT_PUBLIC_GROQ_API_KEY || '');
  const [groqModel, setGroqModel] = useState('llama-3.1-8b-instant');
  
  // Firebase Auth & Firestore References
  const [dbActive, setDbActive] = useState(false);
  const [firebaseApp, setFirebaseApp] = useState(null);

  // Initialize data on load
  useEffect(() => {
    // Check Local Storage theme
    const storedTheme = localStorage.getItem('emgrand_theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // Check Local Storage configs
    const storedFb = localStorage.getItem('emgrand_fb_config');
    if (storedFb) {
      try {
        const parsed = JSON.parse(storedFb);
        setFbConfig(parsed);
      } catch (e) {
        console.error("Failed to parse fb config", e);
      }
    }

    const storedGroq = localStorage.getItem('emgrand_groq_key');
    if (storedGroq) setGroqKey(storedGroq);

    const storedModel = localStorage.getItem('emgrand_groq_model');
    if (storedModel) setGroqModel(storedModel);

    // Dynamic parking countdown simulation
    const interval = setInterval(() => {
      setParkingSpots(prev => {
        const diff = Math.random() > 0.55 ? 1 : -1;
        const next = prev + diff;
        return Math.max(5, Math.min(30, next));
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Initialize Firebase dynamically if config is provided
  useEffect(() => {
    let checkInterval;
    let unsubs = [];

    // 1. Load offline/localStorage fallback data immediately as default
    setDbActive(false);
    const offlineServices = localStorage.getItem('emgrand_offline_services');
    if (offlineServices) {
      try {
        let parsed = JSON.parse(offlineServices);
        let updated = false;
        parsed = parsed.map(s => {
          if (s.id === 'adm_adult' && s.rate !== 1699) {
            updated = true;
            return { ...s, rate: 1699 };
          }
          return s;
        });
        setServices(parsed);
        if (updated) {
          localStorage.setItem('emgrand_offline_services', JSON.stringify(parsed));
        }
      } catch (e) {
        console.error("Error parsing offline services", e);
        setServices(defaultServices);
      }
    } else {
      setServices(defaultServices);
    }

    const offlineCampaigns = localStorage.getItem('emgrand_offline_campaigns');
    if (offlineCampaigns) {
      try {
        let parsed = JSON.parse(offlineCampaigns);
        if (parsed.length !== defaultCampaigns.length || !parsed.some(c => c.id === 'camp4') || !parsed[0].title_zh) {
          setCampaigns(defaultCampaigns);
          localStorage.setItem('emgrand_offline_campaigns', JSON.stringify(defaultCampaigns));
        } else {
          setCampaigns(parsed);
        }
      } catch (e) {
        setCampaigns(defaultCampaigns);
      }
    } else {
      setCampaigns(defaultCampaigns);
    }

    const offlineBookings = localStorage.getItem('emgrand_offline_bookings');
    if (offlineBookings) setBookings(JSON.parse(offlineBookings));

    const offlineFeedback = localStorage.getItem('emgrand_offline_feedback');
    if (offlineFeedback) setFeedbacks(JSON.parse(offlineFeedback));

    const offlineAudit = localStorage.getItem('emgrand_offline_audit');
    if (offlineAudit) setAuditLogs(JSON.parse(offlineAudit));

    const offlineChat = localStorage.getItem('emgrand_offline_chat');
    if (offlineChat) setChatLogs(JSON.parse(offlineChat));

    const offlineSeo = localStorage.getItem('emgrand_offline_seo');
    if (offlineSeo) setSeoSettings(JSON.parse(offlineSeo));

    const offlineBanner = localStorage.getItem('emgrand_offline_banner');
    if (offlineBanner) {
      try {
        let parsed = JSON.parse(offlineBanner);
        if (!parsed.title_zh) {
          setHomeBanner(defaultHomeBanner);
          localStorage.setItem('emgrand_offline_banner', JSON.stringify(defaultHomeBanner));
        } else {
          setHomeBanner(parsed);
        }
      } catch (e) {
        setHomeBanner(defaultHomeBanner);
      }
    } else {
      setHomeBanner(defaultHomeBanner);
    }

    const offlinePackages = localStorage.getItem('emgrand_offline_packages');
    if (offlinePackages) {
      try {
        let parsed = JSON.parse(offlinePackages);
        let updated = false;
        parsed = parsed.map(pkg => {
          const defaultPkg = defaultServicePackages.find(d => d.id === pkg.id);
          if (defaultPkg && (pkg.savings !== defaultPkg.savings || !pkg.title_zh || !pkg.inclusions_zh)) {
            updated = true;
            return defaultPkg;
          }
          return pkg;
        });
        setServicePackages(parsed);
        if (updated) {
          localStorage.setItem('emgrand_offline_packages', JSON.stringify(parsed));
        }
      } catch (e) {
        setServicePackages(defaultServicePackages);
      }
    } else {
      setServicePackages(defaultServicePackages);
    }

    const offlineGallery = localStorage.getItem('emgrand_offline_gallery');
    if (offlineGallery) setGalleryPhotos(JSON.parse(offlineGallery));

    const offlineVideos = localStorage.getItem('emgrand_offline_videos');
    if (offlineVideos) setPromoVideos(JSON.parse(offlineVideos));

    const offlineSocials = localStorage.getItem('emgrand_offline_socials');
    if (offlineSocials) setSocialPosts(JSON.parse(offlineSocials));

    const offlinePerks = localStorage.getItem('emgrand_offline_perks');
    if (offlinePerks) {
      try {
        let parsed = JSON.parse(offlinePerks);
        if (parsed.length !== defaultMembershipPerks.length || !parsed.some(p => p.id === 'prk4') || !parsed[0].title_zh) {
          setMembershipPerks(defaultMembershipPerks);
          localStorage.setItem('emgrand_offline_perks', JSON.stringify(defaultMembershipPerks));
        } else {
          setMembershipPerks(parsed);
        }
      } catch (e) {
        setMembershipPerks(defaultMembershipPerks);
      }
    } else {
      setMembershipPerks(defaultMembershipPerks);
    }

    const offlineFAQs = localStorage.getItem('emgrand_offline_faqs');
    if (offlineFAQs) setChatbotFAQs(JSON.parse(offlineFAQs));

    const offlineKeyPoints = localStorage.getItem('emgrand_offline_key_points');
    if (offlineKeyPoints) setChatbotKeyPoints(JSON.parse(offlineKeyPoints));

    const offlineInstructions = localStorage.getItem('emgrand_offline_chatbot_instructions');
    if (offlineInstructions) {
      const isOutdated = !offlineInstructions || 
                         (!offlineInstructions.includes("1,699") && !offlineInstructions.includes("1699")) ||
                         (!offlineInstructions.includes("facebook.com/emgrandspa")) || // Force update if social links are missing
                         (offlineInstructions.includes("1,500") && offlineInstructions.toLowerCase().includes("adult"));
      if (isOutdated) {
        setChatbotInstructions(defaultChatbotInstructions);
        localStorage.setItem('emgrand_offline_chatbot_instructions', defaultChatbotInstructions);
      } else {
        setChatbotInstructions(offlineInstructions);
      }
    } else {
      setChatbotInstructions(defaultChatbotInstructions);
    }

    const offlineUsers = localStorage.getItem('emgrand_offline_users');
    if (offlineUsers) {
      setUserAccounts(JSON.parse(offlineUsers));
    } else {
      setUserAccounts([
        { id: 'admin@emgrandspa.com', email: 'admin@emgrandspa.com', role: 'admin', addedAt: new Date().toLocaleString() }
      ]);
    }

    // 2. Initialize online Firebase dynamically once window.firebase is ready
    const initFirebase = () => {
      if (fbConfig && fbConfig.apiKey && window.firebase && window.firebase.apps) {
        clearInterval(checkInterval);
        try {
          let app;
          if (!window.firebase.apps.length) {
            app = window.firebase.initializeApp(fbConfig);
          } else {
            app = window.firebase.app();
          }

          if (app) {
            setFirebaseApp(app);
            setDbActive(true);
            
            const firestore = app.firestore();
            
            const unsubServices = firestore.collection('services').onSnapshot(snap => {
              if (!snap.empty) {
                const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                const updatedList = list.map(item => {
                  const defaultItem = defaultServices.find(d => d.id === item.id);
                  const updates = {};
                  
                  if (item.id === 'adm_adult' && item.rate !== 1699) {
                    updates.rate = 1699;
                  }
                  
                  if (defaultItem) {
                    if (!item.desc_zh && defaultItem.desc_zh) updates.desc_zh = defaultItem.desc_zh;
                    if (!item.desc_ko && defaultItem.desc_ko) updates.desc_ko = defaultItem.desc_ko;
                    if (!item.desc_en && defaultItem.desc_en) updates.desc_en = defaultItem.desc_en;
                  }
                  
                  if (Object.keys(updates).length > 0) {
                    firestore.collection('services').doc(item.id).update(updates);
                    return { ...item, ...updates };
                  }
                  return item;
                });
                
                setServices(updatedList);
              } else {
                defaultServices.forEach(item => {
                  firestore.collection('services').doc(item.id).set(item);
                });
              }
            });
            unsubs.push(unsubServices);

            const unsubCampaigns = firestore.collection('campaigns').onSnapshot(snap => {
              if (!snap.empty) {
                const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCampaigns(list);
                
                // Sync campaigns in Firestore to add multilingual fields if missing
                list.forEach(camp => {
                  const defaultCamp = defaultCampaigns.find(d => d.id === camp.id);
                  if (defaultCamp && (!camp.title_zh || !camp.title_ko || camp.title === 'camp1_title')) {
                    firestore.collection('campaigns').doc(camp.id).set(defaultCamp);
                  }
                });
              } else {
                defaultCampaigns.forEach(item => {
                  firestore.collection('campaigns').doc(item.id).set(item);
                });
              }
            });
            unsubs.push(unsubCampaigns);

            const unsubBookings = firestore.collection('bookings').onSnapshot(snap => {
              const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setBookings(list);
            });
            unsubs.push(unsubBookings);

            const unsubFeedback = firestore.collection('feedbacks').onSnapshot(snap => {
              const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setFeedbacks(list);
            });
            unsubs.push(unsubFeedback);

            const unsubAudit = firestore.collection('audit_logs').orderBy('timestamp', 'desc').limit(50).onSnapshot(snap => {
              const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setAuditLogs(list);
            });
            unsubs.push(unsubAudit);

            const unsubChat = firestore.collection('chat_logs').orderBy('timestamp', 'desc').limit(50).onSnapshot(snap => {
              const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setChatLogs(list);
            });
            unsubs.push(unsubChat);

            const unsubSEO = firestore.collection('seo_settings').doc('main').onSnapshot(doc => {
              if (doc.exists) {
                setSeoSettings(doc.data());
              } else {
                firestore.collection('seo_settings').doc('main').set(defaultSeoSettings);
              }
            });
            unsubs.push(unsubSEO);

            const unsubBanner = firestore.collection('home_banner').doc('main').onSnapshot(doc => {
              if (doc.exists) {
                const data = doc.data();
                setHomeBanner(data);
                if (!data.title_zh) {
                  firestore.collection('home_banner').doc('main').set(defaultHomeBanner);
                }
              } else {
                firestore.collection('home_banner').doc('main').set(defaultHomeBanner);
              }
            });
            unsubs.push(unsubBanner);

            const unsubPackages = firestore.collection('service_packages').onSnapshot(snap => {
              if (!snap.empty) {
                const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setServicePackages(list);
                
                // Sync service packages in Firestore
                list.forEach(pkg => {
                  const defaultPkg = defaultServicePackages.find(d => d.id === pkg.id);
                  if (defaultPkg && (pkg.savings !== defaultPkg.savings || !pkg.title_zh || !pkg.inclusions_zh)) {
                    firestore.collection('service_packages').doc(pkg.id).set(defaultPkg);
                  }
                });
              } else {
                defaultServicePackages.forEach(item => {
                  firestore.collection('service_packages').doc(item.id).set(item);
                });
              }
            });
            unsubs.push(unsubPackages);

            const unsubGallery = firestore.collection('gallery_photos').onSnapshot(snap => {
              if (!snap.empty) {
                const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setGalleryPhotos(list);
              } else {
                defaultGalleryPhotos.forEach(item => {
                  firestore.collection('gallery_photos').doc(item.id).set(item);
                });
              }
            });
            unsubs.push(unsubGallery);

            const unsubVideos = firestore.collection('promo_videos').onSnapshot(snap => {
              if (!snap.empty) {
                const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPromoVideos(list);
              } else {
                defaultPromoVideos.forEach(item => {
                  firestore.collection('promo_videos').doc(item.id).set(item);
                });
              }
            });
            unsubs.push(unsubVideos);

            const unsubSocial = firestore.collection('social_posts').onSnapshot(snap => {
              if (!snap.empty) {
                const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSocialPosts(list);
              } else {
                defaultSocialPosts.forEach(item => {
                  firestore.collection('social_posts').doc(item.id).set(item);
                });
              }
            });
            unsubs.push(unsubSocial);

            const unsubPerks = firestore.collection('membership_perks').onSnapshot(snap => {
              if (!snap.empty) {
                const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMembershipPerks(list);
                
                // Sync membership perks in Firestore
                defaultMembershipPerks.forEach(item => {
                  const existing = list.find(l => l.id === item.id);
                  if (!existing || !existing.title_zh || !existing.desc_zh || existing.icon !== item.icon) {
                    firestore.collection('membership_perks').doc(item.id).set(item);
                  }
                });
              } else {
                defaultMembershipPerks.forEach(item => {
                  firestore.collection('membership_perks').doc(item.id).set(item);
                });
              }
            });
            unsubs.push(unsubPerks);

            const unsubFAQs = firestore.collection('chatbot_faqs').onSnapshot(snap => {
              if (!snap.empty) {
                const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setChatbotFAQs(list);
              } else {
                defaultChatbotFAQs.forEach(item => {
                  firestore.collection('chatbot_faqs').doc(item.id).set(item);
                });
              }
            });
            unsubs.push(unsubFAQs);

            const unsubKeyPoints = firestore.collection('chatbot_key_points').onSnapshot(snap => {
              if (!snap.empty) {
                const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setChatbotKeyPoints(list);
              } else {
                defaultChatbotKeyPoints.forEach(item => {
                  firestore.collection('chatbot_key_points').doc(item.id).set(item);
                });
              }
            });
            unsubs.push(unsubKeyPoints);

            const unsubInstructions = firestore.collection('chatbot_settings').doc('main').onSnapshot(doc => {
              if (doc.exists) {
                const savedInstructions = doc.data().instructions || "";
                const isOutdated = !savedInstructions || 
                                   (!savedInstructions.includes("1,699") && !savedInstructions.includes("1699")) ||
                                   (savedInstructions.includes("1,500") && savedInstructions.toLowerCase().includes("adult"));
                if (isOutdated) {
                  firestore.collection('chatbot_settings').doc('main').set({ instructions: defaultChatbotInstructions });
                  setChatbotInstructions(defaultChatbotInstructions);
                } else {
                  setChatbotInstructions(savedInstructions);
                }
              } else {
                firestore.collection('chatbot_settings').doc('main').set({ instructions: defaultChatbotInstructions });
              }
            });
            unsubs.push(unsubInstructions);

            // Listen to Users (RBAC)
            const unsubUsers = firestore.collection('users').onSnapshot(snap => {
              if (!snap.empty) {
                const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUserAccounts(list);
              } else {
                // If database is brand new and users list is empty, seed admin@emgrandspa.com as admin
                const firstUser = {
                  email: 'admin@emgrandspa.com',
                  role: 'admin',
                  addedAt: new Date().toLocaleString()
                };
                firestore.collection('users').doc('admin@emgrandspa.com').set(firstUser);
                setUserAccounts([{ id: 'admin@emgrandspa.com', ...firstUser }]);
              }
            });
            unsubs.push(unsubUsers);

            // Auth Listener
            const unsubAuth = app.auth().onAuthStateChanged(async user => {
              if (user) {
                try {
                  const userDoc = await firestore.collection('users').doc(user.email.toLowerCase()).get();
                  if (userDoc.exists) {
                    const userData = userDoc.data();
                    if (userData.role === 'admin' || userData.role === 'superadmin') {
                      setAdminUser({ email: user.email, uid: user.uid, role: userData.role });
                    } else {
                      await app.auth().signOut();
                      setAdminUser(null);
                    }
                  } else {
                    await app.auth().signOut();
                    setAdminUser(null);
                  }
                } catch (err) {
                  console.error("Error fetching user profile:", err);
                  setAdminUser(null);
                }
              } else {
                setAdminUser(null);
              }
            });
            unsubs.push(unsubAuth);

            return true;
          }
        } catch (err) {
          console.error("Firebase Initialization Error:", err);
        }
      }
      return false;
    };

    if (fbConfig && fbConfig.apiKey) {
      const success = initFirebase();
      if (!success) {
        checkInterval = setInterval(() => {
          const checkSuccess = initFirebase();
          if (checkSuccess) {
            clearInterval(checkInterval);
          }
        }, 500);
      }
    }

    return () => {
      clearInterval(checkInterval);
      unsubs.forEach(unsub => {
        try {
          unsub();
        } catch (e) {
          console.error("Error running unsubscriber cleanup", e);
        }
      });
    };
  }, [fbConfig]);

  // Translation helper
  const t = useCallback((key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  }, [language]);

  // Switch language
  const toggleLanguage = (lang) => {
    if (translations[lang]) setLanguage(lang);
  };

  // Toggle dark/light theme
  const toggleTheme = () => {
    const target = theme === 'dark' ? 'light' : 'dark';
    setTheme(target);
    localStorage.setItem('emgrand_theme', target);
    document.documentElement.setAttribute('data-theme', target);
  };

  // CRUD for Services
  const addService = async (service) => {
    const newId = service.id || 'service_' + Date.now();
    const serviceData = { ...service, id: newId };
    
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('services').doc(newId).set(serviceData);
      await addAuditLog(`Added service: ${service.name_en}`);
    } else {
      const list = [...services, serviceData];
      setServices(list);
      localStorage.setItem('emgrand_offline_services', JSON.stringify(list));
      addAuditLog(`Added service offline: ${service.name_en}`);
    }
  };

  const updateService = async (id, updatedFields) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('services').doc(id).update(updatedFields);
      await addAuditLog(`Updated service: ${updatedFields.name_en || id}`);
    } else {
      const list = services.map(s => s.id === id ? { ...s, ...updatedFields } : s);
      setServices(list);
      localStorage.setItem('emgrand_offline_services', JSON.stringify(list));
      addAuditLog(`Updated service offline: ${updatedFields.name_en || id}`);
    }
  };

  const deleteService = async (id, name) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('services').doc(id).delete();
      await addAuditLog(`Deleted service: ${name || id}`);
    } else {
      const list = services.filter(s => s.id !== id);
      setServices(list);
      localStorage.setItem('emgrand_offline_services', JSON.stringify(list));
      addAuditLog(`Deleted service offline: ${name || id}`);
    }
  };

  // CRUD for Bookings
  const addBooking = async (booking) => {
    const bookingId = 'book_' + Date.now();
    const data = { ...booking, id: bookingId, status: booking.status || 'pending', timestamp: new Date().toISOString() };
    
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('bookings').doc(bookingId).set(data);
    } else {
      const list = [data, ...bookings];
      setBookings(list);
      localStorage.setItem('emgrand_offline_bookings', JSON.stringify(list));
    }
  };

  const removeBooking = async (id) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('bookings').doc(id).delete();
      await addAuditLog(`Removed reservation: ${id}`);
    } else {
      const list = bookings.filter(b => b.id !== id);
      setBookings(list);
      localStorage.setItem('emgrand_offline_bookings', JSON.stringify(list));
      addAuditLog(`Removed reservation offline: ${id}`);
    }
  };

  const updateBookingStatus = async (id, status) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('bookings').doc(id).update({ status });
      await addAuditLog(`Updated reservation status: ${id} to ${status}`);
    } else {
      const list = bookings.map(b => b.id === id ? { ...b, status } : b);
      setBookings(list);
      localStorage.setItem('emgrand_offline_bookings', JSON.stringify(list));
      addAuditLog(`Updated reservation status offline: ${id} to ${status}`);
    }
  };

  // CRUD for Feedback
  const submitFeedback = async (fb) => {
    const fbId = 'fb_' + Date.now();
    const data = { ...fb, id: fbId, date: new Date().toLocaleDateString() };
    
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('feedbacks').doc(fbId).set(data);
    } else {
      const list = [data, ...feedbacks];
      setFeedbacks(list);
      localStorage.setItem('emgrand_offline_feedback', JSON.stringify(list));
    }
  };

  // CRUD for Campaigns
  const addCampaign = async (camp) => {
    const newId = 'camp_' + Date.now();
    const data = { ...camp, id: newId };
    
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('campaigns').doc(newId).set(data);
      await addAuditLog(`Added campaign: ${camp.title}`);
    } else {
      const list = [data, ...campaigns];
      setCampaigns(list);
      localStorage.setItem('emgrand_offline_campaigns', JSON.stringify(list));
      addAuditLog(`Added campaign offline: ${camp.title}`);
    }
  };

  const removeCampaign = async (id, title) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('campaigns').doc(id).delete();
      await addAuditLog(`Removed campaign: ${title}`);
    } else {
      const list = campaigns.filter(c => c.id !== id);
      setCampaigns(list);
      localStorage.setItem('emgrand_offline_campaigns', JSON.stringify(list));
      addAuditLog(`Removed campaign offline: ${title}`);
    }
  };

  // Audit Log writing
  const addAuditLog = async (action) => {
    const newLog = {
      id: 'log_' + Date.now(),
      user: adminUser ? adminUser.email : 'Guest/Visitor',
      action,
      timestamp: new Date().toLocaleString()
    };
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('audit_logs').doc(newLog.id).set(newLog);
    } else {
      const list = [newLog, ...auditLogs];
      setAuditLogs(list);
      localStorage.setItem('emgrand_offline_audit', JSON.stringify(list));
    }
  };

  // Chat Query logger
  const logChatQuery = async (query, response) => {
    const newLog = {
      id: 'chat_' + Date.now(),
      query,
      response: response.substring(0, 150) + '...',
      timestamp: new Date().toLocaleTimeString()
    };
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('chat_logs').doc(newLog.id).set(newLog);
    } else {
      const list = [newLog, ...chatLogs];
      setChatLogs(list);
      localStorage.setItem('emgrand_offline_chat', JSON.stringify(list));
    }
  };

  // Dynamic SEO metadata updater
  useEffect(() => {
    const current = activeSEO || seoSettings;
    if (current) {
      if (typeof document !== 'undefined') {
        document.title = current.title || "Emgrand Spa Manila - Premium 24H Urban Wellness Resort";
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = current.description || "";

        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.name = 'keywords';
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = current.keywords || "";
      }
    }
  }, [activeSEO, seoSettings]);


  // SEO Settings
  const updateSeoSettings = async (seo) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('seo_settings').doc('main').set(seo);
      await addAuditLog(`Updated SEO Settings`);
    } else {
      setSeoSettings(seo);
      localStorage.setItem('emgrand_offline_seo', JSON.stringify(seo));
      await addAuditLog(`Updated SEO Settings offline`);
    }
  };

  // Home Page Banners
  const updateHomeBanner = async (banner) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('home_banner').doc('main').set(banner);
      await addAuditLog(`Updated Home Banner Settings`);
    } else {
      setHomeBanner(banner);
      localStorage.setItem('emgrand_offline_banner', JSON.stringify(banner));
      await addAuditLog(`Updated Home Banner Settings offline`);
    }
  };

  // Service Packages
  const addServicePackage = async (pkg) => {
    const newId = pkg.id || 'pkg_' + Date.now();
    const data = { ...pkg, id: newId };
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('service_packages').doc(newId).set(data);
      await addAuditLog(`Added service package: ${pkg.title}`);
    } else {
      const list = [...servicePackages, data];
      setServicePackages(list);
      localStorage.setItem('emgrand_offline_packages', JSON.stringify(list));
      await addAuditLog(`Added service package offline: ${pkg.title}`);
    }
  };

  const updateServicePackage = async (id, updatedFields) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('service_packages').doc(id).update(updatedFields);
      await addAuditLog(`Updated service package: ${updatedFields.title || id}`);
    } else {
      const list = servicePackages.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      setServicePackages(list);
      localStorage.setItem('emgrand_offline_packages', JSON.stringify(list));
      await addAuditLog(`Updated service package offline: ${updatedFields.title || id}`);
    }
  };

  const deleteServicePackage = async (id, title) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('service_packages').doc(id).delete();
      await addAuditLog(`Deleted service package: ${title || id}`);
    } else {
      const list = servicePackages.filter(p => p.id !== id);
      setServicePackages(list);
      localStorage.setItem('emgrand_offline_packages', JSON.stringify(list));
      await addAuditLog(`Deleted service package offline: ${title || id}`);
    }
  };

  // Gallery Photos
  const addGalleryPhoto = async (photo) => {
    const newId = photo.id || 'gp_' + Date.now();
    const data = { ...photo, id: newId };
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('gallery_photos').doc(newId).set(data);
      await addAuditLog(`Added gallery photo: ${photo.caption}`);
    } else {
      const list = [...galleryPhotos, data];
      setGalleryPhotos(list);
      localStorage.setItem('emgrand_offline_gallery', JSON.stringify(list));
      await addAuditLog(`Added gallery photo offline: ${photo.caption}`);
    }
  };

  const deleteGalleryPhoto = async (id, caption) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('gallery_photos').doc(id).delete();
      await addAuditLog(`Deleted gallery photo: ${caption || id}`);
    } else {
      const list = galleryPhotos.filter(p => p.id !== id);
      setGalleryPhotos(list);
      localStorage.setItem('emgrand_offline_gallery', JSON.stringify(list));
      await addAuditLog(`Deleted gallery photo offline: ${caption || id}`);
    }
  };

  // Promo Videos
  const addPromoVideo = async (video) => {
    const newId = video.id || 'vid_' + Date.now();
    const data = { ...video, id: newId };
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('promo_videos').doc(newId).set(data);
      await addAuditLog(`Added promo video: ${video.title}`);
    } else {
      const list = [...promoVideos, data];
      setPromoVideos(list);
      localStorage.setItem('emgrand_offline_videos', JSON.stringify(list));
      await addAuditLog(`Added promo video offline: ${video.title}`);
    }
  };

  const deletePromoVideo = async (id, title) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('promo_videos').doc(id).delete();
      await addAuditLog(`Deleted promo video: ${title || id}`);
    } else {
      const list = promoVideos.filter(v => v.id !== id);
      setPromoVideos(list);
      localStorage.setItem('emgrand_offline_videos', JSON.stringify(list));
      await addAuditLog(`Deleted promo video offline: ${title || id}`);
    }
  };

  // Social Posts
  const addSocialPost = async (post) => {
    const newId = post.id || 'sp_' + Date.now();
    const data = { ...post, id: newId, likes: post.likes || 0 };
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('social_posts').doc(newId).set(data);
      await addAuditLog(`Added social post by: ${post.username}`);
    } else {
      const list = [...socialPosts, data];
      setSocialPosts(list);
      localStorage.setItem('emgrand_offline_socials', JSON.stringify(list));
      await addAuditLog(`Added social post offline by: ${post.username}`);
    }
  };

  const deleteSocialPost = async (id, username) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('social_posts').doc(id).delete();
      await addAuditLog(`Deleted social post by: ${username || id}`);
    } else {
      const list = socialPosts.filter(p => p.id !== id);
      setSocialPosts(list);
      localStorage.setItem('emgrand_offline_socials', JSON.stringify(list));
      await addAuditLog(`Deleted social post offline by: ${username || id}`);
    }
  };

  // Membership Perks
  const addMembershipPerk = async (perk) => {
    const newId = perk.id || 'prk_' + Date.now();
    const data = { ...perk, id: newId };
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('membership_perks').doc(newId).set(data);
      await addAuditLog(`Added membership perk: ${perk.title}`);
    } else {
      const list = [...membershipPerks, data];
      setMembershipPerks(list);
      localStorage.setItem('emgrand_offline_perks', JSON.stringify(list));
      await addAuditLog(`Added membership perk offline: ${perk.title}`);
    }
  };

  const updateMembershipPerk = async (id, updatedFields) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('membership_perks').doc(id).update(updatedFields);
      await addAuditLog(`Updated membership perk: ${updatedFields.title || id}`);
    } else {
      const list = membershipPerks.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      setMembershipPerks(list);
      localStorage.setItem('emgrand_offline_perks', JSON.stringify(list));
      await addAuditLog(`Updated membership perk offline: ${updatedFields.title || id}`);
    }
  };

  const deleteMembershipPerk = async (id, title) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('membership_perks').doc(id).delete();
      await addAuditLog(`Deleted membership perk: ${title || id}`);
    } else {
      const list = membershipPerks.filter(p => p.id !== id);
      setMembershipPerks(list);
      localStorage.setItem('emgrand_offline_perks', JSON.stringify(list));
      await addAuditLog(`Deleted membership perk offline: ${title || id}`);
    }
  };

  // Chatbot Training FAQs
  const addChatbotFAQ = async (faq) => {
    const newId = faq.id || 'faq_' + Date.now();
    const data = { ...faq, id: newId };
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('chatbot_faqs').doc(newId).set(data);
      await addAuditLog(`Added chatbot FAQ: ${faq.question}`);
    } else {
      const list = [...chatbotFAQs, data];
      setChatbotFAQs(list);
      localStorage.setItem('emgrand_offline_faqs', JSON.stringify(list));
      await addAuditLog(`Added chatbot FAQ offline: ${faq.question}`);
    }
  };

  const deleteChatbotFAQ = async (id, question) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('chatbot_faqs').doc(id).delete();
      await addAuditLog(`Deleted chatbot FAQ: ${question || id}`);
    } else {
      const list = chatbotFAQs.filter(f => f.id !== id);
      setChatbotFAQs(list);
      localStorage.setItem('emgrand_offline_faqs', JSON.stringify(list));
      await addAuditLog(`Deleted chatbot FAQ offline: ${question || id}`);
    }
  };

  // Chatbot Training Key Points CRUD
  const addChatbotKeyPoint = async (kp) => {
    const newId = kp.id || 'kp_' + Date.now();
    const data = { ...kp, id: newId };
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('chatbot_key_points').doc(newId).set(data);
      await addAuditLog(`Added chatbot key point: ${kp.text}`);
    } else {
      const list = [...chatbotKeyPoints, data];
      setChatbotKeyPoints(list);
      localStorage.setItem('emgrand_offline_key_points', JSON.stringify(list));
      await addAuditLog(`Added chatbot key point offline: ${kp.text}`);
    }
  };

  const deleteChatbotKeyPoint = async (id, text) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('chatbot_key_points').doc(id).delete();
      await addAuditLog(`Deleted chatbot key point: ${text || id}`);
    } else {
      const list = chatbotKeyPoints.filter(k => k.id !== id);
      setChatbotKeyPoints(list);
      localStorage.setItem('emgrand_offline_key_points', JSON.stringify(list));
      await addAuditLog(`Deleted chatbot key point offline: ${text || id}`);
    }
  };

  const updateChatbotInstructions = async (text) => {
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('chatbot_settings').doc('main').set({ instructions: text }, { merge: true });
      await addAuditLog(`Updated chatbot system instructions`);
    } else {
      setChatbotInstructions(text);
      localStorage.setItem('emgrand_offline_chatbot_instructions', text);
      await addAuditLog(`Updated chatbot system instructions offline`);
    }
  };

  const addUserAccount = async (email, role, name = '', position = '', password = '') => {
    const cleanEmail = email.trim().toLowerCase();
    const data = {
      email: cleanEmail,
      role: role || 'admin',
      name: name.trim(),
      position: position.trim(),
      password: password,
      addedAt: new Date().toLocaleString()
    };
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('users').doc(cleanEmail).set(data);
      await addAuditLog(`Added user ${cleanEmail} with role ${role}`);
    } else {
      const list = [...userAccounts, { id: cleanEmail, ...data }];
      setUserAccounts(list);
      localStorage.setItem('emgrand_offline_users', JSON.stringify(list));
      await addAuditLog(`Added user ${cleanEmail} with role ${role} offline`);
    }
  };

  const updateUserRole = async (email, role) => {
    const cleanEmail = email.toLowerCase();
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('users').doc(cleanEmail).update({ role });
      await addAuditLog(`Updated user ${cleanEmail} role to ${role}`);
    } else {
      const list = userAccounts.map(u => u.email.toLowerCase() === cleanEmail ? { ...u, role } : u);
      setUserAccounts(list);
      localStorage.setItem('emgrand_offline_users', JSON.stringify(list));
      await addAuditLog(`Updated user ${cleanEmail} role to ${role} offline`);
    }
  };

  const deleteUserAccount = async (email) => {
    const cleanEmail = email.toLowerCase();
    if (dbActive && firebaseApp) {
      await firebaseApp.firestore().collection('users').doc(cleanEmail).delete();
      await addAuditLog(`Deleted user ${cleanEmail}`);
    } else {
      const list = userAccounts.filter(u => u.email.toLowerCase() !== cleanEmail);
      setUserAccounts(list);
      localStorage.setItem('emgrand_offline_users', JSON.stringify(list));
      await addAuditLog(`Deleted user ${cleanEmail} offline`);
    }
  };

  // Auto-cancel bookings that are past 5 hours of their scheduled time and still pending
  useEffect(() => {
    if (!bookings || bookings.length === 0) return;

    let hasUpdates = false;
    const updatedBookings = bookings.map(book => {
      const status = book.status || 'pending';
      if (status === 'pending' && book.date && book.time) {
        try {
          const scheduledDate = new Date(`${book.date}T${book.time}`);
          if (!isNaN(scheduledDate.getTime())) {
            const now = new Date();
            const elapsedHours = (now.getTime() - scheduledDate.getTime()) / (1000 * 60 * 60);
            if (elapsedHours > 5) {
              hasUpdates = true;
              return { ...book, status: 'cancel' };
            }
          }
        } catch (e) {
          console.error("Failed check auto-cancel for booking", book.id, e);
        }
      }
      return book;
    });

    if (hasUpdates) {
      setBookings(updatedBookings);
      updatedBookings.forEach(async (book) => {
        const original = bookings.find(b => b.id === book.id);
        const originalStatus = original?.status || 'pending';
        if (book.status === 'cancel' && originalStatus === 'pending') {
          if (dbActive && firebaseApp) {
            await firebaseApp.firestore().collection('bookings').doc(book.id).update({ status: 'cancel' });
            await addAuditLog(`Auto-cancelled expired reservation (5h past scheduled time): ${book.id}`);
          } else {
            localStorage.setItem('emgrand_offline_bookings', JSON.stringify(updatedBookings));
            await addAuditLog(`Auto-cancelled expired reservation offline: ${book.id}`);
          }
        }
      });
    }
  }, [bookings, dbActive, firebaseApp]);

  return (
    <AppContext.Provider value={{
      language,
      theme,
      toggleLanguage,
      toggleTheme,
      t,
      services,
      addService,
      updateService,
      deleteService,
      bookings,
      addBooking,
      removeBooking,
      updateBookingStatus,
      feedbacks,
      submitFeedback,
      campaigns,
      addCampaign,
      removeCampaign,
      auditLogs,
      chatLogs,
      logChatQuery,
      parkingSpots,
      adminUser,
      setAdminUser,
      fbConfig,
      setFbConfig,
      groqKey,
      setGroqKey,
      groqModel,
      setGroqModel,
      dbActive,
      defaultFloors,
      defaultBuffetTimeline,
      seoSettings,
      activeSEO,
      setActiveSEO,
      updateSeoSettings,
      homeBanner,
      updateHomeBanner,
      servicePackages,
      addServicePackage,
      updateServicePackage,
      deleteServicePackage,
      galleryPhotos,
      addGalleryPhoto,
      deleteGalleryPhoto,
      promoVideos,
      addPromoVideo,
      deletePromoVideo,
      socialPosts,
      addSocialPost,
      deleteSocialPost,
      membershipPerks,
      addMembershipPerk,
      updateMembershipPerk,
      deleteMembershipPerk,
      chatbotFAQs,
      addChatbotFAQ,
      deleteChatbotFAQ,
      chatbotKeyPoints,
      addChatbotKeyPoint,
      deleteChatbotKeyPoint,
      chatbotInstructions,
      updateChatbotInstructions,
      isChatOpen,
      setIsChatOpen,
      userAccounts,
      addUserAccount,
      updateUserRole,
      deleteUserAccount
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);

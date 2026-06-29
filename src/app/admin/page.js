"use client";
import React, { useState, useEffect } from 'react';
import { useAppState } from '@/context/AppContext';

export default function Admin() {
  const {
    services,
    addService,
    updateService,
    deleteService,
    bookings,
    removeBooking,
    feedbacks,
    campaigns,
    addCampaign,
    removeCampaign,
    auditLogs,
    chatLogs,
    adminUser,
    setAdminUser,
    fbConfig,
    setFbConfig,
    groqKey,
    setGroqKey,
    groqModel,
    setGroqModel,
    dbActive,
    
    // New States
    seoSettings,
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
    userAccounts,
    addUserAccount,
    updateUserRole,
    deleteUserAccount,
    
    // Localization
    t,
    language
  } = useAppState();

  const [adminTab, setAdminTab] = useState('adminServices');

  // Auth form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('admin');

  // Service Edit Form States
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('new');
  const [serviceId, setServiceId] = useState('');
  const [serviceCategory, setServiceCategory] = useState('massage');
  const [nameEN, setNameEN] = useState('');
  const [nameZH, setNameZH] = useState('');
  const [nameKO, setNameKO] = useState('');
  const [serviceRate, setServiceRate] = useState(1000);
  const [serviceTip, setServiceTip] = useState('variable');
  const [serviceDesc, setServiceDesc] = useState('');

  // Campaign Form Modal States
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [campaignTitleEN, setCampaignTitleEN] = useState('');
  const [campaignTitleZH, setCampaignTitleZH] = useState('');
  const [campaignTitleKO, setCampaignTitleKO] = useState('');
  const [campaignDescEN, setCampaignDescEN] = useState('');
  const [campaignDescZH, setCampaignDescZH] = useState('');
  const [campaignDescKO, setCampaignDescKO] = useState('');
  const [campaignEndDate, setCampaignEndDate] = useState('');

  // Setup Config Forms
  const [fbApiKey, setFbApiKey] = useState(fbConfig?.apiKey || '');
  const [fbAuthDomain, setFbAuthDomain] = useState(fbConfig?.authDomain || '');
  const [fbProjectId, setFbProjectId] = useState(fbConfig?.projectId || '');
  const [fbAppId, setFbAppId] = useState(fbConfig?.appId || '');
  
  const [tempGroqKey, setTempGroqKey] = useState(groqKey || '');
  const [tempGroqModel, setTempGroqModel] = useState(groqModel || 'llama-3.1-8b-instant');

  // New features form inputs state
  // 1. SEO Settings
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');

  // 2. Home Page Banners
  const [bannerTitleEN, setBannerTitleEN] = useState('');
  const [bannerTitleZH, setBannerTitleZH] = useState('');
  const [bannerTitleKO, setBannerTitleKO] = useState('');
  const [bannerSubtitleEN, setBannerSubtitleEN] = useState('');
  const [bannerSubtitleZH, setBannerSubtitleZH] = useState('');
  const [bannerSubtitleKO, setBannerSubtitleKO] = useState('');
  const [bannerImage, setBannerImage] = useState('');

  // 3. Service Packages Modal
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [packageModalMode, setPackageModalMode] = useState('new');
  const [packageId, setPackageId] = useState('');
  const [packageTitleEN, setPackageTitleEN] = useState('');
  const [packageTitleZH, setPackageTitleZH] = useState('');
  const [packageTitleKO, setPackageTitleKO] = useState('');
  const [packageRate, setPackageRate] = useState(2000);
  const [packageSavings, setPackageSavings] = useState(500);
  const [packageInclusionsEN, setPackageInclusionsEN] = useState('');
  const [packageInclusionsZH, setPackageInclusionsZH] = useState('');
  const [packageInclusionsKO, setPackageInclusionsKO] = useState('');

  // 4. Gallery Photos Form
  const [galleryPhotoUrl, setGalleryPhotoUrl] = useState('');
  const [galleryCaption, setGalleryCaption] = useState('');

  // 5. Walkthrough Videos Form
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDesc, setVideoDesc] = useState('');

  // 6. Social Mock Posts Form
  const [socialUser, setSocialUser] = useState('');
  const [socialImg, setSocialImg] = useState('');
  const [socialMsg, setSocialMsg] = useState('');
  const [socialLikes, setSocialLikes] = useState(100);

  // 7. Membership Perks Modal
  const [isPerkModalOpen, setIsPerkModalOpen] = useState(false);
  const [perkModalMode, setPerkModalMode] = useState('new');
  const [perkId, setPerkId] = useState('');
  const [perkTitleEN, setPerkTitleEN] = useState('');
  const [perkTitleZH, setPerkTitleZH] = useState('');
  const [perkTitleKO, setPerkTitleKO] = useState('');
  const [perkIcon, setPerkIcon] = useState('fa-star');
  const [perkDescEN, setPerkDescEN] = useState('');
  const [perkDescZH, setPerkDescZH] = useState('');
  const [perkDescKO, setPerkDescKO] = useState('');

  // 8. Chatbot FAQ Form
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [keyPointText, setKeyPointText] = useState('');
  const [tempInstructions, setTempInstructions] = useState('');

  useEffect(() => {
    if (chatbotInstructions) {
      setTempInstructions(chatbotInstructions);
    }
  }, [chatbotInstructions]);

  // Auto-populate SEO and Banner fields when loaded
  useEffect(() => {
    if (seoSettings) {
      setSeoTitle(seoSettings.title || '');
      setSeoDesc(seoSettings.description || '');
      setSeoKeywords(seoSettings.keywords || '');
    }
  }, [seoSettings]);

  useEffect(() => {
    if (homeBanner) {
      setBannerTitleEN(homeBanner.title_en || homeBanner.title || '');
      setBannerTitleZH(homeBanner.title_zh || '');
      setBannerTitleKO(homeBanner.title_ko || '');
      setBannerSubtitleEN(homeBanner.subtitle_en || homeBanner.subtitle || '');
      setBannerSubtitleZH(homeBanner.subtitle_zh || '');
      setBannerSubtitleKO(homeBanner.subtitle_ko || '');
      setBannerImage(homeBanner.image || '');
    }
  }, [homeBanner]);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 5000);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    if (dbActive && window.firebase) {
      try {
        await window.firebase.auth().signInWithEmailAndPassword(email, password);
        triggerToast("🎉 Admin Authenticated via Firebase Auth!");
      } catch (err) {
        console.error(err);
        triggerToast(`❌ Auth Error: ${err.message}`);
      }
    } else {
      // Mock Auth Fallback
      setAdminUser({ email, uid: 'mock_uid_' + Date.now() });
      triggerToast("🎉 Logged in successfully under Mock Database Mode!");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    if (dbActive && window.firebase) {
      await window.firebase.auth().signOut();
    }
    setAdminUser(null);
    triggerToast("👋 Logged out successfully.");
  };

  // Service CRUD operations
  const openServiceModal = (mode, item) => {
    setModalMode(mode);
    if (mode === 'edit' && item) {
      setServiceId(item.id);
      setServiceCategory(item.category);
      setNameEN(item.name_en);
      setNameZH(item.name_zh);
      setNameKO(item.name_ko);
      setServiceRate(item.rate);
      setServiceTip(item.tip);
      setServiceDesc(item.desc);
    } else {
      setServiceId('');
      setServiceCategory('massage');
      setNameEN('');
      setNameZH('');
      setNameKO('');
      setServiceRate(1000);
      setServiceTip('variable');
      setServiceDesc('');
    }
    setIsServiceModalOpen(true);
  };

  const handleServiceSave = async (e) => {
    e.preventDefault();
    const serviceData = {
      category: serviceCategory,
      name_en: nameEN,
      name_zh: nameZH,
      name_ko: nameKO,
      rate: Number(serviceRate),
      tip: serviceTip,
      desc: serviceDesc
    };

    try {
      if (modalMode === 'new') {
        await addService(serviceData);
        triggerToast("🎉 Added Service Successfully!");
      } else {
        await updateService(serviceId, serviceData);
        triggerToast("🎉 Updated Service Successfully!");
      }
      setIsServiceModalOpen(false);
    } catch (err) {
      console.error(err);
      triggerToast("❌ Error saving service.");
    }
  };

  const handleServiceDelete = async (id, name) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteService(id, name);
        triggerToast("🎉 Deleted service successfully.");
      } catch (err) {
        console.error(err);
        triggerToast("❌ Error deleting service.");
      }
    }
  };

  // Campaigns CRUD
  const handleCampaignSave = async (e) => {
    e.preventDefault();
    const data = {
      title: campaignTitleEN, // Fallback
      title_en: campaignTitleEN,
      title_zh: campaignTitleZH,
      title_ko: campaignTitleKO,
      desc: campaignDescEN, // Fallback
      desc_en: campaignDescEN,
      desc_zh: campaignDescZH,
      desc_ko: campaignDescKO,
      end_date: campaignEndDate
    };
    try {
      await addCampaign(data);
      setCampaignTitleEN('');
      setCampaignTitleZH('');
      setCampaignTitleKO('');
      setCampaignDescEN('');
      setCampaignDescZH('');
      setCampaignDescKO('');
      setCampaignEndDate('');
      setIsCampaignModalOpen(false);
      triggerToast("🎉 Countdown Campaign Added!");
    } catch (err) {
      console.error(err);
      triggerToast("❌ Error adding campaign.");
    }
  };

  const handleCampaignDelete = async (id, title) => {
    if (confirm(`Delete event: ${title}?`)) {
      try {
        await removeCampaign(id, title);
        triggerToast("Deleted event.");
      } catch (err) {
        console.error(err);
        triggerToast("Error deleting campaign.");
      }
    }
  };

  // Weekday Packages CRUD
  const openPackageModal = (mode, item) => {
    setPackageModalMode(mode);
    if (mode === 'edit' && item) {
      setPackageId(item.id);
      setPackageTitleEN(item.title_en || item.title || '');
      setPackageTitleZH(item.title_zh || '');
      setPackageTitleKO(item.title_ko || '');
      setPackageRate(item.rate);
      setPackageSavings(item.savings);
      setPackageInclusionsEN(item.inclusions_en || item.inclusions || '');
      setPackageInclusionsZH(item.inclusions_zh || '');
      setPackageInclusionsKO(item.inclusions_ko || '');
    } else {
      setPackageId('');
      setPackageTitleEN('');
      setPackageTitleZH('');
      setPackageTitleKO('');
      setPackageRate(2880);
      setPackageSavings(1704);
      setPackageInclusionsEN('');
      setPackageInclusionsZH('');
      setPackageInclusionsKO('');
    }
    setIsPackageModalOpen(true);
  };

  const handlePackageSave = async (e) => {
    e.preventDefault();
    const pkgData = {
      title: packageTitleEN, // Fallback
      title_en: packageTitleEN,
      title_zh: packageTitleZH,
      title_ko: packageTitleKO,
      rate: Number(packageRate),
      savings: Number(packageSavings),
      inclusions: packageInclusionsEN, // Fallback
      inclusions_en: packageInclusionsEN,
      inclusions_zh: packageInclusionsZH,
      inclusions_ko: packageInclusionsKO
    };

    try {
      if (packageModalMode === 'new') {
        await addServicePackage(pkgData);
        triggerToast("🎉 Package added successfully!");
      } else {
        await updateServicePackage(packageId, pkgData);
        triggerToast("🎉 Package updated successfully!");
      }
      setIsPackageModalOpen(false);
    } catch (err) {
      console.error(err);
      triggerToast("❌ Error saving package.");
    }
  };

  const handlePackageDelete = async (id, title) => {
    if (confirm(`Delete package: ${title}?`)) {
      try {
        await deleteServicePackage(id, title);
        triggerToast("🎉 Deleted package.");
      } catch (err) {
        console.error(err);
        triggerToast("❌ Error deleting package.");
      }
    }
  };

  // Gallery Photos CRUD
  const handleGalleryAdd = async (e) => {
    e.preventDefault();
    try {
      await addGalleryPhoto({
        src: galleryPhotoUrl,
        caption: galleryCaption
      });
      setGalleryPhotoUrl('');
      setGalleryCaption('');
      triggerToast("🎉 Added gallery photo!");
    } catch (err) {
      console.error(err);
      triggerToast("❌ Error adding photo.");
    }
  };

  const handleGalleryDelete = async (id, caption) => {
    if (confirm(`Delete gallery photo: "${caption}"?`)) {
      try {
        await deleteGalleryPhoto(id, caption);
        triggerToast("🎉 Photo deleted.");
      } catch (err) {
        console.error(err);
        triggerToast("❌ Error deleting photo.");
      }
    }
  };

  // Walkthrough Videos CRUD
  const handleVideoAdd = async (e) => {
    e.preventDefault();
    try {
      await addPromoVideo({
        title: videoTitle,
        url: videoUrl,
        desc: videoDesc
      });
      setVideoTitle('');
      setVideoUrl('');
      setVideoDesc('');
      triggerToast("🎉 Added walkthrough video link!");
    } catch (err) {
      console.error(err);
      triggerToast("❌ Error adding video.");
    }
  };

  const handleVideoDelete = async (id, title) => {
    if (confirm(`Delete video link: "${title}"?`)) {
      try {
        await deletePromoVideo(id, title);
        triggerToast("🎉 Video deleted.");
      } catch (err) {
        console.error(err);
        triggerToast("❌ Error deleting video.");
      }
    }
  };

  // Social Posts CRUD
  const handleSocialAdd = async (e) => {
    e.preventDefault();
    try {
      await addSocialPost({
        username: socialUser,
        img: socialImg,
        message: socialMsg,
        likes: Number(socialLikes)
      });
      setSocialUser('');
      setSocialImg('');
      setSocialMsg('');
      setSocialLikes(100);
      triggerToast("🎉 Social mock post added!");
    } catch (err) {
      console.error(err);
      triggerToast("❌ Error adding social post.");
    }
  };

  const handleSocialDelete = async (id, username) => {
    if (confirm(`Delete social post by @${username}?`)) {
      try {
        await deleteSocialPost(id, username);
        triggerToast("🎉 Social post deleted.");
      } catch (err) {
        console.error(err);
        triggerToast("❌ Error deleting post.");
      }
    }
  };

  // Membership Perks CRUD
  const openPerkModal = (mode, item) => {
    setPerkModalMode(mode);
    if (mode === 'edit' && item) {
      setPerkId(item.id);
      setPerkTitleEN(item.title_en || item.title || '');
      setPerkTitleZH(item.title_zh || '');
      setPerkTitleKO(item.title_ko || '');
      setPerkIcon(item.icon || 'fa-star');
      setPerkDescEN(item.desc_en || item.desc || '');
      setPerkDescZH(item.desc_zh || '');
      setPerkDescKO(item.desc_ko || '');
    } else {
      setPerkId('');
      setPerkTitleEN('');
      setPerkTitleZH('');
      setPerkTitleKO('');
      setPerkIcon('fa-beer-mug-empty');
      setPerkDescEN('');
      setPerkDescZH('');
      setPerkDescKO('');
    }
    setIsPerkModalOpen(true);
  };

  const handlePerkSave = async (e) => {
    e.preventDefault();
    const perkData = {
      title: perkTitleEN, // Fallback
      title_en: perkTitleEN,
      title_zh: perkTitleZH,
      title_ko: perkTitleKO,
      icon: perkIcon,
      desc: perkDescEN, // Fallback
      desc_en: perkDescEN,
      desc_zh: perkDescZH,
      desc_ko: perkDescKO
    };

    try {
      if (perkModalMode === 'new') {
        await addMembershipPerk(perkData);
        triggerToast("🎉 Added membership perk successfully!");
      } else {
        await updateMembershipPerk(perkId, perkData);
        triggerToast("🎉 Updated membership perk successfully!");
      }
      setIsPerkModalOpen(false);
    } catch (err) {
      console.error(err);
      triggerToast("❌ Error saving membership perk.");
    }
  };

  const handlePerkDelete = async (id, title) => {
    if (confirm(`Delete perk: ${title}?`)) {
      try {
        await deleteMembershipPerk(id, title);
        triggerToast("🎉 Deleted perk.");
      } catch (err) {
        console.error(err);
        triggerToast("❌ Error deleting perk.");
      }
    }
  };

  // Chatbot FAQs CRUD
  const handleFAQAdd = async (e) => {
    e.preventDefault();
    try {
      await addChatbotFAQ({
        question: faqQuestion,
        answer: faqAnswer
      });
      setFaqQuestion('');
      setFaqAnswer('');
      triggerToast("🎉 FAQ Pair trained successfully!");
    } catch (err) {
      console.error(err);
      triggerToast("❌ Error training FAQ.");
    }
  };

  const handleFAQDelete = async (id, question) => {
    if (confirm(`Delete FAQ: "${question}"?`)) {
      try {
        await deleteChatbotFAQ(id, question);
        triggerToast("🎉 FAQ deleted.");
      } catch (err) {
        console.error(err);
        triggerToast("❌ Error deleting FAQ.");
      }
    }
  };

  // Chatbot Key Points CRUD handlers
  const handleKeyPointAdd = async (e) => {
    e.preventDefault();
    try {
      await addChatbotKeyPoint({
        text: keyPointText
      });
      setKeyPointText('');
      triggerToast("🎉 Chatbot Key Point added successfully!");
    } catch (err) {
      console.error(err);
      triggerToast("❌ Error adding key point.");
    }
  };

  const handleKeyPointDelete = async (id, text) => {
    if (confirm(`Delete key point: "${text}"?`)) {
      try {
        await deleteChatbotKeyPoint(id, text);
        triggerToast("🎉 Key point deleted.");
      } catch (err) {
        console.error(err);
        triggerToast("❌ Error deleting key point.");
      }
    }
  };

  // Credentials config
  const saveFirebaseSettings = (e) => {
    e.preventDefault();
    const config = {
      apiKey: fbApiKey,
      authDomain: fbAuthDomain,
      projectId: fbProjectId,
      appId: fbAppId
    };
    localStorage.setItem('emgrand_fb_config', JSON.stringify(config));
    setFbConfig(config);
    triggerToast("⚙️ Firebase Configuration Saved. App is reloading...");
    setTimeout(() => window.location.reload(), 1500);
  };

  const clearFirebaseSettings = () => {
    localStorage.removeItem('emgrand_fb_config');
    setFbConfig(null);
    triggerToast("⚙️ Firebase Credentials cleared. Reloading...");
    setTimeout(() => window.location.reload(), 1500);
  };

  const saveGroqSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('emgrand_groq_key', tempGroqKey);
    localStorage.setItem('emgrand_groq_model', tempGroqModel);
    setGroqKey(tempGroqKey);
    setGroqModel(tempGroqModel);
    triggerToast("⚙️ Groq AI Keys updated successfully!");
  };

  // Simple statistics
  const activeBookingsCount = bookings.length;
  const totalReviewsCount = feedbacks.length;
  const avgRating = totalReviewsCount > 0 
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalReviewsCount).toFixed(1)
    : '0.0';

  return (
    <div className="animate-fade">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div 
          style={{
            position: 'fixed',
            top: '100px',
            right: '30px',
            zIndex: 9999,
            background: toastMsg.startsWith('🎉') || toastMsg.startsWith('⚙️') ? 'var(--accent-jade)' : 'var(--accent-red)',
            color: '#fff',
            padding: '15px 25px',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            fontWeight: '600',
            animation: 'fadeIn 0.3s ease forwards'
          }}
        >
          {toastMsg}
        </div>
      )}

      <div className="admin-container">
        <div className="section-title-wrap">
          <h2 className="section-main-title">
            <span className="gold-text"><i className="fa-solid fa-user-shield"></i> {language === 'zh' ? '管理控制台' : (language === 'ko' ? '관리 콘솔' : 'Administration Console')}</span>
          </h2>
          <p className="section-sub-title">
            {language === 'zh' ? '配置水疗设置、审核预订、分析反馈并查看数据库更新。' : (language === 'ko' ? '스파 설정 구성, 예약 검토, 피드백 분석 및 데이터베이스 업데이트 보기를 진행합니다.' : 'Configure spa settings, review bookings, analyze feedback, and view database updates.')}
          </p>
        </div>

        {/* NOT LOGGED IN ACCESS PANEL */}
        {!adminUser ? (
          <div className="admin-login-card glass-panel">
            <div className="login-header">
              <h3>{language === 'zh' ? '管理权限登录' : (language === 'ko' ? '관리자 권한 로그인' : 'Administrative Access')}</h3>
              <p>{language === 'zh' ? '使用您的管理员账户凭据登录以修改动态内容。' : (language === 'ko' ? '동적 콘텐츠를 수정하려면 관리자 계정 자격 증명으로 로그인하십시오.' : 'Log in with your administrator account credentials to modify dynamic contents.')}</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>{t('adm_lbl_email')}</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="admin@emgrandspa.com" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '密码' : (language === 'ko' ? '비밀번호' : 'Password')}</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="••••••••" 
                />
              </div>
              <div className="auth-buttons-row">
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{language === 'zh' ? '登录' : (language === 'ko' ? '로그인' : 'Log In')}</button>
              </div>
            </form>
            
            {!dbActive && (
              <div className="local-database-fallback">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <div>
                  <strong>{language === 'zh' ? '本地模拟数据库模式处于活动状态' : (language === 'ko' ? '로컬 모의 데이터베이스 모드 활성화됨' : 'Local Mock Database Mode Active')}</strong>
                  <p>
                    {language === 'zh' ? 'Firebase 配置未激活。正在使用本地 localStorage 模拟数据库进行即时测试。您可以使用上方的任何用户名/密码立即登录！' : (language === 'ko' ? 'Firebase 구성이 활성화되어 있지 않습니다. 즉석 테스트를 위해 로컬 localStorage 모의 DB를 사용합니다. 위의 아무 사용자 이름/비밀번호를 사용하여 바로 로그인하십시오!' : 'Firebase configuration is not active. Using mock in-memory localStorage db for instant testing. Feel free to use any username/password above to log in instantly!')}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* LOGGED IN ADMINISTRATIVE DASHBOARD */
          <div className="admin-dashboard-wrap">
            
            {/* Dashboard Selector Menu */}
            <div className="admin-dashboard-tabs">
              <button 
                className={`admin-tab-btn ${adminTab === 'adminServices' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminServices')}
              >
                <i className="fa-solid fa-clipboard-list"></i> {t('adm_sidebar_services')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminPackages' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminPackages')}
              >
                <i className="fa-solid fa-box-archive"></i> {t('adm_sidebar_packages')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminBookings' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminBookings')}
              >
                <i className="fa-solid fa-calendar-check"></i> {t('adm_sidebar_bookings')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminCampaigns' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminCampaigns')}
              >
                <i className="fa-solid fa-bullhorn"></i> {t('adm_sidebar_campaigns')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminSEO' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminSEO')}
              >
                <i className="fa-solid fa-search"></i> {t('adm_sidebar_seo')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminBanners' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminBanners')}
              >
                <i className="fa-solid fa-image"></i> {t('adm_sidebar_banners')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminGallery' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminGallery')}
              >
                <i className="fa-solid fa-images"></i> {t('adm_sidebar_gallery')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminVideos' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminVideos')}
              >
                <i className="fa-solid fa-circle-play"></i> {t('adm_sidebar_videos')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminSocial' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminSocial')}
              >
                <i className="fa-solid fa-share-nodes"></i> {t('adm_sidebar_socials')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminMemberships' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminMemberships')}
              >
                <i className="fa-solid fa-id-card"></i> {t('adm_sidebar_perks')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminChatbot' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminChatbot')}
              >
                <i className="fa-solid fa-robot"></i> {t('adm_sidebar_chatbot')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminFeedback' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminFeedback')}
              >
                <i className="fa-solid fa-comments"></i> {t('adm_sidebar_feedback')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminAnalytics' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminAnalytics')}
              >
                <i className="fa-solid fa-chart-pie"></i> {t('adm_sidebar_analytics')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminSettings' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminSettings')}
              >
                <i className="fa-solid fa-gears"></i> {t('adm_sidebar_settings')}
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminAccounts' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminAccounts')}
              >
                <i className="fa-solid fa-users-gear"></i> {t('adm_sidebar_accounts')}
              </button>
              <button className="admin-tab-btn logout-tab" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i> {t('adm_sidebar_logout')}
              </button>
            </div>

            {/* TAB 1: SERVICE CRUD TABLE */}
            {adminTab === 'adminServices' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_services')}</h4>
                  <button className="btn btn-primary btn-sm" onClick={() => openServiceModal('new')}>
                    <i className="fa-solid fa-plus"></i> {t('adm_btn_add')}
                  </button>
                </div>
                
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{t('adm_th_category')}</th>
                        <th>{t('adm_th_name')} (EN)</th>
                        <th>{t('adm_th_name')} (ZH)</th>
                        <th>{t('adm_th_name')} (KO)</th>
                        <th>{t('adm_th_price')}</th>
                        <th>{t('adm_th_tips')}</th>
                        <th>{t('adm_th_actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map(item => (
                        <tr key={item.id}>
                          <td style={{ textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold' }}>{item.category}</td>
                          <td>{item.name_en}</td>
                          <td>{item.name_zh}</td>
                          <td>{item.name_ko}</td>
                          <td>Php {item.rate}</td>
                          <td>{item.tip === 'none' ? (language === 'zh' ? '无' : (language === 'ko' ? '없음' : 'None')) : (language === 'zh' ? '可变' : (language === 'ko' ? '가변적' : 'Variable'))}</td>
                          <td>
                            <button 
                              className="btn btn-primary btn-xs" 
                              onClick={() => openServiceModal('edit', item)}
                              style={{ marginRight: '5px' }}
                            >
                              {t('adm_btn_edit')}
                            </button>
                            <button 
                              className="btn btn-danger btn-xs" 
                              onClick={() => handleServiceDelete(item.id, item.name_en)}
                            >
                              {t('adm_btn_delete')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: SERVICE PACKAGES */}
            {adminTab === 'adminPackages' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_packages')}</h4>
                  <button className="btn btn-primary btn-sm" onClick={() => openPackageModal('new')}>
                    <i className="fa-solid fa-plus"></i> {t('adm_btn_add')}
                  </button>
                </div>
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{t('adm_th_title')}</th>
                        <th>{t('adm_lbl_rate')}</th>
                        <th>{t('adm_lbl_savings')}</th>
                        <th>{t('adm_lbl_inclusions_en').split(' ')[0]}</th>
                        <th>{t('adm_th_actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicePackages && servicePackages.map(pkg => (
                        <tr key={pkg.id}>
                          <td style={{ fontWeight: 'bold' }}>{language === 'zh' ? (pkg.title_zh || pkg.title) : (language === 'ko' ? (pkg.title_ko || pkg.title) : (pkg.title_en || pkg.title))}</td>
                          <td>Php {pkg.rate}</td>
                          <td>Php {pkg.savings}</td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {language === 'zh' ? (pkg.inclusions_zh || pkg.inclusions) : (language === 'ko' ? (pkg.inclusions_ko || pkg.inclusions) : (pkg.inclusions_en || pkg.inclusions))}
                          </td>
                          <td>
                            <button className="btn btn-primary btn-xs" style={{ marginRight: '5px' }} onClick={() => openPackageModal('edit', pkg)}>{t('adm_btn_edit')}</button>
                            <button className="btn btn-danger btn-xs" onClick={() => handlePackageDelete(pkg.id, pkg.title)}>{t('adm_btn_delete')}</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: BOOKINGS LIST */}
            {adminTab === 'adminBookings' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_bookings')}</h4>
                </div>
                
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{language === 'zh' ? '宾客' : (language === 'ko' ? '고객' : 'Guest')}</th>
                        <th>{language === 'zh' ? '联系方式 / Viber' : (language === 'ko' ? '연락처 / Viber' : 'Contact / Viber')}</th>
                        <th>{language === 'zh' ? '日期与时间' : (language === 'ko' ? '날짜 및 시간' : 'Date & Time')}</th>
                        <th>{language === 'zh' ? '项目/设施' : (language === 'ko' ? '항목/시설' : 'Item/Facility')}</th>
                        <th>{language === 'zh' ? '时长' : (language === 'ko' ? '기간' : 'Duration')}</th>
                        <th>{language === 'zh' ? '人数' : (language === 'ko' ? '인원' : 'Guests')}</th>
                        <th>{t('adm_th_actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.length > 0 ? (
                        bookings.map(book => (
                          <tr key={book.id}>
                            <td style={{ fontWeight: 'bold' }}>{book.name}</td>
                            <td>{book.contact}</td>
                            <td>{book.date} @ {book.time}</td>
                            <td style={{ color: 'var(--accent-gold-hover)' }}>{book.item_name}</td>
                            <td>{book.duration}</td>
                            <td>{book.guests}</td>
                            <td>
                              <button 
                                className="btn btn-danger btn-xs" 
                                onClick={() => removeBooking(book.id)}
                              >
                                {language === 'zh' ? '取消预订' : (language === 'ko' ? '예약 취소' : 'Cancel Booking')}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
                            {language === 'zh' ? '未在数据库中找到有效的预订。' : (language === 'ko' ? '데이터베이스에 활성화된 예약이 없습니다.' : 'No active reservations found in database.')}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: EVENT CAMPAIGN LIST */}
            {adminTab === 'adminCampaigns' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_campaigns')}</h4>
                  <button className="btn btn-primary btn-sm" onClick={() => setIsCampaignModalOpen(true)}>
                    <i className="fa-solid fa-plus"></i> {t('adm_btn_add')}
                  </button>
                </div>
                
                <div className="campaigns-list-admin">
                  {campaigns.map(camp => (
                    <div key={camp.id} className="campaign-admin-card glass-panel">
                      <h5>{language === 'zh' ? (camp.title_zh || camp.title) : (language === 'ko' ? (camp.title_ko || camp.title) : (camp.title_en || camp.title))}</h5>
                      <p>{language === 'zh' ? (camp.desc_zh || camp.desc) : (language === 'ko' ? (camp.desc_ko || camp.desc) : (camp.desc_en || camp.desc))}</p>
                      <div className="campaign-admin-footer">
                        <span>{language === 'zh' ? '结束时间' : (language === 'ko' ? '종료 시간' : 'Ends')}: {new Date(camp.end_date).toLocaleString()}</span>
                        <button 
                          className="btn btn-danger btn-xs"
                          onClick={() => handleCampaignDelete(camp.id, camp.title)}
                        >
                          {t('adm_btn_delete')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: SEO Settings */}
            {adminTab === 'adminSEO' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_seo')}</h4>
                </div>
                <div className="settings-card glass-panel" style={{ maxWidth: '600px', width: '100%' }}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    updateSeoSettings({ title: seoTitle, description: seoDesc, keywords: seoKeywords });
                    triggerToast("🎉 SEO Settings updated successfully!");
                  }}>
                    <div className="form-group">
                      <label>{language === 'zh' ? '元标题' : (language === 'ko' ? '메타 제목' : 'Meta Title')}</label>
                      <input 
                        type="text" 
                        value={seoTitle} 
                        onChange={(e) => setSeoTitle(e.target.value)} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>{language === 'zh' ? '元描述' : (language === 'ko' ? '메타 설명' : 'Meta Description')}</label>
                      <textarea 
                        value={seoDesc} 
                        onChange={(e) => setSeoDesc(e.target.value)} 
                        className="form-control" 
                        rows="3" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>{language === 'zh' ? '元关键字（以逗号分隔）' : (language === 'ko' ? '메타 키워드 (쉼표로 구분)' : 'Meta Keywords (Comma separated)')}</label>
                      <input 
                        type="text" 
                        value={seoKeywords} 
                        onChange={(e) => setSeoKeywords(e.target.value)} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>{t('adm_btn_save')}</button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 6: Home Hero Banners */}
            {adminTab === 'adminBanners' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_banners')}</h4>
                </div>
                <div className="settings-card glass-panel" style={{ maxWidth: '600px', width: '100%' }}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    updateHomeBanner({ 
                      title: bannerTitleEN, 
                      title_en: bannerTitleEN, 
                      title_zh: bannerTitleZH, 
                      title_ko: bannerTitleKO, 
                      subtitle: bannerSubtitleEN, 
                      subtitle_en: bannerSubtitleEN, 
                      subtitle_zh: bannerSubtitleZH, 
                      subtitle_ko: bannerSubtitleKO, 
                      image: bannerImage 
                    });
                    triggerToast("🎉 Home hero banner updated!");
                  }}>
                    <div className="form-group">
                      <label>{language === 'zh' ? '横幅标题 (EN)' : (language === 'ko' ? '배너 제목 (EN)' : 'Banner Title (EN)')}</label>
                      <input 
                        type="text" 
                        value={bannerTitleEN} 
                        onChange={(e) => setBannerTitleEN(e.target.value)} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>{language === 'zh' ? '横幅标题 (ZH)' : (language === 'ko' ? '배너 제목 (ZH)' : 'Banner Title (ZH)')}</label>
                      <input 
                        type="text" 
                        value={bannerTitleZH} 
                        onChange={(e) => setBannerTitleZH(e.target.value)} 
                        className="form-control" 
                      />
                    </div>
                    <div className="form-group">
                      <label>{language === 'zh' ? '横幅标题 (KO)' : (language === 'ko' ? '배너 제목 (KO)' : 'Banner Title (KO)')}</label>
                      <input 
                        type="text" 
                        value={bannerTitleKO} 
                        onChange={(e) => setBannerTitleKO(e.target.value)} 
                        className="form-control" 
                      />
                    </div>
                    <div className="form-group">
                      <label>{language === 'zh' ? '横幅副标题 (EN)' : (language === 'ko' ? '배너 부제목 (EN)' : 'Banner Subtitle (EN)')}</label>
                      <input 
                        type="text" 
                        value={bannerSubtitleEN} 
                        onChange={(e) => setBannerSubtitleEN(e.target.value)} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>{language === 'zh' ? '横幅副标题 (ZH)' : (language === 'ko' ? '배너 부제목 (ZH)' : 'Banner Subtitle (ZH)')}</label>
                      <input 
                        type="text" 
                        value={bannerSubtitleZH} 
                        onChange={(e) => setBannerSubtitleZH(e.target.value)} 
                        className="form-control" 
                      />
                    </div>
                    <div className="form-group">
                      <label>{language === 'zh' ? '横幅副标题 (KO)' : (language === 'ko' ? '배너 부제목 (KO)' : 'Banner Subtitle (KO)')}</label>
                      <input 
                        type="text" 
                        value={bannerSubtitleKO} 
                        onChange={(e) => setBannerSubtitleKO(e.target.value)} 
                        className="form-control" 
                      />
                    </div>
                    <div className="form-group">
                      <label>{language === 'zh' ? '背景图片链接' : (language === 'ko' ? '배경 이미지 URL' : 'Background Image URL')}</label>
                      <input 
                        type="text" 
                        value={bannerImage} 
                        onChange={(e) => setBannerImage(e.target.value)} 
                        className="form-control" 
                        required 
                      />
                      {bannerImage && (
                        <div style={{ marginTop: '15px', borderRadius: '6px', overflow: 'hidden', height: '150px', border: '1px solid var(--border-color)' }}>
                          <img src={bannerImage} alt="Banner Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>{t('adm_btn_save')}</button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 7: Gallery Photos */}
            {adminTab === 'adminGallery' && (
              <div className="admin-tab-content active" style={{ width: '100%' }}>
                <div className="admin-section-header">
                  <h4>{t('adm_title_gallery')}</h4>
                </div>
                
                {/* Inline Add Photo Form */}
                <div className="glass-panel" style={{ padding: '20px', marginBottom: '25px', width: '100%' }}>
                  <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>{language === 'zh' ? '添加设施图片' : (language === 'ko' ? '시설 이미지 추가' : 'Add Facility Image')}</h5>
                  <form onSubmit={handleGalleryAdd} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ flex: '1 1 300px' }}>
                      <label>{language === 'zh' ? '图片 URL' : (language === 'ko' ? '이미지 URL' : 'Image URL')}</label>
                      <input 
                        type="text" 
                        value={galleryPhotoUrl} 
                        onChange={(e) => setGalleryPhotoUrl(e.target.value)} 
                        className="form-control" 
                        placeholder="https://images.unsplash.com/..." 
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ flex: '1 1 300px' }}>
                      <label>{language === 'zh' ? '说明 / 位置标签' : (language === 'ko' ? '설명 / 위치 라벨' : 'Caption / Location Label')}</label>
                      <input 
                        type="text" 
                        value={galleryCaption} 
                        onChange={(e) => setGalleryCaption(e.target.value)} 
                        className="form-control" 
                        placeholder="e.g. Luxurious 3F Hydrotherapy core pools" 
                        required 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 25px' }}>{language === 'zh' ? '添加照片' : (language === 'ko' ? '사진 추가' : 'Add Photo')}</button>
                  </form>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', width: '100%' }}>
                  {galleryPhotos && galleryPhotos.map(photo => (
                    <div key={photo.id} className="photo-card glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '225px', padding: 0, overflow: 'hidden' }}>
                      <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                      <div style={{ padding: '10px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-primary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                          {photo.caption.startsWith('gallery_') ? t(photo.caption) : photo.caption}
                        </p>
                        <button className="btn btn-danger btn-xs" style={{ marginTop: 'auto', width: '100%' }} onClick={() => handleGalleryDelete(photo.id, photo.caption)}>{t('adm_btn_delete')}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: Videos */}
            {adminTab === 'adminVideos' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_videos')}</h4>
                </div>
                
                {/* Inline Add Video Form */}
                <div className="glass-panel" style={{ padding: '20px', marginBottom: '25px', width: '100%' }}>
                  <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>{language === 'zh' ? '添加导览视频链接' : (language === 'ko' ? '둘러보기 비디오 링크 추가' : 'Add Walkthrough Video Link')}</h5>
                  <form onSubmit={handleVideoAdd} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ flex: '1 1 200px' }}>
                      <label>{language === 'zh' ? '视频标题' : (language === 'ko' ? '비디오 제목' : 'Video Title')}</label>
                      <input 
                        type="text" 
                        value={videoTitle} 
                        onChange={(e) => setVideoTitle(e.target.value)} 
                        className="form-control" 
                        placeholder="Grand Opening Tour" 
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ flex: '1 1 350px' }}>
                      <label>{language === 'zh' ? '视频 URL (MP4、YouTube 或 Facebook)' : (language === 'ko' ? '비디오 URL (MP4, YouTube 또는 Facebook)' : 'Video URL (MP4, YouTube, or Facebook)')}</label>
                      <input 
                        type="text" 
                        value={videoUrl} 
                        onChange={(e) => setVideoUrl(e.target.value)} 
                        className="form-control" 
                        placeholder="e.g. https://www.facebook.com/reel/12345678" 
                        required 
                      />
                      <small style={{ display: 'block', marginTop: '4px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        {language === 'zh' 
                          ? '使用直接链接（如 /reel/ID 或 /watch/?v=ID）在应用内播放。避免使用分享/重定向的短链接。' 
                          : (language === 'ko' 
                            ? '앱 내에서 재생하려면 클린 링크(/reel/ID 또는 /watch/?v=ID 등)를 사용하세요. 공유/리디렉션 단축 링크는 피하십시오.' 
                            : 'Use clean links (e.g. /reel/ID or /watch/?v=ID) to play inside the app. Avoid share/redirect short links.')}
                      </small>
                    </div>
                    <div className="form-group" style={{ flex: '1 1 250px' }}>
                      <label>{language === 'zh' ? '简短描述' : (language === 'ko' ? '짧은 설명' : 'Short Description')}</label>
                      <input 
                        type="text" 
                        value={videoDesc} 
                        onChange={(e) => setVideoDesc(e.target.value)} 
                        className="form-control" 
                        placeholder="Facility Walkthrough" 
                        required 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 25px' }}>{language === 'zh' ? '添加视频' : (language === 'ko' ? '비디오 추가' : 'Add Video')}</button>
                  </form>
                </div>

                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{t('adm_th_title')}</th>
                        <th>URL</th>
                        <th>{language === 'zh' ? '描述' : (language === 'ko' ? '설명' : 'Description')}</th>
                        <th>{t('adm_th_actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promoVideos && promoVideos.map(vid => (
                        <tr key={vid.id}>
                          <td style={{ fontWeight: 'bold' }}>{vid.title.startsWith('vid') ? t(vid.title) : vid.title}</td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{vid.url}</td>
                          <td>{vid.desc.startsWith('vid') ? t(vid.desc) : vid.desc}</td>
                          <td>
                            <button className="btn btn-danger btn-xs" onClick={() => handleVideoDelete(vid.id, vid.title)}>{t('adm_btn_delete')}</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 9: Social Posts */}
            {adminTab === 'adminSocial' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_socials')}</h4>
                </div>
                
                {/* Inline Add Social Post Form */}
                <div className="glass-panel" style={{ padding: '20px', marginBottom: '25px', width: '100%' }}>
                  <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>{language === 'zh' ? '添加新宾客社交卡片' : (language === 'ko' ? '새로운 고객 소셜 카드 추가' : 'Add New Guest Social Card')}</h5>
                  <form onSubmit={handleSocialAdd} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ flex: '1 1 150px' }}>
                      <label>{language === 'zh' ? '用户名' : (language === 'ko' ? '사용자 이름' : 'Username')}</label>
                      <input 
                        type="text" 
                        value={socialUser} 
                        onChange={(e) => setSocialUser(e.target.value)} 
                        className="form-control" 
                        placeholder="john_doe" 
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ flex: '1 1 250px' }}>
                      <label>{language === 'zh' ? '图片 URL' : (language === 'ko' ? '이미지 URL' : 'Image URL')}</label>
                      <input 
                        type="text" 
                        value={socialImg} 
                        onChange={(e) => setSocialImg(e.target.value)} 
                        className="form-control" 
                        placeholder="https://images.unsplash.com/..." 
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ flex: '1 1 100px' }}>
                      <label>{language === 'zh' ? '模拟点赞数' : (language === 'ko' ? '모의 좋아요 수' : 'Mock Likes')}</label>
                      <input 
                        type="number" 
                        value={socialLikes} 
                        onChange={(e) => setSocialLikes(Number(e.target.value))} 
                        className="form-control" 
                        min="0" 
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ flex: '1 1 300px' }}>
                      <label>{language === 'zh' ? '留言内容' : (language === 'ko' ? '메시지 내용' : 'Message Content')}</label>
                      <input 
                        type="text" 
                        value={socialMsg} 
                        onChange={(e) => setSocialMsg(e.target.value)} 
                        className="form-control" 
                        placeholder="Had an amazing time! #EmgrandSpa" 
                        required 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 25px' }}>{language === 'zh' ? '添加帖子' : (language === 'ko' ? '게시물 추가' : 'Add Post')}</button>
                  </form>
                </div>

                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{language === 'zh' ? '用户名' : (language === 'ko' ? '사용자 이름' : 'Username')}</th>
                        <th>{language === 'zh' ? '图片 URL' : (language === 'ko' ? '이미지 URL' : 'Image URL')}</th>
                        <th>{language === 'zh' ? '点赞数' : (language === 'ko' ? '좋아요' : 'Likes')}</th>
                        <th>{language === 'zh' ? '留言' : (language === 'ko' ? '메시지' : 'Message')}</th>
                        <th>{t('adm_th_actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {socialPosts && socialPosts.map(post => (
                        <tr key={post.id}>
                          <td style={{ fontWeight: 'bold' }}>@{post.username}</td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.img}</td>
                          <td>❤️ {post.likes}</td>
                          <td>{post.message.startsWith('mock_social_') ? t(post.message) : post.message}</td>
                          <td>
                            <button className="btn btn-danger btn-xs" onClick={() => handleSocialDelete(post.id, post.username)}>{t('adm_btn_delete')}</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 10: Memberships */}
            {adminTab === 'adminMemberships' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_perks')}</h4>
                  <button className="btn btn-primary btn-sm" onClick={() => openPerkModal('new')}>
                    <i className="fa-solid fa-plus"></i> {t('adm_btn_add')}
                  </button>
                </div>

                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{t('adm_th_title')}</th>
                        <th>{language === 'zh' ? '图标类名' : (language === 'ko' ? '아이콘 클래스' : 'Icon Class')}</th>
                        <th>{language === 'zh' ? '描述' : (language === 'ko' ? '설명' : 'Description')}</th>
                        <th>{t('adm_th_actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {membershipPerks && membershipPerks.map(perk => (
                        <tr key={perk.id}>
                          <td style={{ fontWeight: 'bold' }}><i className={`fa-solid ${perk.icon || 'fa-award'}`} style={{ marginRight: '8px', color: 'var(--accent-gold)' }}></i>{language === 'zh' ? (perk.title_zh || perk.title) : (language === 'ko' ? (perk.title_ko || perk.title) : (perk.title_en || perk.title))}</td>
                          <td><code>{perk.icon || 'fa-award'}</code></td>
                          <td>{language === 'zh' ? (perk.desc_zh || perk.desc) : (language === 'ko' ? (perk.desc_ko || perk.desc) : (perk.desc_en || perk.desc))}</td>
                          <td>
                            <button className="btn btn-primary btn-xs" style={{ marginRight: '5px' }} onClick={() => openPerkModal('edit', perk)}>{t('adm_btn_edit')}</button>
                            <button className="btn btn-danger btn-xs" onClick={() => handlePerkDelete(perk.id, perk.title)}>{t('adm_btn_delete')}</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 11: Chatbot Training & Guidelines */}
            {adminTab === 'adminChatbot' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_chatbot')}</h4>
                </div>

                {/* Global Master Prompt Instructions */}
                <div className="glass-panel" style={{ padding: '20px', marginBottom: '25px', width: '100%', boxSizing: 'border-box' }}>
                  <h5 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>
                    <i className="fa-solid fa-brain" style={{ marginRight: '8px' }}></i> {language === 'zh' ? '主 AI 客服系统指令' : (language === 'ko' ? '마스터 AI 컨시어지 시스템 지침' : 'Master AI Concierge System Instructions')}
                  </h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                    {language === 'zh' 
                      ? '配置 AI 品牌大使的核心个性、运营规则、布局细节和防线。此段内容直接作为大模型的系统设定加载。' 
                      : (language === 'ko' 
                        ? 'AI 브랜드 앰버서더의 주요 성격, 운영 규칙, 레이아웃 세부 정보 및 가드레일을 구성합니다. 이 단락은 LLM의 시스템 페르소나로 직접 로드됩니다.' 
                        : 'Configure the primary personality, operational rules, layout details, and guardrails of the AI brand ambassador. This paragraph is loaded directly as the LLM\'s system persona.')}
                  </p>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    await updateChatbotInstructions(tempInstructions);
                    triggerToast("🎉 " + (language === 'zh' ? 'AI 系统指令更新成功！' : (language === 'ko' ? 'AI 시스템 지침이 성공적으로 업데이트되었습니다!' : 'AI System Instructions updated successfully!')));
                  }}>
                    <textarea 
                      value={tempInstructions} 
                      onChange={(e) => setTempInstructions(e.target.value)} 
                      className="form-control" 
                      rows="8" 
                      required 
                      style={{ 
                        width: '100%', 
                        fontFamily: 'inherit', 
                        fontSize: '0.88rem', 
                        lineHeight: '1.6', 
                        padding: '12px', 
                        borderRadius: '6px', 
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        resize: 'vertical'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                      <button type="submit" className="btn btn-primary btn-sm">{language === 'zh' ? '保存系统指令' : (language === 'ko' ? '시스템 지침 저장' : 'Save System Instructions')}</button>
                    </div>
                  </form>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', alignItems: 'start', width: '100%' }}>
                  
                  {/* LEFT COLUMN: GUIDELINES & KEY POINTS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass-panel" style={{ padding: '20px', width: '100%' }}>
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}><i className="fa-solid fa-list-check" style={{ marginRight: '8px' }}></i> {language === 'zh' ? '添加核心要点/规则' : (language === 'ko' ? '핵심 사항 / 규칙 추가' : 'Add Key Point / Rule')}</h5>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        {language === 'zh' 
                          ? '定义 AI 在生成回复时应遵循的通用回答说明、运营指南或品牌基调规则。' 
                          : (language === 'ko' 
                            ? '응답을 생성할 때 AI가 준수해야 하는 일반적인 답변 지침, 운영 가이드라인 또는 브랜드 톤 규칙을 정의합니다.' 
                            : 'Define general answering instructions, operational guidelines, or brand tone rules that the AI should follow when generating responses.')}
                      </p>
                      <form onSubmit={handleKeyPointAdd} style={{ display: 'flex', gap: '10px' }}>
                        <input 
                          type="text" 
                          value={keyPointText} 
                          onChange={(e) => setKeyPointText(e.target.value)} 
                          className="form-control" 
                          placeholder={language === 'zh' ? '例如：回答要友好、简短，控制在3句话以内。' : (language === 'ko' ? '예: 답변은 친절하고 짧게, 3문장 이내로 작성하세요.' : 'e.g. Keep answers friendly, short, and under 3 sentences.')}
                          required 
                          style={{ flexGrow: 1 }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}>{language === 'zh' ? '添加规则' : (language === 'ko' ? '규칙 추가' : 'Add Rule')}</button>
                      </form>
                    </div>

                    <div className="glass-panel" style={{ padding: '20px', width: '100%' }}>
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>{language === 'zh' ? '活跃的回答说明' : (language === 'ko' ? '활성 답변 지침' : 'Active Answering Instructions')}</h5>
                      <div className="table-wrapper">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>{language === 'zh' ? '指南 / 核心要点' : (language === 'ko' ? '가이드라인 / 핵심 사항' : 'Guideline / Key Point')}</th>
                              <th style={{ width: '80px' }}>{t('adm_th_actions')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {chatbotKeyPoints && chatbotKeyPoints.map(kp => (
                              <tr key={kp.id}>
                                <td style={{ fontSize: '0.85rem' }}>{kp.text}</td>
                                <td>
                                  <button className="btn btn-danger btn-xs" onClick={() => handleKeyPointDelete(kp.id, kp.text)}>{t('adm_btn_delete')}</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Q&A PAIRS (FAQS) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass-panel" style={{ padding: '20px', width: '100%' }}>
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}><i className="fa-solid fa-comments" style={{ marginRight: '8px' }}></i> {language === 'zh' ? '训练新常见问题对 (FAQ)' : (language === 'ko' ? '새 FAQ 쌍 훈련' : 'Train New FAQ Pair')}</h5>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        {language === 'zh' 
                          ? '为访客经常提出的问题设置特定的问答匹配。' 
                          : (language === 'ko' 
                            ? '방문자가 자주 질문하는 질문에 대해 구체적인 Q&A 일치를 설정합니다.' 
                            : 'Set up specific Q&A matches for questions that visitors frequently ask.')}
                      </p>
                      <form onSubmit={handleFAQAdd} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="form-group">
                          <label>{language === 'zh' ? '常见问题' : (language === 'ko' ? 'FAQ 질문' : 'FAQ Question')}</label>
                          <input 
                            type="text" 
                            value={faqQuestion} 
                            onChange={(e) => setFaqQuestion(e.target.value)} 
                            className="form-control" 
                            placeholder="Can I bring my mobile phone inside the wet area?" 
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>{language === 'zh' ? 'AI 回答响应' : (language === 'ko' ? 'AI 답변 응답' : 'AI Answer Response')}</label>
                          <textarea 
                            value={faqAnswer} 
                            onChange={(e) => setFaqAnswer(e.target.value)} 
                            className="form-control" 
                            rows="2" 
                            placeholder="No, mobile phones are strictly prohibited..." 
                            required 
                          />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end', padding: '10px 20px' }}>{language === 'zh' ? '添加问答对' : (language === 'ko' ? 'FAQ 쌍 추가' : 'Add FAQ Pair')}</button>
                      </form>
                    </div>

                    <div className="glass-panel" style={{ padding: '20px', width: '100%' }}>
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>{language === 'zh' ? '当前有效的问答对 (FAQ)' : (language === 'ko' ? '활성 Q&A 쌍 (FAQ)' : 'Active Q&A Pairs (FAQ)')}</h5>
                      <div className="table-wrapper">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>{language === 'zh' ? '问题' : (language === 'ko' ? '질문' : 'Question')}</th>
                              <th>{language === 'zh' ? '回答响应' : (language === 'ko' ? '답변 응답' : 'Answer Response')}</th>
                              <th style={{ width: '80px' }}>{t('adm_th_actions')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {chatbotFAQs && chatbotFAQs.map(faq => (
                              <tr key={faq.id}>
                                <td style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{faq.question}</td>
                                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{faq.answer}</td>
                                <td>
                                  <button className="btn btn-danger btn-xs" onClick={() => handleFAQDelete(faq.id, faq.question)}>{t('adm_btn_delete')}</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 12: FEEDBACK SUBMISSIONS */}
            {adminTab === 'adminFeedback' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_feedback')}</h4>
                </div>
                
                <div className="feedback-grid-admin">
                  {feedbacks.length > 0 ? (
                    feedbacks.map(fb => (
                      <div key={fb.id} className="feedback-card-admin glass-panel">
                        <div>
                          <div className="feedback-card-header">
                            <h5>{fb.name}</h5>
                            <span className="feedback-rating-stars">
                              {'⭐'.repeat(fb.rating)}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{language === 'zh' ? '联系方式' : (language === 'ko' ? '연락처' : 'Contact')}: {fb.contact}</p>
                          <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>&ldquo;{fb.message}&rdquo;</p>
                        </div>
                        <span className="feedback-date">{language === 'zh' ? '接收时间' : (language === 'ko' ? '수신 시간' : 'Received')}: {fb.date}</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>{language === 'zh' ? '暂无反馈记录。' : (language === 'ko' ? '기록된 피드백이 아직 없습니다.' : 'No feedbacks logged yet.')}</p>
                  )}
                </div>
              </div>
            )}

            {/* TAB 13: ANALYTICS & LOGS */}
            {adminTab === 'adminAnalytics' && (
              <div className="admin-tab-content active">
                <div className="analytics-dashboard-grid">
                  
                  <div className="metrics-row">
                    <div className="metric-card glass-panel">
                      <h5>{language === 'zh' ? '总咨询量（机器人日志）' : (language === 'ko' ? '총 문의수 (챗봇 로그)' : 'Total Inquiries (Chatbot Logs)')}</h5>
                      <p className="metric-value">{chatLogs.length}</p>
                    </div>
                    <div className="metric-card glass-panel">
                      <h5>{language === 'zh' ? '活跃预订数' : (language === 'ko' ? '활성 예약 건수' : 'Active Reservations')}</h5>
                      <p className="metric-value">{activeBookingsCount}</p>
                    </div>
                    <div className="metric-card glass-panel">
                      <h5>{language === 'zh' ? '宾客平均评分' : (language === 'ko' ? '피드백 평균 평점' : 'Feedback Average Rating')}</h5>
                      <p className="metric-value">{avgRating} ⭐</p>
                    </div>
                  </div>

                  <div className="analytics-details-grid">
                    {/* Chat Query log */}
                    <div className="analytics-card glass-panel">
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>{language === 'zh' ? '智能客服咨询历史日志' : (language === 'ko' ? '챗봇 문의 내역 로그' : 'Chatbot Inquiry History Logs')}</h5>
                      <div className="logged-queries-list">
                        {chatLogs.length > 0 ? (
                          chatLogs.map(log => (
                            <div key={log.id} className="query-log-item">
                              <p style={{ fontWeight: 'bold' }}>Q: {log.query}</p>
                              <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>A: {log.response}</p>
                              <span className="query-log-time">{log.timestamp}</span>
                            </div>
                          ))
                        ) : (
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{language === 'zh' ? '暂无智能客服交互日志。' : (language === 'ko' ? '기록된 챗봇 상호작용이 아직 없습니다.' : 'No chatbot interactions logged yet.')}</p>
                        )}
                      </div>
                    </div>

                    {/* Audit Trail */}
                    <div className="analytics-card glass-panel">
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>{language === 'zh' ? '管理员审计跟踪日志' : (language === 'ko' ? '관리자 감사 추적 로그' : 'Admin Audit Trails')}</h5>
                      <div className="audit-log-list">
                        {auditLogs.map(log => (
                          <div key={log.id} className="audit-log-item">
                            <span style={{ fontWeight: 'bold', color: 'var(--accent-gold-hover)' }}>{log.user}</span>: {log.action}
                            <span className="audit-log-time">{log.timestamp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 14: SETTINGS & KEYS */}
            {adminTab === 'adminSettings' && (
              <div className="admin-tab-content active">
                <div className="settings-grid">
                  
                  {/* Firebase Config Form */}
                  <div className="settings-card glass-panel">
                    <h5>{language === 'zh' ? 'Firebase 凭据设置' : (language === 'ko' ? 'Firebase 자격 증명 설정' : 'Firebase Credentials Setup')}</h5>
                    <p className="settings-desc">
                      {language === 'zh' 
                        ? '提供您的 Firebase 项目配置以启用实时同步。如果为空，应用将退回到本地 Local Storage 数据库。' 
                        : (language === 'ko' 
                          ? '실시간 동기화를 활성화하려면 Firebase 프로젝트 구성을 제공하십시오. 비어 있는 경우 앱은 로컬 스토리지 DB로 돌아갑니다.' 
                          : 'Provide your Firebase project configurations to activate real-time synchronization. If empty, the app falls back to Local Storage DB.')}
                    </p>
                    <form onSubmit={saveFirebaseSettings}>
                      <div className="form-group">
                        <label>Firebase API Key</label>
                        <input 
                          type="text" 
                          value={fbApiKey}
                          onChange={(e) => setFbApiKey(e.target.value)}
                          className="form-control" 
                          placeholder="AIzaSy..." 
                        />
                      </div>
                      <div className="form-group">
                        <label>Auth Domain</label>
                        <input 
                          type="text" 
                          value={fbAuthDomain}
                          onChange={(e) => setFbAuthDomain(e.target.value)}
                          className="form-control" 
                          placeholder="emgrand-spa.firebaseapp.com" 
                        />
                      </div>
                      <div className="form-group">
                        <label>Project ID</label>
                        <input 
                          type="text" 
                          value={fbProjectId}
                          onChange={(e) => setFbProjectId(e.target.value)}
                          className="form-control" 
                          placeholder="emgrand-spa" 
                        />
                      </div>
                      <div className="form-group">
                        <label>App ID</label>
                        <input 
                          type="text" 
                          value={fbAppId}
                          onChange={(e) => setFbAppId(e.target.value)}
                          className="form-control" 
                          placeholder="1:XXX:web:XXX" 
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button type="submit" className="btn btn-primary btn-sm">{language === 'zh' ? '保存配置并重新加载' : (language === 'ko' ? '구성 저장 및 새로고침' : 'Save Config & Reload')}</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={clearFirebaseSettings}>{language === 'zh' ? '清除配置' : (language === 'ko' ? '구성 지우기' : 'Clear Config')}</button>
                      </div>
                    </form>
                  </div>

                  {/* Groq Config Form */}
                  <div className="settings-card glass-panel">
                    <h5>{language === 'zh' ? 'Groq 云端 AI 设置' : (language === 'ko' ? 'Groq 클라우드 AI 설정' : 'Groq Cloud AI Settings')}</h5>
                    <p className="settings-desc">
                      {language === 'zh' 
                        ? '提供 Groq API 密钥，以使用 Llama-3 模型为漂浮的 AI 康养助手提供支持。请在下方检查自定义系统上下文。' 
                        : (language === 'ko' 
                          ? 'Llama-3 모델을 사용하여 플로팅 AI 웰니스 어시스턴트에 전원을 공급하려면 Groq API 키를 제공하십시오. 아래에서 맞춤형 시스템 컨텍스트를 확인하십시오.' 
                          : 'Provide a Groq API Key to power the floating AI Wellness Assistant with Llama-3 models. Check custom systems contexts below.')}
                    </p>
                    <form onSubmit={saveGroqSettings}>
                      <div className="form-group">
                        <label>Groq API Key</label>
                        <input 
                          type="password" 
                          value={tempGroqKey}
                          onChange={(e) => setTempGroqKey(e.target.value)}
                          className="form-control" 
                          placeholder="gsk_..." 
                        />
                      </div>
                      <div className="form-group">
                        <label>{language === 'zh' ? '选择 Groq 模型' : (language === 'ko' ? 'Groq 모델 선택' : 'Select Groq Model')}</label>
                        <select 
                          value={tempGroqModel}
                          onChange={(e) => setTempGroqModel(e.target.value)}
                          className="form-control"
                        >
                          <option value="llama-3.1-8b-instant">Llama 3.1 8B Instant (llama-3.1-8b-instant) - {language === 'zh' ? '最划算且极速' : (language === 'ko' ? '가장 저렴하고 초고속' : 'Cheapest & Ultra-Fast')}</option>
                          <option value="llama-3.3-70b-versatile">Llama 3.3 70B Versatile (llama-3.3-70b-versatile) - {language === 'zh' ? '高度精准' : (language === 'ko' ? '높은 정확도' : 'Highly Accurate')}</option>
                          <option value="mixtral-8x7b-32768">Mixtral 8x7B (mixtral-8x7b-32768) - {language === 'zh' ? '全面性' : (language === 'ko' ? '종합적' : 'Comprehensive')}</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: '10px' }}>{language === 'zh' ? '保存 Groq 密钥' : (language === 'ko' ? 'Groq 키 저장' : 'Save Groq Key')}</button>
                    </form>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 15: USER ACCOUNTS */}
            {adminTab === 'adminAccounts' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>{t('adm_title_accounts')}</h4>
                </div>
                <div className="settings-grid">
                  <div className="settings-card glass-panel" style={{ maxWidth: '600px', width: '100%' }}>
                    <h5>{language === 'zh' ? '注册新管理员/员工账户' : (language === 'ko' ? '새 관리자/직원 계정 등록' : 'Register New Admin/Staff Account')}</h5>
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      if (!newUserEmail.trim()) return;
                      try {
                        await addUserAccount(newUserEmail, newUserRole);
                        setNewUserEmail('');
                        triggerToast("🎉 " + (language === 'zh' ? '账户注册成功！' : (language === 'ko' ? '계정이 성공적으로 등록되었습니다!' : 'Account registered successfully!')));
                      } catch (err) {
                        console.error(err);
                        triggerToast("❌ " + (language === 'zh' ? '注册账户时出错。' : (language === 'ko' ? '계정 등록 중 오류가 발생했습니다.' : 'Error registering account.')));
                      }
                    }}>
                      <div className="form-group">
                        <label>{t('adm_lbl_email')}</label>
                        <input 
                          type="email" 
                          value={newUserEmail} 
                          onChange={(e) => setNewUserEmail(e.target.value)} 
                          className="form-control" 
                          placeholder="staff@emgrandspa.com" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>{language === 'zh' ? '角色权限' : (language === 'ko' ? '역할' : 'Role')}</label>
                        <select 
                          value={newUserRole} 
                          onChange={(e) => setNewUserRole(e.target.value)} 
                          className="form-control"
                        >
                          <option value="admin">Admin</option>
                          <option value="staff">Staff</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>{language === 'zh' ? '添加账户' : (language === 'ko' ? '계정 추가' : 'Add Account')}</button>
                    </form>
                  </div>

                  <div className="settings-card glass-panel">
                    <h5>{language === 'zh' ? '系统授权用户列表' : (language === 'ko' ? '시스템 승인된 사용자 목록' : 'Authorized System Users')}</h5>
                    <div className="table-wrapper">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>{t('adm_lbl_email')}</th>
                            <th>{language === 'zh' ? '角色权限' : (language === 'ko' ? '역할' : 'Role')}</th>
                            <th>{t('adm_th_actions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userAccounts && userAccounts.map(acc => (
                            <tr key={acc.id || acc.email}>
                              <td>{acc.email}</td>
                              <td>
                                <select 
                                  value={acc.role} 
                                  onChange={async (e) => {
                                    try {
                                      await updateUserRole(acc.id || acc.email, e.target.value);
                                      triggerToast("🎉 " + (language === 'zh' ? '角色更新成功！' : (language === 'ko' ? '역할이 성공적으로 업데이트되었습니다!' : 'Role updated successfully!')));
                                    } catch (err) {
                                      console.error(err);
                                      triggerToast("❌ " + (language === 'zh' ? '更新角色时出错。' : (language === 'ko' ? '역할 업데이트 중 오류가 발생했습니다.' : 'Error updating role.')));
                                    }
                                  }}
                                  className="form-control"
                                  style={{ padding: '4px', fontSize: '0.8rem' }}
                                >
                                  <option value="admin">Admin</option>
                                  <option value="staff">Staff</option>
                                </select>
                              </td>
                              <td>
                                <button 
                                  className="btn btn-danger btn-xs" 
                                  onClick={async () => {
                                    if (confirm(`Delete account: ${acc.email}?`)) {
                                      try {
                                        await deleteUserAccount(acc.id || acc.email);
                                        triggerToast("🎉 " + (language === 'zh' ? '账户删除成功！' : (language === 'ko' ? '계정이 성공적으로 삭제되었습니다!' : 'Account deleted successfully!')));
                                      } catch (err) {
                                        console.error(err);
                                        triggerToast("❌ " + (language === 'zh' ? '删除账户时出错。' : (language === 'ko' ? '계정 삭제 중 오류가 발생했습니다.' : 'Error deleting account.')));
                                      }
                                    }
                                  }}
                                >
                                  {t('adm_btn_delete')}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* SERVICE MODAL POPUP */}
      <div className={`modal ${isServiceModalOpen ? 'active' : ''}`}>
        <div className="modal-content glass-panel">
          <div className="modal-header">
            <h3>{modalMode === 'new' ? (language === 'zh' ? '添加服务' : (language === 'ko' ? '서비스 추가' : 'Add Service')) : (language === 'zh' ? '编辑服务' : (language === 'ko' ? '서비스 수정' : 'Edit Service'))}</h3>
            <button className="modal-close-btn" onClick={() => setIsServiceModalOpen(false)}>&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleServiceSave}>
              <div className="form-group">
                <label>{language === 'zh' ? '类别' : (language === 'ko' ? '카테고리' : 'Category')}</label>
                <select 
                  value={serviceCategory} 
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="form-control" 
                  required
                >
                  <option value="massage">{language === 'zh' ? '按摩理疗' : (language === 'ko' ? '마사지 트리트먼트' : 'Massage Treatment')}</option>
                  <option value="lodging">{language === 'zh' ? '私人套房住宿' : (language === 'ko' ? '프라이빗 스위트 숙박' : 'Private Suite Lodging')}</option>
                  <option value="special">{language === 'zh' ? '特色理疗' : (language === 'ko' ? '특화 테라피' : 'Specialized Therapy')}</option>
                  <option value="tcm">{language === 'zh' ? '中医正骨' : (language === 'ko' ? '한방 정골 요법' : 'TCM Orthopedics')}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '服务名称 (英文)' : (language === 'ko' ? '서비스 이름 (영어)' : 'Service Name (English)')}</label>
                <input 
                  type="text" 
                  value={nameEN} 
                  onChange={(e) => setNameEN(e.target.value)}
                  className="form-control" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '服务名称 (中文)' : (language === 'ko' ? '서비스 이름 (중국어)' : 'Service Name (Chinese)')}</label>
                <input 
                  type="text" 
                  value={nameZH} 
                  onChange={(e) => setNameZH(e.target.value)}
                  className="form-control" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '服务名称 (韩文)' : (language === 'ko' ? '서비스 이름 (한국어)' : 'Service Name (Korean)')}</label>
                <input 
                  type="text" 
                  value={nameKO} 
                  onChange={(e) => setNameKO(e.target.value)}
                  className="form-control" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '基础价格 (Php)' : (language === 'ko' ? '기본 요금 (Php)' : 'Base Price (Php)')}</label>
                <input 
                  type="number" 
                  value={serviceRate} 
                  onChange={(e) => setServiceRate(e.target.value)}
                  className="form-control" 
                  required 
                  min="0" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '强制理疗师小费选项' : (language === 'ko' ? '필수 테라피스트 팁 옵션' : 'Mandatory Therapist Tip Option')}</label>
                <select 
                  value={serviceTip} 
                  onChange={(e) => setServiceTip(e.target.value)}
                  className="form-control"
                >
                  <option value="variable">{language === 'zh' ? '根据理疗师选择 (Php 200/500)' : (language === 'ko' ? '테라피스트 선택에 따름 (Php 200/500)' : 'Based on Therapist Selection (Php 200/500)')}</option>
                  <option value="none">{language === 'zh' ? '无需小费' : (language === 'ko' ? '팁 불필요' : 'No Tip Required')}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '描述' : (language === 'ko' ? '설명' : 'Description')}</label>
                <textarea 
                  value={serviceDesc} 
                  onChange={(e) => setServiceDesc(e.target.value)}
                  className="form-control" 
                  rows="2" 
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>{language === 'zh' ? '保存服务' : (language === 'ko' ? '서비스 저장' : 'Save Service')}</button>
            </form>
          </div>
        </div>
      </div>

      {/* CAMPAIGN MODAL POPUP */}
      <div className={`modal ${isCampaignModalOpen ? 'active' : ''}`}>
        <div className="modal-content glass-panel">
          <div className="modal-header">
            <h3>{language === 'zh' ? '添加倒计时活动推广' : (language === 'ko' ? '카운트다운 이벤트 캠페인 추가' : 'Add Countdown Event Campaign')}</h3>
            <button className="modal-close-btn" onClick={() => setIsCampaignModalOpen(false)}>&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleCampaignSave}>
              <div className="form-group">
                <label>{language === 'zh' ? '活动标题 (英文)' : (language === 'ko' ? '캠페인 제목 (영어)' : 'Campaign Title (English)')}</label>
                <input 
                  type="text" 
                  value={campaignTitleEN} 
                  onChange={(e) => setCampaignTitleEN(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="Children's Day Painting Contest" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '活动标题 (中文)' : (language === 'ko' ? '캠페인 제목 (중국어)' : 'Campaign Title (Chinese)')}</label>
                <input 
                  type="text" 
                  value={campaignTitleZH} 
                  onChange={(e) => setCampaignTitleZH(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="六一儿童节涂鸦大赛" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '活动标题 (韩文)' : (language === 'ko' ? '캠페인 제목 (한국어)' : 'Campaign Title (Korean)')}</label>
                <input 
                  type="text" 
                  value={campaignTitleKO} 
                  onChange={(e) => setCampaignTitleKO(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="어린이날 그림 그리기 대회" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '活动详情 (英文)' : (language === 'ko' ? '캠페인 세부 정보 (영어)' : 'Campaign Details (English)')}</label>
                <textarea 
                  value={campaignDescEN} 
                  onChange={(e) => setCampaignDescEN(e.target.value)}
                  className="form-control" 
                  rows="2" 
                  required 
                  placeholder="Description of dates, rates, inclusions, and rewards..." 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '活动详情 (中文)' : (language === 'ko' ? '캠페인 세부 정보 (중국어)' : 'Campaign Details (Chinese)')}</label>
                <textarea 
                  value={campaignDescZH} 
                  onChange={(e) => setCampaignDescZH(e.target.value)}
                  className="form-control" 
                  rows="2" 
                  required 
                  placeholder="活动日期、费用、所包含内容以及奖励的描述..." 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '活动详情 (韩文)' : (language === 'ko' ? '캠페인 세부 정보 (한국어)' : 'Campaign Details (Korean)')}</label>
                <textarea 
                  value={campaignDescKO} 
                  onChange={(e) => setCampaignDescKO(e.target.value)}
                  className="form-control" 
                  rows="2" 
                  required 
                  placeholder="날짜, 요금, 포함 사항 및 혜택에 대한 설명..." 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '目标结束日期与时间' : (language === 'ko' ? '목표 종료 날짜 및 시간' : 'Target End Date & Time')}</label>
                <input 
                  type="datetime-local" 
                  value={campaignEndDate} 
                  onChange={(e) => setCampaignEndDate(e.target.value)}
                  className="form-control" 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>{language === 'zh' ? '添加活动' : (language === 'ko' ? '이벤트 추가' : 'Add Event')}</button>
            </form>
          </div>
        </div>
      </div>

      {/* SERVICE PACKAGE MODAL POPUP */}
      <div className={`modal ${isPackageModalOpen ? 'active' : ''}`}>
        <div className="modal-content glass-panel">
          <div className="modal-header">
            <h3>{packageModalMode === 'new' ? (language === 'zh' ? '添加周中按摩套餐' : (language === 'ko' ? '평일 마사지 패키지 추가' : 'Add Weekday Package')) : (language === 'zh' ? '编辑周中按摩套餐' : (language === 'ko' ? '평일 마사지 패키지 수정' : 'Edit Weekday Package'))}</h3>
            <button className="modal-close-btn" onClick={() => setIsPackageModalOpen(false)}>&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handlePackageSave}>
              <div className="form-group">
                <label>{language === 'zh' ? '套餐标题 (英文)' : (language === 'ko' ? '패키지 제목 (영어)' : 'Package Title (English)')}</label>
                <input 
                  type="text" 
                  value={packageTitleEN} 
                  onChange={(e) => setPackageTitleEN(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="e.g. Package A" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '套餐标题 (中文)' : (language === 'ko' ? '패키지 제목 (중국어)' : 'Package Title (Chinese)')}</label>
                <input 
                  type="text" 
                  value={packageTitleZH} 
                  onChange={(e) => setPackageTitleZH(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="例如：套餐 A" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '套餐标题 (韩文)' : (language === 'ko' ? '패키지 제목 (한국어)' : 'Package Title (Korean)')}</label>
                <input 
                  type="text" 
                  value={packageTitleKO} 
                  onChange={(e) => setPackageTitleKO(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="예: 패키지 A" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '套餐收费标准 (Php)' : (language === 'ko' ? '패키지 요금 (Php)' : 'Package Cost Rate (Php)')}</label>
                <input 
                  type="number" 
                  value={packageRate} 
                  onChange={(e) => setPackageRate(e.target.value)}
                  className="form-control" 
                  required 
                  min="0" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '预计可节省金额 (Php)' : (language === 'ko' ? '예상 절약 금액 (Php)' : 'Estimated Savings (Php)')}</label>
                <input 
                  type="number" 
                  value={packageSavings} 
                  onChange={(e) => setPackageSavings(e.target.value)}
                  className="form-control" 
                  required 
                  min="0" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '包含项目 (英文, 逗号分隔)' : (language === 'ko' ? '포함 사항 (영어, 쉼표로 구분)' : 'Inclusions (English, Comma separated)')}</label>
                <textarea 
                  value={packageInclusionsEN} 
                  onChange={(e) => setPackageInclusionsEN(e.target.value)}
                  className="form-control" 
                  rows="2" 
                  required
                  placeholder="Adult Admission (Php 1,699), Meridian Massage (Php 1,588), Unlimited Buffet (Php 1,997)"
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '包含项目 (中文, 逗号分隔)' : (language === 'ko' ? '포함 사항 (중국어, 쉼표로 구분)' : 'Inclusions (Chinese, Comma separated)')}</label>
                <textarea 
                  value={packageInclusionsZH} 
                  onChange={(e) => setPackageInclusionsZH(e.target.value)}
                  className="form-control" 
                  rows="2" 
                  required
                  placeholder="门票 (Php 1,699), 经络按摩 (Php 1,588), 无限量自助餐 (Php 1,997)"
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '包含项目 (韩文, 逗号分隔)' : (language === 'ko' ? '포함 사항 (한국어, 쉼표로 구분)' : 'Inclusions (Korean, Comma separated)')}</label>
                <textarea 
                  value={packageInclusionsKO} 
                  onChange={(e) => setPackageInclusionsKO(e.target.value)}
                  className="form-control" 
                  rows="2" 
                  required
                  placeholder="입장료 (Php 1,699), 경락 마사지 (Php 1,588), 무제한 뷔페 (Php 1,997)"
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>{language === 'zh' ? '保存套餐' : (language === 'ko' ? '패키지 저장' : 'Save Package')}</button>
            </form>
          </div>
        </div>
      </div>

      {/* MEMBERSHIP PERK MODAL POPUP */}
      <div className={`modal ${isPerkModalOpen ? 'active' : ''}`}>
        <div className="modal-content glass-panel">
          <div className="modal-header">
            <h3>{perkModalMode === 'new' ? (language === 'zh' ? '添加会员特权' : (language === 'ko' ? '멤버십 혜택 추가' : 'Add Membership Perk')) : (language === 'zh' ? '编辑会员特权' : (language === 'ko' ? '멤버십 혜택 수정' : 'Edit Membership Perk'))}</h3>
            <button className="modal-close-btn" onClick={() => setIsPerkModalOpen(false)}>&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handlePerkSave}>
              <div className="form-group">
                <label>{language === 'zh' ? '特权标题 (英文)' : (language === 'ko' ? '혜택 제목 (영어)' : 'Perk Title (English)')}</label>
                <input 
                  type="text" 
                  value={perkTitleEN} 
                  onChange={(e) => setPerkTitleEN(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="Free Unlimited Beer" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '特权标题 (中文)' : (language === 'ko' ? '혜택 제목 (중국어)' : 'Perk Title (Chinese)')}</label>
                <input 
                  type="text" 
                  value={perkTitleZH} 
                  onChange={(e) => setPerkTitleZH(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="生啤酒免费畅饮" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '特权标题 (韩文)' : (language === 'ko' ? '혜택 제목 (한국어)' : 'Perk Title (Korean)')}</label>
                <input 
                  type="text" 
                  value={perkTitleKO} 
                  onChange={(e) => setPerkTitleKO(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="무료 생맥주 무제한" 
                />
              </div>
              <div className="form-group">
                <label>FontAwesome Icon Class name</label>
                <input 
                  type="text" 
                  value={perkIcon} 
                  onChange={(e) => setPerkIcon(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="fa-beer-mug-empty" 
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '描述 (英文)' : (language === 'ko' ? '설명 (영어)' : 'Description (English)')}</label>
                <textarea 
                  value={perkDescEN} 
                  onChange={(e) => setPerkDescEN(e.target.value)}
                  className="form-control" 
                  rows="2" 
                  required
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '描述 (中文)' : (language === 'ko' ? '설명 (중국어)' : 'Description (Chinese)')}</label>
                <textarea 
                  value={perkDescZH} 
                  onChange={(e) => setPerkDescZH(e.target.value)}
                  className="form-control" 
                  rows="2" 
                  required
                />
              </div>
              <div className="form-group">
                <label>{language === 'zh' ? '描述 (韩文)' : (language === 'ko' ? '설명 (한국어)' : 'Description (Korean)')}</label>
                <textarea 
                  value={perkDescKO} 
                  onChange={(e) => setPerkDescKO(e.target.value)}
                  className="form-control" 
                  rows="2" 
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>{language === 'zh' ? '保存特权' : (language === 'ko' ? '혜택 저장' : 'Save Perk')}</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

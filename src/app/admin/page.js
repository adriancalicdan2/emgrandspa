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
    updateChatbotInstructions
  } = useAppState();

  const [adminTab, setAdminTab] = useState('adminServices');

  // Auth form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMsg, setToastMsg] = useState('');

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
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignDesc, setCampaignDesc] = useState('');
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
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');

  // 3. Service Packages Modal
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [packageModalMode, setPackageModalMode] = useState('new');
  const [packageId, setPackageId] = useState('');
  const [packageTitle, setPackageTitle] = useState('');
  const [packageRate, setPackageRate] = useState(2000);
  const [packageSavings, setPackageSavings] = useState(500);
  const [packageInclusions, setPackageInclusions] = useState('');

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
  const [perkTitle, setPerkTitle] = useState('');
  const [perkIcon, setPerkIcon] = useState('fa-star');
  const [perkDesc, setPerkDesc] = useState('');

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
      setBannerTitle(homeBanner.title || '');
      setBannerSubtitle(homeBanner.subtitle || '');
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
      title: campaignTitle,
      desc: campaignDesc,
      end_date: campaignEndDate
    };
    try {
      await addCampaign(data);
      setCampaignTitle('');
      setCampaignDesc('');
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
      setPackageTitle(item.title);
      setPackageRate(item.rate);
      setPackageSavings(item.savings);
      setPackageInclusions(item.inclusions);
    } else {
      setPackageId('');
      setPackageTitle('');
      setPackageRate(2880);
      setPackageSavings(1704);
      setPackageInclusions('');
    }
    setIsPackageModalOpen(true);
  };

  const handlePackageSave = async (e) => {
    e.preventDefault();
    const pkgData = {
      title: packageTitle,
      rate: Number(packageRate),
      savings: Number(packageSavings),
      inclusions: packageInclusions
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
      setPerkTitle(item.title);
      setPerkIcon(item.icon || 'fa-star');
      setPerkDesc(item.desc);
    } else {
      setPerkId('');
      setPerkTitle('');
      setPerkIcon('fa-beer-mug-empty');
      setPerkDesc('');
    }
    setIsPerkModalOpen(true);
  };

  const handlePerkSave = async (e) => {
    e.preventDefault();
    const perkData = {
      title: perkTitle,
      icon: perkIcon,
      desc: perkDesc
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
            <span className="gold-text"><i className="fa-solid fa-user-shield"></i> Administration Console</span>
          </h2>
          <p className="section-sub-title">Configure spa settings, review bookings, analyze feedback, and view database updates.</p>
        </div>

        {/* NOT LOGGED IN ACCESS PANEL */}
        {!adminUser ? (
          <div className="admin-login-card glass-panel">
            <div className="login-header">
              <h3>Administrative Access</h3>
              <p>Log in with your administrator account credentials to modify dynamic contents.</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
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
                <label>Password</label>
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
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Log In</button>
              </div>
            </form>
            
            {!dbActive && (
              <div className="local-database-fallback">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <div>
                  <strong>Local Mock Database Mode Active</strong>
                  <p>Firebase configuration is not active. Using mock in-memory localStorage db for instant testing. Feel free to use any username/password above to log in instantly!</p>
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
                <i className="fa-solid fa-clipboard-list"></i> Services Catalog
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminPackages' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminPackages')}
              >
                <i className="fa-solid fa-box-archive"></i> Service Packages
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminBookings' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminBookings')}
              >
                <i className="fa-solid fa-calendar-check"></i> Bookings Manager
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminCampaigns' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminCampaigns')}
              >
                <i className="fa-solid fa-bullhorn"></i> Events & Campaigns
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminSEO' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminSEO')}
              >
                <i className="fa-solid fa-search"></i> SEO Settings
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminBanners' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminBanners')}
              >
                <i className="fa-solid fa-image"></i> Home Banners
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminGallery' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminGallery')}
              >
                <i className="fa-solid fa-images"></i> Gallery Photos
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminVideos' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminVideos')}
              >
                <i className="fa-solid fa-circle-play"></i> Videos
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminSocial' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminSocial')}
              >
                <i className="fa-solid fa-share-nodes"></i> Social Posts
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminMemberships' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminMemberships')}
              >
                <i className="fa-solid fa-id-card"></i> Memberships
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminChatbot' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminChatbot')}
              >
                <i className="fa-solid fa-robot"></i> Chatbot Training
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminFeedback' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminFeedback')}
              >
                <i className="fa-solid fa-comments"></i> Guest Feedback
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminAnalytics' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminAnalytics')}
              >
                <i className="fa-solid fa-chart-pie"></i> Analytics & Logs
              </button>
              <button 
                className={`admin-tab-btn ${adminTab === 'adminSettings' ? 'active' : ''}`}
                onClick={() => setAdminTab('adminSettings')}
              >
                <i className="fa-solid fa-gears"></i> App Settings & Keys
              </button>
              <button className="admin-tab-btn logout-tab" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i> Log Out
              </button>
            </div>

            {/* TAB 1: SERVICE CRUD TABLE */}
            {adminTab === 'adminServices' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>Manage Services Catalog</h4>
                  <button className="btn btn-primary btn-sm" onClick={() => openServiceModal('new')}>
                    <i className="fa-solid fa-plus"></i> Add Service
                  </button>
                </div>
                
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Name (EN)</th>
                        <th>Name (ZH)</th>
                        <th>Name (KO)</th>
                        <th>Price</th>
                        <th>Tip Option</th>
                        <th>Actions</th>
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
                          <td>{item.tip === 'none' ? 'None' : 'Variable'}</td>
                          <td>
                            <button 
                              className="btn btn-primary btn-xs" 
                              onClick={() => openServiceModal('edit', item)}
                              style={{ marginRight: '5px' }}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn btn-danger btn-xs" 
                              onClick={() => handleServiceDelete(item.id, item.name_en)}
                            >
                              Delete
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
                  <h4>Weekday Massage Packages</h4>
                  <button className="btn btn-primary btn-sm" onClick={() => openPackageModal('new')}>
                    <i className="fa-solid fa-plus"></i> Add Package
                  </button>
                </div>
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Rate (Php)</th>
                        <th>Savings (Php)</th>
                        <th>Inclusions</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicePackages && servicePackages.map(pkg => (
                        <tr key={pkg.id}>
                          <td style={{ fontWeight: 'bold' }}>{pkg.title}</td>
                          <td>Php {pkg.rate}</td>
                          <td>Php {pkg.savings}</td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{pkg.inclusions}</td>
                          <td>
                            <button className="btn btn-primary btn-xs" style={{ marginRight: '5px' }} onClick={() => openPackageModal('edit', pkg)}>Edit</button>
                            <button className="btn btn-danger btn-xs" onClick={() => handlePackageDelete(pkg.id, pkg.title)}>Delete</button>
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
                  <h4>Guest Reservations Manager</h4>
                </div>
                
                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Guest</th>
                        <th>Contact / Viber</th>
                        <th>Date & Time</th>
                        <th>Item/Facility</th>
                        <th>Duration</th>
                        <th>Guests</th>
                        <th>Actions</th>
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
                                Cancel Booking
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
                            No active reservations found in Firestore.
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
                  <h4>Dynamic Countdown Event Banners</h4>
                  <button className="btn btn-primary btn-sm" onClick={() => setIsCampaignModalOpen(true)}>
                    <i className="fa-solid fa-plus"></i> Add Campaign
                  </button>
                </div>
                
                <div className="campaigns-list-admin">
                  {campaigns.map(camp => (
                    <div key={camp.id} className="campaign-admin-card glass-panel">
                      <h5>{camp.title}</h5>
                      <p>{camp.desc}</p>
                      <div className="campaign-admin-footer">
                        <span>Ends: {new Date(camp.end_date).toLocaleString()}</span>
                        <button 
                          className="btn btn-danger btn-xs"
                          onClick={() => handleCampaignDelete(camp.id, camp.title)}
                        >
                          Delete Event
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
                  <h4>SEO Configurations</h4>
                </div>
                <div className="settings-card glass-panel" style={{ maxWidth: '600px', width: '100%' }}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    updateSeoSettings({ title: seoTitle, description: seoDesc, keywords: seoKeywords });
                    triggerToast("🎉 SEO Settings updated successfully!");
                  }}>
                    <div className="form-group">
                      <label>Meta Title</label>
                      <input 
                        type="text" 
                        value={seoTitle} 
                        onChange={(e) => setSeoTitle(e.target.value)} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Meta Description</label>
                      <textarea 
                        value={seoDesc} 
                        onChange={(e) => setSeoDesc(e.target.value)} 
                        className="form-control" 
                        rows="3" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Meta Keywords (Comma separated)</label>
                      <input 
                        type="text" 
                        value={seoKeywords} 
                        onChange={(e) => setSeoKeywords(e.target.value)} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Save SEO Settings</button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 6: Home Hero Banners */}
            {adminTab === 'adminBanners' && (
              <div className="admin-tab-content active">
                <div className="admin-section-header">
                  <h4>Home Hero Banner Settings</h4>
                </div>
                <div className="settings-card glass-panel" style={{ maxWidth: '600px', width: '100%' }}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    updateHomeBanner({ title: bannerTitle, subtitle: bannerSubtitle, image: bannerImage });
                    triggerToast("🎉 Home hero banner updated!");
                  }}>
                    <div className="form-group">
                      <label>Hero Title</label>
                      <input 
                        type="text" 
                        value={bannerTitle} 
                        onChange={(e) => setBannerTitle(e.target.value)} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Hero Subtitle</label>
                      <input 
                        type="text" 
                        value={bannerSubtitle} 
                        onChange={(e) => setBannerSubtitle(e.target.value)} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Background Image URL</label>
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
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Save Banner Settings</button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 7: Gallery Photos */}
            {adminTab === 'adminGallery' && (
              <div className="admin-tab-content active" style={{ width: '100%' }}>
                <div className="admin-section-header">
                  <h4>Virtual Tour Gallery Photos</h4>
                </div>
                
                {/* Inline Add Photo Form */}
                <div className="glass-panel" style={{ padding: '20px', marginBottom: '25px', width: '100%' }}>
                  <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>Add Facility Image</h5>
                  <form onSubmit={handleGalleryAdd} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ flex: '1 1 300px' }}>
                      <label>Image URL</label>
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
                      <label>Caption / Location Label</label>
                      <input 
                        type="text" 
                        value={galleryCaption} 
                        onChange={(e) => setGalleryCaption(e.target.value)} 
                        className="form-control" 
                        placeholder="e.g. Luxurious 3F Hydrotherapy core pools" 
                        required 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 25px' }}>Add Photo</button>
                  </form>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', width: '100%' }}>
                  {galleryPhotos && galleryPhotos.map(photo => (
                    <div key={photo.id} className="photo-card glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '225px', padding: 0, overflow: 'hidden' }}>
                      <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                      <div style={{ padding: '10px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-primary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{photo.caption}</p>
                        <button className="btn btn-danger btn-xs" style={{ marginTop: 'auto', width: '100%' }} onClick={() => handleGalleryDelete(photo.id, photo.caption)}>Delete Photo</button>
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
                  <h4>Walkthrough Tour Videos</h4>
                </div>
                
                {/* Inline Add Video Form */}
                <div className="glass-panel" style={{ padding: '20px', marginBottom: '25px', width: '100%' }}>
                  <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>Add Walkthrough Video Link</h5>
                  <form onSubmit={handleVideoAdd} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ flex: '1 1 200px' }}>
                      <label>Video Title</label>
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
                      <label>Video URL (MP4, YouTube, or Facebook)</label>
                      <input 
                        type="text" 
                        value={videoUrl} 
                        onChange={(e) => setVideoUrl(e.target.value)} 
                        className="form-control" 
                        placeholder="e.g. https://www.facebook.com/reel/12345678" 
                        required 
                      />
                      <small style={{ display: 'block', marginTop: '4px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                        Use clean links (e.g. <code>/reel/ID</code> or <code>/watch/?v=ID</code>) to play inside the app. Avoid share/redirect short links.
                      </small>
                    </div>
                    <div className="form-group" style={{ flex: '1 1 250px' }}>
                      <label>Short Description</label>
                      <input 
                        type="text" 
                        value={videoDesc} 
                        onChange={(e) => setVideoDesc(e.target.value)} 
                        className="form-control" 
                        placeholder="Facility Walkthrough" 
                        required 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 25px' }}>Add Video</button>
                  </form>
                </div>

                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promoVideos && promoVideos.map(vid => (
                        <tr key={vid.id}>
                          <td style={{ fontWeight: 'bold' }}>{vid.title}</td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{vid.url}</td>
                          <td>{vid.desc}</td>
                          <td>
                            <button className="btn btn-danger btn-xs" onClick={() => handleVideoDelete(vid.id, vid.title)}>Delete</button>
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
                  <h4>Mock Social Photo Board Posts</h4>
                </div>
                
                {/* Inline Add Social Post Form */}
                <div className="glass-panel" style={{ padding: '20px', marginBottom: '25px', width: '100%' }}>
                  <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>Add New Guest Social Card</h5>
                  <form onSubmit={handleSocialAdd} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ flex: '1 1 150px' }}>
                      <label>Username</label>
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
                      <label>Image URL</label>
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
                      <label>Mock Likes</label>
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
                      <label>Message Content</label>
                      <input 
                        type="text" 
                        value={socialMsg} 
                        onChange={(e) => setSocialMsg(e.target.value)} 
                        className="form-control" 
                        placeholder="Had an amazing time! #EmgrandSpa" 
                        required 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 25px' }}>Add Post</button>
                  </form>
                </div>

                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Image URL</th>
                        <th>Likes</th>
                        <th>Message</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {socialPosts && socialPosts.map(post => (
                        <tr key={post.id}>
                          <td style={{ fontWeight: 'bold' }}>@{post.username}</td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.img}</td>
                          <td>❤️ {post.likes}</td>
                          <td>{post.message}</td>
                          <td>
                            <button className="btn btn-danger btn-xs" onClick={() => handleSocialDelete(post.id, post.username)}>Delete</button>
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
                  <h4>Starlight Membership Loyalty Perks</h4>
                  <button className="btn btn-primary btn-sm" onClick={() => openPerkModal('new')}>
                    <i className="fa-solid fa-plus"></i> Add Perk
                  </button>
                </div>

                <div className="table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Icon Class</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {membershipPerks && membershipPerks.map(perk => (
                        <tr key={perk.id}>
                          <td style={{ fontWeight: 'bold' }}><i className={`fa-solid ${perk.icon || 'fa-award'}`} style={{ marginRight: '8px', color: 'var(--accent-gold)' }}></i>{perk.title}</td>
                          <td><code>{perk.icon || 'fa-award'}</code></td>
                          <td>{perk.desc}</td>
                          <td>
                            <button className="btn btn-primary btn-xs" style={{ marginRight: '5px' }} onClick={() => openPerkModal('edit', perk)}>Edit</button>
                            <button className="btn btn-danger btn-xs" onClick={() => handlePerkDelete(perk.id, perk.title)}>Delete</button>
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
                  <h4>Concierge AI Chatbot Training & Instructions</h4>
                </div>

                {/* Global Master Prompt Instructions */}
                <div className="glass-panel" style={{ padding: '20px', marginBottom: '25px', width: '100%', boxSizing: 'border-box' }}>
                  <h5 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>
                    <i className="fa-solid fa-brain" style={{ marginRight: '8px' }}></i> Master AI Concierge System Instructions
                  </h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                    Configure the primary personality, operational rules, layout details, and guardrails of the AI brand ambassador. This paragraph is loaded directly as the LLM's system persona.
                  </p>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    await updateChatbotInstructions(tempInstructions);
                    triggerToast("🎉 AI System Instructions updated successfully!");
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
                      <button type="submit" className="btn btn-primary btn-sm">Save System Instructions</button>
                    </div>
                  </form>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', alignItems: 'start', width: '100%' }}>
                  
                  {/* LEFT COLUMN: GUIDELINES & KEY POINTS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass-panel" style={{ padding: '20px', width: '100%' }}>
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}><i className="fa-solid fa-list-check" style={{ marginRight: '8px' }}></i> Add Key Point / Rule</h5>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        Define general answering instructions, operational guidelines, or brand tone rules that the AI should follow when generating responses.
                      </p>
                      <form onSubmit={handleKeyPointAdd} style={{ display: 'flex', gap: '10px' }}>
                        <input 
                          type="text" 
                          value={keyPointText} 
                          onChange={(e) => setKeyPointText(e.target.value)} 
                          className="form-control" 
                          placeholder="e.g. Keep answers friendly, short, and under 3 sentences." 
                          required 
                          style={{ flexGrow: 1 }}
                        />
                        <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}>Add Rule</button>
                      </form>
                    </div>

                    <div className="glass-panel" style={{ padding: '20px', width: '100%' }}>
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>Active Answering Instructions</h5>
                      <div className="table-wrapper">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Guideline / Key Point</th>
                              <th style={{ width: '80px' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {chatbotKeyPoints && chatbotKeyPoints.map(kp => (
                              <tr key={kp.id}>
                                <td style={{ fontSize: '0.85rem' }}>{kp.text}</td>
                                <td>
                                  <button className="btn btn-danger btn-xs" onClick={() => handleKeyPointDelete(kp.id, kp.text)}>Delete</button>
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
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}><i className="fa-solid fa-comments" style={{ marginRight: '8px' }}></i> Train New FAQ Pair</h5>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        Set up specific Q&A matches for questions that visitors frequently ask.
                      </p>
                      <form onSubmit={handleFAQAdd} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="form-group">
                          <label>FAQ Question</label>
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
                          <label>AI Answer Response</label>
                          <textarea 
                            value={faqAnswer} 
                            onChange={(e) => setFaqAnswer(e.target.value)} 
                            className="form-control" 
                            rows="2" 
                            placeholder="No, mobile phones are strictly prohibited..." 
                            required 
                          />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end', padding: '10px 20px' }}>Add FAQ Pair</button>
                      </form>
                    </div>

                    <div className="glass-panel" style={{ padding: '20px', width: '100%' }}>
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>Active Q&A Pairs (FAQ)</h5>
                      <div className="table-wrapper">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Question</th>
                              <th>Answer Response</th>
                              <th style={{ width: '80px' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {chatbotFAQs && chatbotFAQs.map(faq => (
                              <tr key={faq.id}>
                                <td style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{faq.question}</td>
                                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{faq.answer}</td>
                                <td>
                                  <button className="btn btn-danger btn-xs" onClick={() => handleFAQDelete(faq.id, faq.question)}>Delete</button>
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
                  <h4>Guest Feedback Submissions</h4>
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
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Contact: {fb.contact}</p>
                          <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>&ldquo;{fb.message}&rdquo;</p>
                        </div>
                        <span className="feedback-date">Received: {fb.date}</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>No feedbacks logged yet.</p>
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
                      <h5>Total Inquiries (Chatbot Logs)</h5>
                      <p className="metric-value">{chatLogs.length}</p>
                    </div>
                    <div className="metric-card glass-panel">
                      <h5>Active Reservations</h5>
                      <p className="metric-value">{activeBookingsCount}</p>
                    </div>
                    <div className="metric-card glass-panel">
                      <h5>Feedback Average Rating</h5>
                      <p className="metric-value">{avgRating} ⭐</p>
                    </div>
                  </div>

                  <div className="analytics-details-grid">
                    {/* Chat Query log */}
                    <div className="analytics-card glass-panel">
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>Chatbot Inquiry History Logs</h5>
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
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No chatbot interactions logged yet.</p>
                        )}
                      </div>
                    </div>

                    {/* Audit Trail */}
                    <div className="analytics-card glass-panel">
                      <h5 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>Admin Audit Trails</h5>
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
                    <h5>Firebase Credentials Setup</h5>
                    <p className="settings-desc">Provide your Firebase project configurations to activate real-time synchronization. If empty, the app falls back to Local Storage DB.</p>
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
                        <button type="submit" className="btn btn-primary btn-sm">Save Config & Reload</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={clearFirebaseSettings}>Clear Config</button>
                      </div>
                    </form>
                  </div>

                  {/* Groq Config Form */}
                  <div className="settings-card glass-panel">
                    <h5>Groq Cloud AI Settings</h5>
                    <p className="settings-desc">Provide a Groq API Key to power the floating AI Wellness Assistant with Llama-3 models. Check custom systems contexts below.</p>
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
                        <label>Select Groq Model</label>
                        <select 
                          value={tempGroqModel}
                          onChange={(e) => setTempGroqModel(e.target.value)}
                          className="form-control"
                        >
                          <option value="llama-3.1-8b-instant">Llama 3.1 8B Instant (llama-3.1-8b-instant) - Cheapest & Ultra-Fast</option>
                          <option value="llama-3.3-70b-versatile">Llama 3.3 70B Versatile (llama-3.3-70b-versatile) - Highly Accurate</option>
                          <option value="mixtral-8x7b-32768">Mixtral 8x7B (mixtral-8x7b-32768) - Comprehensive</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: '10px' }}>Save Groq Key</button>
                    </form>
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
            <h3>{modalMode === 'new' ? 'Add Service' : 'Edit Service'}</h3>
            <button className="modal-close-btn" onClick={() => setIsServiceModalOpen(false)}>&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleServiceSave}>
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={serviceCategory} 
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="form-control" 
                  required
                >
                  <option value="massage">Massage Treatment</option>
                  <option value="lodging">Private Suite Lodging</option>
                  <option value="special">Specialized Therapy</option>
                  <option value="tcm">TCM Orthopedics</option>
                </select>
              </div>
              <div className="form-group">
                <label>Service Name (English)</label>
                <input 
                  type="text" 
                  value={nameEN} 
                  onChange={(e) => setNameEN(e.target.value)}
                  className="form-control" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Service Name (Chinese)</label>
                <input 
                  type="text" 
                  value={nameZH} 
                  onChange={(e) => setNameZH(e.target.value)}
                  className="form-control" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Service Name (Korean)</label>
                <input 
                  type="text" 
                  value={nameKO} 
                  onChange={(e) => setNameKO(e.target.value)}
                  className="form-control" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Base Price (Php)</label>
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
                <label>Mandatory Therapist Tip Option</label>
                <select 
                  value={serviceTip} 
                  onChange={(e) => setServiceTip(e.target.value)}
                  className="form-control"
                >
                  <option value="variable">Based on Therapist Selection (Php 200/500)</option>
                  <option value="none">No Tip Required</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={serviceDesc} 
                  onChange={(e) => setServiceDesc(e.target.value)}
                  className="form-control" 
                  rows="2" 
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Save Service</button>
            </form>
          </div>
        </div>
      </div>

      {/* CAMPAIGN MODAL POPUP */}
      <div className={`modal ${isCampaignModalOpen ? 'active' : ''}`}>
        <div className="modal-content glass-panel">
          <div className="modal-header">
            <h3>Add Countdown Event Campaign</h3>
            <button className="modal-close-btn" onClick={() => setIsCampaignModalOpen(false)}>&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleCampaignSave}>
              <div className="form-group">
                <label>Campaign Title (English)</label>
                <input 
                  type="text" 
                  value={campaignTitle} 
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="Children's Day Painting Contest" 
                />
              </div>
              <div className="form-group">
                <label>Campaign Details</label>
                <textarea 
                  value={campaignDesc} 
                  onChange={(e) => setCampaignDesc(e.target.value)}
                  className="form-control" 
                  rows="2" 
                  required 
                  placeholder="Description of dates, rates, inclusions, and rewards..." 
                />
              </div>
              <div className="form-group">
                <label>Target End Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={campaignEndDate} 
                  onChange={(e) => setCampaignEndDate(e.target.value)}
                  className="form-control" 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Add Event</button>
            </form>
          </div>
        </div>
      </div>

      {/* SERVICE PACKAGE MODAL POPUP */}
      <div className={`modal ${isPackageModalOpen ? 'active' : ''}`}>
        <div className="modal-content glass-panel">
          <div className="modal-header">
            <h3>{packageModalMode === 'new' ? 'Add Weekday Package' : 'Edit Weekday Package'}</h3>
            <button className="modal-close-btn" onClick={() => setIsPackageModalOpen(false)}>&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handlePackageSave}>
              <div className="form-group">
                <label>Package Title</label>
                <input 
                  type="text" 
                  value={packageTitle} 
                  onChange={(e) => setPackageTitle(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="e.g. Package A" 
                />
              </div>
              <div className="form-group">
                <label>Package Cost Rate (Php)</label>
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
                <label>Estimated Savings (Php)</label>
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
                <label>Inclusions (Comma separated list)</label>
                <textarea 
                  value={packageInclusions} 
                  onChange={(e) => setPackageInclusions(e.target.value)}
                  className="form-control" 
                  rows="3" 
                  required
                  placeholder="Adult Admission (Php 1,699), Meridian Massage (Php 1,588), Unlimited Buffet (Php 1,997)"
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Save Package</button>
            </form>
          </div>
        </div>
      </div>

      {/* MEMBERSHIP PERK MODAL POPUP */}
      <div className={`modal ${isPerkModalOpen ? 'active' : ''}`}>
        <div className="modal-content glass-panel">
          <div className="modal-header">
            <h3>{perkModalMode === 'new' ? 'Add Membership Perk' : 'Edit Membership Perk'}</h3>
            <button className="modal-close-btn" onClick={() => setIsPerkModalOpen(false)}>&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handlePerkSave}>
              <div className="form-group">
                <label>Perk Title</label>
                <input 
                  type="text" 
                  value={perkTitle} 
                  onChange={(e) => setPerkTitle(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="Free Unlimited Beer" 
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
                <label>Description</label>
                <textarea 
                  value={perkDesc} 
                  onChange={(e) => setPerkDesc(e.target.value)}
                  className="form-control" 
                  rows="3" 
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Save Perk</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

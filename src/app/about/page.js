"use client";
import React, { useState, useEffect } from 'react';
import { useAppState } from '@/context/AppContext';

export default function About() {
  const { t, galleryPhotos, defaultFloors, setActiveSEO, language } = useAppState();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (setActiveSEO) {
      const pageTitle = `${t('nav_about') || 'About Us'} | Emgrand Spa Manila`;
      const desc = language === 'zh'
        ? "了解马尼拉帝皇水汇（Emgrand Spa Manila）—— 体验24小时连续自助餐、豪华温泉池、桑拿、蒸汽浴、专业的按摩疗法和顶级家庭娱乐设施。"
        : language === 'ko'
          ? "엠그란드 스파 마닐라에 대해 알아보세요 - 24시간 뷔페, 온수 수영장, 사우나, 스팀 룸, 전문 마사지 치료 및 프리미엄 가족 엔터테인먼트 시설을 제공합니다."
          : "Learn about Emgrand Spa Manila - experience our 24-hour continuous buffet, hot spring pools, sauna, steam room, professional massage therapies, and premium family entertainment facilities.";
      
      setActiveSEO({
        title: pageTitle,
        description: desc,
        keywords: "about us, emgrand spa, history, facilities, buffet, pools, manila spa"
      });
      return () => setActiveSEO(null);
    }
  }, [language, setActiveSEO, t]);


  const activePhoto = galleryPhotos[activeImageIndex] || galleryPhotos[0] || { src: '', caption: '' };


  return (
    <div className="animate-fade">
      <div className="about-container">
        
        {/* Intro Banner */}
        <div className="section-title-wrap">
          <h2 className="section-main-title">{t('about_title')}</h2>
          <p className="section-sub-title">{t('about_subtitle')}</p>
        </div>

        <div className="about-intro-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ color: 'var(--accent-gold)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-clock-rotate-left"></i> {t('about_history_title')}
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-primary)', margin: 0 }}>
              {t('about_history_p1')}
            </p>
          </div>
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ color: 'var(--accent-gold)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-hotel"></i> {t('about_hub_title')}
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-primary)', margin: 0 }}>
              {t('about_hub_desc')}
            </p>
          </div>
        </div>

        {/* SECTION 1: OUR FACILITIES */}
        <div className="about-section" style={{ marginTop: '60px' }}>
          <div className="section-title-wrap">
            <h2 className="section-main-title"><span className="gold-text"><i className="fa-solid fa-building"></i> {t('facilities_title')}</span></h2>
            <p className="section-sub-title">{t('facilities_subtitle')}</p>
          </div>

          {/* Gallery and Videos Side by Side */}
          <div className="gallery-video-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', marginBottom: '40px' }}>
            {/* Gallery Tour */}
            <div className="about-gallery glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 style={{ color: 'var(--accent-gold)', marginBottom: '20px', fontSize: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <i className="fa-solid fa-images" style={{ marginRight: '8px' }}></i> {t('gallery_title')}
              </h3>
              <div className="gallery-container" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {galleryPhotos.length > 0 ? (
                  <>
                    <div className="gallery-active-image-wrap" style={{ position: 'relative', width: '100%', height: '360px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '15px' }}>
                      <img 
                        src={activePhoto.src} 
                        alt="Emgrand Spa Facility"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s ease' }}
                      />
                      <div className="gallery-caption" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'rgba(7, 9, 12, 0.85)', padding: '8px 12px', fontSize: '0.85rem', color: 'var(--accent-gold-hover)', fontWeight: 'bold' }}>
                        {activePhoto.caption}
                      </div>
                    </div>
                    <div className="gallery-thumbnails" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
                      {galleryPhotos.map((img, idx) => (
                        <button 
                          key={img.id || idx}
                          className={`gallery-thumb ${idx === activeImageIndex ? 'active' : ''}`}
                          onClick={() => setActiveImageIndex(idx)}
                          style={{
                            background: 'none',
                            padding: 0,
                            border: `2px solid ${idx === activeImageIndex ? 'var(--accent-gold)' : 'transparent'}`,
                            borderRadius: '4px',
                            cursor: 'pointer',
                            width: '60px',
                            height: '45px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            opacity: idx === activeImageIndex ? 1 : 0.6,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <img src={img.src} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <p style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>No photos uploaded.</p>
                )}
              </div>
            </div>
          </div>

          {/* Floor-by-Floor directory details */}
          <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.4rem', marginBottom: '20px', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>
            <i className="fa-solid fa-list-ol" style={{ marginRight: '8px' }}></i> {t('floor_dir_heading')}
          </h3>
          <div className="facilities-floor-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {defaultFloors && Object.keys(defaultFloors).map((floorKey) => {
              const floor = defaultFloors[floorKey];
              return (
                <div key={floorKey} className="floor-card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px' }}>
                      <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)' }}>{floorKey}F</span>
                      <span className="floor-tag" style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>{t(floor.tag)}</span>
                    </div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '1.1rem' }}>{t(floor.title)}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: '1.5' }}>{t(floor.desc)}</p>
                    
                    <h5 style={{ fontSize: '0.85rem', color: 'var(--accent-gold-hover)', marginBottom: '8px', textTransform: 'uppercase' }}>{t('floor_amenities_heading')}</h5>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 15px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {floor.amenities.map((amenity, idx) => (
                        <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className={`fa-solid ${amenity.icon}`} style={{ color: 'var(--accent-gold)', width: '16px' }}></i> {t(amenity.text)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '12px', marginTop: 'auto', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <i className="fa-solid fa-circle-info" style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginTop: '2px' }}></i>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>{t(floor.guidelines)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: WHAT MAKES US DIFFERENT */}
        <div className="about-section" style={{ marginTop: '70px' }}>
          <div className="section-title-wrap">
            <h2 className="section-main-title"><span className="gold-text"><i className="fa-solid fa-star"></i> {t('diff_title')}</span></h2>
            <p className="section-sub-title">{t('diff_subtitle')}</p>
          </div>

          <div className="differences-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            <div className="difference-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-layer-group" style={{ color: 'var(--accent-gold)', fontSize: '1.25rem' }}></i>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>{t('diff_card1_title')}</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {t('diff_card1_desc')}
              </p>
            </div>

            <div className="difference-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-utensils" style={{ color: 'var(--accent-gold)', fontSize: '1.25rem' }}></i>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>{t('diff_card2_title')}</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {t('diff_card2_desc')}
              </p>
            </div>

            <div className="difference-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-mobile-screen-button" style={{ color: 'var(--accent-gold)', fontSize: '1.25rem' }}></i>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>{t('diff_card3_title')}</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {t('diff_card3_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: OUR COMMITMENT */}
        <div className="about-section" style={{ marginTop: '70px', marginBottom: '30px' }}>
          <div className="section-title-wrap">
            <h2 className="section-main-title"><span className="gold-text"><i className="fa-solid fa-handshake"></i> {t('commit_title')}</span></h2>
            <p className="section-sub-title">{t('commit_subtitle')}</p>
          </div>

          <div className="commitments-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            <div className="commitment-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-leaf" style={{ color: 'var(--accent-gold)', fontSize: '1.25rem' }}></i>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>{t('commit_card1_title')}</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {t('commit_card1_desc')}
              </p>
            </div>

            <div className="commitment-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-moon" style={{ color: 'var(--accent-gold)', fontSize: '1.25rem' }}></i>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>{t('commit_card2_title')}</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {t('commit_card2_desc')}
              </p>
            </div>

            <div className="commitment-card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-certificate" style={{ color: 'var(--accent-gold)', fontSize: '1.25rem' }}></i>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>{t('commit_card3_title')}</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {t('commit_card3_desc')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

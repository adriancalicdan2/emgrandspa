"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppContext';

export default function Home() {
  const { t, campaigns, defaultFloors, homeBanner, language } = useAppState();
  const [activeFloor, setActiveFloor] = useState('6');
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);
  const [timers, setTimers] = useState({});

  // Countdown timer clock ticks
  useEffect(() => {
    const updateClocks = () => {
      const newTimers = {};
      campaigns.forEach(camp => {
        const difference = +new Date(camp.end_date) - +new Date();
        if (difference > 0) {
          newTimers[camp.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            expired: false
          };
        } else {
          newTimers[camp.id] = { expired: true };
        }
      });
      setTimers(newTimers);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, [campaigns]);

  const activeFloorData = defaultFloors[activeFloor] || defaultFloors['6'];

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('${homeBanner?.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1500&q=80"}')`
  };

  const journeySteps = [
    { step: '01', title: t('exp_j1_title'), floor: '1F', desc: t('exp_j1_desc'), icon: 'fa-shoe-prints' },
    { step: '02', title: t('exp_j2_title'), floor: '2F', desc: t('exp_j2_desc'), icon: 'fa-utensils' },
    { step: '03', title: t('exp_j3_title'), floor: '3F', desc: t('exp_j3_desc'), icon: 'fa-water' },
    { step: '04', title: t('exp_j4_title'), floor: '5F', desc: t('exp_j4_desc'), icon: 'fa-hands' },
    { step: '05', title: t('exp_j5_title'), floor: '6F', desc: t('exp_j5_desc'), icon: 'fa-moon' },
    { step: '06', title: t('exp_j6_title'), floor: '1F', desc: t('exp_j6_desc'), icon: 'fa-receipt' }
  ];

  const wellnessServices = [
    { title: t('wellness_dry_title'), duration: t('wellness_dry_duration'), rate: t('wellness_dry_rate'), desc: t('wellness_dry_desc'), icon: 'fa-hand-sparkles' },
    { title: t('wellness_oil_title'), duration: t('wellness_oil_duration'), rate: t('wellness_oil_rate'), desc: t('wellness_oil_desc'), icon: 'fa-droplet' },
    { title: t('wellness_tcm_title'), duration: t('wellness_tcm_duration'), rate: t('wellness_tcm_rate'), desc: t('wellness_tcm_desc'), icon: 'fa-bone' }
  ];

  return (
    <div className="animate-fade">
      {/* Hero Banner */}
      <div className="hero-banner" style={heroStyle}>
        <div className="hero-text-content">
          <div style={{ height: '65px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '20px', filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.25))' }}>
            <img src="/logo.png" alt="Emgrand Spa Logo" style={{ height: '65px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <h1 className="hero-title">
            {language === 'zh' ? (homeBanner?.title_zh || homeBanner?.title) : (language === 'ko' ? (homeBanner?.title_ko || homeBanner?.title) : (homeBanner?.title_en || homeBanner?.title || t('hero_title')))}
          </h1>
          <p className="hero-subtitle">
            {language === 'zh' ? (homeBanner?.subtitle_zh || homeBanner?.subtitle) : (language === 'ko' ? (homeBanner?.subtitle_ko || homeBanner?.subtitle) : (homeBanner?.subtitle_en || homeBanner?.subtitle || t('hero_subtitle')))}
          </p>
          <div className="hero-cta-buttons">
            <Link href="/bookings" className="btn btn-primary">{t('hero_btn_book')}</Link>
            <Link href="/services" className="btn btn-secondary">{t('hero_btn_calc')}</Link>
          </div>
          <div className="hero-social-links" style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, color: '#fff', fontWeight: '600' }}>
              {language === 'zh' ? '关注我们' : (language === 'ko' ? '팔로우하기' : 'Follow Us')}:
            </span>
            <a 
              href="https://www.facebook.com/emgrandspa88888888" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#fff', fontSize: '1.25rem', transition: 'color 0.2s', opacity: 0.8, display: 'inline-flex', alignItems: 'center' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              title="Facebook"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a 
              href="https://www.instagram.com/emgrandspa/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#fff', fontSize: '1.25rem', transition: 'color 0.2s', opacity: 0.8, display: 'inline-flex', alignItems: 'center' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              title="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a 
              href="https://www.tiktok.com/@emgrand.spa" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#fff', fontSize: '1.25rem', transition: 'color 0.2s', opacity: 0.8, display: 'inline-flex', alignItems: 'center' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              title="TikTok"
            >
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>
        <div className="hero-operating-badge">
          <span className="pulse-dot"></span>
          <span>{t('hero_status_open')}</span>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="quick-info-bar">
        <div className="info-item">
          <i className="fa-solid fa-map-pin"></i>
          <div>
            <h4>{t('quick_location_title')}</h4>
            <p>{t('quick_location_desc')}</p>
          </div>
        </div>
        <div className="info-item">
          <i className="fa-solid fa-phone"></i>
          <div>
            <h4>{t('quick_hotline_title')}</h4>
            <p>0992-1888-888 (Viber)</p>
          </div>
        </div>
        <div className="info-item">
          <i className="fa-solid fa-utensils"></i>
          <div>
            <h4>{t('quick_buffet_title')}</h4>
            <p>{t('quick_buffet_desc')}</p>
          </div>
        </div>
        <div className="info-item">
          <i className="fa-solid fa-star" style={{ color: 'var(--accent-gold)' }}></i>
          <div>
            <h4>{language === 'zh' ? '宾客好评' : (language === 'ko' ? '고객 평점' : 'Guest Rating')}</h4>
            <p style={{ color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>4.9 / 5.0</span>
              <span style={{ letterSpacing: '1px' }}>★★★★★</span>
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: EXPERIENCE (Journey Stepper & Floor Explorer) */}
      <div className="experience-section" style={{ marginTop: '60px' }}>
        <div className="section-title-wrap">
          <h2 className="section-main-title"><span className="gold-text"><i className="fa-solid fa-compass"></i> {t('exp_title')}</span></h2>
          <p className="section-sub-title">{t('exp_subtitle')}</p>
        </div>

        {/* Step-by-step stay timeline */}
        <div className="journey-timeline-wrapper glass-panel" style={{ marginBottom: '40px', padding: '30px' }}>
          <h4 style={{ color: 'var(--accent-gold)', marginBottom: '20px', fontSize: '1.1rem', textAlign: 'center' }}>
            <i className="fa-solid fa-route" style={{ marginRight: '8px' }}></i> {t('exp_timeline_heading')}
          </h4>
          <div className="journey-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px', position: 'relative' }}>
            {journeySteps.map((jStep, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveJourneyStep(idx);
                  const mapFloor = jStep.floor.replace('F', '');
                  if (defaultFloors[mapFloor]) {
                    setActiveFloor(mapFloor);
                  }
                }}
                className={`journey-step-btn ${activeJourneyStep === idx ? 'active' : ''}`}
                style={{
                  background: activeJourneyStep === idx ? 'var(--border-color)' : 'rgba(0,0,0,0.15)',
                  border: `1px solid ${activeJourneyStep === idx ? 'var(--accent-gold)' : 'var(--border-color)'}`,
                  borderRadius: '8px',
                  padding: '15px 10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-gold)', marginBottom: '4px' }}>{t('exp_step_label')} {jStep.step}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{jStep.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}><i className={`fa-solid ${jStep.icon}`} style={{ marginRight: '4px' }}></i> {jStep.floor}</div>
              </button>
            ))}
          </div>

          <div className="active-journey-card" style={{ marginTop: '25px', padding: '20px 25px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '6px', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--border-color)', border: '1px solid var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContents: 'center', flexShrink: 0 }}>
              <i className={`fa-solid ${journeySteps[activeJourneyStep].icon}`} style={{ color: 'var(--accent-gold)', fontSize: '1.6rem', margin: 'auto' }}></i>
            </div>
            <div>
              <h5 style={{ color: 'var(--accent-gold)', fontSize: '1.05rem', marginBottom: '6px' }}>{journeySteps[activeJourneyStep].title} ({journeySteps[activeJourneyStep].floor})</h5>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>{journeySteps[activeJourneyStep].desc}</p>
            </div>
          </div>
        </div>

        {/* Floor Explorer */}
        <div className="floor-explorer-layout">
          <div className="floor-selector-list">
            {Object.keys(defaultFloors).reverse().map(floorKey => (
              <button 
                key={floorKey} 
                className={`floor-selector-btn ${activeFloor === floorKey ? 'active' : ''}`}
                onClick={() => setActiveFloor(floorKey)}
              >
                <span className="floor-number">{floorKey}F</span>
                <span className="floor-name">{t(defaultFloors[floorKey].title)}</span>
              </button>
            ))}
          </div>

          <div className="floor-details-card glass-panel">
            <div className="floor-details-header">
              <h3 className="floor-details-title">{t(activeFloorData.title)}</h3>
              <span className="floor-tag">{t(activeFloorData.tag)}</span>
            </div>
            <div className="floor-details-body">
              <p className="floor-description">{t(activeFloorData.desc)}</p>
              
              <h4 className="amenities-heading">{t('floor_amenities_heading')}</h4>
              <ul className="amenities-list">
                {activeFloorData.amenities.map((amenity, index) => (
                  <li key={index}>
                    <i className={`fa-solid ${amenity.icon}`}></i> {t(amenity.text)}
                  </li>
                ))}
              </ul>
              
              <div className="floor-guideline-box">
                <i className="fa-solid fa-circle-info"></i>
                <div>
                  <h5>{t('floor_guidelines_title')}</h5>
                  <p>{t(activeFloorData.guidelines)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: YOUR MOMENT OF WELLNESS */}
      <div className="moment-wellness-section" style={{ marginTop: '60px' }}>
        <div className="section-title-wrap">
          <h2 className="section-main-title"><span className="gold-text"><i className="fa-solid fa-heart"></i> {t('wellness_title')}</span></h2>
          <p className="section-sub-title">{t('wellness_subtitle')}</p>
        </div>

        <div className="wellness-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginTop: '25px' }}>
          {wellnessServices.map((service, idx) => (
            <div key={idx} className="wellness-service-card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s ease' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '15px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    <i className={`fa-solid ${service.icon}`} style={{ color: 'var(--accent-gold)' }}></i> {service.title}
                  </span>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(212,175,55,0.1)', color: 'var(--accent-gold)', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{service.duration}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '15px' }}>{service.desc}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginTop: '10px' }}>
                <span style={{ color: 'var(--accent-gold-hover)', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>{service.rate}</span>
                <Link href="/bookings" className="btn btn-primary btn-sm">{t('wellness_book_btn')}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: LATEST UPDATES (Active Banners / Countdown campaigns) */}
      <div className="latest-updates-section" style={{ marginTop: '60px' }}>
        <div className="section-title-wrap">
          <h2 className="section-main-title"><span className="gold-text"><i className="fa-solid fa-bullhorn"></i> {t('updates_title')}</span></h2>
          <p className="section-sub-title">{t('updates_subtitle')}</p>
        </div>
        
        <div className="countdown-grid">
          {campaigns.map(camp => {
            const time = timers[camp.id];
            return (
              <div key={camp.id} className="countdown-card glass-panel">
                <h3 style={{ color: 'var(--accent-gold)', marginBottom: '8px', fontSize: '1.25rem' }}>
                  {language === 'zh' ? (camp.title_zh || t(camp.title)) : (language === 'ko' ? (camp.title_ko || t(camp.title)) : (camp.title_en || t(camp.title)))}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {language === 'zh' ? (camp.desc_zh || t(camp.desc)) : (language === 'ko' ? (camp.desc_ko || t(camp.desc)) : (camp.desc_en || t(camp.desc)))}
                </p>
                
                {time ? (
                  time.expired ? (
                    <div style={{ marginTop: '20px', fontWeight: 'bold', color: 'var(--accent-red)' }}>
                      {t('campaign_concluded')}
                    </div>
                  ) : (
                    <div className="countdown-timer-row">
                      <div className="timer-slot">
                        <span className="timer-num">{time.days}</span>
                        <span className="timer-label">{t('days')}</span>
                      </div>
                      <div className="timer-slot">
                        <span className="timer-num">{time.hours}</span>
                        <span className="timer-label">{t('hours_short')}</span>
                      </div>
                      <div className="timer-slot">
                        <span className="timer-num">{time.minutes}</span>
                        <span className="timer-label">{t('minutes_short')}</span>
                      </div>
                      <div className="timer-slot">
                        <span className="timer-num">{time.seconds}</span>
                        <span className="timer-label">{t('seconds_short')}</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div style={{ marginTop: '20px', fontSize: '0.85rem' }}>{t('loading_timer')}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

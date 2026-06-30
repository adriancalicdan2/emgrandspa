"use client";
import React, { useState, useEffect } from 'react';
import { useAppState } from '@/context/AppContext';

export default function Contact() {
  const { t, parkingSpots, submitFeedback, language, setIsChatOpen, setActiveSEO } = useAppState();

  useEffect(() => {
    if (setActiveSEO) {
      const pageTitle = `${t('nav_contact') || 'Contact Us'} | Emgrand Spa Manila`;
      const desc = language === 'zh'
        ? `联系马尼拉帝皇水汇（Emgrand Spa Manila）。获取热线电话（0992-1888-888）、电子邮件、官方地址（Bradco Avenue, Aseana City）以及实时空余车位（当前剩余 ${parkingSpots} 个车位）。`
        : language === 'ko'
          ? `엠그란드 스파 마닐라에 문의하세요. 핫라인 전화번호(0992-1888-888), 이메일, 공식 주소(Bradco Avenue, Aseana City) 및 실시간 주차 정보(현재 ${parkingSpots}개 구역 여유)를 확인하실 수 있습니다.`
          : `Contact Emgrand Spa Manila. Find our hotline phone numbers (0992-1888-888), email address, official directions (Bradco Avenue, Aseana City), and live parking space availability (currently ${parkingSpots} spots available).`;

      setActiveSEO({
        title: pageTitle,
        description: desc,
        keywords: "contact emgrand, address, phone number, directions, google map location, spa parking, viber hotline"
      });
      return () => setActiveSEO(null);
    }
  }, [language, parkingSpots, setActiveSEO, t]);


  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      const validationMsg = language === 'zh' 
        ? '❌ 请选择评分。' 
        : (language === 'ko' 
          ? '❌ 평점을 선택해주세요.' 
          : '❌ Please select a rating.');
      setToastMsg(validationMsg);
      setTimeout(() => setToastMsg(''), 5000);
      return;
    }

    const fbData = {
      name: name || 'Anonymous Guest',
      contact: contactInfo || 'Not provided',
      rating: Number(rating),
      message
    };

    try {
      // 1. Submit to local/firebase database log
      await submitFeedback(fbData);

      // 2. Dispatch via EmailJS API if credentials are set
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
        const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: name || 'Anonymous Guest',
              contact_info: contactInfo || 'Not provided',
              rating: rating,
              message: message
            }
          })
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          throw new Error(`EmailJS sending failed: ${emailResponse.status} - ${errorText}`);
        }
      } else {
        console.warn("EmailJS is not fully configured (missing NEXT_PUBLIC_EMAILJS_PUBLIC_KEY or other fields). Saved to local logs instead.");
      }
      
      // Reset Form
      setName('');
      setContactInfo('');
      setRating(0);
      setMessage('');

      setToastMsg(t('toast_feedback_success'));
      setTimeout(() => setToastMsg(''), 5000);
    } catch (err) {
      console.error(err);
      setToastMsg(t('toast_feedback_error'));
      setTimeout(() => setToastMsg(''), 5000);
    }
  };

  return (
    <div className="animate-fade">
      <div className="contact-container">
        
        {/* Toast alert */}
        {toastMsg && (
          <div 
            style={{
              position: 'fixed',
              top: '90px',
              right: '24px',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(15, 17, 23, 0.9)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: toastMsg.startsWith('🎉') || toastMsg.startsWith('⚙️') || toastMsg.toLowerCase().includes('success') || toastMsg.includes('成功') || toastMsg.includes('성공')
                ? '1px solid rgba(74, 222, 128, 0.4)' 
                : '1px solid rgba(248, 113, 113, 0.4)',
              color: '#fff',
              padding: '14px 22px',
              borderRadius: '12px',
              boxShadow: toastMsg.startsWith('🎉') || toastMsg.startsWith('⚙️') || toastMsg.toLowerCase().includes('success') || toastMsg.includes('成功') || toastMsg.includes('성공')
                ? '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(74, 222, 128, 0.15)'
                : '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px 0 rgba(248, 113, 113, 0.15)',
              fontWeight: '500',
              fontSize: '0.95rem',
              animation: 'fadeIn 0.3s ease forwards',
              maxWidth: '380px'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: toastMsg.startsWith('🎉') || toastMsg.startsWith('⚙️') || toastMsg.toLowerCase().includes('success') || toastMsg.includes('成功') || toastMsg.includes('성공')
                ? 'rgba(74, 222, 128, 0.15)'
                : 'rgba(248, 113, 113, 0.15)',
              color: toastMsg.startsWith('🎉') || toastMsg.startsWith('⚙️') || toastMsg.toLowerCase().includes('success') || toastMsg.includes('成功') || toastMsg.includes('성공')
                ? '#4ade80'
                : '#f87171',
              flexShrink: 0,
              fontSize: '1.1rem'
            }}>
              {toastMsg.startsWith('🎉') || toastMsg.startsWith('⚙️') || toastMsg.toLowerCase().includes('success') || toastMsg.includes('成功') || toastMsg.includes('성공') ? (
                <i className="fa-solid fa-circle-check"></i>
              ) : (
                <i className="fa-solid fa-circle-xmark"></i>
              )}
            </div>
            <div style={{ flexGrow: 1, lineHeight: '1.4' }}>
              {toastMsg.replace(/^[🎉❌⚙️]\s*/u, '')}
            </div>
          </div>
        )}

        <div className="contact-grid">
          
          {/* Contact Channels */}
          <div className="contact-info glass-panel">
            <h3>{t('contact_header')}</h3>
            <p>{t('contact_desc')}</p>

            {/* Chat Assistant CTA */}
            <div className="contact-chat-cta" style={{
              background: 'rgba(212, 175, 55, 0.06)',
              border: '1px dashed var(--accent-gold)',
              borderRadius: '8px',
              padding: '16px',
              margin: '20px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                {language === 'zh' 
                  ? '或者，您也可以咨询我们的帝皇智能助手以获取即时支持......' 
                  : (language === 'ko' 
                    ? '또는 엠그란드 어시스턴트에게 실시간으로 문의하실 수 있습니다......' 
                    : 'Alternatively, you may consult our Emgrand Assistant for immediate assistance.')}
              </p>
              <button 
                type="button" 
                onClick={() => setIsChatOpen(true)}
                className="btn btn-primary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <i className="fa-solid fa-comments"></i> Chat...
              </button>
            </div>
            
            <ul className="contact-details-list">
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <strong>{t('label_address')}</strong>
                  <p>Lot 3, Block 5, Bradco Avenue, Aseana City, Parañaque City, Metro Manila</p>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-phone-volume"></i>
                <div>
                  <strong>{t('label_vibe')}</strong>
                  <p>0992-1888-888 / 0992-1999-999</p>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <div>
                  <strong>{t('label_secondary_hotline')}</strong>
                  <p>0929-1888-888 / 0929-1999-999</p>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <strong>{t('label_email')}</strong>
                  <p>emgrandspa.official@gmail.com</p>
                </div>
              </li>
            </ul>

            {/* Live Parking Space Tracker Widget */}
            <div className="parking-simulator-box">
              <div className="parking-header">
                <h4>{t('parking_title')}</h4>
                <span className="parking-max">{t('parking_max')}</span>
              </div>
              <div className="parking-status-wrapper">
                <div className="parking-dial">
                  <span className="parking-number">{parkingSpots}</span>
                  <span className="parking-label">{t('parking_label_available')}</span>
                </div>
                <div className="parking-hint">
                  <p>
                    <i className="fa-solid fa-circle-info"></i> {t('hint_parking_overflow')} <strong>Parqal Mall</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="contact-feedback glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>{t('feedback_form_header')}</h3>
            <p>{t('feedback_form_subheader')}</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div className="form-group">
                <label>{t('feedback_label_name')}</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control" 
                  placeholder="Jane Doe" 
                />
              </div>
              
              <div className="form-group">
                <label>{t('feedback_label_contact')}</label>
                <input 
                  type="text" 
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="form-control" 
                  placeholder={language === 'zh' ? 'Viber 或电子邮箱地址' : (language === 'ko' ? 'Viber 또는 이메일 주소' : 'Viber or email address')} 
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px' }}>{t('feedback_label_rating')}</label>
                <div 
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ display: 'flex', gap: '10px', padding: '4px 0', alignItems: 'center' }}
                >
                  {[1, 2, 3, 4, 5].map((val) => {
                    const isActive = val <= (hoverRating || rating);
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setRating(val)}
                        onMouseEnter={() => setHoverRating(val)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          fontSize: '1.8rem',
                          transition: 'all 0.15s ease',
                          transform: val === (hoverRating || rating) ? 'scale(1.2)' : 'scale(1)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        aria-label={`Rate ${val} stars`}
                      >
                        <i 
                          className="fa-solid fa-star"
                          style={{
                            color: isActive ? 'var(--accent-gold)' : 'transparent',
                            WebkitTextStroke: isActive ? '1.5px var(--accent-gold)' : '1.5px var(--text-secondary)',
                            transition: 'all 0.15s ease',
                          }}
                        ></i>
                      </button>
                    );
                  })}
                  <span style={{ 
                    marginLeft: '8px', 
                    fontSize: '0.9rem', 
                    color: 'var(--text-secondary)', 
                    alignSelf: 'center',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    minWidth: '100px'
                  }}>
                    {(hoverRating || rating) === 5 && t('opt_rate_excellent')}
                    {(hoverRating || rating) === 4 && t('opt_rate_good')}
                    {(hoverRating || rating) === 3 && t('opt_rate_neutral')}
                    {(hoverRating || rating) === 2 && t('opt_rate_fair')}
                    {(hoverRating || rating) === 1 && t('opt_rate_poor')}
                    {(hoverRating || rating) === 0 && (language === 'zh' ? '点击星级评分' : language === 'ko' ? '별점을 선택하세요' : 'Click to rate')}
                  </span>
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <label>{t('feedback_label_message')}</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-control" 
                  rows="5" 
                  required 
                  placeholder={t('placeholder_feedback')}
                  style={{ flexGrow: 1, minHeight: '150px', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn-primary full-width" style={{ marginTop: '15px' }}>
                {t('feedback_btn_submit')}
              </button>
            </form>
          </div>

        </div>

        {/* SECTION: LOCATION MAP OF EMGRAND SPA */}
        <div className="location-map-section" style={{ marginTop: '60px', marginBottom: '30px' }}>
          <div className="section-title-wrap">
            <h2 className="section-main-title"><span className="gold-text"><i className="fa-solid fa-map-location-dot"></i> {t('map_section_title')}</span></h2>
            <p className="section-sub-title">{t('map_section_subtitle')}</p>
          </div>

          <div className="map-card glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
            {/* Embedded Google Maps iframe */}
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.2315417406703!2d120.9856508!3d14.5287442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9be3e51de9b%3A0xdf012db4ceaa79fb!2sEmgrand%20Spa%20%E5%B8%9D%E8%B1%AA%E6%B0%B4%E6%B1%87!5e0!3m2!1sen!2sph!4v1700000000000"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  filter: 'saturate(0.85) contrast(1.1)',
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Emgrand Spa Manila Location"
              />

              {/* Address overlay card */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(7, 9, 12, 0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--accent-gold)',
                borderRadius: '12px',
                padding: '18px 22px',
                maxWidth: '380px',
                zIndex: 10,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              }}>
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '8px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fa-solid fa-location-dot"></i> Emgrand Spa Manila
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#e6e8eb', margin: '0 0 12px 0', lineHeight: '1.5' }}>
                  Lot 3, Block 5, Bradco Avenue,<br/>
                  Aseana City, Parañaque City<br/>
                  <span style={{ fontSize: '0.8rem', color: '#a0aec0' }}>{t('map_near_hint')}</span>
                </p>
                <a
                  href="https://www.google.com/maps/search/Emgrand+Spa+Manila+Bradco+Avenue+Aseana+City+Para%C3%B1aque"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '0.8rem' }}
                >
                  <i className="fa-solid fa-diamond-turn-right" style={{ marginRight: '6px' }}></i> {t('map_directions_btn')}
                </a>
              </div>
            </div>

            {/* Landmarks strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1px',
              background: 'var(--border-color)',
            }}>
              {[
                { icon: 'fa-plane-departure', labelKey: 'map_lm1_label', distKey: 'map_lm1_dist' },
                { icon: 'fa-bag-shopping', labelKey: 'map_lm2_label', distKey: 'map_lm2_dist' },
                { icon: 'fa-building', labelKey: 'map_lm3_label', distKey: 'map_lm3_dist' },
                { icon: 'fa-water', labelKey: 'map_lm4_label', distKey: 'map_lm4_dist' },
              ].map((lm, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-card)',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <i className={`fa-solid ${lm.icon}`} style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', width: '20px', textAlign: 'center' }}></i>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{t(lm.labelKey)}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t(lm.distKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

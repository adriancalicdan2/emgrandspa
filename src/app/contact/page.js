"use client";
import React, { useState } from 'react';
import { useAppState } from '@/context/AppContext';

export default function Contact() {
  const { t, parkingSpots, submitFeedback, language, setIsChatOpen } = useAppState();

  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [rating, setRating] = useState('5');
  const [message, setMessage] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fbData = {
      name: name || 'Anonymous Guest',
      contact: contactInfo || 'Not provided',
      rating: Number(rating),
      message
    };

    try {
      await submitFeedback(fbData);
      
      // Reset Form
      setName('');
      setContactInfo('');
      setRating('5');
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
              top: '100px',
              right: '30px',
              zIndex: 9999,
              background: toastMsg.startsWith('🎉') ? 'var(--accent-jade)' : 'var(--accent-red)',
              color: '#fff',
              padding: '15px 25px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              fontWeight: '600',
              animation: 'fadeIn 0.3s ease forwards'
            }}
          >
            {toastMsg}
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
                <label>{t('feedback_label_rating')}</label>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(e.target.value)}
                  className="form-control"
                >
                  <option value="5">⭐⭐⭐⭐⭐ {t('opt_rate_excellent')}</option>
                  <option value="4">⭐⭐⭐⭐ {t('opt_rate_good')}</option>
                  <option value="3">⭐⭐⭐ {t('opt_rate_neutral')}</option>
                  <option value="2">⭐⭐ {t('opt_rate_fair')}</option>
                  <option value="1">⭐ {t('opt_rate_poor')}</option>
                </select>
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

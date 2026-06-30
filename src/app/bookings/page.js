"use client";
import React, { useState, useEffect } from 'react';
import { useAppState } from '@/context/AppContext';

export default function Bookings() {
  const { t, services, addBooking, language, setActiveSEO } = useAppState();

  useEffect(() => {
    if (setActiveSEO) {
      const pageTitle = `${t('nav_booking') || 'Book Now'} | Emgrand Spa Manila`;
      const desc = language === 'zh'
        ? "预订您在马尼拉帝皇水汇（Emgrand Spa Manila）的专属名额。选择我们的豪华水疗套房、客房住宿、室内高尔夫、私人KTV和全天候无限量自助餐。"
        : language === 'ko'
          ? "엠그란드 스파 마닐라 예약을 신청하세요. 럭셔리 스파 객실 숙박, 실내 골프, 노래방 및 24시간 뷔페 서비스를 온라인으로 예약할 수 있습니다."
          : "Book your premium reservation slot at Emgrand Spa Manila. Reserve luxury lodging suites, wellness massage sessions, indoor golf simulators, private karaoke booths, and 24H continuous buffet access online.";

      setActiveSEO({
        title: pageTitle,
        description: desc,
        keywords: "booking, reservation, spa lodging, book room, massage appointment, spa online reservation, manila spa"
      });
      return () => setActiveSEO(null);
    }
  }, [language, setActiveSEO, t]);


  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('suite');
  const [subItem, setSubItem] = useState('');
  const [duration, setDuration] = useState('4');
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState('');

  const [subItemOptions, setSubItemOptions] = useState([]);
  const [toastMsg, setToastMsg] = useState('');

  // Update sub-item selectors based on category selection
  useEffect(() => {
    if (category === 'suite') {
      const lodgingOptions = services
        .filter(s => s.category === 'lodging')
        .map(s => {
          const name_text = language === 'zh' ? s.name_zh : (language === 'ko' ? s.name_ko : s.name_en);
          const suffix = language === 'zh' ? ' (5F 客房套房)' : (language === 'ko' ? ' (5F 객실)' : ' (5F Lodging)');
          return { id: s.id, label: `${name_text}${suffix}` };
        });
      setSubItemOptions(lodgingOptions);
      if (lodgingOptions.length > 0) setSubItem(lodgingOptions[0].id);
    } else {
      const amenityOptions = [
        { id: 'amenity_cinema', label: language === 'zh' ? '电影放映休闲大厅 (6F)' : (language === 'ko' ? '멀티 영화 감상실 (6F)' : 'Movie Cinema Lounge (6F)') },
        { id: 'amenity_golf', label: language === 'zh' ? '室内高尔夫模拟器 (6F)' : (language === 'ko' ? '실내 스크린 골프 시뮬레이터 (6F)' : 'Indoor Golf Simulator (6F)') },
        { id: 'amenity_karaoke', label: language === 'zh' ? '私享迷你KTV包厢 (6F)' : (language === 'ko' ? '개인 노래방 부스 (6F)' : 'Private Karaoke Booth (6F)') },
        { id: 'amenity_billiards', label: language === 'zh' ? '美式台球桌 (6F)' : (language === 'ko' ? '당구대 (6F)' : 'Billiard Table (6F)') },
        { id: 'amenity_arcade', label: language === 'zh' ? '电玩游艺娱乐城 (6F)' : (language === 'ko' ? '오락실 게임룸 (6F)' : 'Arcade Gaming Room (6F)') }
      ];
      setSubItemOptions(amenityOptions);
      setSubItem(amenityOptions[0].id);
    }
  }, [category, services, language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const selectedObj = subItemOptions.find(o => o.id === subItem);
    const itemName = selectedObj ? selectedObj.label : subItem;

    const bookingData = {
      name,
      contact,
      email,
      date,
      time,
      category,
      item_id: subItem,
      item_name: itemName,
      duration: category === 'suite' ? `${duration} ${t('label_hours')}` : (language === 'zh' ? '娱乐设施时段' : (language === 'ko' ? '시설 예약 시간' : 'Amenity Block')),
      guests: Number(guests),
      notes
    };

    try {
      await addBooking(bookingData);
      
      // Reset Form
      setName('');
      setContact('');
      setEmail('');
      setDate('');
      setTime('');
      setNotes('');
      setGuests(1);

      // Trigger Toast
      setToastMsg(t('toast_booking_success'));
      setTimeout(() => setToastMsg(''), 5000);
    } catch (err) {
      console.error(err);
      setToastMsg(t('toast_booking_error'));
      setTimeout(() => setToastMsg(''), 5000);
    }
  };

  return (
    <div className="animate-fade">
      <div className="booking-container">
        
        {/* Success Toast */}
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
              {toastMsg.replace(/^[🎉❌⚙️]\s*/, '')}
            </div>
          </div>
        )}

        <div className="section-title-wrap">
          <h2 className="section-main-title">{t('booking_title')}</h2>
          <p className="section-sub-title">{t('booking_subtitle')}</p>
        </div>

        <div className="booking-form-wrapper glass-panel">
          <form onSubmit={handleSubmit}>
            <div className="booking-form-grid">
              
              <div className="form-group">
                <label>{t('booking_label_name')}</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label>{t('booking_label_contact')}</label>
                <input 
                  type="tel" 
                  value={contact} 
                  onChange={(e) => setContact(e.target.value)}
                  className="form-control" 
                  required 
                  placeholder="0992-XXX-XXXX"
                />
              </div>

              <div className="form-group">
                <label>{t('booking_label_email')}</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control" 
                  placeholder="example@email.com"
                />
              </div>

              <div className="form-group">
                <label>{t('booking_label_date')}</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>{t('booking_label_time')}</label>
                <input 
                  type="time" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)}
                  className="form-control" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>{t('booking_label_category')}</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-control" 
                  required
                >
                  <option value="suite">{t('booking_cat_suite')}</option>
                  <option value="amenity">{t('booking_cat_amenity')}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t('booking_label_item')}</label>
                <select 
                  value={subItem} 
                  onChange={(e) => setSubItem(e.target.value)}
                  className="form-control" 
                  required
                >
                  {subItemOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ display: category === 'suite' ? 'block' : 'none' }}>
                <label>{t('booking_label_duration')}</label>
                <div className="booking-duration-radios">
                  <label className="radio-inline">
                    <input 
                      type="radio" 
                      name="bookDuration" 
                      value="4" 
                      checked={duration === '4'} 
                      onChange={() => setDuration('4')} 
                    /> 4 {t('label_hours')}
                  </label>
                  <label className="radio-inline">
                    <input 
                      type="radio" 
                      name="bookDuration" 
                      value="12" 
                      checked={duration === '12'} 
                      onChange={() => setDuration('12')} 
                    /> 12 {t('label_hours')}
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>{t('booking_label_guests')}</label>
                <input 
                  type="number" 
                  min="1" 
                  max="20" 
                  value={guests} 
                  onChange={(e) => setGuests(Math.max(1, e.target.value))}
                  className="form-control" 
                />
              </div>

              <div className="form-group full-width">
                <label>{t('booking_label_notes')}</label>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-control" 
                  rows="3" 
                  placeholder={t('label_placeholder_notes')}
                />
              </div>

            </div>

            <div className="booking-submit-area">
              <button type="submit" className="btn btn-primary btn-large">
                {t('booking_btn_submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

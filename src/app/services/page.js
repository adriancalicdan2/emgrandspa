"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppState } from '@/context/AppContext';

export default function Services() {
  const { 
    t, 
    services, 
    language, 
    defaultBuffetTimeline,
    servicePackages
  } = useAppState();

  const [activeTab, setActiveTab] = useState('spaMenu');

  // Calculator Form States
  const [pricingModel, setPricingModel] = useState('standard');
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [selectedLodging, setSelectedLodging] = useState('none');
  const [lodgingHours, setLodgingHours] = useState('12');
  const [checkedTherapies, setCheckedTherapies] = useState({});
  const [therapistType, setTherapistType] = useState('local');

  // Anniversary unbundled meals state
  const [anniversaryMeals, setAnniversaryMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    midnight: false
  });

  // Calculated receipt states
  const [receiptLines, setReceiptLines] = useState([]);
  const [receiptSubtotal, setReceiptSubtotal] = useState(0);
  const [receiptVAT, setReceiptVAT] = useState(0);
  const [receiptServiceCharge, setReceiptServiceCharge] = useState(0);
  const [receiptTotal, setReceiptTotal] = useState(0);

  // Recalculate bill simulator when states change
  useEffect(() => {
    const lines = [];
    let sub = 0;

    // 1. Get base ticket prices
    const adultPrice = pricingModel === 'standard' ? 1699 : 999;
    const childPrice = pricingModel === 'standard' ? 899 : 499;

    if (adultCount > 0) {
      const amt = adultCount * adultPrice;
      lines.push({ name: `${t('calc_adult_stay_ticket')} x${adultCount}`, amt });
      sub += amt;
    }
    if (childCount > 0) {
      const amt = childCount * childPrice;
      lines.push({ name: `${t('calc_child_stay_ticket')} x${childCount}`, amt });
      sub += amt;
    }

    // 2. Anniversary meal add-ons
    if (pricingModel === 'anniversary') {
      const totalGuests = Number(adultCount) + Number(childCount);
      if (totalGuests > 0) {
        if (anniversaryMeals.breakfast) {
          const amt = (adultCount * 299) + (childCount * 209);
          lines.push({ name: `${t('calc_addon_breakfast')} (x${adultCount}, x${childCount})`, amt });
          sub += amt;
        }
        if (anniversaryMeals.lunch) {
          const amt = (adultCount * 699) + (childCount * 489);
          lines.push({ name: `${t('calc_addon_lunch')} (x${adultCount}, x${childCount})`, amt });
          sub += amt;
        }
        if (anniversaryMeals.dinner) {
          const amt = (adultCount * 799) + (childCount * 559);
          lines.push({ name: `${t('calc_addon_dinner')} (x${adultCount}, x${childCount})`, amt });
          sub += amt;
        }
        if (anniversaryMeals.midnight) {
          const amt = (adultCount * 499) + (childCount * 349);
          lines.push({ name: `${t('calc_addon_midnight')} (x${adultCount}, x${childCount})`, amt });
          sub += amt;
        }
      }
    }

    // 3. Private Lodging
    if (selectedLodging !== 'none') {
      const room = services.find(s => s.id === selectedLodging);
      if (room) {
        const amt = lodgingHours === '4' ? (room.rate_4h || room.rate * 0.6) : room.rate;
        const name_text = language === 'zh' ? room.name_zh : (language === 'ko' ? room.name_ko : room.name_en);
        lines.push({ name: `${name_text} (${lodgingHours}${t('label_hours')})`, amt });
        sub += amt;
      }
    }

    // 4. Massage Therapies & Therapist Tips
    let therapyCount = 0;
    Object.keys(checkedTherapies).forEach(therapyId => {
      if (checkedTherapies[therapyId]) {
        const therapy = services.find(s => s.id === therapyId);
        if (therapy) {
          const name_text = language === 'zh' ? therapy.name_zh : (language === 'ko' ? therapy.name_ko : therapy.name_en);
          lines.push({ name: name_text, amt: therapy.rate });
          sub += therapy.rate;
          if (therapy.tip !== 'none') {
            therapyCount++;
          }
        }
      }
    });

    // 5. Therapist Tips
    if (therapyCount > 0) {
      const tipPerService = therapistType === 'chinese' ? 500 : 200;
      const totalTip = therapyCount * tipPerService;
      lines.push({ 
        name: `${t('calc_mand_tips')} (${therapistType === 'chinese' ? t('calc_chinese_spec') : t('calc_local')} x${therapyCount})`, 
        amt: totalTip 
      });
      sub += totalTip;
    }

    // Total calculations
    const vat = sub * 0.12;
    const sc = sub * 0.03;
    const tot = sub + vat + sc;

    setReceiptLines(lines);
    setReceiptSubtotal(sub);
    setReceiptVAT(vat);
    setReceiptServiceCharge(sc);
    setReceiptTotal(tot);
  }, [
    pricingModel, 
    adultCount, 
    childCount, 
    selectedLodging, 
    lodgingHours, 
    checkedTherapies, 
    therapistType, 
    anniversaryMeals, 
    services, 
    language
  ]);

  const toggleTherapy = (id) => {
    setCheckedTherapies(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getServiceCategoryTitle = (cat) => {
    switch (cat) {
      case 'admission': return t('service_cat_admission');
      case 'massage': return t('service_cat_massage');
      case 'tcm': return t('service_cat_tcm');
      case 'lodging': return t('service_cat_lodging');
      default: return t('service_cat_special');
    }
  };

  // Group services
  const groupedServices = services.reduce((acc, current) => {
    const cat = current.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(current);
    return acc;
  }, {});

  return (
    <div className="animate-fade">
      <div className="services-container">
        
        {/* Navigation Tabs */}
        <div className="services-nav-tabs">
          <button 
            className={`service-tab-btn ${activeTab === 'spaMenu' ? 'active' : ''}`} 
            onClick={() => setActiveTab('spaMenu')}
          >
            {t('tab_spa_menu')}
          </button>
          <button 
            className={`service-tab-btn ${activeTab === 'admissionCalculator' ? 'active' : ''}`} 
            onClick={() => setActiveTab('admissionCalculator')}
          >
            {t('tab_rfid_calc')}
          </button>
          <button 
            className={`service-tab-btn ${activeTab === 'weekdayPackages' ? 'active' : ''}`} 
            onClick={() => setActiveTab('weekdayPackages')}
          >
            {t('tab_weekday_packages')}
          </button>
          <button 
            className={`service-tab-btn ${activeTab === 'buffetSchedule' ? 'active' : ''}`} 
            onClick={() => setActiveTab('buffetSchedule')}
          >
            {t('tab_buffet_schedule')}
          </button>
        </div>

        {/* TAB 1: SPA MENU */}
        {activeTab === 'spaMenu' && (
          <div className="service-tab-content active">
            <div className="section-title-wrap">
              <h2 className="section-main-title">{t('services_menu_title')}</h2>
              <p className="section-sub-title">{t('services_menu_subtitle')}</p>
            </div>

            <div className="services-category-grid">
              {Object.keys(groupedServices).map(cat => (
                <div key={cat} className="category-group">
                  <h3 className="category-title">{getServiceCategoryTitle(cat)}</h3>
                  <div className="menu-items-grid">
                    {groupedServices[cat].map(item => (
                      <div key={item.id} className="menu-item-card glass-panel">
                        <div className="menu-item-head">
                          <span className="menu-item-name">
                            {language === 'zh' ? item.name_zh : (language === 'ko' ? item.name_ko : item.name_en)}
                          </span>
                          <span className="menu-item-price">Php {item.rate}</span>
                        </div>
                        <p className="menu-item-desc">
                          {language === 'zh' 
                            ? (item.desc_zh || item.desc_en || item.desc) 
                            : (language === 'ko' 
                              ? (item.desc_ko || item.desc_en || item.desc) 
                              : (item.desc_en || item.desc))}
                        </p>
                        {item.tip === 'variable' && (
                          <div className="menu-item-tip">
                            <i className="fa-solid fa-hand-holding-dollar"></i> {t('calc_mand_tips')}: {t('calc_local')} Php 200 / {t('calc_chinese_spec')} Php 500
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: RFID SIMULATOR */}
        {activeTab === 'admissionCalculator' && (
          <div className="service-tab-content active">
            <div className="section-title-wrap">
              <h2 className="section-main-title">{t('rfid_calc_title')}</h2>
              <p className="section-sub-title">{t('rfid_calc_subtitle')}</p>
            </div>

            <div className="calculator-grid">
              <div className="calculator-controls glass-panel">
                <h3>{t('calc_selections_title')}</h3>
                
                <div className="calc-group">
                  <label>{t('calc_label_pricing_model')}</label>
                  <select 
                    value={pricingModel} 
                    onChange={(e) => setPricingModel(e.target.value)}
                    className="form-control"
                  >
                    <option value="standard">{t('opt_standard_rate')}</option>
                    <option value="anniversary">{t('opt_anniversary_rate')}</option>
                  </select>
                </div>

                <div className="calc-row">
                  <div className="calc-col">
                    <label>{t('calc_label_adults')} (Php {pricingModel === 'standard' ? '1,699' : '999'})</label>
                    <input 
                      type="number" 
                      min="0" 
                      value={adultCount} 
                      onChange={(e) => setAdultCount(Math.max(0, e.target.value))}
                      className="form-control"
                    />
                  </div>
                  <div className="calc-col">
                    <label>{t('calc_label_children')} (Php {pricingModel === 'standard' ? '899' : '499'})</label>
                    <input 
                      type="number" 
                      min="0" 
                      value={childCount} 
                      onChange={(e) => setChildCount(Math.max(0, e.target.value))}
                      className="form-control"
                    />
                  </div>
                </div>

                {pricingModel === 'anniversary' && (
                  <div className="calc-group">
                    <label>{t('calc_label_meals')}</label>
                    <div className="meal-add-options">
                      <label className="checkbox-container">
                        <input 
                          type="checkbox" 
                          checked={anniversaryMeals.breakfast} 
                          onChange={(e) => setAnniversaryMeals(prev => ({ ...prev, breakfast: e.target.checked }))}
                        /> 
                        {t('calc_addon_breakfast')} ({language === 'zh' ? '成人' : (language === 'ko' ? '성인' : 'Adult')}: Php 299 / {language === 'zh' ? '儿童' : (language === 'ko' ? '소인' : 'Child')}: Php 209)
                      </label>
                      <label className="checkbox-container">
                        <input 
                          type="checkbox" 
                          checked={anniversaryMeals.lunch} 
                          onChange={(e) => setAnniversaryMeals(prev => ({ ...prev, lunch: e.target.checked }))}
                        /> 
                        {t('calc_addon_lunch')} ({language === 'zh' ? '成人' : (language === 'ko' ? '성인' : 'Adult')}: Php 699 / {language === 'zh' ? '儿童' : (language === 'ko' ? '소인' : 'Child')}: Php 489)
                      </label>
                      <label className="checkbox-container">
                        <input 
                          type="checkbox" 
                          checked={anniversaryMeals.dinner} 
                          onChange={(e) => setAnniversaryMeals(prev => ({ ...prev, dinner: e.target.checked }))}
                        /> 
                        {t('calc_addon_dinner')} ({language === 'zh' ? '成人' : (language === 'ko' ? '성인' : 'Adult')}: Php 799 / {language === 'zh' ? '儿童' : (language === 'ko' ? '소인' : 'Child')}: Php 559)
                      </label>
                      <label className="checkbox-container">
                        <input 
                          type="checkbox" 
                          checked={anniversaryMeals.midnight} 
                          onChange={(e) => setAnniversaryMeals(prev => ({ ...prev, midnight: e.target.checked }))}
                        /> 
                        {t('calc_addon_midnight')} ({language === 'zh' ? '成人' : (language === 'ko' ? '성인' : 'Adult')}: Php 499 / {language === 'zh' ? '儿童' : (language === 'ko' ? '소인' : 'Child')}: Php 349)
                      </label>
                    </div>
                  </div>
                )}

                <div className="calc-group">
                  <label>{t('calc_label_lodging')}</label>
                  <select 
                    value={selectedLodging} 
                    onChange={(e) => setSelectedLodging(e.target.value)}
                    className="form-control"
                  >
                    <option value="none">{t('opt_no_lodging')}</option>
                    {services.filter(s => s.category === 'lodging').map(room => (
                      <option key={room.id} value={room.id}>
                        {language === 'zh' ? room.name_zh : (language === 'ko' ? room.name_ko : room.name_en)}
                      </option>
                    ))}
                  </select>
                  {selectedLodging !== 'none' && (
                    <div className="calc-sub-row margin-top-sm">
                      <label className="radio-inline">
                        <input 
                          type="radio" 
                          name="lodgingHours" 
                          value="4" 
                          checked={lodgingHours === '4'} 
                          onChange={() => setLodgingHours('4')} 
                        /> 4 {t('label_hours')}
                      </label>
                      <label className="radio-inline">
                        <input 
                          type="radio" 
                          name="lodgingHours" 
                          value="12" 
                          checked={lodgingHours === '12'} 
                          onChange={() => setLodgingHours('12')} 
                        /> 12 {t('label_hours')}
                      </label>
                    </div>
                  )}
                </div>

                <div className="calc-group">
                  <label>{t('calc_label_therapies')}</label>
                  <div className="calculator-therapies-box">
                    {services.filter(s => s.category === 'massage' || s.category === 'tcm' || s.category === 'special').map(therapy => (
                      <label key={therapy.id} className="checkbox-container">
                        <input 
                          type="checkbox" 
                          checked={!!checkedTherapies[therapy.id]} 
                          onChange={() => toggleTherapy(therapy.id)}
                        />
                        {language === 'zh' ? therapy.name_zh : (language === 'ko' ? therapy.name_ko : therapy.name_en)} (Php {therapy.rate})
                      </label>
                    ))}
                  </div>
                </div>

                <div className="calc-group">
                  <label>{t('calc_label_therapist_type')}</label>
                  <div className="therapist-origin-wrap">
                    <label className="radio-container">
                      <input 
                        type="radio" 
                        name="therapistType" 
                        value="local" 
                        checked={therapistType === 'local'} 
                        onChange={() => setTherapistType('local')} 
                      /> {t('calc_therapist_local_desc')}
                    </label>
                    <label className="radio-container">
                      <input 
                        type="radio" 
                        name="therapistType" 
                        value="chinese" 
                        checked={therapistType === 'chinese'} 
                        onChange={() => setTherapistType('chinese')} 
                      /> {t('calc_therapist_chinese_desc')}
                    </label>
                  </div>
                </div>
              </div>

              {/* Receipt Wrapper */}
              <div className="calculator-receipt glass-panel">
                <div className="receipt-wrapper">
                  <div className="receipt-header">
                    <h4>{t('receipt_brand')}</h4>
                    <p>{t('receipt_tagline')}</p>
                    <div className="barcode">|||| | ||||| | || |||| | ||</div>
                  </div>
                  <div className="receipt-divider"></div>
                  
                  <div className="receipt-details">
                    {receiptLines.map((line, idx) => (
                      <div key={idx} className="receipt-line">
                        <span>{line.name}</span>
                        <span>Php {line.amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="receipt-divider"></div>
                  <div className="receipt-summary">
                    <div className="receipt-line">
                      <span>{t('receipt_subtotal')}</span>
                      <span>Php {receiptSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="receipt-line">
                      <span>{t('receipt_vat')}</span>
                      <span>Php {receiptVAT.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="receipt-line">
                      <span>{t('receipt_service_charge')}</span>
                      <span>Php {receiptServiceCharge.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="receipt-line final-total">
                      <span>{t('receipt_total')}</span>
                      <span>Php {receiptTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  <div className="receipt-divider"></div>
                  <div className="receipt-footer">
                    <p>{t('receipt_footer_msg')}</p>
                    <p className="receipt-timestamp">Generated on {new Date().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WEEKDAY PACKAGES */}
        {activeTab === 'weekdayPackages' && (
          <div className="service-tab-content active">
            <div className="section-title-wrap">
              <h2 className="section-main-title">{t('packages_title')}</h2>
              <p className="section-sub-title">{t('packages_subtitle')}</p>
            </div>

            <div className="packages-grid">
              {servicePackages && servicePackages.map(pkg => (
                <div key={pkg.id} className="package-card glass-panel">
                  <div className="package-header">
                    <h3 className="package-title">{language === 'zh' ? (pkg.title_zh || pkg.title) : (language === 'ko' ? (pkg.title_ko || pkg.title) : (pkg.title_en || pkg.title))}</h3>
                    <div className="package-price">Php {pkg.rate}</div>
                    <span className="package-savings">{t('calc_save')} Php {pkg.savings}</span>
                  </div>
                  <ul className="package-inclusions">
                    {(() => {
                      const incsStr = language === 'zh' ? (pkg.inclusions_zh || pkg.inclusions) : (language === 'ko' ? (pkg.inclusions_ko || pkg.inclusions) : (pkg.inclusions_en || pkg.inclusions));
                      return (incsStr || '').split('),').map((inc, i, arr) => {
                        let item = inc.trim();
                        if (i < arr.length - 1 && !item.endsWith(')')) {
                          item += ')';
                        }
                        return item;
                      });
                    })().map((inc, i) => (
                      <li key={i}><i className="fa-solid fa-circle-check"></i> {inc}</li>
                    ))}
                  </ul>
                  <Link href="/bookings" className="btn btn-primary full-width">{t('calc_book_pkg')} {pkg.title}</Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BUFFET TIMELINE */}
        {activeTab === 'buffetSchedule' && (
          <div className="service-tab-content active">
            <div className="section-title-wrap">
              <h2 className="section-main-title">{t('buffet_title')}</h2>
              <p className="section-sub-title">{t('buffet_subtitle')}</p>
            </div>

            <div className="buffet-timeline">
              {defaultBuffetTimeline.map(item => (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-time">{item.time}</div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">{t(item.title)}</h4>
                    <p className="timeline-desc">{t(item.desc)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="buffet-alert-info glass-panel" style={{ marginTop: '40px' }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              <div>
                <h4>{t('buffet_waste_penalty_title')}</h4>
                <p>{t('buffet_waste_penalty_desc')}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BUFFET TIMELINE & INCLUSIONS */}
        {activeTab === 'buffetSchedule' && (
          <div className="service-tab-content active">
            <div className="section-title-wrap">
              <h2 className="section-main-title">{t('buffet_title')}</h2>
              <p className="section-sub-title">{t('buffet_subtitle')}</p>
            </div>

            <div className="buffet-inclusions-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '30px' }}>
              
              {/* Spa Pass Inclusions */}
              <div className="glass-panel" style={{ padding: '25px' }}>
                <h3 style={{ color: 'var(--accent-gold)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px' }}>
                  <i className="fa-solid fa-circle-info" style={{ marginRight: '8px' }}></i> {t('calc_spa_pass_inclusions')}
                </h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '15px', color: 'var(--text-secondary)' }}>
                  {t('calc_spa_pass_desc')}
                </p>
                <ul className="package-inclusions" style={{ listStyle: 'none', padding: 0 }}>
                  <li><i className="fa-solid fa-circle-check"></i> {t('calc_spa_pass_pool')}</li>
                  <li><i className="fa-solid fa-circle-check"></i> {t('calc_spa_pass_sauna')}</li>
                  <li><i className="fa-solid fa-circle-check"></i> {t('calc_spa_pass_resting')}</li>
                  <li><i className="fa-solid fa-circle-check"></i> {t('calc_spa_pass_cinema')}</li>
                  <li><i className="fa-solid fa-circle-check"></i> {t('calc_spa_pass_billiards')}</li>
                  <li><i className="fa-solid fa-circle-check"></i> {t('calc_spa_pass_pigeon')}</li>
                  <li><i className="fa-solid fa-circle-check"></i> {t('calc_spa_pass_toiletries')}</li>
                </ul>
              </div>

              {/* Buffet Dining & Details */}
              <div className="glass-panel" style={{ padding: '25px' }}>
                <h3 style={{ color: 'var(--accent-gold)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '15px' }}>
                  <i className="fa-solid fa-utensils" style={{ marginRight: '8px' }}></i> {t('calc_unlimited_buffet_title')}
                </h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '15px', color: 'var(--text-secondary)' }}>
                  {t('calc_unlimited_buffet_desc')}
                </p>
                <ul className="package-inclusions" style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
                  <li><i className="fa-solid fa-circle-check"></i> {t('calc_unlimited_buffet_seafood')}</li>
                  <li><i className="fa-solid fa-circle-check"></i> {t('calc_unlimited_buffet_cuisine')}</li>
                  <li><i className="fa-solid fa-circle-check"></i> {t('calc_unlimited_buffet_desserts')}</li>
                </ul>

                <h4 style={{ color: 'var(--accent-gold)', fontSize: '1rem', marginBottom: '10px' }}>{t('calc_buffet_schedule_sessions')}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {defaultBuffetTimeline && defaultBuffetTimeline.map(item => (
                    <div key={item.id} style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '10px' }}>
                      <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--text-primary)' }}>{t(item.title)} ({item.time})</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t(item.desc)}</span>
                    </div>
                  ))}
                </div>

                <div className="local-database-fallback" style={{ marginTop: '20px', background: 'rgba(198, 40, 40, 0.08)', border: '1px dashed var(--accent-red)' }}>
                  <i className="fa-solid fa-circle-exclamation" style={{ color: 'var(--accent-red)' }}></i>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-red)', fontWeight: 'bold' }}>{t('buffet_waste_penalty_title')}</span>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{t('buffet_waste_penalty_desc')}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

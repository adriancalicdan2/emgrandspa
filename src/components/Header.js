"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppState } from '@/context/AppContext';

export default function Header() {
  const pathname = usePathname();
  const { language, theme, toggleLanguage, toggleTheme, t, adminUser } = useAppState();
  const [mobileActive, setMobileActive] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <header className="main-header">
      <div className="header-container">
        <Link href="/" className="logo-area" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/logo.png" alt="Emgrand Spa Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="gold-logo-text" style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '1px', lineHeight: '1.1' }}>EMGRAND</span>
            <span className="sub-logo-text" style={{ fontSize: '0.68rem', letterSpacing: '2.5px', lineHeight: '1' }}>SPA MANILA</span>
          </div>
        </Link>
        
        {/* Hamburger Menu for Mobile */}
        <button 
          className="nav-toggle" 
          onClick={() => setMobileActive(!mobileActive)} 
          aria-label="Toggle navigation"
        >
          <i className={`fa-solid ${mobileActive ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        <nav className={`nav-menu ${mobileActive ? 'active' : ''}`}>
          <Link 
            href="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMobileActive(false)}
          >
            {t('nav_home')}
          </Link>
          <Link 
            href="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setMobileActive(false)}
          >
            {t('nav_about')}
          </Link>
          <Link 
            href="/services" 
            className={`nav-link ${isActive('/services') ? 'active' : ''}`}
            onClick={() => setMobileActive(false)}
          >
            {t('nav_services')}
          </Link>
          <Link 
            href="/bookings" 
            className={`nav-link ${isActive('/bookings') ? 'active' : ''}`}
            onClick={() => setMobileActive(false)}
          >
            {t('nav_bookings')}
          </Link>
          <Link 
            href="/socials" 
            className={`nav-link ${isActive('/socials') ? 'active' : ''}`}
            onClick={() => setMobileActive(false)}
          >
            {t('nav_socials')}
          </Link>
          <Link 
            href="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setMobileActive(false)}
          >
            {t('nav_contact')}
          </Link>
          <Link 
            href="/admin" 
            className={`nav-link admin-nav-btn ${isActive('/admin') ? 'active' : ''}`}
            onClick={() => setMobileActive(false)}
          >
            <i className={`fa-solid ${adminUser ? 'fa-lock-open' : 'fa-lock'}`}></i> {t('nav_admin')}
          </Link>

          {/* Mobile actions (visible inside mobile nav drawer) */}
          <div className="mobile-menu-actions">
            <div className="lang-selector">
              <button 
                className={`lang-btn ${language === 'en' ? 'active' : ''}`} 
                onClick={() => { toggleLanguage('en'); setMobileActive(false); }}
              >
                EN
              </button>
              <button 
                className={`lang-btn ${language === 'zh' ? 'active' : ''}`} 
                onClick={() => { toggleLanguage('zh'); setMobileActive(false); }}
              >
                中文
              </button>
              <button 
                className={`lang-btn ${language === 'ko' ? 'active' : ''}`} 
                onClick={() => { toggleLanguage('ko'); setMobileActive(false); }}
              >
                한국어
              </button>
            </div>
            <button 
              className="theme-toggle-btn" 
              onClick={() => { toggleTheme(); setMobileActive(false); }} 
              aria-label="Toggle Dark/Light Mode"
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </nav>

        <div className="header-actions">
          {/* Multi-language Selector */}
          <div className="lang-selector">
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`} 
              onClick={() => toggleLanguage('en')}
            >
              EN
            </button>
            <button 
              className={`lang-btn ${language === 'zh' ? 'active' : ''}`} 
              onClick={() => toggleLanguage('zh')}
            >
              中文
            </button>
            <button 
              className={`lang-btn ${language === 'ko' ? 'active' : ''}`} 
              onClick={() => toggleLanguage('ko')}
            >
              한국어
            </button>
          </div>

          {/* Theme Toggle */}
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme} 
            aria-label="Toggle Dark/Light Mode"
          >
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}

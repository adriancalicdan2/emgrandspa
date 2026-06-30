"use client";
import React from 'react';
import { useAppState } from '@/context/AppContext';

export default function Footer() {
  const { t } = useAppState();
  return (
    <footer className="main-footer" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
      <div className="footer-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', padding: '18px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: t('footer_copy') }} />
        
        {/* Social Media Buttons */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a 
            href="https://www.facebook.com/emgrandspa88888888" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.15rem', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.03)',
              border: '1px solid var(--border-color)',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent-gold)';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.03)';
            }}
            aria-label="Facebook"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          
          <a 
            href="https://www.instagram.com/emgrandspa/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.15rem', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.03)',
              border: '1px solid var(--border-color)',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent-gold)';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.03)';
            }}
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>

          <a 
            href="https://www.tiktok.com/@emgrand.spa" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.15rem', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.03)',
              border: '1px solid var(--border-color)',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent-gold)';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.03)';
            }}
            aria-label="TikTok"
          >
            <i className="fa-brands fa-tiktok"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

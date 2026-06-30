"use client";
import React from 'react';
import { useAppState } from '@/context/AppContext';

export default function Socials() {
  const { t, language, socialPosts, membershipPerks } = useAppState();

  const [isMobile, setIsMobile] = React.useState(false);
  const [showAllPosts, setShowAllPosts] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedPosts = showAllPosts
    ? socialPosts
    : (isMobile 
        ? (socialPosts ? socialPosts.slice(0, 1) : [])
        : (socialPosts ? socialPosts.slice(0, 3) : []));

  return (
    <div className="animate-fade">
      <div className="socials-container">
        
        {/* Starlight Loyalty Card */}
        <div className="starlight-program glass-panel">
          <div className="starlight-header">
            <div className="starlight-title-wrap">
              <h2 className="starlight-title">{t('starlight_title')}</h2>
              <p className="starlight-subtitle">{t('starlight_subtitle')}</p>
            </div>
            <i className="fa-solid fa-star starlight-icon-gold"></i>
          </div>
          
          <div className="starlight-perks-grid">
            {membershipPerks && membershipPerks.map(perk => (
              <div key={perk.id} className="perk-card">
                <i className={`fa-solid ${perk.icon || 'fa-award'}`}></i>
                <h4>{language === 'zh' ? (perk.title_zh || t(perk.title)) : (language === 'ko' ? (perk.title_ko || t(perk.title)) : (perk.title_en || t(perk.title)))}</h4>
                <p>{language === 'zh' ? (perk.desc_zh || t(perk.desc)) : (language === 'ko' ? (perk.desc_ko || t(perk.desc)) : (perk.desc_en || t(perk.desc)))}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: SOCIAL MEDIA POSTS */}
        <div className="social-posts-section" style={{ marginTop: '70px' }}>
          <div className="section-title-wrap">
            <h2 className="section-main-title"><span className="gold-text"><i className="fa-solid fa-camera-retro"></i> {t('social_posts_title')}</span></h2>
            <p className="section-sub-title">{t('photoboard_subtitle')}</p>
          </div>

          <div className="photo-board" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {displayedPosts && displayedPosts.map(post => (
              <div key={post.id} className="photo-card glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 'var(--border-radius)' }}>
                {post.img && (
                  <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                    <img src={post.img} alt={post.username} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(7,9,12,0.8)', border: '1px solid var(--accent-gold)', borderRadius: '20px', padding: '3px 10px', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
                      <i className="fa-solid fa-at" style={{ marginRight: '4px' }}></i>{post.username}
                    </div>
                  </div>
                )}
                <div className="photo-card-body" style={{ padding: '18px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '15px' }}>{t(post.message)}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                    <div className="likes-count" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-red)', fontWeight: 'bold', fontSize: '0.85rem' }}>
                      <i className="fa-solid fa-heart"></i> {post.likes}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <i className="fa-solid fa-share-nodes" style={{ marginRight: '4px' }}></i>{t('social_share_label')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {socialPosts && (
            (!isMobile && socialPosts.length > 3 && !showAllPosts) || 
            (isMobile && socialPosts.length > 1 && !showAllPosts)
          ) && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <button 
                onClick={() => setShowAllPosts(true)}
                className="btn btn-secondary"
                style={{ width: '100%', maxWidth: '200px' }}
              >
                {language === 'zh' ? '查看更多帖子' : (language === 'ko' ? '게시글 더 보기' : 'See More Posts')}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

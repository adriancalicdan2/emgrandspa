"use client";
import React from 'react';
import { useAppState } from '@/context/AppContext';

export default function Socials() {
  const { t, language, socialPosts, membershipPerks, promoVideos } = useAppState();

  const [isMobile, setIsMobile] = React.useState(false);
  const [showAllVideos, setShowAllVideos] = React.useState(false);
  const [showAllPosts, setShowAllPosts] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderVideoPlayer = (vid) => {
    const url = vid.url || '';
    const isFacebook = url.includes('facebook.com') || url.includes('fb.watch');

    if (isFacebook) {
      // Parse and clean the URL to ensure compatibility
      let cleanUrl = url;
      // Standardize Facebook subdomains (e.g. web.facebook.com, m.facebook.com) to www.facebook.com
      cleanUrl = cleanUrl.replace(/\/\/(?:[a-zA-Z0-9-]+\.)?facebook\.com/, '//www.facebook.com');

      // Convert Reel URLs (e.g. /reel/ID) to canonical watch URLs (e.g. /watch/?v=ID)
      // because Facebook's video plugin handles watch links much more reliably inside iframes.
      const reelMatch = cleanUrl.match(/\/reel(?:s)?\/([a-zA-Z0-9_-]+)/);
      if (reelMatch) {
        cleanUrl = `https://www.facebook.com/watch/?v=${reelMatch[1]}`;
      } else if (cleanUrl.includes('facebook.com/watch')) {
        const match = cleanUrl.match(/[?&]v=([^&#]+)/);
        const videoId = match ? match[1] : '';
        cleanUrl = videoId ? `https://www.facebook.com/watch/?v=${videoId}` : cleanUrl.split('?')[0];
      } else {
        cleanUrl = cleanUrl.split('?')[0];
      }

      const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(cleanUrl)}&show_text=0&width=560`;

      return (
        <>
          <iframe
            src={embedUrl}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', zIndex: 1 }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Watch video on Facebook"
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              zIndex: 10,
              background: 'rgba(7, 9, 12, 0.85)',
              border: '1px solid var(--accent-gold)',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              color: 'var(--accent-gold)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.2s ease',
            }}
            className="fb-video-fallback-btn"
          >
            <i className="fa-brands fa-facebook"></i> Watch on FB
          </a>
        </>
      );
    }

    const isEmbeddable = url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com') || !url.match(/\.(mp4|webm|ogg)($|\?)/i);

    if (isEmbeddable) {
      let embedUrl = url;
      if (url.includes('youtube.com/watch?v=')) {
        const vidId = url.split('v=')[1]?.split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${vidId}`;
      } else if (url.includes('youtu.be/')) {
        const vidId = url.split('youtu.be/')[1]?.split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${vidId}`;
      }

      return (
        <iframe
          src={embedUrl}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      );
    }

    return (
      <video 
        src={url} 
        controls 
        playsInline 
        preload="metadata"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  };

  const displayedVideos = (isMobile && !showAllVideos) ? (promoVideos ? promoVideos.slice(0, 1) : []) : promoVideos;
  const displayedPosts = (isMobile && !showAllPosts) ? (socialPosts ? socialPosts.slice(0, 1) : []) : socialPosts;

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

        {/* Video Tour Walkthroughs (FB Videos & Social Media) */}
        <div className="video-tour-section" style={{ marginTop: '60px' }}>
          <div className="section-title-wrap">
            <h2 className="section-main-title"><span className="gold-text"><i className="fa-solid fa-play"></i> {t('label_reels_title')}</span></h2>
            <p className="section-sub-title">{t('label_reels_subtitle')}</p>
          </div>
          
          <div className="video-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginTop: '25px' }}>
            {displayedVideos && displayedVideos.length > 0 ? (
              displayedVideos.map(vid => (
                <div key={vid.id} className="video-card glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div className="video-wrapper" style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000' }}>
                    {renderVideoPlayer(vid)}
                  </div>
                  <div className="video-info" style={{ padding: '15px' }}>
                    <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.05rem', marginBottom: '6px' }}>{t(vid.title)}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t(vid.desc)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                {t('label_no_reels')}
              </div>
            )}
          </div>
          {isMobile && promoVideos && promoVideos.length > 1 && !showAllVideos && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => setShowAllVideos(true)}
                className="btn btn-secondary"
                style={{ width: '100%', maxWidth: '200px' }}
              >
                {language === 'zh' ? '查看更多视频' : (language === 'ko' ? '비디오 더 보기' : 'See More Videos')}
              </button>
            </div>
          )}
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
          {isMobile && socialPosts && socialPosts.length > 1 && !showAllPosts && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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

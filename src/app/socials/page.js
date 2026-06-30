"use client";
import React from 'react';
import { useAppState } from '@/context/AppContext';

const TikTokPlayer = ({ url, language }) => {
  const match = url.match(/\/video\/(\d+)/);
  const initialVideoId = match && match[1] ? match[1] : null;

  const [videoId, setVideoId] = React.useState(initialVideoId);
  const [loading, setLoading] = React.useState(!initialVideoId);

  React.useEffect(() => {
    if (initialVideoId) {
      return;
    }

    let active = true;
    fetch(`/api/tiktok?url=${encodeURIComponent(url)}`)
      .then(res => res.json())
      .then(data => {
        if (active && data.videoId) {
          setVideoId(data.videoId);
        }
      })
      .catch(err => console.error("Error resolving TikTok URL:", err))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [url, initialVideoId]);

  if (loading) {
    return (
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#07090c'
      }}>
        <div style={{
          width: '30px', height: '30px', border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: 'var(--accent-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  }

  if (videoId) {
    const embedUrl = `https://www.tiktok.com/embed/v2/${videoId}?autoplay=1`;
    return (
      <iframe
        src={embedUrl}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    );
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#07090c',
      padding: '20px',
      textAlign: 'center',
      border: '1px solid var(--border-color)',
      boxSizing: 'border-box'
    }}>
      <i className="fa-brands fa-tiktok" style={{ fontSize: '2.5rem', color: '#ff0050', marginBottom: '12px' }}></i>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '15px', fontWeight: '500' }}>
        {language === 'zh' ? 'TikTok 视频' : (language === 'ko' ? '틱톡 동영상' : 'TikTok Video')}
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary btn-sm"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem' }}
      >
        <i className="fa-brands fa-tiktok"></i> Watch on TikTok
      </a>
    </div>
  );
};

export default function Socials() {
  const { t, language, socialPosts, membershipPerks, promoVideos, setActiveSEO } = useAppState();

  React.useEffect(() => {
    if (setActiveSEO) {
      const topVideos = promoVideos.slice(0, 3).map(v => v.title).join(', ');
      const pageTitle = `${t('nav_socials') || 'Socials'} | Emgrand Spa Manila`;
      const desc = language === 'zh'
        ? `观看帝皇水汇（Emgrand Spa Manila）的实景导览视频，包括：${topVideos || '体验视频'}。关注我们的社交媒体更新，了解最新会员福利与独家折扣优惠。`
        : language === 'ko'
          ? `엠그란드 스파 마닐라의 비디오 투어와 소셜 미디어 게시물을 확인하세요: ${topVideos || '체험 영상'}. 독점 멤버십 혜택과 이벤트 소식을 제공합니다.`
          : `Watch video tours of Emgrand Spa Manila, including: ${topVideos || 'walkthrough tour'}. Stay updated with our latest social media posts, exclusive membership perks, and wellness campaigns.`;

      setActiveSEO({
        title: pageTitle,
        description: desc,
        keywords: "social media, video tour, emgrand tiktok, youtube walkthrough, membership benefits, promo codes, manila spa resort"
      });
      return () => setActiveSEO(null);
    }
  }, [language, promoVideos, setActiveSEO, t]);


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

      const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(cleanUrl)}&show_text=0&width=560&autoplay=true&mute=1`;

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

    const isTikTok = url.includes('tiktok.com');

    if (isTikTok) {
      return <TikTokPlayer url={url} language={language} />;
    }

    const isEmbeddable = url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com') || !url.match(/\.(mp4|webm|ogg)($|\?)/i);

    if (isEmbeddable) {
      let embedUrl = url;
      if (url.includes('youtube.com/watch?v=')) {
        const vidId = url.split('v=')[1]?.split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&mute=1`;
      } else if (url.includes('youtu.be/')) {
        const vidId = url.split('youtu.be/')[1]?.split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&mute=1`;
      } else if (url.includes('youtube.com/shorts/')) {
        const vidId = url.split('youtube.com/shorts/')[1]?.split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&mute=1`;
      } else {
        if (embedUrl.includes('vimeo.com')) {
          embedUrl = embedUrl.includes('?') ? `${embedUrl}&autoplay=1&muted=1` : `${embedUrl}?autoplay=1&muted=1`;
        }
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
        autoPlay
        muted
        loop
        preload="metadata"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  };

  const displayedVideos = showAllVideos
    ? promoVideos
    : (isMobile 
        ? (promoVideos ? promoVideos.slice(0, 1) : [])
        : (promoVideos ? promoVideos.slice(0, 3) : []));
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
              <div key={perk.id} className="perk-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <i className={`fa-solid ${perk.icon || 'fa-award'}`}></i>
                  <h4>{language === 'zh' ? (perk.title_zh || t(perk.title)) : (language === 'ko' ? (perk.title_ko || t(perk.title)) : (perk.title_en || t(perk.title)))}</h4>
                  <p>{language === 'zh' ? (perk.desc_zh || t(perk.desc)) : (language === 'ko' ? (perk.desc_ko || t(perk.desc)) : (perk.desc_en || t(perk.desc)))}</p>
                </div>
                {perk.id === 'prk4' && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'center' }}>
                    <a 
                      href="https://www.facebook.com/emgrandspa88888888" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--accent-gold)', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'var(--accent-gold)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--accent-gold)'; e.currentTarget.style.background = 'none'; }}
                      title="Facebook"
                    >
                      <i className="fa-brands fa-facebook-f" style={{ margin: 0, fontSize: '1.1rem', color: 'inherit', lineHeight: 1 }}></i>
                    </a>
                    <a 
                      href="https://www.instagram.com/emgrandspa/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--accent-gold)', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'var(--accent-gold)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--accent-gold)'; e.currentTarget.style.background = 'none'; }}
                      title="Instagram"
                    >
                      <i className="fa-brands fa-instagram" style={{ margin: 0, fontSize: '1.1rem', color: 'inherit', lineHeight: 1 }}></i>
                    </a>
                    <a 
                      href="https://www.tiktok.com/@emgrand.spa" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--accent-gold)', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'var(--accent-gold)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--accent-gold)'; e.currentTarget.style.background = 'none'; }}
                      title="TikTok"
                    >
                      <i className="fa-brands fa-tiktok" style={{ margin: 0, fontSize: '1.1rem', color: 'inherit', lineHeight: 1 }}></i>
                    </a>
                  </div>
                )}
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
          
          <div className="video-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '25px', marginTop: '25px' }}>
            {displayedVideos && displayedVideos.length > 0 ? (
              displayedVideos.map(vid => (
                <div key={vid.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="video-card glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', position: 'relative', width: '100%', aspectRatio: '9/16' }}>
                    {renderVideoPlayer(vid)}
                  </div>
                  <div style={{ padding: '0 4px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    @emgrand.spa
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                {t('label_no_reels')}
              </div>
            )}
          </div>
          {promoVideos && (
            (!isMobile && promoVideos.length > 3 && !showAllVideos) || 
            (isMobile && promoVideos.length > 1 && !showAllVideos)
          ) && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
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

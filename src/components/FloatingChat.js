"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '@/context/AppContext';

export default function FloatingChat() {
  const { 
    services, 
    campaigns, 
    groqKey, 
    groqModel, 
    logChatQuery, 
    chatbotFAQs, 
    chatbotKeyPoints, 
    chatbotInstructions,
    language,
    t
  } = useAppState();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show suggestive tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const getTooltipText = () => {
    if (language === 'zh') return '💬 在线咨询！';
    if (language === 'ko') return '💬 여기서 대화하세요!';
    return '💬 Chat here!';
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize and translate initial welcome message dynamically on mount and language change
  useEffect(() => {
    const isInitialWelcome = messages.length === 1 && messages[0].sender === 'bot';
    if (messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          text: t('chat_welcome')
        }
      ]);
    } else if (isInitialWelcome) {
      const welcomeEn = "Welcome to Emgrand Spa Manila! I am your Wellness Assistant. Ask me anything about our facilities, services, packages, dynamic buffet schedules, or pricing rules.";
      const welcomeZh = "欢迎光临帝皇水疗中心！我是您的健康助手。您可以向我咨询关于设施、服务、套餐、自助餐时间表或价格的任何问题。";
      const welcomeKo = "엠그란드 스파 마닐라에 오신 것을 환영합니다! 저는 웰니스 어시스턴트입니다. 시설, 서비스, 패키지, 뷔페 시간표, 요금 규정 등 궁금한 점을 무엇이든 물어보세요.";
      
      if (messages[0].text === welcomeEn || messages[0].text === welcomeZh || messages[0].text === welcomeKo) {
        if (messages[0].text !== t('chat_welcome')) {
          setMessages([
            {
              sender: 'bot',
              text: t('chat_welcome')
            }
          ]);
        }
      }
    }
  }, [language, messages, t]);

  const getChipQuery = (chipType) => {
    if (language === 'zh') {
      switch (chipType) {
        case 'price': return '门票价格是多少？';
        case 'buffet': return '请问自助餐时间表是什么？';
        case 'packages': return '工作日套餐有哪些？';
        case 'location': return '你们的位置在哪里，如何联系？';
        default: return '';
      }
    } else if (language === 'ko') {
      switch (chipType) {
        case 'price': return '입장 요금은 얼마인가요?';
        case 'buffet': return '24시간 뷔페 시간표를 보여주세요';
        case 'packages': return '주중 할인 패키지는 무엇이 있나요?';
        case 'location': return '위치가 어디이고 어떻게 연락하나요?';
        default: return '';
      }
    } else {
      switch (chipType) {
        case 'price': return 'What is the standard entry rate?';
        case 'buffet': return 'Show me the 24H Buffet schedule';
        case 'packages': return 'What are the weekday promotional packages?';
        case 'location': return 'Where are you located and how to contact?';
        default: return '';
      }
    }
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Build Context-Aware System Prompt
    const systemPrompt = `
${chatbotInstructions}

---
ADDITIONAL DYNAMIC SYSTEM DATA (For real-time accuracy, use this data if guests ask about specific items, schedules, or events managed in the Admin Console):

Answering Guidelines & Key Operational Instructions:
${chatbotKeyPoints ? chatbotKeyPoints.map((kp, idx) => `- ${kp.text}`).join('\n') : ''}

Knowledge Base Q&A Pairs (FAQ Training):
${chatbotFAQs ? chatbotFAQs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n') : ''}

Current Catalog Data (Firestore synced):
${services.map(s => {
  const name = language === 'zh' ? s.name_zh : (language === 'ko' ? s.name_ko : s.name_en);
  const desc = language === 'zh' ? s.desc_zh : (language === 'ko' ? s.desc_ko : s.desc_en);
  const tipText = language === 'zh' 
    ? (s.tip === 'none' ? '无' : '本地理疗师 Php 200 / 中医专家 Php 500') 
    : (language === 'ko' 
      ? (s.tip === 'none' ? '없음' : '현지 마사지사 Php 200 / 중국 전문 마사지사 Php 500') 
      : (s.tip === 'none' ? 'None' : 'Local therapist Php 200 / Chinese specialist Php 500'));
  return `- ${name} (${s.category}): Rate: Php ${s.rate}, Therapist Tip: ${tipText}. Description: ${desc}`;
}).join('\n')}

Upcoming Campaigns:
${campaigns.map(c => `- ${t(c.title)}: ${t(c.desc)} (Ends: ${c.end_date})`).join('\n')}
`;

    // Check if Groq API key is present
    if (groqKey && groqKey.startsWith('gsk_')) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: groqModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: text }
            ],
            temperature: 0.7,
            max_tokens: 250
          })
        });

        if (response.ok) {
          const json = await response.json();
          const reply = json.choices?.[0]?.message?.content || "I couldn't process that response.";
          setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
          logChatQuery(text, reply);
        } else {
          const errData = await response.json();
          console.error("Groq API error", errData);
          setMessages(prev => [...prev, { 
            sender: 'bot', 
            text: `${t('chat_err_groq')} (${errData?.error?.message || response.statusText})` 
          }]);
        }
      } catch (err) {
        console.error("Failed to connect to Groq API", err);
        setMessages(prev => [...prev, { sender: 'bot', text: t('chat_err_network') }]);
      }
    } else {
      // Fallback rule-based mock answers with friendly warning about Groq configuration
      setTimeout(() => {
        let reply = "";
        if (!groqKey || !groqKey.startsWith('gsk_')) {
          reply = t('chat_offline_mode');
        }
        
        const normalized = text.toLowerCase();
        // Check if there is an offline trained FAQ match
        const matchingFAQ = chatbotFAQs && chatbotFAQs.find(f => 
          normalized.includes(f.question.toLowerCase()) || 
          f.question.toLowerCase().includes(normalized)
        );

        const hasKeyword = (keywords) => keywords.some(k => normalized.includes(k));

        if (matchingFAQ) {
          reply += matchingFAQ.answer;
        } else if (hasKeyword(['entry', 'price', 'rate', 'fee', 'ticket', 'admission', 'cost', 'pay', 'standard', '门票', '价格', '票价', '费用', '多少钱', '收费', '标准', '입장', '요금', '가격', '얼마', '비용', '티켓', '표', '기준'])) {
          reply += t('chat_mock_price');
        } else if (hasKeyword(['buffet', 'food', 'eat', 'meal', 'dining', 'breakfast', 'lunch', 'dinner', 'midnight', '自助餐', '食物', '吃饭', '餐', '早餐', '午餐', '晚餐', '宵夜', '点心', '뷔페', '음식', '식사', '먹', '아침', '점심', '저녁', '야식', '조식', '중식', '석식'])) {
          reply += t('chat_mock_buffet');
        } else if (hasKeyword(['package', 'weekday', 'promotion', 'discount', 'bundle', 'promo', '套餐', '工作日', '促销', '优惠', '折扣', '活动', '特惠', '패키지', '주중', '프로모션', '할인', '이벤트', '특가'])) {
          reply += t('chat_mock_packages');
        } else if (hasKeyword(['location', 'where', 'address', 'phone', 'contact', 'number', 'viber', 'map', 'find', 'direction', '位置', '哪里', '地址', '电话', '联系', '号码', '地图', '怎么走', '路线', '위치', '어디', '주소', '전화', '연락', '번호', '지도', '어떻게', '오', '가는'])) {
          reply += t('chat_mock_location');
        } else {
          reply += t('chat_mock_default');
        }

        setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
        logChatQuery(text, reply);
      }, 1000);
    }
    
    setIsTyping(false);
  };

  return (
    <div className="ai-chatbot-widget">
      {/* Suggestive Tooltip */}
      {!isOpen && showTooltip && (
        <div className="chat-suggest-tooltip">
          {getTooltipText()}
        </div>
      )}

      {/* Floating Toggle Bubble */}
      <button 
        className={`chat-toggle-bubble ${!isOpen && showTooltip ? 'pulse-active' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        aria-label="Open Chat Assistant"
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-comments'}`}></i>
        {!isOpen && <span className="chat-badge">💬</span>}
      </button>

      {/* Expanded Chat Window */}
      <div className={`chat-window-card ${isOpen ? 'active' : ''}`}>
        <div className="chat-window-header">
          <div className="chat-bot-info">
            <i className="fa-solid fa-headset"></i>
            <div>
              <h4>{t('chat_title')}</h4>
              <p><span className="online-indicator"></span> {t('chat_subtitle')}</p>
            </div>
          </div>
          <button className="chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close Chat">&times;</button>
        </div>

        {/* Messages */}
        <div className="chat-messages-container">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender === 'bot' ? 'bot-msg' : 'user-msg'}`}>
              <div className="msg-avatar">
                <i className={`fa-solid ${msg.sender === 'bot' ? 'fa-headset' : 'fa-user'}`}></i>
              </div>
              <div className="msg-text-wrap">
                <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-typing-indicator">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="chat-suggestion-chips">
          <button onClick={() => handleSend(getChipQuery('price'))}>{t('chat_chip_price')}</button>
          <button onClick={() => handleSend(getChipQuery('buffet'))}>{t('chat_chip_buffet')}</button>
          <button onClick={() => handleSend(getChipQuery('packages'))}>{t('chat_chip_packages')}</button>
          <button onClick={() => handleSend(getChipQuery('location'))}>{t('chat_chip_location')}</button>
        </div>

        {/* Input area */}
        <div className="chat-input-area">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('chat_placeholder')}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={() => handleSend()} aria-label="Send Message">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from 'react';
import { useAppState } from '@/context/AppContext';

export default function Footer() {
  const { t } = useAppState();
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <p dangerouslySetInnerHTML={{ __html: t('footer_copy') }} />
      </div>
    </footer>
  );
}

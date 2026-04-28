import { useState } from 'react';

export const useCopyToClipboard = () => {
  const [toast, setToast] = useState('');

  const copyToClipboard = async (text, label = 'Text') => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(`${label} copied!`);
      setTimeout(() => setToast(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setToast('Failed to copy');
      setTimeout(() => setToast(''), 2000);
    }
  };

  return { copyToClipboard, toast };
};
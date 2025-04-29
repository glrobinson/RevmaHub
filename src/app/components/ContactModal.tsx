'use client';
import { useRef } from 'react';
import { useTranslation } from '../context/TranslationContext';


type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert(t('ContactModal.success'));
        onClose();
      } else {
        throw new Error('Email failed');
      }
    } catch (err) {
      console.error('API Error:', err);
      alert(t('ContactModal.error'));
    }
  };

  if (!isOpen) return null;

  return (
    <div
        className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50"
        onClick={onClose}
    >
        <div
        className="bg-white p-10 rounded-lg w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
        >
        <button
          className="absolute top-4 right-4 text-black font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <input
        type="email"
        name="email"
        placeholder={t("ContactModal.email")}
        required
        className="w-full border p-2 rounded text-black"
        />
        <textarea
        name="message"
        placeholder={t("ContactModal.message")}
        required
        className="w-full border p-2 rounded h-24 text-black"
        />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
            >
              {t("ContactModal.cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500 text-black"
            >
              {t("ContactModal.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

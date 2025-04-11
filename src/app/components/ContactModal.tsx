'use client';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      emailjs.sendForm(
        'service_fyjza4t',
        'template_1a8pq99',
        formRef.current,
        '_c4qW0hFnGM9EYoMZ'
      )
      .then(() => {
        alert('Message sent!');
        onClose();
      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        alert('Failed to send message.');
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">

          <div className="bg-white p-10 rounded-lg w-full max-w-lg relative">
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
        placeholder="Email"
        required
        className="w-full border p-2 rounded text-black"
        />
        <textarea
        name="message"
        placeholder="Message"
        required
        className="w-full border p-2 rounded h-24 text-black"
        />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500 text-black"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

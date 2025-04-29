'use client'
import { useEffect, useRef } from 'react';
import { useTranslation } from "../context/TranslationContext";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    event: string;
    date: string;
    description: string;
    link: string;
    linkDescription: string;
}

export default function TimelineEventPopup({ isOpen, onClose, event, date, description, link, linkDescription }: Props) {
    const popupRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (isOpen && popupRef.current) {
            popupRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className='absolute inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50'
            onClick={onClose}
        >
            <div
                ref={popupRef}
                className='relative bg-white p-6 md:p-10 rounded-lg w-11/12 max-w-lg'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-black font-bold"
                    onClick={onClose}
                >
                    X
                </button>

                {/* Event Content */}
                <div className='flex flex-col justify-center items-center space-y-6'>
                    <h1 className='text-3xl font-bold text-center pb-2'>{event}</h1>
                    <h1 className='text-xl text-center text-gray-700 pb-15'>{description}</h1>
                </div>
                <h1 className='text-xl text-left'>{t("Timeline.furtherReading")}</h1>
                <div className='text-blue-500 underline'>
                    <a
                        href={link}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {linkDescription}
                    </a>
                </div>
            </div>
        </div>
    );
};

'use client'
import React, { useState } from 'react';
import TimelineEventPopup from './TimelineEventPopup';
import { useTranslation } from "../context/TranslationContext";

interface TimelineEventProps {
    imageSrc: string;
    altText: string;
    date: string;
    event: string;
    description: string;
    link: string;
    linkDescription: string;
}

const TimelineEventLeft: React.FC<TimelineEventProps> = ({
  imageSrc, altText, date, event, description, link, linkDescription
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleOpenPopup = () => {
    setShowDetails(true);
  };
  const { t } = useTranslation();

  return (
    <div className="flex flex-row justify-start items-center w-full">
      {/* Image */}
      <div className="flex flex-col items-center space-y-2">
        <div
          className="relative cursor-pointer flex-shrink-0 w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] md:w-[250px] md:h-[250px] lg:w-[280px] lg:h-[280px] xl:w-[280px] xl:h-[280px]"
          onClick={handleOpenPopup}
        >
          <img
            src={imageSrc}
            alt={altText}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="text-xs text-gray-500">
            {t("Timeline.clickToView")}
        </div>
      </div>

      {/* Popup */}
      <TimelineEventPopup
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        event={event}
        description={description}
        date={date}
        link={link}
        linkDescription={linkDescription}
      />

      {/* Text */}
      <div
        className="flex flex-col justify-center pl-6 pb-6 cursor-pointer"
        onClick={handleOpenPopup}
      >
        <h1 className="text-left font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-yellow-500">{date}</h1>
        <h1 className="text-left text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl">{event}</h1>
      </div>
    </div>
  );
};

export default TimelineEventLeft;

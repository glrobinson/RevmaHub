'use client';

import React, { useState } from 'react';
import TimelineEventPopup from './TimelineEventPopup';

interface TimelineEventProps {
  imageSrc: string;
  altText: string;
  date: string;
  event: string;
  description: string;
  link: string;
  linkDescription: string;
}

const TimelineEventRight: React.FC<TimelineEventProps> = ({
  imageSrc,
  altText,
  date,
  event,
  description,
  link,
  linkDescription
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleOpenPopup = () => {
    setShowDetails(true);
  };

  const handleClosePopup = () => {
    setShowDetails(false);
  };

  return (
    <div className="flex flex-row justify-end items-center w-full gap-6">
      {/* Text */}
      <div
        className="flex flex-col justify-center items-end space-y-2 cursor-pointer"
        onClick={handleOpenPopup}
      >
        <h1 className="text-right font-bold text-yellow-500 text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{date}</h1>
        <h2 className="text-right text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl max-w-[300px]">{event}</h2>
      </div>

      {/* Image */}
      <div className="flex flex-col items-center space-y-2">
        <div
          className="relative flex-shrink-0 cursor-pointer w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] xl:w-[280px] xl:h-[280px]"
          onClick={handleOpenPopup}
        >
          <img
            src={imageSrc}
            alt={altText}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="text-xs text-gray-500">
          Click to View Details
        </div>
      </div>

      {/* Popup */}
      {showDetails && (
        <TimelineEventPopup
          isOpen={showDetails}
          onClose={handleClosePopup}
          event={event}
          description={description}
          date={date}
          link={link}
          linkDescription={linkDescription}
        />
      )}
    </div>
  );
};

export default TimelineEventRight;

// src/components/BiodataPreview.tsx
import React from 'react';
import { Subsection } from '../interfaces';

interface BiodataPreviewProps {
  backgroundPhoto: string;
  userImage: string;
  sections: {
    title: string;
    subsections: { key: string; value: string }[];
    [key: string]: string | Subsection[]; // Add an index signature
  }[];
}

const BiodataPreview: React.FC<BiodataPreviewProps> = ({ backgroundPhoto, userImage, sections }) => {
  return (
    <div className="font-sans	relative w-[465px] h-[658px] mx-auto p-8 pt-16 rounded-lg bg-white shadow-lg print:w-210 print:h-297">
      {/* Background Photo */}
      {backgroundPhoto && (
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${backgroundPhoto})` }}
        />
      )}

      <div className="relative z-10 px-8">
        <div className="absolute right-0">
          {userImage && (
            <div className="mr-8 mt-6">
              <img src={userImage} alt="User" className="w-16 h-16 rounded-full" />
            </div>
          )}
        </div>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            <div className="font-bold text-base mb-2 underline underline-offset-4">{section.title}</div>
            {section.subsections.map((subsection, subsectionIndex) => (
              <div key={subsectionIndex} className="text-xs mb-2">
                <span className="font-bold">{subsection.key}:</span> {subsection.value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiodataPreview;

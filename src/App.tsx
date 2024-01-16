// src/App.tsx
import React, { useState } from 'react';
import BiodataForm from './components/BiodataForm';
import BiodataPreview from './components/BiodataPreview';
import { Section } from './interfaces';

const App: React.FC = () => {
  const [backgroundPhoto, setBackgroundPhoto] = useState<string>('');
  const [userImage, setUserImage] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([
    { title: '', subsections: [{ key: '', value: '' }] },
  ]);

  const handleFormSubmit = (formData: { backgroundPhoto: string; userImage: string; sections: Section[] }) => {
    setBackgroundPhoto(formData.backgroundPhoto);
    setUserImage(formData.userImage);
    setSections(formData.sections);
  };

  return (
    <div className='flex flex-col gap-4'>
      <BiodataForm onFormSubmit={handleFormSubmit} />
      {backgroundPhoto && userImage && <BiodataPreview backgroundPhoto={backgroundPhoto} userImage={userImage} sections={sections} />}
    </div>
  );
};

export default App;

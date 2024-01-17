// src/App.tsx
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import BiodataForm from "./components/BiodataForm";
import BiodataPreview from "./components/BiodataPreview";
import { Section } from "./interfaces";

const App: React.FC = () => {
  const [backgroundPhoto, setBackgroundPhoto] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([
    { title: "", subsections: [{ key: "", value: "" }] },
  ]);

  const handleFormSubmit = (formData: {
    backgroundPhoto: string;
    userImage: string;
    sections: Section[];
  }) => {
    setBackgroundPhoto(formData.backgroundPhoto);
    setUserImage(formData.userImage);
    setSections(formData.sections);
  };

  const componentRef = useRef(null);

  const handleCapture = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current).then((canvas) => {
        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL();

        // Create a link element and trigger a download
        const downloadLink = document.createElement("a");
        downloadLink.href = dataUrl;
        downloadLink.download = "component_image.png";
        downloadLink.click();
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <BiodataForm onFormSubmit={handleFormSubmit} />
      {backgroundPhoto && userImage && (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div ref={componentRef} className=" w-[465px] h-[658px]">
              <BiodataPreview
                backgroundPhoto={backgroundPhoto}
                userImage={userImage}
                sections={sections}
              />
            </div>
            <button
              onClick={handleCapture}
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Get Biodata
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

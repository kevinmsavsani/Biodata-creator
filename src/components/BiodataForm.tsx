// src/components/BiodataForm.tsx
import React, { useState } from "react";
import { Section } from "../interfaces";

interface BiodataFormProps {
  onFormSubmit: (data: {
    backgroundPhoto: string;
    userImage: string;
    sections: Section[];
  }) => void;
}

const BiodataForm: React.FC<BiodataFormProps> = ({ onFormSubmit }) => {
  const [backgroundPhoto, setBackgroundPhoto] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([
    {
      title: "PERSONAL DETAILS",
      subsections: [
        {
          key: "Name",
          value: "XXXXXXX",
        },
        {
          key: "Date of Birth",
          value: "May",
        },
        {
          key: "Height",
          value: "5'9\"",
        },
        {
          key: "Weight",
          value: "XX Kg",
        },
        {
          key: "Education",
          value: "Engineering",
        },
      ],
    },
    {
      title: "FAMILY DETAILS",
      subsections: [
        {
          key: "Father's Name",
          value: "XXXXXXX",
        },
        {
          key: "Father's Maternal",
          value: "XXXXXXXX (XXXXXXX)",
        },
        {
          key: "Mother's Name",
          value: "XXXXXXX XXXXXXXX XXXXXXXX",
        },
        {
          key: "Occupation",
          value: "Housewife",
        },
        {
          key: "Mother's Maternal",
          value: "XXXXXXX (XXXXXX)",
        },
        {
          key: "Brother's Name",
          value: "XXXXXXX XXXXXXXX XXXXXXXX",
        },
        {
          key: "Brother's Education",
          value: "Engineering",
        },
        {
          key: "Maternal",
          value: "XXXXXXX XXXXXXXX XXXXXXXX",
        },
        {
          key: "Native Place",
          value: "XXXXXXX XXXXXXXX XXXXXXXX",
        },
        {
          key: "Address",
          value:
            "XXXXXXX XXXXXXXX XXXXXXXX XXXXXXX XXXXXXXX XXXXXXXX",
        },
        {
          key: "Father's Mobile No.",
          value: "99999999999",
        },
      ],
    },
  ]);

  const handleInputChange = (
    sectionIndex: number,
    subsectionIndex: number | undefined,
    field: string,
    value: string
  ) => {
    const updatedSections = [...sections];

    if (subsectionIndex === undefined) {
      updatedSections[sectionIndex][field] = value;
    } else {
      updatedSections[sectionIndex].subsections[subsectionIndex][field] = value;
    }

    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { title: "", subsections: [{ key: "", value: "" }] },
    ]);
  };

  const addSubsection = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subsections.push({ key: "", value: "" });
    setSections(updatedSections);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onFormSubmit({ backgroundPhoto, userImage, sections });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Biodata Form</h2>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label
              htmlFor="backgroundPhoto"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Background Photo:
            </label>
            <input
              type="file"
              accept="images/*"
              id="backgroundPhoto"
              onChange={(e) => handleFileUpload(e, setBackgroundPhoto)}
              className="w-full border rounded py-2 px-3"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="userImage"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              User Image:
            </label>
            <input
              type="file"
              accept="image/*"
              id="userImage"
              onChange={(e) => handleFileUpload(e, setUserImage)}
              className="w-full border rounded py-2 px-3"
            />
          </div>
        </div>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border p-4 rounded">
            <h3 className="text-xl font-bold mb-4">{`Section ${
              sectionIndex + 1
            }`}</h3>
            <div className="mb-4">
              <label
                htmlFor={`sectionTitle-${sectionIndex}`}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Section Title:
              </label>
              <input
                type="text"
                id={`sectionTitle-${sectionIndex}`}
                value={section.title}
                onChange={(e) =>
                  handleInputChange(
                    sectionIndex,
                    undefined,
                    "title",
                    e.target.value
                  )
                }
                className="w-full border rounded py-2 px-3"
              />
            </div>
            {section.subsections.map((subsection, subsectionIndex) => (
              <div key={subsectionIndex} className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label
                    htmlFor={`subsectionKey-${sectionIndex}-${subsectionIndex}`}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Subsection Key:
                  </label>
                  <input
                    type="text"
                    id={`subsectionKey-${sectionIndex}-${subsectionIndex}`}
                    value={subsection.key}
                    onChange={(e) =>
                      handleInputChange(
                        sectionIndex,
                        subsectionIndex,
                        "key",
                        e.target.value
                      )
                    }
                    className="w-full border rounded py-2 px-3"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor={`subsectionValue-${sectionIndex}-${subsectionIndex}`}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Subsection Value:
                  </label>
                  <input
                    type="text"
                    id={`subsectionValue-${sectionIndex}-${subsectionIndex}`}
                    value={subsection.value}
                    onChange={(e) =>
                      handleInputChange(
                        sectionIndex,
                        subsectionIndex,
                        "value",
                        e.target.value
                      )
                    }
                    className="w-full border rounded py-2 px-3"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => addSubsection(sectionIndex)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add Subsection
            </button>
          </div>
        ))}
        <button
          onClick={addSection}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Section
        </button>
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiodataForm;

// src/interfaces.ts
export interface Subsection {
  key: string;
  value: string;
  [key: string]: string;
}

export interface Section {
  title: string;
  subsections: Subsection[];
  [key: string]: string | Subsection[]; // Add an index signature
}
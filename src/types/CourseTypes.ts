// src/types/CourseTypes.ts
export interface CourseData {
  title: string;
  description: string;
  imageUrl: string | null;
  duration: number;
  startDate: string;
  fees: number;
  category: string;
}

export interface CourseSubmissionData extends Omit<CourseData, 'imageUrl'> {
  image: File | null;
}

export interface CourseResponse extends CourseData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

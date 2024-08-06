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


export interface ICourse extends Document {
  _id: string;
  title: string;
  description: string;
  duration: number;
  startDate: Date;
  fees: number;
  instructorName: string;
  instructorEmail: string;
  category: string;
  imageUrl: string;
  creatorName: string;
  creatorEmail: string;
  isPurchased: boolean; // Add this field
}

// constants.ts

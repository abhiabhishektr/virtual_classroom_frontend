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
  instructorProfilePicture?: string;
  category: string;
  imageUrl: string;
  creatorName: string;
  creatorEmail: string;
  isPurchased: boolean; // Add this field
  rating?: number;
  reviews?: IReview[];
  modules?: IModule[];
}

interface IModule {
  _id: string;
  title: string;
  contents: IContent[];
}

interface IContent {
  _id: string;
  type: 'video' | 'document';
  title: string;
  url: string;
  duration?: number; // Duration in seconds, optional for documents
  isCompleted?: boolean;
  isImportant?: boolean;
}

export interface IReview {
  _id: string;
  courseId: string;
  rating: number;
  comment: string;
  date: Date;
  userName: string;
}


// export interface IReview {
//   _id: string;
//   courseId: string;
//   userId: string;
//   userName: string; // The name of the user who left the review
//   rating: number;   // Rating given by the user
//   comment: string;  // Comment provided by the user
//   createdAt: Date;  // Timestamp of when the review was created
//   updatedAt: Date;  // Timestamp of when the review was last updated
// }

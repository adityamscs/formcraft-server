export interface IQuestion {
  id: string;
  type: 'categorize' | 'cloze' | 'comprehension';
  title: string;
  image?: string;
  required: boolean;
  order: number;
}

export interface ICategorizeQuestion extends IQuestion {
  type: 'categorize';
  categories: string[];
  items: {
    id: string;
    text: string;
    category: string;
  }[];
}

export interface IClozeQuestion extends IQuestion {
  type: 'cloze';
  text: string;
  blanks: {
    id: string;
    correctAnswer: string;
    userAnswer?: string;
  }[];
}

export interface IComprehensionQuestion extends IQuestion {
  type: 'comprehension';
  passage: string;
  questions: {
    id: string;
    question: string;
    type: 'multiple-choice' | 'text';
    options?: string[];
    correctAnswer?: string;
    userAnswer?: string;
  }[];
}

export interface IForm {
  _id?: string;
  title: string;
  description?: string;
  headerImage?: string;
  questions: (ICategorizeQuestion | IClozeQuestion | IComprehensionQuestion)[];
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  shareLink?: string;
}

export interface IFormResponse {
  _id?: string;
  formId: string;
  responses: {
    questionId: string;
    answers: any;
  }[];
  submittedAt: Date;
  userAgent?: string;
  ipAddress?: string;
  userId?: string;        // Firebase UID
  email?: string;   // User's phone number
}

export type UserRole = "superuser" | "admin" | "creator" | "user";

export interface IUser {
  _id?: string;
  uid: string;
  email: string;
  name?: string;
  phone?: string;
  department?: string;
  className?: string;
  forms: string[];
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
export type Course = {
  id?: string;
  title: string;
  instructor: string;
  rating: number;
  learners: string;
  price: string;
  originalPrice?: string;
  bestseller?: boolean;
  image: string;
  description:string;
  whatYouWillLearn:string[];
  hours: string;
  resources: string;
  };
  
  export type RecommendedCourse = {
    id?: string;
    title: string; 
    instructor: string;
    rating: number;
    learners: string;
    price: string;
    originalPrice: string;
    image: string;
    bestseller?: boolean;
    description?:string;
    whatYouWillLearn:string[];
    hours:string;
    resources:string;
  };
  
  export type Slide = {
    title: string;
    description: string;
    buttonText?: string;
    image: string;
  };
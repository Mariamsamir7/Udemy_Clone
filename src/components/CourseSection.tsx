import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Course, RecommendedCourse } from "@/data/types";


type CourseSectionProps = {
  title: string;
  courses: Course[] | RecommendedCourse[];
};

const CourseSection: React.FC<CourseSectionProps> = ({ title, courses }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-5">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="relative">
        {/* Left Arrow */}
        <IconButton
          onClick={scrollLeft}
          className="absolute hidden md:flex left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white rounded-full p-2"
          aria-label="Scroll Left"
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Courses Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
        >
          {courses.map((course,index) => (
            <Link href={`/course/${encodeURIComponent(course.id!)}`} key={index} passHref>
             
              <div className="flex-shrink-0 w-64 md:w-[300px] h-full bg-white cursor-pointer">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold">{course.title}</h3>
                  <p className="text-gray-600 text-xs">By {course.instructor}</p>
                  <div className="flex items-center text-yellow-500 mt-2">
                    {'⭐'.repeat(Math.floor(course.rating))}
                    <span className="text-gray-600 ml-2">
                      {course.rating} ({course.learners})
                    </span>
                  </div>
                  <div className="flex items-baseline mt-2">
                    <span className="text-lg font-semibold">{course.price}</span>
                    {course.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-2">
                        {course.originalPrice}
                      </span>
                    )}
                  </div>
                  {course.bestseller && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-500 bg-yellow-200">
                      Bestseller
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <IconButton
          onClick={scrollRight}
          className="absolute hidden md:flex right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white rounded-full p-2"
          aria-label="Scroll Right"
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
    </section>
  );
};

export default CourseSection;
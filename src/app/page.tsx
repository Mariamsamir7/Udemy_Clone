"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "../styles/custom.css";
import COURSES from '../data/courses.json';
import plans from '../data/plans.json';
import testimonials from '../data/testimonials.json';
import { useTranslation } from "react-i18next";
type Course = {
  title: string;
  instructor: string;
  rating: number;
  learners: string;
  price: string;
  originalPrice?: string;
  bestseller?: boolean; 
  image: string;
};
type Plan = {
  name: string;
  type: string;
  price: string;
  billingInfo?: string;
  buttonText: string;
  features: string[];
};
type Testimonial = {
  text: string;
  author: string;
  responses?: string;
  linkText: string;
  linkUrl: string;
  image?: string;
  position?: string;
};

type CourseCategory = keyof typeof COURSES;

const TABS = Object.keys(COURSES) as CourseCategory[];

const Home = () => {
  const [activeTab, setActiveTab] = useState<CourseCategory>(TABS[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  
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
    <>
    <main className="flex flex-col items-center ">
    
      {/* Introduction Section */}
      <section className="relative w-full flex flex-col md:flex-row items-center  justify-start  p-6">
    {/* الصورة الخلفية */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-[300px] md:h-[500px]"
      style={{ backgroundImage: "url('/assets/landing.png')" }}
    ></div>

    {/* النص */}
    <div className="relative bg-white md:shadow-lg max-w-md  p-6 md:ml-16 mt-72 md:mt-16 z-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
        {t("intro_title")}
      </h2>
      <p className="text-gray-600 mb-4">
      {t("intro_desc")} 
      </p>
    </div>
  </section>

      {/* Skills Section */}
      <section className="text-start md:pt-72 w-full px-6 md:py-6  ">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 font-serif"> {t("skills_title")}</h2>
        <p className="text-gray-600 mb-6 text-lg">
        {t("skills_desc")}
        </p>
        <div className="flex justify-center md:justify-start space-x-4 overflow-auto px-4 md:px-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-base font-semibold px-4 py-2 ${
                activeTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Courses Section with Horizontal Scroll and Arrow Controls */}
      <section className="relative w-full  md:px-9 py-6 bg-gray-50">
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <IconButton onClick={scrollLeft} className="absolute left-0 z-10 bg-gray-100 ">
            <ArrowBackIcon fontSize="large" />
          </IconButton>

          {/* Courses Container */}
          <div
            ref={scrollRef}
            className="flex space-x-7 overflow-x-auto scrollbar-hide w-full px-9 "
            style={{ scrollBehavior: 'smooth' }}
          >
            {COURSES[activeTab]?.map((course: Course, index) => (
              <div key={index} className="flex-shrink-0 w-80 border  shadow-md cursor-pointer bg-white">
                <Image src={course.image} alt={course.title} width={400} height={200} className="w-full h-55 object-cover " />
                <div className="p-4 ">
                  <h3 className="text-xl font-bold">{course.title}</h3>
                  <p className="text-sm text-gray-500">{t("by")}{course.instructor}</p>
                  <div className="flex items-center text-yellow-500 mt-2">
                    {'⭐'.repeat(Math.floor(course.rating))}
                    <span className="text-gray-600 ml-2">{course.rating} ({course.learners})</span>
                  </div>
                  <div className="flex items-baseline mt-2">
                    <span className="text-lg font-semibold text-gray-900">{course.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                  </div>
                  {course.bestseller && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">
                      {t("bestseller")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <IconButton onClick={scrollRight} className="absolute right-0 z-10 bg-gray-100">
            <ArrowForwardIcon fontSize="large" />
          </IconButton>
        </div>
      </section>

      {/* Show More Button */}
      <section className="w-full flex justify-center py-6 bg-gray-50">
        <button className="px-6 py-2 border border-gray-600 text-gray-600 hover:bg-gray-100">
          Show all {activeTab} courses
        </button>
      </section>
      {/* Trusted Companies Section */}
<section className="text-center py-12">
  <p className="text-gray-600 text-xl mb-4">
  {t("Trusted_text")} 
  </p>
  <div className="grid grid-cols-3  md:grid-cols-4 lg:grid-cols-8 gap-6 items-center justify-center px-6 md:px-0">
    <Image src="/assets/vimeo.svg" alt="Vimeo" width={60} height={40} />
    <Image src="/assets/cisco.svg" alt="Cisco" width={60} height={40} />
    <Image src="/assets/pg.svg" alt="P&G" width={60} height={40} />
    <Image src="/assets/hpe.svg" alt="Hewlett Packard" width={60} height={40} />
    <Image src="/assets/citi.svg" alt="Citi" width={60} height={40} />
    <Image src="/assets/ericsson.svg" alt="Ericsson" width={60} height={40} />
    <Image src="/assets/samsung.svg" alt="Samsung" width={60} height={40} />
    <Image src="/assets/vw.svg" alt="Volkswagen" width={60} height={40} />
  </div>
</section>

      {/* Learners are viewing Section */}
      <section className="w-full px-6 py-8">
        <h2 className="text-3xl font-bold mb-6 font-serif">t{("learner_are_viewing")}</h2>
        <div className="relative w-full flex items-center">
          {/* Left Arrow */}
          <IconButton onClick={scrollLeft} className="absolute left-0 z-10 bg-gray-100">
            <ArrowBackIcon fontSize="large" />
          </IconButton>

          {/* Courses Container */}
          <div
            ref={scrollRef}
            className="flex space-x-5 overflow-x-auto scrollbar-hide w-full "
            style={{ scrollBehavior: 'smooth' }}
          >
            {Object.values(COURSES).flatMap((courses) => courses).map((course: Course, index) => (
          <div key={index} className="flex-shrink-0 w-80 border shadow-md cursor-pointer bg-white">
          <Image src={course.image} alt={course.title} width={300} height={200} className="w-full h-55 object-cover" />
           <div className="p-4 ">
           <h3 className="text-xl font-bold">{course.title}</h3>
           <p className="text-sm text-gray-500">{t("by")} {course.instructor}</p>
           <div className="flex items-center text-yellow-500 mt-2">
        {'⭐'.repeat(Math.floor(course.rating))}
        <span className="text-gray-600 ml-2">{course.rating} ({course.learners})</span>
      </div>
      <div className="flex items-baseline mt-2">
        <span className="text-lg font-semibold text-gray-900">{course.price}</span>
        <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
      </div>
      {course.bestseller && (
        <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full">
          {t("bestseller")}
        </span>
      )}
    </div>
  </div>
))}
          </div>

          {/* Right Arrow */}
          <IconButton onClick={scrollRight} className="absolute right-0 z-10 bg-gray-100">
            <ArrowForwardIcon fontSize="large" />
          </IconButton>
        </div>
      </section>
      {/* Plan sec */}
      <section className="py-12 w-full  px-6 ">
      <h2 className="text-2xl  md:text-3xl font-bold text-gray-800 font-serif mb-4">{t("plan-title")} </h2>
      <p className="text-gray-600 mb-8">{t("plan-desc")}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-8xl">
        {plans.map((plan:Plan, index) => (
          <div key={index} className="border rounded-lg shadow-md text-center bg-white">
            <div className="bg-gray-100 border-t-8 border-violet-500 rounded-lg p-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-serif">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{plan.type}</p>
            </div>
            <p className="text-gray-800 font-semibold mt-4">{plan.price}</p>
            {plan.billingInfo && <p className="text-gray-500 text-sm mb-4">{plan.billingInfo}</p>}
            <button className="bg-black text-white px-4 py-2 rounded-md mb-6">{plan.buttonText}</button>
            
            <ul className="text-left mx-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center mb-2 text-gray-700">
                  <CheckCircleIcon className="text-green-600 mr-2" /> {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
{/* testimonial section */}
 <section className="py-12 w-full bg-gray-50">
      <h2 className="text-3xl font-bold font-serif pl-12 mb-8">{t("testimonial-title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12 max-w-9xl mx-auto">
        {testimonials.map((testimonial:Testimonial, index) => (
          <div key={index} className="border rounded-lg p-6 bg-white shadow-sm text-center">
            <blockquote className="text-gray-800 italic mb-4"> {testimonial.text} </blockquote>
            <div className="flex flex-col items-center">
              {testimonial.image && (
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="rounded-full mb-2"
                />
              )}
              <p className="text-gray-700 font-semibold">{testimonial.author}</p>
              {testimonial.position && (
                <p className="text-gray-500 text-sm">{testimonial.position}</p>
              )}
              {testimonial.responses && (
                <p className="text-gray-500 text-sm">{testimonial.responses}</p>
              )}
            </div>
            <a href={testimonial.linkUrl} className="text-purple-600 font-semibold mt-4 inline-block">
              {testimonial.linkText} →
            </a>
          </div>
        ))}
      </div>
    </section>
    </main>
    </>
  );
};

export default Home;
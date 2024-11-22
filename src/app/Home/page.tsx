// src/app/Home/page.tsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton } from "@mui/material";
import slidesData from "@/data/slides.json";
import { Course, Slide } from "@/data/types";
import "@/styles/custom.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircleFilled";
import CourseSection from "@/components/CourseSection";
import TopicsSection from "@/components/TopicsSection";
import { useTranslation } from "react-i18next";
type Topic = string;

const Home = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true); 
  const { isLogin } = useAuth();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides: Slide[] = slidesData.slides;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (isLogin === null) return;

      if (!isLogin) {
        router.push("/login");
      } else {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }
      setIsLoading(false); 
    };

    checkAuth();
  }, [isLogin, router]);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(autoSlide);
  }, [slides.length]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (isLoading) {
    return <p>Loading...</p>; 
  }

  if (!isLogin) {
    return null; 
  }

  return (
    <div className="px-4 py-5 md:px-16 md:py-10">
      {/* Welcome Message */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
          <span className="text-lg font-semibold">{username.charAt(0).toUpperCase()}</span>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-bold"> {t("welcome_back", { username })}</h1>
          <a href="#" className="text-purple-600 font-semibold underline">
             {t("add_occupation_and_interests")} 
          </a>
        </div>
      </div>

      {/* Slider */}
      <div className="relative md:flex md:items-center mb-12">
        <IconButton
          onClick={prevSlide}
          className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white"
        >
          <ArrowBackIcon />
        </IconButton>

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-start w-full h-full md:h-[400px] inset-0 bg-cover bg-center bg-no-repeat text-center md:text-left"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        >
          <div className="w-1/2 md:w-1/3 p-3 bg-white m-4 md:m-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 font-serif">{slides[currentSlide].title}</h2>
            <p className="text-gray-700 text-sm md:text-base mb-4">{slides[currentSlide].description}</p>
            {slides[currentSlide].buttonText && (
              <button className="px-4 py-2 bg-black text-white text-sm md:text-base">
                {slides[currentSlide].buttonText}
              </button>
            )}
          </div>
        </div>

        <IconButton
          onClick={nextSlide}
          className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white"
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>

      {/* Learning Section */}
      <section className="py-8 md:py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-3xl font-bold font-serif">{t("lets_start_learning")} </h2>
          <a href="#" className="text-purple-600 text-sm md:text-base font-semibold">
            {t("my_learning")}
          </a>
        </div>
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute hidden md:flex left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white rounded-full p-2"
            aria-label="Scroll Left"
          >
            <ArrowBackIcon />
          </button>

          <div ref={scrollRef} className="flex space-x-4 overflow-x-auto scrollbar-hide w-full h-48">
            {slidesData.learningSection.map((course, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 md:w-[445px] h-full border shadow-md flex items-center bg-white hover:bg-gray-50"
              >
                <div className="relative w-1/3 h-full">
                  <Image src={course.image} alt={course.courseTitle} fill className="object-cover" />
                  <PlayCircleIcon className="absolute inset-0 m-auto text-white text-4xl opacity-80" />
                </div>
                <div className="p-3 flex-1">
                  <h3 className="text-xs md:text-sm font-semibold text-gray-600">{course.courseTitle}</h3>
                  <p className="text-sm md:text-base font-bold">{course.lessonTitle}</p>
                  <p className="text-xs text-gray-500 mt-3">{course.lecture} • {course.duration}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute hidden md:flex right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white rounded-full p-2"
            aria-label="Scroll Right"
          >
            <ArrowForwardIcon />
          </button>
        </div>
      </section>

      {/* Business Banner */}
      <section className="mt-8 p-4 bg-black text-white flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p className="text-sm md:text-base mb-4 md:mb-0">
          <strong>{t("training_teams")}</strong>{t("get_team_access")}
        </p>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <button className="bg-white text-black px-4 py-2 text-sm md:text-base">{t("get_udemy_business")}</button>
          <button className="text-white px-4 py-2 text-sm md:text-base border border-white">{t("dismiss")}Dismiss</button>
        </div>
      </section>

      {/* Course Sections */}
      <h2 className="text-xl md:text-3xl font-bold font-serif pt-12">{t("what_to_learn_next")}</h2>
      <CourseSection title={t("recommended_for_you")} courses={slidesData.recommended as Course[]} />
      <CourseSection
        title={t("because_you_viewed", { courseName: "The Complete Node.js Developer Course" })}
        courses={slidesData.viewed as Course[]}
      />
      <CourseSection title={t("learner_are_viewing")} courses={slidesData.learner as Course[]} />
      <CourseSection title={t("top_courses_web_dev")} courses={slidesData.webDevelopment as Course[]} />
      <TopicsSection topics={slidesData.topics as Topic[]} />
    </div>
  );
};

export default Home;

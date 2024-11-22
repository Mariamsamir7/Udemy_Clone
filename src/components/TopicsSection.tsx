import React, { useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from '@mui/material';
import { useTranslation } from "react-i18next";

const TopicsSection = ({ topics }: { topics: string[] }) => {
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
    <section className="py-8">
      <h2 className="text-xl font-bold mb-4"> {t("topic_title")}</h2>
      <div className="relative">
       
        <IconButton
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white hidden md:flex"
        >
          <ArrowBackIcon />
        </IconButton>

       
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
       {topics.map((topic, index) => (
         <div
           key={index}
           className="border font-bold px-6 py-4 text-center bg-white shadow-sm hover:bg-gray-100 cursor-pointer"
         >
           {topic}
         </div>
          ))}
        </div>

       
        <IconButton
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white hidden md:flex"
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
    </section>
  );
};

export default TopicsSection;
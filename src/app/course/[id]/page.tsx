"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/AuthContext";
import slidesData from "@/data/slides.json";
import Image from "next/image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DownloadIcon from "@mui/icons-material/Download";
import TvIcon from "@mui/icons-material/Tv";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PlayCircleIcon from "@mui/icons-material/PlayCircleFilled";
import { Course } from "@/data/types";

type CourseDetailPageProps = {
  params: Promise<{ id: string }>; // Updated: params is now a Promise
};

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ params }) => {
  const { isLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin, router]);

  // Unwrap params
  const [id, setId] = React.useState<string>("");

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(decodeURIComponent(resolvedParams.id)); // Decode the ID
    });
  }, [params]);

  const course: Course | undefined =
    slidesData.recommended.find((item: Course) => item.id === id) ||
    slidesData.viewed.find((item: Course) => item.id === id);

  // If the course is not found
  if (!course) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Course not found</h1>
        
      </div>
    );
  }
  return (
    <div className="w-full ">
      {/* القسم العلوي */}
      <div className="bg-black text-white w-full md:flex md:justify-end md:items-start ">
        {/* النص على اليسار */}
        <div className="flex-1 p-9">
          <h1 className="text-3xl font-bold mt-4">{course.title}</h1>
          <p className="text-lg text-gray-300 mt-2">{course.description}</p>
          <div className="flex items-center space-x-4 mt-4">
            <span className="text-yellow-500 text-lg">
              {"⭐".repeat(Math.floor(course.rating))}
            </span>
            <span className="text-sm text-gray-300">
              {course.rating}{" "}
              <a href="#" className="underline">
                ({Math.floor(course.rating * 100)} ratings)
              </a>{" "}
              {course.learners} students
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Created by <span className="text-blue-400">{course.instructor}</span>
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Last updated 8/2024 · English [Auto], German [Auto]
          </p>
        </div>

        {/* الكارت على اليمين */}
        <div className="w-[350px]  bg-white shadow-md border m-4 fixed top-21">
          <div className="relative w-full h-60 overflow-hidden border-b mb-4">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover shadow-inner"
            />
             < PlayCircleIcon className="absolute text-black inset-0 m-auto text-5xl" />
             {/* absolute inset-0 m-auto text-white text-4xl opacity-80" */}
            <a
              href="#"
              className="absolute font-bold text-white text-lg inset-0 flex items-end justify-center"
            >
              Preview this course
            </a>
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-2">Personal</p>
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-serif">
              Subscribe to Udemy&apos;s top courses
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Get this course, plus 12,000+ of our top-rated courses, with
              Personal Plan.
              <a href="#" className="text-purple-600 underline">
                {" "}
                Learn more
              </a>
            </p>
            <button className="bg-purple-600 font-bold text-white w-full py-3 mb-4">
              Try Personal Plan for free
            </button>
            <p className="text-sm text-gray-600 mb-2">
              Starting at £204.00 per month after trial. Cancel anytime.
            </p>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xl font-bold">{course.price}</p>
              {course.originalPrice && (
                <p className="text-sm line-through text-gray-500">
                  {course.originalPrice}
                </p>
              )}
            </div>
            <button className="bg-black text-white font-bold w-full py-3 mb-4">
              Add to cart
            </button>
            <div className="flex space-x-2 justify-between text-gray-600 text-sm">
              <button className="hover:underline">Share</button>
              <button className="hover:underline">Gift this course</button>
              <button className="hover:underline">Apply Coupon</button>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="flex flex-col gap-4  py-8 w-full md:1/3  lg:w-2/3" >
        <div className="flex-1 border p-4">
          <h2 className="text-2xl font-bold mb-4">What you&apos;ll learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 ? (
              course.whatYouWillLearn.map((item, index) => (
                <p key={index} className="text-gray-700 list-disc list-inside">
                  ✔ {item}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No details available for this course.</p>
            )}
          </div>
        </div>
      </div>
      {/*course includes */}
      <div className="flex flex-col gap-4  py-4 w-full  md:w-2/3">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">This course includes:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-gray-700 space-x-4">
              <AccessTimeIcon/><span >{course.hours} hours on-demand video</span>
            </div>
            <div className="flex items-center text-gray-700 space-x-4">
              <DownloadIcon /><span >{course.resources} downloadable resources</span>
            </div>
            <div className="flex items-center text-gray-700 space-x-4">
              <TvIcon/><span >Access on mobile and TV</span>
            </div>
            <div className="flex items-center text-gray-700 space-x-4">
              <EmojiEventsIcon /><span >Certificate of completion</span>
            </div>
          </div>
        </div>
      </div>
       {/*compaines */}
 <div className="flex flex-col gap-4  py-8 w-full  md:w-2/3">
  <div className="flex-1 border p-4">
 <h2 className="text-xl font-bold mb-4">
    Top companies offer this course to their employees
  </h2>
  <p className="text-gray-600 text-sm mb-4">
    This course was selected for our collection of top-rated courses trusted by businesses worldwide.
    <a href="#" className="text-purple-600 underline ml-1">Learn more</a>
  </p>
  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-center justify-center">
    <div className="flex items-center justify-center ">
      <Image src="/assets/nasdaq-light.svg" alt="Nasdaq" width={80} height={40} />
    </div>
    <div className="flex items-center justify-center">
      <Image src="/assets/volkswagen-light.svg" alt="Volkswagen" width={80} height={40} />
    </div>
    <div className="flex items-center justify-center">
      <Image src="/assets/box-light.svg" alt="Box" width={80} height={40} />
    </div>
    <div className="flex items-center justify-center">
      <Image src="/assets/netapp-light.svg" alt="NetApp" width={80} height={40} />
    </div>
    <div className="flex items-center justify-center">
      <Image src="/assets/eventbrite-light.svg" alt="Eventbrite" width={80} height={40} />
    </div>
  </div>
  </div>
</div>
    </div>
  );
};

export default CourseDetailPage;
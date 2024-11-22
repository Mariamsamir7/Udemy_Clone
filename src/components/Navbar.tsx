// src/components/Navbar.tsx
import React, { useState } from "react";
import { Search, ShoppingCart, Globe, Menu, X } from 'react-feather';
import Image from "next/image";
import Link from 'next/link';
import HeartIcon from '@mui/icons-material/FavoriteBorder';
import BellIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../AuthContext'; 
import { useTranslation } from "react-i18next"; 


  
const Navbar = () => {
  const { isLogin, logout } = useAuth(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { t, i18n } = useTranslation(); 

 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleLanguageModal = () => {
    setIsLanguageModalOpen(!isLanguageModalOpen);
  };
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang); 
    toggleLanguageModal(); 
  };


  return (
    <div>
      {/* Navbar */}
      <div className="flex space-x-5 bg-white  md:h-[4.5rem] text-center justify-between items-center px-4" >
        {/* Menu Icon for Mobile */}
        <button onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo */}
        <Link href="/" ><Image src="/assets/logo-udemy.svg" alt="udemy_logo" width={100} height={40} /></Link>

        {/* Categories Link (Visible on larger screens) */}
      <div className="relative group">
      <h3 className="hidden text-gray-500 text-sm md:block font-semibold hover:text-purple-600 hover:cursor-pointer relative">
      {t("categories")}
      <div className="absolute top-10 left-0 bg-white shadow-lg p-4 w-72 text-left z-50 hidden group-hover:block">
      <ul className="space-y-2">
        {[
          t("Business"),
          t("Finance & Accounting"),
          t("Development"),
          t("IT & Software"),
          t("Office Productivity"),
          t("Personal Development"),
          t("Design"),
          t("Marketing"),
          t("Lifestyle"),
          t("Photography & Video"),
          t("Health & Fitness"),
          t("Music"),
          t("Teaching & Academics"),
        ].map((category, index) => (
          <li
            key={index}
            className="flex justify-between items-center text-gray-700 hover:text-purple-600 hover:bg-gray-100 p-2 rounded"
          >
            {category}
            <span className="text-gray-400">{">"}</span>
          </li>
        ))}
      </ul>
    </div>
  </h3>
</div>

        {/* Search Bar (Hidden on small screens) */}
        <form className="hidden bg-[#f8fafb] md:flex border border-black rounded-3xl flex-1 h-4/6 items-center">
          <Search className="h-5 mx-4 text-gray-400" />
          <input
            type="text"
            placeholder={t("Search_for_anything")}
            className="bg-transparent text-sm outline-none"
          />
        </form>
        <div className="relative group" >
        <h3 className="hidden text-gray-500 text-sm md:block font-semibold hover:text-purple-600 hover:cursor-pointer relative">
        {t("udemy_business")}
      <div className="absolute top-10 left-[-50px] bg-white shadow-lg p-6 w-60 text-center z-50 hidden group-hover:block">
      <p className="text-lg text-gray-700 mb-5">
      {t("udemy_business_desc")}   
      </p>
      <a
        href="/business"
        className="bg-black text-white p-3 font-semibold text-sm hover:bg-gray-800" >
         {t("try_udemy_business")}
      </a>
    </div> </h3></div>
        <div className="relative group" >
        <h3 className="hidden text-gray-500 text-sm md:block font-semibold hover:text-purple-600 hover:cursor-pointer relative">
        {t("teach_on_udemy")}
      <div className="absolute top-10 left-[-50px] bg-white shadow-lg p-6 w-60 text-center z-50 hidden group-hover:block">
      <p className="text-lg text-gray-700 mb-5">
      {t("teach_on_udemy_desc")}
      </p>
      <a
        href="/teach"
        className="bg-black text-white p-3 font-semibold text-sm hover:bg-gray-800"
      >
         {t("learn_more")}
      </a>
    </div> </h3></div>
        {/* Icons and Links */}
        <div className="flex items-center space-x-4">
        {/* Shopping Cart */}
        <div className="relative group" >
            <Link href="/cart">
            <ShoppingCart className="h-6 w-6 text-gray-500 hover:text-purple-600" />
            </Link>
             {/* Dropdown Content */}
             <div className="absolute top-10 left-[-90px] bg-white shadow-lg p-4 w-60 text-center z-50 hidden group-hover:block">
              <p className="text-lg text-gray-700">{t("cart_empty")}</p>
              <Link href="/">
                <span className="text-purple-600 font-semibold  mt-2 block">
                {t("keep_shopping")}
                </span>
              </Link>
            </div>
          </div>
         
          {isLogin ? (
            // Icons shown after login
            <>
              <HeartIcon className="h-6 w-6 text-gray-400" />
              <BellIcon className="h-6 w-6 text-gray-400" />
              <AccountCircleIcon className="h-6 w-6 text-gray-400" />
              <button onClick={logout} className="text-sm text-red-600 font-semibold"> {t("logout")}</button>
            </>
          ) : (
            // Login and Sign up buttons (shown before login)
            <div className="hidden md:flex pr-4 space-x-4 justify-end">
              <Link href="/login">
                <button className="border border-black text-sm h-10 font-bold w-20 hover:bg-[#F5F5F5]">
                {t("log_in")} 
                </button>
              </Link>
              <Link href="/signup">
                <button className="border bg-black text-white text-sm h-10 font-bold w-20">
                {t("sign_up")}
                </button>
              </Link>
              
               <button
            onClick={toggleLanguageModal} 
            className="border border-black w-10 flex items-center justify-center hover:bg-[#F5F5F5]"
            aria-label={t("choose_language")} 
             >
             <Globe className="h-6 w-5" />
             </button>

            </div>
          )}

        </div>
      </div>
     {/* Language Modal */}
     {isLanguageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-96 relative">
           
             <h3 className="text-lg font-bold mb-4">{t("choose_language")}</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
               { lang: "en", label: "English" },
                { lang: "de", label: "Deutsch" },
                { lang: "es", label: "Español" },
                { lang: "fr", label: "Français" },
                { lang: "id", label: "Bahasa Indonesia" },
                { lang: "it", label: "Italiano" },
                { lang: "pt", label: "Português" },
                { lang: "ru", label: "Русский" },
                { lang: "tr", label: "Türkçe" },
                { lang: "zh-cn", label: "中文(简体)" },
                { lang: "zh-tw", label: "中文(繁體)" },
                { lang: "ja", label: "日本語" },
                { lang: "ko", label: "한국어" },
                { lang: "nl", label: "Nederlands" },
                { lang: "pl", label: "Polski" },
                { lang: "ro", label: "Română" },
              ].map((language, index) => (
                <button
                  key={index}
                 onClick={() => changeLanguage(language.lang)}
                  className="text-gray-700 hover:bg-gray-100 p-2 rounded"
                >
                  {language.label}
                </button>
              ))}
            </div>
            <button
              onClick={toggleLanguageModal}
              className="absolute top-3 right-3 text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Sidebar for Mobile */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 z-50`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">{t("menu")}</h2>
          <button onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <a href="#" className="text-gray-700 font-medium hover:bg-gray-100 p-2 rounded">Categories</a>
          <a href="#" className="text-gray-700 font-medium hover:bg-gray-100 p-2 rounded">Udemy Business</a>
          <a href="#" className="text-gray-700 font-medium hover:bg-gray-100 p-2 rounded">Teach on Udemy</a>
          <div className="flex items-center border-t pt-4">
            {isLogin ? (
              <button onClick={logout} className="flex-1 text-red-600 font-bold w-full h-10 hover:bg-[#F5F5F5]">
               {t("logout")}
              </button>
            ) : (
              <div  className="flex flex-col pt-4 space-y-2 w-full">
                <Link href="/login">
                  <button className="flex-1 border border-black text-sm h-10 font-bold w-full hover:bg-[#F5F5F5]">
                  {t("log_in")} 
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="flex-1 border bg-black text-white text-sm h-10 font-bold w-full ">
                  {t("sign_up")}
                  </button>
                </Link>
              </div>
            )}
          </div>
         
          <button className="flex items-center justify-center w-full border border-black h-10 hover:bg-[#F5F5F5]"
                 onClick={toggleLanguageModal} 
                 aria-label={t("choose_language")} >
            <Globe className="h-5 w-5" />
          </button>
        
        </div>
      </div>

      {/* Overlay when Sidebar is open */}
      {isSidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}
    </div>
  );
};

export default Navbar;
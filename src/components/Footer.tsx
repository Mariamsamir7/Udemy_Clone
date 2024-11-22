// src/components/Footer.tsx

import React from 'react';
import Image from 'next/image';
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4 md:px-12 lg:px-24">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-7 mb-6 border-b border-gray-400">
        <div className="text-center md:text-left text-white mb-4 md:mb-0">
          <p className="font-semibold text-lg md:text-xl">
            Top companies choose <span className="text-violet-300">Udemy Business</span> to build in-demand career skills.
          </p>
        </div>

        {/* Logos Section */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Image src="/assets/nasdaq-light.svg" alt="Nasdaq" width={80} height={40} />
          <Image src="/assets/volkswagen-light.svg" alt="Volkswagen" width={50} height={20} />
          <Image src="/assets/box-light.svg" alt="Box" width={60} height={30} />
          <Image src="/assets/netapp-light.svg" alt="NetApp" width={80} height={40} />
          <Image src="/assets/eventbrite-light.svg" alt="Eventbrite" width={80} height={40} />
        </div>
      </div>

      {/* Links Section */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 text-sm text-gray-300 mb-8">
        <div>
          <p className="font-semibold mb-2">Udemy</p>
          <ul>
            <li><a href="#" className="hover:underline">{t("udemy_business")}</a></li>
            <li><a href="#" className="hover:underline">{t("teach_on_udemy")}</a></li>
            <li><a href="#" className="hover:underline">{t("Get_the_app")}</a></li>
            <li><a href="#" className="hover:underline">{t("About_us")}</a></li>
            <li><a href="#" className="hover:underline">{t("Contact_us")}</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">{t("More")}</p>
          <ul>
            <li><a href="#" className="hover:underline">{t("Careers")}</a></li>
            <li><a href="#" className="hover:underline">{t("Blog")}</a></li>
            <li><a href="#" className="hover:underline">{t("Help_and_Support")}</a></li>
            <li><a href="#" className="hover:underline">{t("Affiliate")}</a></li>
            <li><a href="#" className="hover:underline">{t("Investors")}</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">{t("Legal")}</p>
          <ul>
            <li><a href="#" className="hover:underline">{t("Terms")}</a></li>
            <li><a href="#" className="hover:underline">{t("Privacy_policy")}</a></li>
            <li><a href="#" className="hover:underline">{t("Cookie_settings")}</a></li>
            <li><a href="#" className="hover:underline">{t("Sitemap")}</a></li>
            <li><a href="#" className="hover:underline">{t("Accessibility_statement")}</a></li>
          </ul>
        </div>
      </div>

      {/* Language Selector and Logo */}
      <div className="flex flex-col md:flex-row items-center justify-between  pt-4">
        <div className="mb-4 md:mb-0">
          <Image src="/assets/logo-udemy-light.svg" alt="Udemy Logo" width={100} height={40} />
        </div>
        <button className="border border-gray-600 text-gray-400 px-4 py-2 rounded flex items-center justify-center md:justify-start space-x-2 w-full md:w-auto">
          <span>🌐</span>
          <span>English</span>
        </button>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-4">
        &copy; 2024 Udemy, Inc.
      </div>
    </footer>
  );
};

export default Footer;
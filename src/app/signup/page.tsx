"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const [fullName, setFullName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const router = useRouter();
  const { t } = useTranslation();

  const handleSignup = () => {
    if (!fullName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Account created successfully!");

    router.push("/login");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12 p-6 md:p-12 bg-white">
      {/* Illustration */}
      <div className="hidden md:block md:w-1/2">
        <Image src="/assets/signup.png" alt="Signup Illustration" width={550} height={550} />
      </div>

      {/* Signup Form */}
      <div className="w-full md:w-1/2 md:p-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {t("signup_title")} 
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="space-y-5"
        >
          {/* Full Name */}
          <div className="flex justify-center">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-3/4 p-4 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          {/* Email */}
          <div className="flex justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-3/4 p-4 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          {/* Password */}
          <div className="flex justify-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-3/4 p-4 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div className="flex items-center justify-center px-9">
              <input type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
              <label className="ml-2 text-sm text-gray-600">
              {t("send_offer")} 
              </label>
            </div>


          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              variant="contained"
              type="submit"
              className="w-3/4 py-4 bg-purple-600 text-xs text-left text-white rounded-none md:text-lg"
              fullWidth
            >
              Sign up
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
          {t("agree")}<a href="#" className="text-purple-600 underline">{t("Terms_of_Use")}</a>{t("and")}<a href="#" className="text-purple-600 underline">{t("Privacy_policy")}</a>.
          </p>

            <p className="text-center text-sm text-gray-600 mt-6">
              {t("Already_have_an_account?")} <a href="/login" className="text-purple-600 font-semibold">Log in</a>
            </p>
          </form>
        </div>
    </div>
  );
};

export default Signup;            

"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../AuthContext';
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useTranslation();


  const handleLogin = () => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    if (email === savedEmail && password === savedPassword) {
      localStorage.setItem('username', email.split('@')[0]);

      login();

      router.push('/Home');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12 p-6 md:p-12 bg-white">
      {/* Illustration */}
      <div className="hidden md:block md:w-1/2">
        <Image src="/assets/login.png" alt="Login Illustration" width={550} height={550} />
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/2 md:p-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {t("login_title")}
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-5">
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
          <div className="flex justify-center">
            <Button
              variant="contained"
              type="submit"
              className="w-3/4 py-4 bg-purple-600 text-xs text-left text-white rounded-none md:text-lg"
              startIcon={<EmailIcon />}
              fullWidth
            >
               {t("log_in")}
              
            </Button>
          </div>
         {/* Divider */}
         <div className="text-center text-gray-500 my-2">
            <span className="hidden md:inline">───────── </span> <span>{t("Other_log_in_options")}</span> <span className="hidden md:inline">─────────</span>
          </div>

          {/* Social Login Options */}
          <div className="flex justify-center space-x-4">
            <Button
              variant="outlined"
              className="p-3 text-red-400 border-slate-400"
              startIcon={<GoogleIcon />}
            >
              <span className="hidden md:inline">GOOGLE</span> 
            </Button>
            <Button
              variant="outlined"
              className="p-3 text-sky-600 border-slate-400"
              startIcon={<FacebookIcon />}
            >
              <span className="hidden md:inline">Facebook</span>
            </Button>
            <Button
              variant="outlined"
              className="p-3 text-slate-500 border-slate-400"
              startIcon={<AppleIcon />}
            >
              <span className="hidden md:inline">Apple</span> 
            </Button>
          </div>

          {/* Sign up and Organization login links */}
          <p className="text-center text-sm text-gray-600 mt-6">
           {t("Don’t_have_an_account?")} <a href="/signup" className="text-purple-600 font-bold underline">Sign up</a>
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            <a href="#" className="text-purple-600 font-bold underline">{t("Log_in_with_your_organization")}</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;              
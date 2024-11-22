// src/app/layout.tsx

"use client";
import "../app/globals.css"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthProvider } from '../AuthContext';
import "/src/i18n";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* يمكنك إضافة عناصر <meta> و <title> هنا */}
        <link rel="shortcut icon" href="/assets/faviconV2.png" />
        <title>Online Courses - Learn Anything</title>

      </head>
      <body className="flex flex-col min-h-screen">
      <AuthProvider>

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>

        {/* Footer */}
        <Footer />
        </AuthProvider>

      </body>
    </html>
  );
}
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/header.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Janta Raja motars & Financial Services",
  description: "Your trusted partner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Add the Header here. It will show on every page. */}
        <Header />
        {/* This is where the page content (page.js) is inserted */}
        {children}
      </body>
    </html>
  );
}

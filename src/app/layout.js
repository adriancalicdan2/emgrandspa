import { Cinzel, Inter } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Emgrand Spa Manila - Premium 24H Urban Wellness Resort",
  description: "Experience luxury urban bathhouse pools, 24-hour continuous buffet, premium massage treatments, and family entertainment centers in Aseana City, Parañaque.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`} data-theme="light">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        {/* Link for FontAwesome icons */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        {/* Firebase SDK script tags (legacy/compat SDKs for browser execution compatibility) */}
        <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js" async></script>
        <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js" async></script>
        <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js" async></script>
      </head>
      <body>
        <AppProvider>
          <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <main className="page-content flex-grow">
              {children}
            </main>
            <FloatingChat />
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}

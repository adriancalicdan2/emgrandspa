# Emgrand Spa Manila Web Application

Welcome to the official repository of **Emgrand Spa Manila**, a premium wellness web platform built with React 19 and Next.js 16. It offers clients a luxurious spa overview, interactive booking tools, real-time pricing calculation, and social showcases alongside an advanced, secure administrative dashboard.

---

## 🚀 Key Features

### 1. Interactive Services & Pricing Calculator
- **Services Catalog**: View customized offerings across specialized categories (Massage Treatment, Private Suite Lodging, Specialized Therapy, and TCM Orthopedics).
- **Interactive Bill Builder**: Guests can dynamically add services, packages, and custom add-ons to build their custom receipt, calculating totals, service charges, and taxes in real-time.

### 2. Gallery & TikTok Walkthrough Showcase
- **Vertical Video Grid**: An immersive 3-column media grid rendering TikTok-style vertical videos (`9/16` aspect ratio) with support for YouTube, YouTube Shorts, and Facebook formats.
- **Autoplay Integration**: Media clips are set to auto-play and loop on desktop and mobile viewports.
- **Pagination**: Optimized "See More" controls display a maximum of 3 items on desktop and 1 item on mobile viewports by default.

### 3. AI Chat Assistant
- Powered by the **GROQ Llama-3** language model, providing immediate responses to guest inquiries about booking availability, services, prices, and operating hours.

### 4. Admin Management Dashboard (`/admin`)
- Secure login view protecting administrative actions.
- **Authorized Accounts Management**: Manage administrative and staff users (Full Name, Email, Position, Password, Role) inside a clean modal popup.
- **Service Management**: Add, update, and remove spa service treatments.
- **Campaign Configuration**: Launch and configure promotional events.
- **Walkthrough Videos Config**: Easily register TikTok, Facebook, or YouTube shorts URLs for the gallery showcase.

### 5. Multi-Language & Multi-Theme Options
- Full translations available in **English (EN)**, **Simplified Chinese (ZH)**, and **Korean (KO)**.
- Theme toggles supporting premium dark glassmorphism and classic light layouts.

---

## 🛠️ Technology Stack

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & Vanilla CSS variables
- **Database / Backend**:
  - **Firebase Firestore**: Used for cloud database synchronization when configured.
  - **Local Storage Mock Mode**: In the absence of Firebase keys, the application gracefully falls back to storing data locally inside the browser's `localStorage` (so admins can still run, test, and save changes locally).
- **AI Engine**: [GROQ API](https://groq.com/) (Llama-3 model)
- **Deployment**: Optimized for Vercel and Netlify hosts

---

## 📂 Project Architecture

```bash
├── public/                 # Static assets (images, icons, vectors)
└── src/
    ├── app/                # Next.js App Router folders
    │   ├── about/          # About page
    │   ├── admin/          # Admin Control Panel & login logic
    │   ├── bookings/       # Reservation & booking calendar views
    │   ├── contact/        # Contact forms
    │   ├── services/       # Catalog & interactive bill receipt builder
    │   ├── socials/        # Reels vertical video player & social posts grid
    │   ├── globals.css     # Global core styling & color themes
    │   └── layout.js       # App entry shell
    ├── components/         # Reusable widgets (Header, Footer, FloatingChat)
    └── context/            # AppContext.js global state manager & DB wrappers
```

---

## 💻 Local Setup & Development

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Environment Variables Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here

# EmailJS credentials for contact form submissions:
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_iryaxhu
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_dgpuiqk
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Launch the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📈 Production Build
To create a production-optimized build:
```bash
npm run build
npm run start
```

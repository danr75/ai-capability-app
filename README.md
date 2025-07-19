# AI Capability Learning App

An interactive AI-powered learning app designed for professionals to assess, track, and improve AI capabilities. Built with Next.js, TypeScript, PostgreSQL, and GPT-4 APIs.

## 🚀 Features

- **6-Domain Capability Assessment** - Comprehensive AI skills evaluation
- **Skill Tracker Dashboard** - Visual progress tracking with charts
- **Learning Coach** - AI-powered daily drills and on-demand lessons
- **Guided Pathways** - Structured learning modules and toolkits
- **Progress Tracking** - Real-time capability improvement monitoring

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **AI**: OpenAI GPT-4 API
- **Auth**: Auth.js (NextAuth)
- **Storage**: Supabase/S3
- **Deployment**: Vercel

## 🏃‍♂️ Getting Started

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd ai-capability-app
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
# Add your database URL, OpenAI API key, etc.
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API route handlers
│   ├── dashboard/      # Dashboard pages
│   └── auth/           # Authentication pages
├── components/         # Reusable UI components
├── lib/               # Utility functions
├── types/             # TypeScript type definitions
└── styles/            # Global styles
```

## 🚀 Deployment

This app is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ai-capability-app)

## 📝 Development Status

- ✅ Environment Setup (Next.js, TypeScript, Tailwind)
- ⏳ Authentication System
- ⏳ Capability Assessment
- ⏳ Dashboard & Tracking
- ⏳ Learning Coach Integration
- ⏳ Pathways & Resources

## 🤝 Contributing

This is an MVP in active development. Contributions welcome!

## 📄 License

MIT License

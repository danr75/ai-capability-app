# AI Capability Learning App

An interactive AI-powered learning app designed for professionals to assess, track, and improve AI capabilities. Built with modern web technologies and deployed on Vercel with Neon PostgreSQL.

## 🚀 Features

- **6-Domain Capability Assessment** - Comprehensive AI skills evaluation
- **Skill Tracker Dashboard** - Visual progress tracking with charts
- **Learning Coach** - AI-powered daily drills and on-demand lessons
- **Guided Pathways** - Structured learning modules and toolkits
- **Progress Tracking** - Real-time capability improvement monitoring
- **Authentication** - Secure sign-in with email/password and Google OAuth

## 🛠️ Tech Stack

### Frontend
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS with custom design system
- React Query for data fetching
- React Hook Form for form handling

### Backend
- Next.js API Routes
- Prisma ORM with PostgreSQL
- Auth.js (NextAuth) for authentication
- Server Actions for data mutations

### Database
- Neon PostgreSQL (Serverless Postgres)
- Prisma Migrate for schema management

### Deployment
- Vercel for hosting and serverless functions
- Vercel Postgres (Neon) for database
- Environment variables for configuration

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ and npm
- Vercel account
- Neon PostgreSQL database
- GitHub account (for OAuth)

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/danr75/ai-capability-app.git
cd ai-capability-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

4. **Configure environment variables in `.env.local`:**
```env
# Database
DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Optional: OpenAI API for AI features
OPENAI_API_KEY=""
```

5. **Run database migrations:**
```bash
npx prisma migrate dev
```

6. **Seed the database with test data:**
```bash
npm run db:seed
```

7. **Start the development server:**
```bash
npm run dev
```

8. **Open [http://localhost:3000](http://localhost:3000) in your browser**

### Deployment

1. **Deploy to Vercel:**
   - Push your code to a GitHub repository
   - Import the repository to Vercel
   - Configure environment variables in Vercel dashboard
   - Deploy!

2. **Set up database:**
   - Create a new Neon PostgreSQL database
   - Update the `DATABASE_URL` in Vercel environment variables
   - Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/          # Authentication pages
│   │   ├── signin/     # Sign in page
│   │   └── signup/     # Sign up page
│   ├── api/            # API route handlers
│   │   └── auth/       # NextAuth API routes
│   ├── dashboard/      # Protected dashboard routes
│   └── layout.tsx      # Root layout
├── components/         # Reusable UI components
│   ├── ui/            # Shadcn/ui components
│   └── icons/         # Icon components
├── lib/               # Utility functions
│   ├── auth/          # Authentication utilities
│   └── db/            # Database client
└── styles/            # Global styles

prisma/
├── schema.prisma     # Database schema
└── seed.ts          # Database seed script
```
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

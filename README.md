# Standup Management Application

A modern React TypeScript application for managing daily standup meetings with team collaboration features.

## 🌐 Live Demo

**[View Live Application](https://checkpoint-react-fe.vercel.app)**

> **Note**: The application is deployed on Vercel with backend services hosted on Railway.

## 🚀 Features

### Authentication
- **Secure Login/Register** - Cookie-based authentication with form validation
- **Protected Routes** - Route guards for authenticated/unauthenticated users
- **Auto-redirect** - Seamless navigation based on auth state

### Dashboard (Team View)
- **Team Standups Overview** - View all team members' daily updates
- **Advanced Filters** - Filter by date and user with date picker and dropdown
- **Real-time Stats** - Team completion rates and blocker tracking
- **Interactive Sidebar** - Pending members and active blockers sections
- **Quick Standup Submission** - Global modal accessible from any protected page

### Personal History
- **Individual History** - View your personal standup history
- **Smart Filtering** - Sort by newest/oldest, filter by blockers
- **Progress Analytics** - Track completion rates and blocker trends
- **Consistent UI** - Reuses standup cards for visual consistency

### Standup Management
- **Rich Form Validation** - Yup schema validation with detailed error messages
- **Quick Templates** - Pre-built templates for faster standup creation
- **Smart Modal** - Context-aware submission with user info
- **Responsive Design** - Mobile-friendly slide-in modal

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v4** for modern styling
- **React Router v7** for client-side routing
- **React Hook Form** with Yup validation

### State Management
- **Redux Toolkit** for global state
- **RTK Query** for API calls and caching
- **Custom hooks** for business logic

### Development
- **ESLint** with TypeScript rules
- **Hot Module Replacement** for fast development
- **Component-based architecture**

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   ├── auth/           # Auth-specific components (AuthGuard, PublicRoute)
│   ├── StandupCard.tsx # Standup display component
│   ├── StandupModal.tsx# Global standup submission modal
│   └── ...
├── layouts/            # Page layouts
│   └── RootLayout.tsx  # Global layout with navbar
├── pages/              # Route components
│   ├── Dashboard.tsx   # Team dashboard
│   ├── History.tsx     # Personal history
│   ├── Login.tsx       # Authentication
│   └── ...
├── store/              # Redux setup
│   ├── api/            # RTK Query endpoints
│   ├── slices/         # Redux slices
│   └── store.ts        # Store configuration
├── types/              # TypeScript definitions
├── utils/              # Utility functions
└── lib/                # External library configs
```

## 🚦 Getting Started

1. **Clone and install dependencies**
   ```bash
   git clone <repo-url>
   cd checkpoint-react-fe
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your configuration:
   ```env
   VITE_API_URL=http://localhost:3001
   VITE_DEV_PORT=3000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔑 Key Features Explained

### Authentication Flow
- Cookie-based auth with automatic session management
- Form validation with real-time feedback
- Secure route protection with redirect handling

### Dashboard Filtering
- **Date Filter**: Select any past date (future dates disabled)
- **User Filter**: View all users or specific team member
- **Smart CTAs**: Submission prompts only show for relevant contexts

### Global Modal System
- Standup modal available from any protected page
- Redux-managed state for consistent behavior
- Form validation with helpful error messages

### Data Management
- RTK Query for efficient API caching
- Automatic state updates on successful submissions
- Optimistic updates for better UX

## 🎨 Design System

- **Consistent Components**: Reusable UI components with TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Visual Hierarchy**: Clear information architecture

## 🔄 API Integration

- **RESTful API** design with proper HTTP methods
- **Error Handling** with user-friendly messages
- **Loading States** for better user experience
- **Caching Strategy** with RTK Query

## 📱 Responsive Features

- Mobile-optimized navigation
- Adaptive layouts for different screen sizes
- Touch-friendly interactions
- Progressive enhancement

## 🧩 Component Architecture

### UI Components
- **Reusable Design System** - Consistent buttons, inputs, dropdowns
- **Form Components** - Validated inputs with error states
- **Layout Components** - Responsive cards and containers

### Business Components
- **StandupCard** - Displays standup information consistently
- **StandupModal** - Global submission form with templates
- **Navigation** - Context-aware navigation with auth states

### Route Protection
- **AuthGuard** - Protects authenticated routes
- **PublicRoute** - Handles unauthenticated access
- **RootLayout** - Common layout for protected pages

## 🚀 Deployment

The application is deployed using modern cloud platforms:

### Production Environment
- **Frontend**: [Vercel](https://vercel.com) - `https://checkpoint-react-fe.vercel.app`
- **Backend**: Railway (Node.js API)
- **Database**: MongoDB Atlas

### Deployment Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x
- **Environment Variables**: Configured via Vercel dashboard

### Key Deployment Features
- **Automatic Deployments** from Git commits
- **Preview Deployments** for pull requests  
- **Custom Domain** support
- **SSL/TLS** certificate auto-provisioning
- **Global CDN** for optimal performance

## 🔧 Development Setup

Built with modern development practices:
- TypeScript for type safety
- ESLint for code quality
- Component-driven development
- Responsive-first design
- Performance optimizations
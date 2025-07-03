# AI Recruiter - Mock Interview Platform

An AI-powered platform for preparing for mock interviews with real-time feedback and personalized questions.

## Features

- **AI Voice Assistant** - Natural conversation with AI interviewer
- **Instant Feedback** - Real-time analysis and scoring
- **Custom Questions** - Tailored to your role and experience
- **Progress Tracking** - Monitor improvement over time
- **Multiple Interview Types** - Technical, Behavioral, and Mixed interviews

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **AI Integration**: VAPI SDK for voice interactions
- **UI Components**: Custom components with shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project
- VAPI account

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd ai_mock_interviews
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Add your environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   └── api/               # API routes
├── components/            # Reusable components
├── lib/                   # Utilities and actions
├── types/                 # TypeScript type definitions
├── constants/             # Application constants
└── public/                # Static assets
```

## Key Components

- **Agent** - AI interviewer interface with voice interaction
- **InterviewCard** - Display interview sessions
- **Navbar** - Navigation with user profile
- **StatsCard** - Progress tracking cards

## Usage

1. **Sign Up/Login** - Create account or login with existing credentials
2. **Create Interview** - Start AI conversation to generate personalized questions
3. **Take Interview** - Practice with AI voice assistant
4. **Review Feedback** - Get detailed analysis and scoring
5. **Track Progress** - Monitor improvement over time

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

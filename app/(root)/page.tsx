import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import StatsCard from "@/components/StatsCard";
import QuickActions from "@/components/QuickActions";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

export const dynamic = "force-dynamic";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;
  const totalInterviews = userInterviews?.length || 0;
  const avgScore = userInterviews?.reduce((acc, interview) => acc + (interview.score || 0), 0) / totalInterviews || 0;

  return (
    <>
      {/* Hero Section */}
      <section className="card-cta mb-12 mt-8">
        <div className="flex flex-col gap-6 max-w-lg">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h1>
            <h2 className="text-2xl mb-2">Get Interview-Ready with AI-Powered Practice</h2>
            <p className="text-lg text-light-100">
              Practice real interview questions & get instant feedback to ace your next job interview
            </p>
          </div>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start New Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="AI Interview Assistant"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Stats Section */}
      <section className="mb-12">
        <h2 className="mb-6">Your Progress</h2>
        <div className="flex flex-wrap gap-6">
          <StatsCard
            title="Total Interviews"
            value={totalInterviews}
            icon="/star.svg"
            trend={totalInterviews > 0 ? `+${totalInterviews} this month` : undefined}
          />
          <StatsCard
            title="Average Score"
            value={avgScore > 0 ? `${Math.round(avgScore)}/100` : "--/100"}
            icon="/calendar.svg"
          />
          <StatsCard
            title="Success Rate"
            value={avgScore > 70 ? "High" : avgScore > 50 ? "Medium" : "Improving"}
            icon="/tech.svg"
          />
        </div>
      </section>

      {/* AI Features */}
      <section className="mb-10">
        <h2 className="mb-6 text-center">AI-Powered Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="card-border">
            <div className="card p-5 text-center">
              <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <Image src="/ai-avatar.png" alt="AI" width={20} height={20} />
              </div>
              <h3 className="text-base font-semibold mb-2">AI Voice Assistant</h3>
              <p className="text-light-100 text-xs">Natural conversation with AI interviewer</p>
            </div>
          </div>
          <div className="card-border">
            <div className="card p-5 text-center">
              <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Image src="/star.svg" alt="Feedback" width={20} height={20} />
              </div>
              <h3 className="text-base font-semibold mb-2">Instant Feedback</h3>
              <p className="text-light-100 text-xs">Real-time analysis and scoring</p>
            </div>
          </div>
          <div className="card-border">
            <div className="card p-5 text-center">
              <div className="w-10 h-10 bg-light-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Image src="/tech.svg" alt="Custom" width={20} height={20} />
              </div>
              <h3 className="text-base font-semibold mb-2">Custom Questions</h3>
              <p className="text-light-100 text-xs">Tailored to your role and experience</p>
            </div>
          </div>
          <div className="card-border">
            <div className="card p-5 text-center">
              <div className="w-10 h-10 bg-light-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Image src="/calendar.svg" alt="Progress" width={20} height={20} />
              </div>
              <h3 className="text-base font-semibold mb-2">Progress Tracking</h3>
              <p className="text-light-100 text-xs">Monitor improvement over time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Interviews */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2>Recent Interviews</h2>
          {hasPastInterviews && (
            <Button asChild className="btn-secondary">
              <Link href="/interviews">View All</Link>
            </Button>
          )}
        </div>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.slice(0, 3).map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <div className="card-border w-full">
              <div className="card p-8 text-center">
                <Image
                  src="/robot.png"
                  alt="No interviews"
                  width={120}
                  height={120}
                  className="mx-auto mb-4 opacity-50"
                />
                <h3 className="text-xl mb-2">No interviews yet</h3>
                <p className="text-light-100 mb-4">Start your first interview to begin improving your skills</p>
                <Button asChild className="btn-primary">
                  <Link href="/interview">Create Your First Interview</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Available Interviews */}
      {hasUpcomingInterviews && (
        <section className="mb-8">
          <h2 className="mb-6">Available Practice Interviews</h2>
          <div className="interviews-section">
            {allInterview?.slice(0, 3).map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Home;

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";

export const dynamic = "force-dynamic";

async function InterviewsPage() {
  const user = await getCurrentUser();
  const userInterviews = await getInterviewsByUserId(user?.id!);
  
  const hasInterviews = userInterviews?.length! > 0;
  
  // Group interviews by type
  const groupedInterviews = userInterviews?.reduce((acc, interview) => {
    const type = interview.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(interview);
    return acc;
  }, {} as Record<string, typeof userInterviews>) || {};

  return (
    <>
      {/* Header */}
      <section className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Interviews</h1>
          <p className="text-light-100">Track your progress and review past interviews</p>
        </div>
        <Button asChild className="btn-primary">
          <Link href="/interview">Create New Interview</Link>
        </Button>
      </section>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="card-border">
          <div className="card p-6 text-center">
            <h3 className="text-2xl font-bold text-primary-200">{userInterviews?.length || 0}</h3>
            <p className="text-light-100">Total Interviews</p>
          </div>
        </div>
        <div className="card-border">
          <div className="card p-6 text-center">
            <h3 className="text-2xl font-bold text-success-100">{groupedInterviews['Technical']?.length || 0}</h3>
            <p className="text-light-100">Technical</p>
          </div>
        </div>
        <div className="card-border">
          <div className="card p-6 text-center">
            <h3 className="text-2xl font-bold text-light-400">{groupedInterviews['Behavioral']?.length || 0}</h3>
            <p className="text-light-100">Behavioral</p>
          </div>
        </div>
        <div className="card-border">
          <div className="card p-6 text-center">
            <h3 className="text-2xl font-bold text-light-600">{groupedInterviews['Mixed']?.length || 0}</h3>
            <p className="text-light-100">Mixed</p>
          </div>
        </div>
      </section>

      {/* All Interviews */}
      <section>
        {hasInterviews ? (
          <>
            <h2 className="mb-6">All Interviews ({userInterviews?.length})</h2>
            <div className="interviews-section">
              {userInterviews?.map((interview) => (
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
          </>
        ) : (
          <div className="card-border">
            <div className="card p-12 text-center">
              <Image
                src="/robot.png"
                alt="No interviews"
                width={150}
                height={150}
                className="mx-auto mb-6 opacity-50"
              />
              <h2 className="text-2xl font-semibold mb-4">No interviews found</h2>
              <p className="text-light-100 mb-6 max-w-md mx-auto">
                You haven't created any interviews yet. Start your journey by creating your first interview practice session.
              </p>
              <Button asChild className="btn-primary">
                <Link href="/interview">Create Your First Interview</Link>
              </Button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default InterviewsPage;
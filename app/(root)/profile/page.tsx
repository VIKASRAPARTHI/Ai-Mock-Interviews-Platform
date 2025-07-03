import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";

export const dynamic = "force-dynamic";

async function ProfilePage() {
  const user = await getCurrentUser();
  const userInterviews = await getInterviewsByUserId(user?.id!);
  
  const totalInterviews = userInterviews?.length || 0;
  const avgScore = userInterviews?.reduce((acc, interview) => acc + (interview.score || 0), 0) / totalInterviews || 0;
  const completedInterviews = userInterviews?.filter(interview => interview.score).length || 0;

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Profile Header */}
      <div className="card-border mb-8">
        <div className="card p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-primary-200 flex items-center justify-center">
                <Image 
                  src="/profile.svg" 
                  alt="Profile" 
                  width={64} 
                  height={64}
                  className="text-dark-100"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">✓</span>
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{user?.name || "User"}</h1>
              <p className="text-light-100 mb-4">{user?.email}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-primary-200/20 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium">Member since 2024</span>
                </div>
                <div className="bg-success-100/20 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-success-100">Active User</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card-border">
          <div className="card p-6 text-center">
            <h3 className="text-3xl font-bold text-primary-200 mb-2">{totalInterviews}</h3>
            <p className="text-light-100">Total Interviews</p>
          </div>
        </div>
        <div className="card-border">
          <div className="card p-6 text-center">
            <h3 className="text-3xl font-bold text-success-100 mb-2">{completedInterviews}</h3>
            <p className="text-light-100">Completed</p>
          </div>
        </div>
        <div className="card-border">
          <div className="card p-6 text-center">
            <h3 className="text-3xl font-bold text-light-400 mb-2">
              {avgScore > 0 ? Math.round(avgScore) : "--"}
            </h3>
            <p className="text-light-100">Average Score</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Account Information */}
        <div className="card-border">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-light-100">Full Name</label>
                <p className="text-white font-medium">{user?.name || "Not provided"}</p>
              </div>
              <div>
                <label className="text-sm text-light-100">Email Address</label>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm text-light-100">User ID</label>
                <p className="text-white font-medium font-mono text-sm">{user?.id}</p>
              </div>
              <div>
                <label className="text-sm text-light-100">Account Status</label>
                <p className="text-success-100 font-medium">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="card-border">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Performance Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-light-100">Technical Interviews</span>
                <span className="text-white font-medium">
                  {userInterviews?.filter(i => i.type === 'Technical').length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-light-100">Behavioral Interviews</span>
                <span className="text-white font-medium">
                  {userInterviews?.filter(i => i.type === 'Behavioral').length || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-light-100">Mixed Interviews</span>
                <span className="text-white font-medium">
                  {userInterviews?.filter(i => i.type === 'Mixed').length || 0}
                </span>
              </div>
              <hr className="border-primary-200/20" />
              <div className="flex justify-between items-center">
                <span className="text-light-100">Success Rate</span>
                <span className="text-success-100 font-medium">
                  {avgScore > 70 ? "High" : avgScore > 50 ? "Medium" : "Improving"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
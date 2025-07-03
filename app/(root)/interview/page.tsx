import Image from "next/image";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-200 to-success-100 rounded-full flex items-center justify-center">
              <Image src="/tech.svg" alt="Create" width={32} height={32} className="filter brightness-0 invert" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary-200 to-success-100 bg-clip-text text-transparent">
              Create Interview
            </h1>
            <p className="text-lg text-light-100 mb-4">
              Transform your career with AI-powered interview practice
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-dark-200/50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-success-100 rounded-full animate-pulse"></div>
                <span className="text-sm">AI-Powered Questions</span>
              </div>
              <div className="flex items-center gap-2 bg-dark-200/50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-primary-200 rounded-full animate-pulse"></div>
                <span className="text-sm">Voice Interaction</span>
              </div>
              <div className="flex items-center gap-2 bg-dark-200/50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-light-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Instant Results</span>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-200 to-light-400 rounded-full flex items-center justify-center mb-2">
                <span className="text-dark-100 font-bold">1</span>
              </div>
              <p className="text-sm font-semibold mb-1">Start Call</p>
              <p className="text-xs text-light-100">Begin session</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-light-400 to-success-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-dark-100 font-bold">2</span>
              </div>
              <p className="text-sm font-semibold mb-1">Share Info</p>
              <p className="text-xs text-light-100">Tell about role</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-success-100 to-primary-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-dark-100 font-bold">3</span>
              </div>
              <p className="text-sm font-semibold mb-1">Get Questions</p>
              <p className="text-xs text-light-100">Ready to practice</p>
            </div>
          </div>

          {/* Agent Component */}
          <Agent
            userName={user?.name!}
            userId={user?.id}
            profileImage={user?.profileURL}
            type="generate"
          />

          {/* Bottom Features */}
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-success-100/20 to-success-100/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Image src="/star.svg" alt="Quality" width={20} height={20} />
              </div>
              <h3 className="text-sm font-bold mb-1">Premium Quality</h3>
              <p className="text-light-100 text-xs">Industry-standard questions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-200/20 to-primary-200/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Image src="/ai-avatar.png" alt="AI" width={20} height={20} />
              </div>
              <h3 className="text-sm font-bold mb-1">Smart AI</h3>
              <p className="text-light-100 text-xs">Advanced AI technology</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-light-400/20 to-light-400/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Image src="/calendar.svg" alt="Fast" width={20} height={20} />
              </div>
              <h3 className="text-sm font-bold mb-1">Lightning Fast</h3>
              <p className="text-light-100 text-xs">Get results in minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

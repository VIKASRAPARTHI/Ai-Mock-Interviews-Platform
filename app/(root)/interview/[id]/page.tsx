import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { RouteParams } from "@/types";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Header */}
          <div className="text-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={60}
              height={60}
              className="rounded-full object-cover size-[60px] mx-auto mb-4 border-2 border-primary-200/30"
            />
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary-200 to-success-100 bg-clip-text text-transparent">
              {interview.role} Interview
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="bg-dark-200/50 px-3 py-1 rounded-full">
                <span className="text-primary-200 text-sm font-medium">{interview.type}</span>
              </div>
              <DisplayTechIcons techStack={interview.techstack} />
            </div>
            <p className="text-lg text-light-100">
              Ready to start your interview? Click the call button below.
            </p>
          </div>

          {/* Info Cards */}
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Image src="/tech.svg" alt="Questions" width={20} height={20} />
              </div>
              <p className="text-sm font-semibold mb-1">{interview.questions?.length || 0} Questions</p>
              <p className="text-xs text-light-100">Prepared for you</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-200/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Image src="/ai-avatar.png" alt="AI" width={20} height={20} />
              </div>
              <p className="text-sm font-semibold mb-1">AI Interviewer</p>
              <p className="text-xs text-light-100">Smart & adaptive</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-light-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Image src="/star.svg" alt="Feedback" width={20} height={20} />
              </div>
              <p className="text-sm font-semibold mb-1">Get Feedback</p>
              <p className="text-xs text-light-100">Detailed analysis</p>
            </div>
          </div>

          {/* Agent Component */}
          <Agent
            userName={user?.name!}
            userId={user?.id}
            interviewId={id}
            type="interview"
            questions={interview.questions}
            feedbackId={feedback?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;

import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-light-600",
      Technical: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96 hover:scale-105 transition-transform duration-75">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg shadow-lg",
              badgeColor
            )}
          >
            <p className="badge-text text-white font-semibold">{normalizedType}</p>
          </div>

          {/* Cover Image with Glow Effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary-200/20 rounded-full blur-xl"></div>
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={90}
              height={90}
              className="rounded-full object-cover size-[90px] relative z-10 border-2 border-primary-200/30"
            />
          </div>

          {/* Interview Role */}
          <h3 className="mt-5 capitalize text-white font-bold">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <div className="p-1 bg-primary-200/20 rounded-full">
                <Image
                  src="/calendar.svg"
                  width={16}
                  height={16}
                  alt="calendar"
                />
              </div>
              <p className="text-sm text-light-100">{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div className="p-1 bg-primary-200/20 rounded-full">
                <Image src="/star.svg" width={16} height={16} alt="star" />
              </div>
              <p className={cn(
                "text-sm font-semibold",
                feedback?.totalScore ? 
                  feedback.totalScore >= 80 ? "text-success-100" :
                  feedback.totalScore >= 60 ? "text-primary-200" : "text-destructive-100"
                : "text-light-100"
              )}>
                {feedback?.totalScore || "---"}/100
              </p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-3 mt-5 text-light-100 text-sm leading-relaxed">
            {feedback?.finalAssessment ||
              "Ready to practice? This interview will help you improve your skills and build confidence for real job interviews."}
          </p>
        </div>

        <div className="flex flex-row justify-between items-end">
          <DisplayTechIcons techStack={techstack} />

          <Button className={cn(
            "transition-colors duration-75",
            feedback ? "btn-secondary" : "btn-primary"
          )}>
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
              className="flex items-center gap-2"
              prefetch={true}
            >
              {feedback ? (
                <>
                  <Image src="/star.svg" width={16} height={16} alt="feedback" />
                  View Feedback
                </>
              ) : (
                <>
                  <Image src="/tech.svg" width={16} height={16} alt="start" />
                  Start Interview
                </>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;

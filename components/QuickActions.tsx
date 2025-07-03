import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const QuickActions = () => {
  const actions = [
    {
      title: "Technical Interview",
      description: "Practice coding & system design",
      icon: "/tech.svg",
      href: "/interview?type=technical",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Behavioral Interview", 
      description: "Work on soft skills & scenarios",
      icon: "/profile.svg",
      href: "/interview?type=behavioral",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Mixed Interview",
      description: "Combination of both types",
      icon: "/star.svg", 
      href: "/interview?type=mixed",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <Link key={index} href={action.href}>
          <div className="card-border h-full hover:scale-105 transition-transform cursor-pointer">
            <div className="card p-6 h-full flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                  <Image src={action.icon} alt={action.title} width={24} height={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-light-100 text-sm">{action.description}</p>
              </div>
              <Button className="btn-primary mt-4 w-full">
                Start Now
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;
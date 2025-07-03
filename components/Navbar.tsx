import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-3 px-6 bg-dark-200/90 backdrop-blur-md border-b border-primary-200/20">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3" prefetch={true}>
        <div className="blue-gradient rounded-full p-2">
          <Image
            src="/logo.svg"
            alt="InterviewAce Logo"
            width={28}
            height={28}
          />
        </div>
        <h2 className="text-xl font-bold text-primary-100">Ai recruiter</h2>
      </Link>

      {/* Navigation Links - Desktop */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className="text-light-100 hover:text-primary-200 transition-colors duration-75 font-medium"
          prefetch={true}
        >
          Dashboard
        </Link>
        <Link
          href="/interview"
          className="text-light-100 hover:text-primary-200 transition-colors duration-75 font-medium"
          prefetch={true}
        >
          Create Interview
        </Link>
        <Link
          href="/interviews"
          className="text-light-100 hover:text-primary-200 transition-colors duration-75 font-medium"
          prefetch={true}
        >
          My Interviews
        </Link>
      </div>

      {/* Desktop Profile */}
      <Link
        href="/profile"
        className="hidden md:flex items-center gap-3 hover:bg-dark-300/50 rounded-lg p-2 transition-colors duration-75"
        prefetch={true}
      >
        <div className="flex flex-col items-end">
          <p className="text-sm font-semibold text-white">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-light-100">{user?.email}</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center">
          <Image
            src="/profile.svg"
            alt="Profile"
            width={20}
            height={20}
            className="text-dark-100"
          />
        </div>
      </Link>

      {/* Mobile Menu */}
      <MobileMenu />
    </nav>
  );
};

export default Navbar;

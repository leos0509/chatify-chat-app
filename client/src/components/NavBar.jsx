import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { signout, authUser } = useAuthStore();

  return (
    <header
      className="border-b border-base-300 sticky md:fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80 flex justify-center h-[10%] md:h-fit items-centers"
    >
      <div className="max-w-[1440px] w-full px-8 md:px-12 h-full py-4">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Chatify</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser ? (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex p-1 gap-2 items-center"
                  onClick={signout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/signin"}
                  className={`
              btn btn-sm gap-2 transition-colors
              
              `}
                >
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
                <Link
                  to={"/signup"}
                  className={`
            btn btn-sm gap-2 transition-colors
            
            `}
                >
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;

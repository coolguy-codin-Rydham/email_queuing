import { Link } from "react-router-dom";

const Navbar = () => {
  const linkStyle =
    "transition-all duration-200 text-white bg-clip-text bg-gradient-to-r from-white via-white to-white hover:text-transparent hover:from-white hover:to-yellow-400";

  return (
    <nav className="border-b border-b-white/60 p-2 w-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] h-full flex items-center justify-between">
        <div className="h-full flex items-center">
          <Link to={"/"}>
          <img
            className="h-20 w-20"
            src="/logo.webp"
            alt="Logo"
            loading="lazy"
            />
            </Link>
        </div>

        <div className="h-full flex justify-center items-center">
          <ul className="flex items-center gap-8 text-white">
            <li>
              <Link to="/event" className={linkStyle} aria-label="Create Event">
                Create Event
              </Link>
            </li>

            <li>
              <Link to="/list" className={linkStyle} aria-label="View Events">
                Events
              </Link>
            </li>

            <div className="flex items-center justify-center gap-5">
              <li>
                <Link
                  to="/login"
                  className="bg-white text-black px-4 py-2 rounded-md hover:bg-slate-200 duration-200"
                  aria-label="Login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="bg-amber-500 text-black px-4 py-2 rounded-md hover:bg-amber-600 duration-200"
                  aria-label="Sign Up"
                >
                  Sign Up
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

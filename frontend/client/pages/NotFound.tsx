import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-full bg-gradient-to-br from-hooslearn-orange-light via-white to-hooslearn-blue-light flex items-center justify-center py-8 px-4">
      <div className="text-center">
        <h1 className="font-wild-west text-8xl text-hooslearn-orange mb-4">404</h1>
        <p className="font-wild-west text-2xl text-hooslearn-blue mb-2">Whoa there, partner!</p>
        <p className="text-hooslearn-blue opacity-70 mb-8">Looks like this trail doesn't exist.</p>
        <a
          href="/"
          className="inline-block bg-hooslearn-orange hover:bg-hooslearn-orange-dark text-white font-wild-west text-lg px-8 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Ride Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

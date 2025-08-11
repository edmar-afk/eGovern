import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-44 lg:px-72">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404 - Page Not Available</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Oops! We couldn’t load that page.
        </h1>
        <p className="mt-6 text-lg text-gray-500 sm:text-xl">
          The page you’re trying to access is either missing, restricted,  
          or currently under development. Please check back later or navigate to a different page.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go Back to Previous Page
          </button>
          <a href="/login" className="text-sm font-semibold text-gray-900">
            Go to Login <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default NotFound;

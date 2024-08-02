import React from "react";

const CoursesListing: React.FC = () => {
  return (
    <div className="container relative flex">
      {/* Search Bar */}
      <div className="w-1/4 p-4 bg-gray-100 dark:bg-gray-800">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full p-2 border rounded-md dark:border-gray-700 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Courses Grid */}
      <div className="w-3/4 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
          {/* Start Course */}
          <div className="group relative rounded-md shadow hover:shadow-lg dark:shadow-gray-800 duration-500 ease-in-out overflow-hidden">
            <div className="relative overflow-hidden">
              <img
                src="assets/images/course/c6.jpg"
                className="group-hover:scale-110 duration-500 ease-in-out"
                alt=""
              />
              <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 duration-500 ease-in-out"></div>

              <div className="absolute start-0 bottom-0 opacity-0 group-hover:opacity-100 duration-500 ease-in-out">
                <div className="pb-4 ps-4 flex items-center">
                  <img
                    src="assets/images/client/06.jpg"
                    className="size-12 rounded-full shadow-md dark:shadow-gray-800 mx-auto"
                    alt=""
                  />
                  <div className="ms-3">
                    <a href="#" className="font-semibold text-white block">
                      William Benson
                    </a>
                    <span className="text-white/70 text-sm">Professor</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="content p-6 relative">
              <a href="course-detail.html" className="font-medium block text-indigo-600">
                Back-end Development
              </a>
              <a
                href="course-detail.html"
                className="text-lg font-medium block hover:text-indigo-600 duration-500 ease-in-out mt-2"
              >
                C Programming For Beginners - Master the C Language
              </a>
              <p className="text-slate-400 mt-3 mb-4">
                The phrasal sequence of the is now so that many campaign and benefit
              </p>

              <ul className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center list-none text-slate-400">
                <li className="flex items-center me-4">
                  <i className="uil uil-book-open text-lg leading-none me-2 text-slate-900 dark:text-white"></i>
                  <span>25 Lectures</span>
                </li>

                <li className="flex items-center me-4">
                  <i className="uil uil-clock text-lg leading-none me-2 text-slate-900 dark:text-white"></i>
                  <span>1h 30m</span>
                </li>

                <li className="flex items-center">
                  <i className="uil uil-eye text-lg leading-none me-2 text-slate-900 dark:text-white"></i>
                  <span>3012</span>
                </li>
              </ul>

              <div className="absolute -top-7 end-6 z-1 opacity-0 group-hover:opacity-100 duration-500 ease-in-out">
                <div className="flex justify-center items-center size-14 bg-white dark:bg-slate-900 rounded-full shadow-lg dark:shadow-gray-800 text-indigo-600 dark:text-white">
                  <span className="font-semibold">$11</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
          <div className="md:col-span-12 text-center">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex items-center -space-x-px">
                <li>
                  <a
                    href="#"
                    className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                  >
                    <i className="uil uil-angle-left text-[20px] rtl:rotate-180 rtl:-mt-1"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-indigo-600 border border-indigo-600"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-lg hover:text-white border border-gray-100 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-600"
                  >
                    <i className="uil uil-angle-right text-[20px] rtl:rotate-180 rtl:-mt-1"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesListing;

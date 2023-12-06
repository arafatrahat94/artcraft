import Title from "../Shared/title/title";

const WhatAre = () => {
  return (
    <div className="my-10 max-w-5xl w-11/12 mx-auto">
      <Title>{"What Are You Getting In Live CLass"}</Title>
      <div className="grid grid-cols-3 lg:grid-cols-3 gap-x-1 lg:gap-x-3  mt-5">
        <div className="flex flex-col lg:gap-y-2 gap-y-1">
          <div className="border-2 border-[#0b2447] dark:border-blue-300 dark:border-opacity-25 backdrop-blur-md border-opacity-40 rounded-3xl  lg:h-[200px] ">
            <img
              src="https://i.ibb.co/3047TdS/icons8-guide-58.png"
              alt="icons8-guide-58"
              border="0"
              className="mx-auto relative lg:left-2 left-[6px] w-12 lg:w-16 mt-4"
            />
            <h1 className="font-sans uppercase text-center mt-3 theme-text font-semibold text-xs lg:text-base">
              Interactive Guidance
            </h1>
            <p className="text-center text-black dark:text-white text-xs lg:text-base text-opacity-70 pb-3 lg:p-0 p-1">
              {" "}
              Engage in real-time discussions and receive personalized feedback
              from experienced artists.{" "}
            </p>
          </div>
          <div className="border-2 border-[#0b2447] dark:border-blue-300 dark:border-opacity-25 backdrop-blur-md border-opacity-40 rounded-3xl lg:h-[300px]">
            <img
              className="mx-auto w-14 mb-2 lg:mb-0 lg:w-20 mt-4 lg:mt-10"
              src="https://i.ibb.co/rH6MvCH/icons8-faq-100.png"
              alt="icons8-faq-100"
              border="0"
            />
            <h1 className="font-sans uppercase text-center lg:mt-3 theme-text font-semibold text-xs lg:text-base">
              Q&A Sessions
            </h1>
            <p className="text-center text-black dark:text-white text-xs lg:text-base text-opacity-70 pb-3 lg:px-4 lg:pt-2 p-1">
              {" "}
              Participate in live Q&A sessions where you can ask questions, seek
              advice, and gain insights directly from the instructor.{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:gap-y-2 gap-y-1">
          <div className="border-2 border-[#0b2447] dark:border-blue-300 dark:border-opacity-25 backdrop-blur-md border-opacity-40 lg:h-[330px] rounded-3xl">
            <img
              className="mx-auto w-14 lg:w-24 mt-5"
              src="https://i.ibb.co/CKZBgHM/icons8-technic-launcher-128.png"
              alt="icons8-technic-launcher-128"
              border="0"
            />
            <h1 className="font-sans uppercase text-center mt-3 theme-text font-semibold text-[10px] lg:text-base mb-1">
              Demonstrations and Techniques{" "}
            </h1>
            <p className="text-center text-black dark:text-white text-xs lg:text-base text-opacity-70 pb-3 lg:p-0 lg:px-4 p-1">
              {" "}
              Witness step-by-step demonstrations of various art techniques,
              from basic principles to advanced methods. Learn how to use
              different mediums effectively and explore diverse styles .{" "}
            </p>
          </div>
          <div className="border-2 border-[#0b2447] dark:border-blue-300 dark:border-opacity-25 backdrop-blur-md border-opacity-40 rounded-3xl lg:h-[170px]">
            {" "}
            <img
              className="mx-auto w-8 mt-3 lg:w-10 lg:mt-2"
              src="https://i.ibb.co/98kKtJ4/icons8-flexible-60.png"
              alt="icons8-faq-100"
              border="0"
            />
            <h1 className="font-sans uppercase text-center mt-1 theme-text font-semibold text-xs lg:text-base">
              Flexibility
            </h1>
            <p className="text-center text-black dark:text-white text-xs lg:text-base text-opacity-70 pb-3 lg:px-4 lg:pt-0 p-1">
              {" "}
              Experience adaptable learning schedules that cater to different
              time zones and personal commitments.{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col  lg:gap-y-2 gap-y-1">
          <div className="border-2 border-[#0b2447] dark:border-blue-300 dark:border-opacity-25 backdrop-blur-md border-opacity-40 rounded-3xl lg:h-[260px]">
            <img
              className="mx-auto w-16 mt-6"
              src="https://i.ibb.co/s3Dx5wJ/icons8-community-96.png"
              alt="icons8-community-96"
              border="0"
            />
            <h1 className="font-sans uppercase text-center mt-3 theme-text font-semibold text-[12px] lg:text-base mb-1">
              Community{" "}
            </h1>
            <p className="text-center text-black dark:text-white text-xs lg:text-base text-opacity-70 pb-3 lg:p-0 lg:px-4 p-1">
              {" "}
              Connect with fellow artists, share ideas, and build a supportive
              community for inspiration.{" "}
            </p>
          </div>
          <div className="border-2 border-[#0b2447] dark:border-blue-300 dark:border-opacity-25 backdrop-blur-md border-opacity-40 rounded-3xl lg:h-[240px]">
            <img
              className="mx-auto w-10 mt-4 lg:w-14 lg:mt-6"
              src="https://i.ibb.co/f0jTGjL/icons8-progress-96-1.png"
              alt="icons8-faq-100"
              border="0"
            />
            <h1 className="font-sans uppercase text-center mt-1 theme-text font-semibold text-xs lg:text-base">
              Progress Tracking
            </h1>
            <p className="text-center text-black dark:text-white text-xs lg:text-base text-opacity-70 pb-3 lg:px-4 lg:pt-0 p-1 mb-2">
              {" "}
              Set goals, track your progress, and take part in challenges or
              assignments that encourage practical application of learned skills{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatAre;

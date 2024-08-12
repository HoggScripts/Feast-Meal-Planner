const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/landingPage.jpeg')",
      }}
    >
      <style>
        {`
          @keyframes slideInLeft {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }

          .animate-slideInLeft {
            animation: slideInLeft 1s ease-out forwards;
            opacity: 0; /* Ensure element is initially hidden */
          }

          .delay-1s {
            animation-delay: 1.0s;
          }

          .delay-2s {
            animation-delay: 2.0s;
          }

          .delay-3s {
            animation-delay: 3.0s;
          }

          .move-up {
            position: relative;
            top: -100px; /* Move the element up by 15px */
          }
        `}
      </style>
      <div className="w-full p-6">
        <div className="grid grid-cols-2 gap-6 mx-auto">
          {/* Left Half with Three Vertical Sections */}
          <div className="flex flex-col space-y-6">
            <div className="animate-slideInLeft">
              <img src="land1.png" alt="welcome to feast" />
            </div>
            <div className="flex ml-10 align-top">
              <span className="text-5xl font-bold animate-slideInLeft delay-1s text-green-500 move-up mr-4">
                EAT.
              </span>
              <span className="text-5xl font-bold animate-slideInLeft delay-2s text-green-500 move-up mr-4">
                PLAN.
              </span>
              <span className="text-5xl font-bold animate-slideInLeft delay-3s text-green-500 move-up">
                REPEAT.
              </span>
            </div>
          </div>

          {/* Right Half (can be left empty or used for other content) */}
          <div>{/* Optional: Add content here or leave it empty */}</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

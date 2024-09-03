import React from "react";
import {
  FaUtensils,
  FaCamera,
  FaPenFancy,
  FaClock,
  FaListUl,
  FaSearch,
} from "react-icons/fa";
import VideoBlock from "../misc/VideoBlock";

const LandingPage = () => {
  return (
    <>
      {/* First Section - White Background */}
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/landingPage.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
            opacity: 0;
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
            top: -100px;
          }
        `}
        </style>
        <div className="w-full p-6  bg-opacity-100">
          <div className="grid grid-cols-2 gap-6 mx-auto">
            <div className="flex flex-col space-y-6">
              <div className="animate-slideInLeft">
                <img src="land1.png" alt="welcome to feast" />
              </div>
              <div className="flex ml-10 align-top">
                <span className="text-5xl font-bold animate-slideInLeft delay-1s text-blueprimary move-up mr-4">
                  EAT.
                </span>
                <span className="text-5xl font-bold animate-slideInLeft delay-2s text-blueprimary move-up mr-4">
                  PLAN.
                </span>
                <span className="text-5xl font-bold animate-slideInLeft delay-3s text-blueprimary move-up">
                  REPEAT.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Blue Primary Background */}
      <div className="bg-blueprimary py-16 text-white">
        <div className="grid grid-cols-2 gap-16 px-16">
          <div className="flex flex-col justify-center space-y-8">
            <h2 className="text-4xl font-extrabold">
              Build Your Perfect Recipe with Ease
            </h2>

            <ul className="list-none space-y-4">
              <li className="flex items-center">
                <FaUtensils className="text-2xl mr-3" />
                <span className="text-lg">
                  <strong>Choose a Meal Type:</strong> Start by selecting
                  whether your recipe is for breakfast, lunch, or dinner.
                </span>
              </li>
              <li className="flex items-center">
                <FaCamera className="text-2xl mr-3" />
                <span className="text-lg">
                  <strong>Upload a Picture:</strong> Decorate your recipe card
                  with a beautiful image that represents your dish.
                </span>
              </li>

              <li className="flex items-center">
                <FaClock className="text-2xl mr-3" />
                <span className="text-lg">
                  <strong>Add Cook Time & Servings:</strong> Specify the cook
                  time and number of servings to help you plan your meals.
                </span>
              </li>
              <li className="flex items-center">
                <FaListUl className="text-2xl mr-3" />
                <span className="text-lg">
                  <strong>Add Cooking Steps:</strong> Detail the steps involved
                  in preparing your dish, guiding others through the process.
                </span>
              </li>
              <li className="flex items-center">
                <FaSearch className="text-2xl mr-3" />
                <span className="text-lg">
                  <strong>Search Ingredients:</strong> Easily find and add
                  ingredients to your recipe, ensuring you have everything you
                  need.
                </span>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <VideoBlock
              className="border-2 border-slate-800 mt-4"
              videoSRC="/formVid.mp4"
            />
          </div>
        </div>
      </div>

      {/* Third Section - Blue Secondary Background */}
      <div className="bg-bluesecondary py-16 text-white">
        <div className="grid grid-cols-2 gap-16 px-16">
          <div className="flex items-center justify-center">
            <VideoBlock videoSRC="/showCard.mp4" />
          </div>
          <div className="flex flex-col justify-center space-y-8">
            <h2 className="text-4xl font-extrabold">
              Master Your Meal Planning with Feast
            </h2>
            <p className="text-lg">
              Feast offers you an effortless way to stay on top of your meal
              planning. With just a click, you can quickly view a brief overview
              of your recipe by selecting the green question mark. This gives
              you a handy snapshot of the essentials like cook time, calories,
              and cost.
            </p>
            <p className="text-lg">
              Want to dive deeper? Click on the book icon to access your full
              recipe card. Here, you’ll find detailed instructions, a complete
              list of ingredients, and a comprehensive nutritional breakdown.
              Perfect for when you need to ensure you're hitting all your
              dietary goals.
            </p>
          </div>
        </div>
      </div>

      {/* Final Section - Darker Blue Background */}
      <div className="bg-[#2B7A8E] py-16 text-white">
        <div className="grid grid-cols-2 gap-16 px-16">
          <div className="flex flex-col justify-center space-y-8">
            <h2 className="text-4xl font-extrabold">
              Seamless Scheduling & Planning
            </h2>
            <p className="text-lg">
              Take control of your week with Feast's drag-and-drop meal
              planning. You can filter recipes by spiciness, cost, protein, and
              more to find exactly what you need. Once you've curated your
              meals, simply drag and drop them into your weekly calendar.
            </p>
            <p className="text-lg">
              Want to make sure you stay on track? Upload your meal schedule
              directly to Google Calendar with just one click. Plus, you can
              easily email your shopping list, ensuring you have everything you
              need before heading to the store.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <VideoBlock videoSRC="/showFinalClick.mp4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

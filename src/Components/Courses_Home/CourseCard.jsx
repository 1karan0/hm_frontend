import React, { useContext, useRef, useState } from "react";
import "./Courses.css";
import { Link } from "react-router-dom";
import { ReactComponent as Clock } from "../../Assets/Icons/RCClock.svg";
import { ReactComponent as Design } from "../../Assets/Icons/design.svg";
import { cropString } from "../../helpers/helper_function";
import ReactPlayer from "react-player";
import { IoVolumeMediumOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { Globalinfo } from "../../App";
import { IoIosLock } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import abhishek from "../../Assets/Images/abhishek.jpeg";
import { IoTrendingUpSharp } from "react-icons/io5";

const CourseCard = ({
  title,
  slug,
  featured_video,
  price,
  name,
  email,
  experience,
  phone,
  duration,
  image,
  onClick,
  isSelected,
  category,
  description,
  ind,
  profile,
  _id,
  display,
  IsMinorDegreeCourse,
  credits,
  courseCategory,
}) => {
  console.log(courseCategory);
  const [mouseHovered, setMouseHovered] = useState(null);
  const [IsMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const { userDetail, getUserDetails } = useContext(Globalinfo);

  const toggleHover = (index) => {
    setMouseHovered(index);
  };

  const handleMute = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMuted((prev) => !prev);
  };

  // console.log(description);
  return (
    <a
      onMouseEnter={() => toggleHover(ind)}
      onMouseLeave={() => toggleHover(null)}
      href={`/detailcourse/${slug}`}
      className={`shadow-lg  max-w-sm font-pop rounded-2xl relative h-full 2xl:h-[450px] coursecardhome  bg-white px-3 py-3 xsm:rounded-md xsm:p-1 md:p-[6px] md:w-[95%] xsm:w-[100%] md:rounded-xl  ${
        isSelected ? "border-2 border-blue-500" : ""
      }`}
      style={{
        pointerEvents:
          userDetail?.blocked_courses?.includes(_id) || !display
            ? "none"
            : "auto",
      }}
    >
      {mouseHovered === ind && (
        <span className="bg-transparent p-4 absolute top-2 left-2 z-[9999]">
          {IsMuted ? (
            <IoVolumeMuteOutline
              size={"20"}
              style={{
                cursor: "pointer",
                color: "black",

                zIndex: "999999",
              }}
              onClick={handleMute}
            />
          ) : (
            <IoVolumeMediumOutline
              size={"20"}
              style={{
                cursor: "pointer",
                color: "black",

                zIndex: "999999",
              }}
              onClick={handleMute}
            />
          )}
        </span>
      )}
      {/* {courseCategory === "liveCourse" && (
        <div className="bg-transparent p-4 absolute top-2 right-2 z-[99]">
          <img
            src="/liveclass.png"
            alt="live class logo "
            className="h-[30px] w-auto"
          />
        </div>
      )} */}
      <div className="h-fit aspect-[16/9] ">
        {mouseHovered === ind ? (
          <ReactPlayer
            className=" rounded-xl xsm:rounded-md border overflow-hidden"
            height={"100%"}
            width={"100%"}
            url={featured_video}
            controls={false}
            playing={true}
            ref={videoRef}
            muted={IsMuted}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload", // Disable download option
                },
              },
            }}
          />
        ) : (
          <img
            // style={{ height: "10rem" }}
            className="w-full rounded-lg h-full "
            src={image}
            alt="Course"
          />
        )}
      </div>
      <div className="flex flex-col gap-6 justify-between h-[47%] xsm:h-[37%] xsm:gap-1 md:gap-0 md:mt-0 xsm:mt-0">
        <div className="flex flex-col justify-between gap-1 mt-2 xsm:mt-1 xsm:gap-0 md:gap-0">
          <div className="flex justify-between items-center min-h-[30%] md:min-h-0">
            <div className="flex items-center space-x-3 max-w-[80%] xsm:max-w-[70%] xsm:space-x-1 md:space-x-2 md:max-w-[70%]">
              {/* <FaUserCircle  className="text-2xl  xsm:w-[14px] xsm:h-[14px] md:h-4 md:w-4 rounded-full"/> */}
              <img
                className="w-[32px] h-[32px] xsm:w-[14px] xsm:h-[14px] md:h-4 md:w-4 rounded-full"
                src={profile}
              />
              <p className="font-pop font-medium text-[13px] flex-wrap xsm:text-[6px] md:text-[7px]">
                {name}
              </p>
            </div>
            <div>
              <p className="font-pop font-bold text-[#1DBF73] text-[16px] xsm:text-[6px] md:text-[10px]">
                ₹ {price}
              </p>
            </div>
          </div>
          <p className="font-pop h-10 font-semibold text-[16px] text-[#252641] xsm:text-[7px] md:text-[10px] md:h-6 xsm:mt-1 xsm:h-6">
            {title.length > 40
              ? title.slice(
                  0,
                  window.innerWidth >= 320 && window.innerWidth <= 480 ? 20 : 40
                ) + "..."
              : title}
          </p>
          {description && (
            <p className="font-pop mt-2 text-[14px] h-12 text-[#555555] xsm:hidden md:text-[8px] md:h-10">
              {description?.slice(0, 70)}..
            </p>
          )}
        </div>
        <div className=" flex items-end justify-between 2xl:pb-2">
          <span className="flex flex-col">
            {credits ? (
              <div className="flex space-x-2 items-center xsm:space-x-1">
                {/* <img
                  className="w-[16px] h-[16px] xsm:w-[8px] xsm:h-[8px] md:h-3 md:w-3"
                  src="../Icons/RCDesign.svg"
                /> */}
                <IoTrendingUpSharp className="w-[16px] h-[16px] text-[#DFDFDF] xsm:w-[8px] xsm:h-[8px] md:h-3 md:w-3" />
                <p className="font-pop text-[12px] font-medium text-[#555555] xsm:text-[5px] md:text-[6px]">
                  Credits- {credits}
                </p>
              </div>
            ) : (
              <></>
            )}
            <div className="flex space-x-2 items-center xsm:space-x-1">
              <img
                className="w-[16px] h-[16px] xsm:w-[8px] xsm:h-[8px] md:h-3 md:w-3"
                src="../Icons/RCDesign.svg"
              />
              <p className="font-pop text-[12px] font-medium text-[#555555] xsm:text-[5px] md:text-[6px]">
                {category}
              </p>
            </div>
          </span>
          <span className="flex flex-col">
            <div className="flex space-x-2 items-center xsm:space-x-0">
              <img
                className="w-[16px] h-[16px] text-[#555555] xsm:w-[8px] xsm:h-[8px] md:h-2 md:w-2"
                src="../Icons/RCClock.svg"
              />
              <p className="font-pop text-[12px] font-medium text-[#555555] xsm:text-[5px] md:text-[6px]">
                45 Hours
              </p>
            </div>
          </span>
        </div>
      </div>
    </a>
  );
};

export default CourseCard;

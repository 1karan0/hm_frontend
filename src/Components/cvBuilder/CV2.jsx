import ReactMarkdown from "react-markdown";
import { HiOutlineMail, HiOutlineLink, HiExternalLink } from "react-icons/hi";
import {
  AiFillGithub,
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";
import { TbBrandTwitter } from "react-icons/tb";
import { useContext } from "react";
import { CvContext } from "./hooks/CvContext";
import { websiteLinkCreator, resolvedWebsiteLink } from "./utils/link.utils";
const CV2 = () => {
  const items = "flex items-center mr-3 mt-[5px] ";
  const itemsSVG = "h-3 w-3 text-gray-700 mr-1";
  const titles = "text-sm font-medium uppercase text-[0.7rem]";
  const paragraphSize = "text-[0.650rem] mt-[3px] text-gray-700 ";
  const jobSize = "text-[0.68rem] text-gray-500 ";

  const cv = useContext(CvContext);

  return (
    <div className="w-full h-full flex" id="cv">
      <div className="relative  pr-3 flex flex-col mr-2 h-full w-[32%]">
        <div className=" " />
        {[cv.cv].map((item, index) => {
          return (
            <div key={index}>
              <div className="space-y-1">
                <h1 className="text-3xl font-semibold w-10/12">{item.name}</h1>
                <h4 className=" text-gray-400 text-[0.68rem] font-medium">
                  {item.jobTitle}
                </h4>
                <h4 className=" text-gray-400 text-[0.68rem] font-medium">
                  {item.location}
                </h4>
              </div>
              {/* SOCIAL */}
              <section id="social" className="mt-3">
                <div className="flex flex-col flex-wrap text-[0.62rem] items-left align-middle">
                  {item.email && item.displayMail ? (
                    <div className={items}>
                      <HiOutlineMail className={itemsSVG} />
                      <a
                        href={`mailto:${item.email}`}
                        className="z-10 bg-white"
                      >
                        {item.email}
                      </a>
                    </div>
                  ) : null}
                  {item.website && item.displayWebSite ? (
                    <div className={items}>
                      <HiOutlineLink className={itemsSVG} />
                      <a
                        href={websiteLinkCreator(item.website)}
                        target="_blank"
                        rel="noreferrer"
                        className="z-10 bg-white"
                      >
                        {resolvedWebsiteLink(websiteLinkCreator(item.website))}
                      </a>
                    </div>
                  ) : null}
                  {item.github && item.displayGithub ? (
                    <div className={items}>
                      <AiFillGithub className={itemsSVG} />

                      <a
                        href={`https://github.com/${item.github}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.github}
                      </a>
                    </div>
                  ) : null}
                  {item.twitter && item.displayTwitter ? (
                    <div className={items}>
                      <TbBrandTwitter className={itemsSVG} />
                      <a
                        href={`https://twitter.com/${item.twitter}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.twitter}
                      </a>
                    </div>
                  ) : null}
                  {item.linkedIn && item.displayLinkedIn ? (
                    <div className={items}>
                      <AiOutlineLinkedin className={itemsSVG} />
                      <a
                        href={`https://www.linkedin.com/in/${item.linkedIn}/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.linkedIn}
                      </a>
                    </div>
                  ) : null}
                  {item.instagram && item.displayInstagram ? (
                    <div className={items}>
                      <AiOutlineInstagram className={itemsSVG} />
                      <a
                        href={`https://www.instagram.com/${item.instagram}/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.instagram}
                      </a>
                    </div>
                  ) : null}
                  {item.facebook && item.displayFacebook ? (
                    <div className={items}>
                      <AiOutlineFacebook className={itemsSVG} />
                      <a
                        href={`https://www.facebook.com/${item.facebook}/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.facebook}
                      </a>
                    </div>
                  ) : null}
                </div>
              </section>
              {/* SOCIAL END */}
              {/* SKILLS START */}
              <section id="skills_and_projects" className="flex mt-2">
                <section id="skills" className="">
                  <div className="mt-1">
                    <h4 className="text-[0.7rem] ">{item.skillTitle1}</h4>
                    <p className={paragraphSize}>
                      {item.toolsAndTechSkills.join(", ")}
                    </p>
                  </div>

                  <div className="mt-2">
                    <h4 className="text-[0.7rem]">{item.skillTitle2}</h4>
                    <p className={paragraphSize}>
                      {item.industryKnowledge.join(", ")}
                    </p>
                  </div>

                  <div className="mt-2">
                    <h4 className="text-[0.7rem]">{item.skillTitle3}</h4>
                    <p className={paragraphSize}>{item.languages.join(", ")}</p>
                  </div>
                </section>
              </section>
              {/* SKILLS END */}
              {/* EDUCATION */}
              <section id="education" className="mt-3">
                <h4 className="text-[0.8rem] mb-1">Education</h4>

                {item.education.map((item, index) => {
                  return (
                    <div key={index}>
                      <h4 className="text-[0.7rem] mt-1 font-medium">
                        {item.title}
                      </h4>
                      <p className="text-[0.62rem] mt-1 text-gray-600">
                        {item.school}
                      </p>
                      <p className="text-[0.62rem] text-gray-500">
                        {item.startDate} - {item.endDate}
                      </p>
                    </div>
                  );
                })}

                <p className={paragraphSize}>{}</p>
              </section>
            </div>
          );
        })}
      </div>
      <div className="relative flex-1 h-full pl-6 ml-2">
        <div className="" />
        {[cv.cv].map((item, index) => {
          return (
            <div key={index}>
              {item.about ? (
                <section id="about">
                  <div className="relative">
                    {item.displayImage ? (
                      <div className="mr-2 flex float-left">
                        <img
                          src={item.image || "/login_bg.png"}
                          className="rounded-md"
                          style={{ height: "60px", width: "60px" }}
                          alt="profilePicture"
                          // objectFit="cover"
                        />
                      </div>
                    ) : null}
                    <article>
                      <h1 className="inline">About Me</h1>
                      <ReactMarkdown className="text-[0.690rem] mt-1 text-gray-700">
                        {item.about}
                      </ReactMarkdown>
                    </article>
                  </div>
                </section>
              ) : null}

              <section className="mt-3 relative">
                <h3 className={titles}>Experience</h3>
                <div className="absolute -left-[29px] top-[7px]">
                  <div className=" absolute rounded-sm rotate-45 h-2 w-2 ring-4 ring-white bg-black " />
                  <div className="absolute rounded-sm rotate-0 h-2 w-2  bg-black " />
                </div>

                {item.experiences.map((experience, index) => {
                  return (
                    <div className="relative " key={index}>
                      <div className="absolute ring-4 ring-white -left-[24px]  h-[93%] top-1 rounded-md px-[1px] bg-black " />
                      <div className="flex mt-2 flex-col  justify-between">
                        <h4 className="font-medium  text-sm">
                          {experience.title}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <p className={jobSize}>{experience.company}</p>{" "}
                          <span className={jobSize}>|</span>
                          <span className="flex items-center space-x-1">
                            <p className={jobSize}>{experience.startDate}</p>
                            {experience.endDate ? (
                              <span className={jobSize}> - </span>
                            ) : null}

                            <p className={jobSize}>{experience.endDate}</p>
                          </span>
                        </div>
                      </div>
                      <ReactMarkdown className="myList text-[0.65rem] mb-2 mt-2 text-gray-700">
                        {experience.summary}
                      </ReactMarkdown>
                    </div>
                  );
                })}
              </section>

              <section id="projects" className="relative">
                <h3 className={titles}>Projects</h3>
                <div className="absolute -left-[29px] top-[7px]">
                  <div className=" absolute rounded-sm rotate-45 h-3 w-3 ring-4 ring-white bg-black " />
                  <div className="absolute rounded-sm rotate-0 h-3 w-3  bg-black " />
                </div>
                {item.projects.map((project, index) => {
                  return (
                    <div key={index} className="mt-2 relative">
                      <div className="absolute border ring-4 ring-white border-black  -left-[25px]  h-[50px] top-1 rounded-md px-[1px] bg-white " />
                      <h4 className="font-medium text-md">
                        <a href={project.link} target="_blank" rel="noreferrer">
                          {project.title}
                          {project.link ? (
                            <HiExternalLink className="ml-1 inline" />
                          ) : null}
                        </a>
                      </h4>
                      <p className={paragraphSize}>{project.summary}</p>
                    </div>
                  );
                })}
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CV2;

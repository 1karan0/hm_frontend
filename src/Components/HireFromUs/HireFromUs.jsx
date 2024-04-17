import React, { useState } from "react";
import Resume2 from "./Resume2";
import Companies2 from "../Companies/Companies2";
import "./hirefromus.css";
import WhyHM from "./WhyHM";
import {ReactComponent as Ok} from '../../Assets/Icons/ok.svg'
import HireTestimonial from "./HireTestimonial";
import NewHireTestimonial from "./newhiretestimonials";
import { RiWhatsappFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../../Api/api";
const HireFromUs = () => {
  const [hiredata, sethiredata] = useState({
    name:"",
    email:"",
    phone:"",
    company:""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    sethiredata({
        ...hiredata,
        [name]: value,
        
    });
};
async function handleRegister(){
  if(!hiredata.name || !hiredata.email || !hiredata.company|| !hiredata.phone ){
      toast.error('Every input must be filled')
      return;
  }
  else{
      try {
          let url=BASE_URL+'/addhirefromusform'
          const data=await fetch(url,{
              method:'POST',
              headers: {
                  'Accept': 'application.json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(hiredata),
          })
          const response=await data.json()
          if(response.success){
              toast.success(response.message)
              // sethiredata({
              //     "name": "",
              //     "email": "",
              //     "phone": "",
              //     "degree": ""
              // })
          }
          else{
toast.error(response.message)
          }
      } catch (error) {
          console.log(error);
      }
  }
}
  return (
    <>
      <Toaster position="top-right" />
      <div className=" px-[5%] pt-[4%]  bg-gradient-to-r from-[#0F2027] to-[#203A43] wavebg"  style={{ width: "100%" }}>
        {/* Mainsection */}
        <div className=" flex justify-between pb-[18%] xsm:flex-col xsm:gap-6 xsm:pb-[35%] ">
          <div className="flex flex-col gap-16 w-[70%] md:gap-10 xsm:w-full xsm:gap-6 md:w-[65%]">
            <div>
              <p className="font-pop font-semibold text-[50px] text-white md:text-[32px] xsm:text-[24px]">
                Hire Tech Talent That Delivers{" "}
                <span className="text-[#1DBF73]">Quick.simple.</span>
              </p>
            </div>


            <div className="flex flex-col gap-y-7 md:gap-y-5 xsm:gap-y-3">
              <div className="flex items-center gap-x-4 xsm:gap-x-2">
                <Ok className="md:w-6 md:h-6 xsm:w-5 xsm:h-5"/>
                <div className="text-[#FFFFFF] font-semibold text-lg md:text-[14px] xsm:text-[10px]">Hire from our Pan-India Talent pool, across 100+ colleges</div>
              </div>
              <div className="flex items-center gap-x-4 xsm:gap-x-2">
                <Ok className="md:w-6 md:h-6 xsm:w-5 xsm:h-5"/>
                <div className="text-[#FFFFFF] font-semibold text-lg md:text-[14px] xsm:text-[10px]">Pre-Trained Developers available across 10 profiles</div>
              </div>
              <div className="flex items-center gap-x-4 xsm:gap-x-2">
                <Ok className="md:w-6 md:h-6 xsm:w-5 xsm:h-5"/>
                <div className="text-[#FFFFFF] font-semibold text-lg md:text-[14px] xsm:text-[10px]">Experience ranging from 0 to 3 years</div>
              </div>
              <div className="flex items-center gap-x-4 xsm:gap-x-2">
                <Ok className="md:w-6 md:h-6 xsm:w-5 xsm:h-5"/>
                <div className="text-[#FFFFFF] font-semibold text-lg md:text-[14px] xsm:text-[10px]">Available for Full-Time as well as for Internships</div>
              </div>
              <div className="flex items-center gap-x-4 xsm:gap-x-2">
                <Ok className="md:w-6 md:h-6 xsm:w-5 xsm:h-5"/>
                <div className="text-[#FFFFFF] font-semibold text-lg md:text-[14px] xsm:text-[10px]">Solve your long-term Entry-Level Tech recruitment needs</div>
              </div>
            </div>

            {/* set the color of the border in gradient */}

            {/* <div className="grid grid-cols-2 gap-16 text-white w-[90%] md:gap-6 xsm:w-full xsm:gap-2">
              <div className="bg-[#00000033] flex flex-col gap-6 rounded-xl pb-4 bw-border md:gap-4 xsm:gap-3">
                <div className="border-b-2 w-full flex justify-center items-center py-3 xsm:py-2">
                  <p className="font-pop font-semibold text-[20px] md:text-[14px] xsm:text-[9px]">
                    Roles You Can Hire From
                  </p>
                </div>

                <div className="flex flex-col gap-6 rounded-b-xl px-4 md:gap-3 md:px-2 xsm:gap-3">
                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#1DBF73] rounded-lg text-white font-int font-semibold text-[20px] text-center px-3 py-1 md:text-[14px] md:px-2 xsm:text-[9px] xsm:px-2 xsm:rounded-md">
                      1.
                    </div>
                    <p className="text-[20px] font-semibold font-int md:text-[14px] xsm:text-[9px]">
                      Full Stack Developer
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#1DBF73] rounded-lg text-white font-int font-semibold text-[20px] text-center px-3 py-1 md:text-[14px] md:px-2 xsm:text-[9px] xsm:px-2 xsm:rounded-md">
                      2.
                    </div>
                    <p className="text-[20px] font-semibold font-int md:text-[14px] xsm:text-[9px]">
                    Backend Developer
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#1DBF73] rounded-lg text-white font-int font-semibold text-[20px] text-center px-3 py-1 md:text-[14px] md:px-2 xsm:text-[9px] xsm:px-2 xsm:rounded-md">
                      3.
                    </div>
                    <p className="text-[20px] font-semibold font-int md:text-[14px] xsm:text-[9px]">
                    Frontend Developer
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#1DBF73] rounded-lg text-white font-int font-semibold text-[20px] text-center px-3 py-1 md:text-[14px] md:px-2 xsm:text-[9px] xsm:px-2 xsm:rounded-md">
                      4.
                    </div>
                    <p className="text-[20px] font-semibold font-int md:text-[14px] xsm:text-[9px]">
                    Data Analyst
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#1DBF73] rounded-lg text-white font-int font-semibold text-[20px] text-center px-3 py-1 md:text-[14px] md:px-2 xsm:text-[9px] xsm:px-2 xsm:rounded-md">
                      5.
                    </div>
                    <p className="text-[20px] font-semibold font-int md:text-[14px] xsm:text-[9px]">
                    Software Development Engineer In Test ( SDET)
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#00000033] flex flex-col gap-6 rounded-xl pb-4 bw-border md:gap-4 xsm:gap-3">
                <div className="border-b-2 w-full flex justify-center items-center py-3 xsm:py-2">
                  <p className="font-pop font-semibold text-[20px] md:text-[14px] xsm:text-[9px]">
                  Our Offerings
                  </p>
                </div>

                <div className="flex flex-col gap-6 rounded-b-xl px-4 md:gap-3 md:px-2 xsm:gap-3">
                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#1DBF73] rounded-lg text-white font-int font-semibold text-[20px] text-center px-3 py-1 md:text-[14px] md:px-2 xsm:text-[9px] xsm:px-2 xsm:rounded-md">
                      1.
                    </div>
                    <p className="text-[20px] font-semibold font-int md:text-[14px] xsm:text-[9px]">
                    Immediate Joining
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#1DBF73] rounded-lg text-white font-int font-semibold text-[20px] text-center px-3 py-1 md:text-[14px] md:px-2 xsm:text-[9px] xsm:px-2 xsm:rounded-md">
                      2.
                    </div>
                    <p className="text-[20px] font-semibold font-int md:text-[14px] xsm:text-[9px]">
                    Zero Offer Dropouts
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#1DBF73] rounded-lg text-white font-int font-semibold text-[20px] text-center px-3 py-1 md:text-[14px] md:px-2 xsm:text-[9px] xsm:px-2 xsm:rounded-md">
                      3.
                    </div>
                    <p className="text-[20px] font-semibold font-int md:text-[14px] xsm:text-[9px]">
                    Complete Hiring In 1 day
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#1DBF73] rounded-lg text-white font-int font-semibold text-[20px] text-center px-3 py-1 md:text-[14px] md:px-2 xsm:text-[9px] xsm:px-2 xsm:rounded-md">
                      4.
                    </div>
                    <p className="text-[20px] font-semibold font-int md:text-[14px] xsm:text-[9px]">
                    PAN India Availabilitiy
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#1DBF73] rounded-lg text-white font-int font-semibold text-[20px] text-center px-3 py-1 md:text-[14px] md:px-2 xsm:text-[9px] xsm:px-2 xsm:rounded-md">
                      5.
                    </div>
                    <p className="text-[20px] font-semibold font-int md:text-[14px] xsm:text-[9px]">
                    Continuous hiring pipeline
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="w-[30%] self-end xsm:w-full">
            <div className="bg-[#00000033]   rounded-xl py-6 text-white flex flex-col gap-6 bw-border md:gap-4 md:py-3 xsm:gap-4">
              <div className="flex justify-center text-center">
                <p className="font-pop font-semibold text-[20px] md:text-[14px] xsm:text-[16px]">Share Your Hiring Requirements</p>
              </div>
              <div className="flex flex-col gap-2 px-6">
                <div className="flex flex-col gap-1">
                  <label className="text-[16px] font-medium md:text-[12px] xsm:text-[14px]" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="bg-[#00000033] border-[1px] border-[#808080] rounded-md px-3 py-[6px] text-[#808080] text-[16px] md:text-[12px] xsm:text-[14px]"
                    onChange={handleChange}
                    value={hiredata.name}
                    type="text"
                    placeholder="Enter Your name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[16px] font-medium md:text-[12px] xsm:text-[14px]" htmlFor="pass">
                  Company
                  </label>
                  <input
                    id="pass"
                    name="company"
                    onChange={handleChange}
                    value={hiredata.company}
                    className="bg-[#00000033] border-[1px] border-[#808080] rounded-md px-3 py-[6px] text-[#808080] text-[16px] md:text-[12px] xsm:text-[14px]"
                    type="text"
                    placeholder="Enter Your Company"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[16px] font-medium md:text-[12px] xsm:text-[14px]" htmlFor="study">
                  Work E-mail
                  </label>
                  <input
                  onChange={handleChange}
                  value={hiredata.email}
                  name="email"
                    id="study"
                    className="bg-[#00000033] border-[1px] border-[#808080] rounded-md px-3 py-[6px] text-[#808080] text-[16px] md:text-[12px] xsm:text-[14px]"
                    type="text"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[16px] font-medium md:text-[12px] xsm:text-[14px]" htmlFor="time">
                  Phone number
                  </label>
                  <input
                   onChange={handleChange}
                   value={hiredata.phone}
                    id="time"
                    name="phone"
                    className="bg-[#00000033] border-[1px] border-[#808080] rounded-md px-3 py-[6px] text-[#808080] text-[16px] md:text-[12px] xsm:text-[14px]"
                    type="text"
                    placeholder="Enter Your Mobile number"
                  />
                </div>
              </div>
              <div className="px-6">
                <button onClick={handleRegister} className="bg-[#1DBF73] border-[1px] border-[#808080] rounded-md py-1 font-int font-medium w-full md:text-[14px] xsm:text-[14px]">
                Submit
                </button>
              </div>
              <div className="flex justify-center px-6">
                <Link target="_blank" to='https://wa.me/qr/S3LVDB3Y3SB3H1' className="font-int font-medium text-[40px] md:text-[30px]">
                <RiWhatsappFill className="md:w-6 md:h-6"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Companies2 />
      <Resume2 />
      <WhyHM />
      <div  className='px-[5%] bg-gradient-to-l from-[#0F2027] via-[#0B1418] to-[#203A43]'>
      <NewHireTestimonial/>
      </div>
    </>
  );
};

export default HireFromUs;

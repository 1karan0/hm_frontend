import { useState } from "react";
import Img1 from "../../Assets/Images/papheaderbg.png";

export default function Pap(){

    const [clicked, setclicked] = useState(false);

    // function ClickSection(id) {
    //     if (!clicked) {
    //       setclicked(true);
    //       let droptext = document.getElementById(id);
    //       let droptop = document.getElementById(id+'ind');
    //       console.log(droptop);
    //       console.log(droptext);
    //       droptext.style.display = "none";
    //       droptop.style= "border-bottom: 2px solid #696984;";
    //     } else {
    //       setclicked(false);
    //       let droptext = document.getElementById(id);
    //       let droptop = document.getElementById(id+'ind');
    //       droptext.style.display = "block";
    //       droptop.style= "border-bottom: none;";
    //     }
    //   }

    function ClickSection(id) {
        const toggleContent = document.getElementById(id+'content');
      
        if (!clicked) {
          setclicked(true);
          toggleContent.style.display = "block";
        } else {
          setclicked(false);
          toggleContent.style.display = "none";
        }
      }

    return (
        <div >
            {/* Header */}
            <div 
                className="h-[210px] flex flex-col justify-center" 
                style={{ 
                    backgroundImage: `url(${Img1})`,
                    backgroundSize:'cover'
                } }
            >
                <div className="font-pop font-semibold text-white text-[44px] pl-20 ">Pay After Placement</div>
            </div>
            {/* Main */}
            <div className="px-[8%] my-6">
                <div>
                    <p className="font-pop font-semibold text-[32px]">How this works ? </p>
                </div>
                {/* Agreement */}
                <div className="flex justify-between">
                    <div className="w-[55%] mt-10 flex flex-col gap-4">
                        <div>
                            <p className="font-pop font-semibold text-[26px] text-[#2D3436]">Pay After Placement Agreement</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-[7%]">
                                <img src="../Icons/handwithmoney.svg"/>
                            </div>
                            <div className="w-[90%]">
                                <div>
                                    <p className="font-nu font-semibold text-[22px]">Minimum CTC</p>
                                    <p className="font-nu font-medium text-[16px]">If your salary is above the CTC of ₹3,50,000/-, the PAP monthly payments come into effect.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-[7%]">
                                <img src="../Icons/greencalender.svg"/>
                            </div>
                            <div className="w-[90%]">
                                <div>
                                    <p className="font-nu font-semibold text-[22px]">1 Year</p>
                                    <p className="font-nu font-medium text-[16px]">If you don’t get a job offer within 1 year of course  you pay nothing for your learning at  Hoping Minds.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-[7%]">
                                <img src="../Icons/electricbolt.svg"/>
                            </div>
                            <div className="w-[90%]">
                                <div>
                                    <p className="font-nu font-semibold text-[22px]">Enforcement</p>
                                    <p className="font-nu font-medium text-[16px]">In the event you are not working or if your income drops below the CTC mentioned in the Pay After Placement Agreement the monthly payments pause.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[40%] relative">
                        <div className="absolute left-[37%] top-[8%] z-10">
                            <img className="w-[310px] h-[180px]" src="../img/papagreeimg1.png"/>
                        </div> 
                        <div className="absolute top-[60%] z-10">
                            <img className="w-[310px] h-[180px]" src="../img/papagreeimg2.png"/>
                        </div>
                        <div className="bg-[#E2FFF1] rounded-xl w-[70%] h-[80%] absolute left-[25%] top-[20%]"></div>
                    </div>
                </div>
                {/* course fee */}
                <div className="flex my-24 justify-between">
                    <div className="w-[40%] relative mt-12">
                        <div className="bg-[#E2FFF1] rounded-xl w-[75%] h-full absolute top-[-12%] left-[10%] z-[-2]"></div>
                        <div className="z-10 h-full">
                            <img className="w-[75%] h-full" src="../img/papcoursefeeimg1.png"/>
                        </div>
                    </div>
                    <div className="w-[55%] flex flex-col gap-6">
                        <div>
                            <p className="font-pop font-semibold text-[28px] text-[#2D3436]">Course Fee</p>
                        </div>
                        <div className=" flex flex-col gap-6">
                            <p className="font-nu text-[17px]">These only take effect once you start earning above the PAP threshold amount for your course.</p>
                            <div className="flex flex-col gap-6 ml-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-4 h-4 rounded-full bg-[#1DBF73]"></div>
                                    <p className="font-nu text-[17px]">Your Salary range   :  &gt; 5Lpa</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-4 h-4 rounded-full bg-[#1DBF73]"></div>
                                    <p className="font-nu text-[17px]">Monthly Payable   :  ₹ 6,944</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-4 h-4 rounded-full bg-[#1DBF73]"></div>
                                    <p className="font-nu text-[17px]">Tenure   :  ₹ 6,944</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-4 h-4 rounded-full bg-[#1DBF73]"></div>
                                    <p className="font-nu text-[17px]">Total Payable Fee   :  ₹2,50,00</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="font-nu text-[17px]">CTC (Cost to Company) is defined as the total gross income earned, including but not pmited, to variable pay, compensations and ESOPs. Find out more in the FAQ section.</p>
                        </div>
                    </div>
                </div>
                {/* Dropout clauses */}
                <div className="flex  justify-between my-36">
                    <div className="w-[65%]  flex flex-col gap-6">
                        <div>
                            <p className="font-pop font-semibold text-[24px] text-[#2D3436]">Dropout Clauses</p>
                        </div>
                        <div>
                            <p className="font-nu text-[17px]">If you realise that Masai is not for you, you may withdraw from our courses at anytime. Here is how the fee works in case you drop-out</p>
                        </div>
                        <div className="flex flex-col gap-4 ml-6">
                            <div className="flex items-center gap-4">
                                <div className="w-4 h-4 rounded-full bg-[#1DBF73]"></div>
                                <p className="font-nu text-[17px]">Week 1-5 :  No Payment</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-4 h-4 rounded-full bg-[#1DBF73]"></div>
                                <p className="font-nu text-[17px]">Week 6-20  :  50000</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-4 h-4 rounded-full bg-[#1DBF73]"></div>
                                <p className="font-nu text-[17px]">Week 21 - 30/35  :  100% PAP Amount</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-nu text-[17px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                        </div>
                    </div>
                    <div className="w-[30%] relative">
                            <div className="absolute  z-10 translate-x-32">
                                <img className="rounded-xl w-[85%] h-full" src="../img/papclausesimg1.png" alt="image"/>
                            </div>
                            <div className="absolute top-[64%] z-10  translate-x-[-15%]">
                                <img className="rounded-xl w-[85%] h-full z-10" src="../img/papclausesimg1.png" alt="image"/>
                            </div>
                            <div className="bg-gradient-to-outside w-[70%] h-[70%] absolute top-[30%] left-[18%] opacity-55"></div>
                    </div>
                </div>
                {/* Agreement */}
                <div className="my-12">
                    <div className="bg-black rounded-xl px-24 py-14 text-white w-full flex flex-col items-center gap-6">
                        <div>
                            <p className="font-pop font-semibold text-[34px]">Pay After Placement(PAP) Agreement</p>
                        </div>
                        <div>
                            <p className="font-nu text-[16px] leading-8">PAP Agreement is a legal contract that makes education at Masai outcome-based. It is not an education loan, as you do not have to pay any interest & you do not require any collaterals. If you do not get placed within 1 year of course completion, your learning with Masai is completely free.</p>
                        </div>
                    </div>
                </div>
                {/* FAQ */}
                <div className="my-12 flex flex-col items-center">
                    <div>
                        <p className="font-pop font-semibold text-[26px] text-[#2D3436]">Frequently Asked Questions</p>
                    </div>
                    <div className=" w-full">
                        <div className="faq1 w-full">
                            <div className=" w-full">
                                <div 
                                    onClick={() => ClickSection(1)}
                                    id={1+'ind'}
                                    className="drop-top flex justify-between items-center w-full py-4 cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-[#1DBF73]"></div>
                                        <p>Lorem ipsum dolor sit amet</p>
                                    </div>
                                    <div>
                                        <img src="../Icons/papdropdown.svg" alt="" />
                                    </div>
                                </div>
                                <div className="px-6 py-4 hidden" id={1+'content'}>
                                    <p className="font-nu text-[#696984] text-[11px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                                </div>
                            </div>
                            <hr className="border-[1px]"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
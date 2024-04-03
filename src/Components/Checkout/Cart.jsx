import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Cart.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as Clock } from "../../Assets/Icons/clock.svg";
import { ReactComponent as Design } from "../../Assets/Icons/design.svg";
import { ReactComponent as Star } from "../../Assets/Icons/Star.svg";
import { BASE_URL } from "../../Api/api";
import { jwtDecode } from "jwt-decode";
import {
  CountrySelector,
  StateSelector,
  CitySelector,
} from "volkeno-react-country-state-city";
import "volkeno-react-country-state-city/dist/index.css";
import toast, { Toaster } from "react-hot-toast";
import { authenticateUser } from "../../helpers/helperapi";
import { useContext } from "react";
import { Globalinfo } from "../../App";

const CartCheckout = () => {
  const [country, setcountry] = useState("");
  const [state, setstate] = useState("");
  const { userDetail } = useContext(Globalinfo);
  const [query, setquery] = useSearchParams();
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [zip, setzip] = useState("");
  const [gstnumber, setgstnumber] = useState("");
  const [Payment, setPayment] = useState();
  const [courseId, setcourseId] = useState();
  const [Data, setData] = useState([]);
  const [total, settotal] = useState(0);

  const checkUserValidation = async () => {
    const isValidUser = await authenticateUser();
    console.log(isValidUser);
    if (isValidUser !== 200) {
      localStorage.removeItem("COURSES_USER_TOKEN");
      navigate("/login");
      toast.error("You have been Logged Out");
    }
  };

  useLayoutEffect(() => {
    checkUserValidation();
  }, []);

  let login = localStorage.getItem("COURSES_USER_TOKEN");
  let temp = [];
  function Total(data) {
    let price = 0;
    data.map((item) => {
      price += item.course.base_price;
    });
    settotal(price);
  }

  useEffect(() => {
    async function Fetchdata() {
      //   console.log(query.get('slug'));
      if (login) {
        let slug = query.get("slug");
        let token = jwtDecode(login);
        if (slug) {
          let url = BASE_URL + "/course/" + slug;
          //   console.log(url);
          const data = await fetch(url);
          const response = await data.json();
          // setData(response?.cart)
          // Total(response?.cart)
          // console.log(Array(response?.course));
          setData(Array(response));
          // setcourseId([...courseId],response?.course?._id)

          // setcourseId(temp)
          Total(Array(response));
        } else {
          let url = BASE_URL + "/getcart?email=" + token.email;

          const data = await fetch(url);
          const response = await data.json();
          setData(response?.cart);
          Total(response?.cart);
          //   console.log(response);
        }
      }
    }
    Fetchdata();
  }, []);
  const handleCountryChange = (e) => {
    setcountry(e);
  };

  const handleStateChange = (e) => {
    setstate(e);
  };

  // Navigate page
  const navigate = useNavigate();

  const handleContinueCheckout = async () => {
    // if (!Payment) {
    //   toast.error("Select payment method");
    // } else if (!country) {
    //   toast.error("Select country");
    // } else if (!state) {
    //   toast.error("Select state");
    // } else {
    try {
      let url = BASE_URL + "/purchasecourse";
      let url1 = BASE_URL + "/deletecart";
      let orderDetails = {
        name: userDetail.name,
        zip,
        gstnumber,
        country: country.capital,
        state: state.label,
        address,
      };
      // console.log(userDetail);
      // console.log(orderDetails);

      // console.log(courseId);
      setcourseId(temp);
      // console.log(temp);
      let data = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + login,
        },
        body: JSON.stringify({ courses: temp, orderDetails: orderDetails }),
      });
      let response = await data.json();
      // console.log(response);
      if (response.success) {
        let data1 = await fetch(url1, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + login,
          },
          body: JSON.stringify({ email: userDetail.email }),
        });
        let response1 = await data1.json();
        if (response1.success) {
          toast.success(response.message);
          setTimeout(() => {
            navigate("/success");
          }, 1000);
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(response);
    // }
  };

  return (
    <>
      {/* CheckOut start */}
      <div className="card-checkout mx-14 my-5 flex gap-20 xsm:flex-col xsm:mx-5 xsm:gap-8">
        {/* Billing address start */}
        <div className="w-[55%] min-h-[100vh] xsm:w-[100%] space-y-5">
          <span className="text-xl font-bold xsm:text-[12px]">
            Billing Address
          </span>

          {/* Dropdown buttons start */}
          <div className="flex space-x-10  xsm:justify-between xsm:gap-0">
            <CountrySelector
              onChange={handleCountryChange}
              name="country"
              placeholder="Select a country"
              value={country}
              className=""
              styleContainer={{ padding: "0px !important" }}
            />

            <StateSelector
              country={country}
              value={state}
              countryPlaceholder="Select state"
              onChange={handleStateChange}
            />
          </div>
          <div className="flex space-x-10 xsm:justify-between xsm:gap-0">
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Name"
              className="w-[180px] py-[6px] outline-none border rounded pl-2"
            />
            <input
              value={gstnumber}
              onChange={(e) => setgstnumber(e.target.value)}
              placeholder="GST No.(optional)"
              className="w-[180px] py-[6px] outline-none border rounded pl-2"
            />
          </div>
          <div className="flex space-x-10 xsm:justify-between xsm:gap-0">
            <input
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder="Address"
              className="w-[180px] py-[6px] outline-none border rounded pl-2"
            />
            <input
              value={zip}
              onChange={(e) => setzip(e.target.value)}
              type="number"
              placeholder="ZIP Code"
              className="w-[180px] py-[6px] outline-none border rounded pl-2"
            />
          </div>

          {/* Payment Method */}
          <div>
            <h1 className="text-xl font-bold mt-6 mb-3 xsm:text-[12px]">
              Payment Method
            </h1>
            <div className="bg-green-100 rounded-md p-4 card-shadow xsm:py-2">
              <p className="text-base green-color pb-4 xsm:text-[8px] xsm:pb-2">
                Select payment method
              </p>
              <div className="space-y-2 xsm:space-y-1">
                <div className="py-1 cursor-not-allowed flex">
                  <input
                    disabled
                    type="radio"
                    id="creditDebitCard"
                    name="paymentMethod"
                    value="creditDebitCard"
                    className="mr-2"
                  />
                  <label
                    className="text-gray-400 xsm:text-[10px]"
                    htmlFor="creditDebitCard"
                  >
                    {" "}
                    Credit/ Debit card
                  </label>
                </div>
                <div className="py-1 cursor-not-allowed flex">
                  <input
                    disabled
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    value="upi"
                    className="mr-2"
                  />
                  <label
                    className="text-gray-400 xsm:text-[10px]"
                    htmlFor="upi"
                  >
                    {" "}
                    UPI
                  </label>
                </div>
                <div className="py-1 cursor-not-allowed flex">
                  <input
                    disabled
                    type="radio"
                    id="netBanking"
                    name="paymentMethod"
                    value="netBanking"
                    className="mr-2"
                  />
                  <label
                    className="text-gray-400 xsm:text-[10px]"
                    htmlFor="netBanking"
                  >
                    {" "}
                    Net banking
                  </label>
                </div>
                <div className="py-1 flex">
                  <input
                    onChange={(e) => setPayment(e)}
                    type="radio"
                    id="cashOnDelivery"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    className="mr-2"
                  />
                  <label className="xsm:text-[10px]" htmlFor="cashOnDelivery">
                    {" "}
                    Cash on Delivery
                  </label>
                </div>
                <div className="py-1 cursor-not-allowed flex">
                  <input
                    disabled
                    type="radio"
                    id="emi"
                    name="paymentMethod"
                    value="emi"
                    className="mr-2"
                  />
                  <label
                    className="text-gray-400 xsm:text-[10px]"
                    htmlFor="emi"
                  >
                    {" "}
                    EMI
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details start*/}

          {/* <div>
                        <h1 className="text-xl font-bold mt-6 mb-3">Order Details</h1>
                        <div className="bg-green-100 rounded-lg flex flex-col md:flex-row items-center card-shadow2">
                            <img src="src/assets/images/Rectangle 32.png" alt="course" className="w-[230px] h-[140px] object-cover rounded-lg mt-4 md:mt-0 md:ml-4" />
                            <div className="ml-4 my-3 md:ml-0">
                                <h2 className="text-md font-semibold text-#252641 text-custom-color">AWS Certified Solutions Architect</h2>
                                <p className="mt-1 text-sm md:text-base" style={{ color: "#696984" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, nostrum!</p>

                                <div className="flex flex-col md:flex-row gap-3 md:gap-6 mt-4 md:mt-8">
                                    <div className="flex items-center">
                                        <img src="src/assets/Group 260.png" className="w-5 h-5" />
                                        <p className="ml-2 text-sm md:text-base" style={{ color: "#696984" }}>Design</p>
                                    </div>

                                    <div className="flex items-center mt-1 md:mt-0">
                                        <img src="src/assets/.png" className="w-5 h-5" />
                                        <p className="ml-2 text-sm md:text-base" style={{ color: "#696984" }}>3 months</p>
                                    </div>
                                </div>
                                <img src="src/assets/Group.png" className="w-full h-1 mt-4" />
                                <div className="flex justify-between items-center mt-4">
                                    <span className="flex items-center">
                                        <Star className="w-5 h-5" />
                                        <Star className="w-5 h-5" />
                                        <Star className="w-5 h-5" />
                                        <Star className="w-5 h-5" />
                                        <Star className="w-5 h-5" />
                                    </span>
                                    <p className="ml-auto text-sm md:text-base font-bold">₹2000</p>
                                </div>
                            </div>
                        </div>
                    </div> */}

          <div className="h-auto space-y-7 xsm:space-y-3">
            <h1 className="text-xl font-bold mt-6 mb-3 xsm:text-[12px] xsm:mb-0">
              Order Details
            </h1>
            {Data?.map((item) => {
              temp.push(item?.course?._id);
              return (
                <>
                  <div className="bg-green-100 rounded-lg flex items-center card-shadow2 w-[100%] xsm:p-2 xsm:justify-between">
                    <img
                      src={item.course.featured_image}
                      alt="course"
                      className="w-[230px] h-[140px]  object-cover rounded-lg mt-[-4px] ml-4 xsm:ml-0 xsm:w-[40%] xsm:h-[15vh] xsm:object-fit"
                    />
                    <div className="ml-[20px] my-3 xsm:w-[55%] xsm:my-0 xsm:ml-0">
                      <h2 className="text-md font-semibold text-[#252641] text-custom-color xsm:text-[10px]">
                        {item.course.title}
                      </h2>
                      <p
                        className="mt-1 text-[13px] text-wrap xsm:hidden"
                        style={{ color: "#696984" }}
                      >
                        {item.course.overview.slice(0, 110)}..
                      </p>

                      <div className="flex mt-8 gap-6 xsm:mt-2">
                        <div className="flex gap-1 xsm:justify-center xsm:items-center">
                          <Design className="w-[15px] h-[15px] xsm:h-3 xsm:w-3" />
                          <p
                            className="mt-[-2px] text-[13px] xsm:text-[8px]"
                            style={{ color: "#696984" }}
                          >
                            {item.course.category}
                          </p>
                        </div>

                        <div className="flex gap-1 xsm:justify-center xsm:items-center">
                          <Clock className="w-[15px] h-[15px] xsm:h-3 xsm:w-3" />
                          <p
                            className=" mb-2 mt-[-2px] text-[13px] xsm:text-[8px] xsm:mb-0"
                            style={{ color: "#696984" }}
                          >
                            {item.course.duration}
                          </p>
                        </div>
                      </div>
                      {/* <img src="src/assets/Group.png" className="w-[590px] h-[1px]" /> */}
                      <div className="flex justify-between items-center">
                        <span className="flex mt-4">
                          <Star className="xsm:w-3" />
                          <Star className="xsm:w-3" />
                          <Star className="xsm:w-3" />
                          <Star className="xsm:w-3" />
                          <Star className="xsm:w-3" />
                        </span>
                        <span className="mt-3">
                          <p className="flex justify-end mr-4 text-[18px] mt-[-3px] font-semibold xsm:text-[10px]">
                            ₹{item.course.base_price}
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          {/* Order Details end*/}
        </div>
        {/* Billing address end */}

        {/* Summary start */}
        <div className="h-[100vh] w-[40%]">
          <span className=" text-xl font-bold xsm:text-[12px]">Summary</span>

          {/* Summary div start*/}
          <div className="mt-5 mb-4 xsm:my-2">
            <h1 className="text-base xsm:text-[10px]">Original Price:</h1>
            <div className="flex justify-between">
              <p className=" green-color text-sm xsm:text-[10px]">
                Including all the taxes
              </p>
              <p className="xsm:text-[12px]">₹{total}</p>
            </div>
          </div>
          <hr />
          <div className="mt-5 mb-4 xsm:my-2">
            <h1 className="text-base xsm:text-[10px]">Total:</h1>
            <div className="flex justify-between">
              <p className=" green-color text-sm xsm:text-[10px]">
                Including all the taxes
              </p>
              <p className="xsm:text-[12px]">₹{total}</p>
            </div>
          </div>
          <span className="flex justify-center xsm:mt-4">
            <button
              className="bg-green-color px-12 py-3 rounded-full text-white text-[20px] xsm:text-[12px]"
              onClick={handleContinueCheckout}
            >
              Continue Checkout
            </button>
          </span>
          {/* Summary div end*/}
        </div>
        {/* Summary end */}
      </div>
      <Toaster position="top-right" />
      {/* CheckOut end */}
    </>
  );
};

export default CartCheckout;

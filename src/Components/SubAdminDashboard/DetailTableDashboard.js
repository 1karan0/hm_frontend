import React, { useEffect, useState } from "react";
import { ReactComponent as Cap } from "../../Assets/Icons/cap.svg";
import { ReactComponent as Coin } from "../../Assets/Icons/coin.svg";
import { ReactComponent as Upload } from "../../Assets/Icons/upload.svg";
import { ReactComponent as Download } from "../../Assets/Icons/download.svg";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { BASE_URL } from "../../Api/api";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import MyModal from "./Modal";
import Spinner from "../Spinner";
import Joyride from "react-joyride";

const DetailTableDashboard = ({
  data,
  FetchData,
  fetchFiltersData,
  setshowspinner,
  showspinner,
}) => {
  // console.log(data);
  const [Coins, setCoins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [emailerros, setemailerros] = useState([]);
  const [phoneErrors, setphoneErrors] = useState([]);
  const [duplicateEmails, setduplicateEmails] = useState([]);
  const [duplicatePhones, setduplicatePhones] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const [existingCourse, setExistingCourse] = useState([]);
  const[error,setError]=useState('');
  useEffect(() => {
    Fetchdata();
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsTourOpen(true);
      setIsBlocking(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
    // navigate('/college-dashboard')
  };
  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };
  const handleCourseSelect = (courseId) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };
  

  // console.log(data);
  async function Fetchdata() {
    let token = localStorage.getItem("token");
    if (token) {
      const temp = await fetch(
        BASE_URL + "/collegeUser?email=" + jwtDecode(token)?.email
      );
      const response = await temp.json();
      setCoins(response?.data);
      // console.log(response);
    }
  }
  useEffect(() => {
    Fetchdata();
  }, []);

  const handleFileChange = async (event) => {
    setshowspinner(true);
    const file = event.target.files[0];
    const formData = new FormData();
    
    // Validate file type
    if (
      file &&
      (file.type === "application/vnd.ms-excel" || file.type === "text/csv")
    ) {
      // setSelectedFile(file);
      try {
        formData.append("file", file);
        formData.append("selectedCourses", JSON.stringify(selectedCourses));
        const fetchdata = await fetch(BASE_URL + "/upload-students", {
          method: "POST",
          headers: {
            // 'Content-Type': 'application/form-data',
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        });
        const response = await fetchdata.json();
        setshowspinner(false);
        if (response.success) {
          toast.success("students uplaoded successfully");
          closeUploadModal();
          // window.location.reload();

          FetchData();
          Fetchdata();
          fetchFiltersData();
        } else if (!response?.success && response?.validationError) {
          openModal();
          setduplicateEmails(response?.duplicateEmails || []);
          setduplicatePhones(response?.duplicatePhones || []);
          setemailerros(response?.emailErrors || []);
          setphoneErrors(response?.phoneErrors || []);
          setExistingCourse(response?.existingCourse || []);  // Changed to match API response
          setError(response?.msg || '');
        } else {
          toast.error(response.msg);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // Show error message or handle invalid file type
      alert("Please select a csv file type.");
    }
  };
  // console.log('existing',typeof existingCourses);
  

  const handleDownload = () => {
    let fileurl = "/upload-dummy - Sheet1.csv";
    fetch(fileurl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = fileurl || "downloaded-file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  };
  const exportToExcel = () => {
    const flattenedData = data.map((item) => ({
      name: item?.name,
      phone: item?.phone,
      email: item?.email,
      college: item?.college,
      degree: item?.degree,
      stream: item?.stream,
      isCourseOpened: item?.isCourseOpened,
      totalLessons:
        item?.purchased_courses?.length > 0
          ? item?.purchased_courses[0]?.totalLessons
          : "",
      completedLessons:
        item?.purchased_courses?.length > 0
          ? item?.purchased_courses[0]?.completedLessons
          : "",
      totalAssessments:
        item?.purchased_courses?.length > 0
          ? item?.purchased_courses[0]?.totalAssessments
          : "",
      completedAssessments:
        item?.purchased_courses?.length > 0
          ? item?.purchased_courses[0]?.completedAssessments
          : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "data.xlsx");
  };
  // Example table content
  const steps = [
    {
      target: ".download-button",
      content: "Download the format to uploade csv file (sheet) of student .",
    },
    {
      target: ".upload-button",
      content: "Click here to upload the csv file (sheet) of students .",
    },
    {
      target: ".total-students",
      content: "Here you can see the total number of students.",
    },
    {
      target: ".total-coins",
      content: "This section displays your available coins.",
    },
    {
      target: ".student-table",
      content: "This table shows all student details.",
    },
    {
      target: ".report",
      content: "Click here to download the students report.",
    }
  ];

  return (
    <div>
      {isBlocking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <p className="text-white text-lg font-bold">Please follow the tour</p>
        </div>
      )}

      
    <Joyride
      steps={steps}
      continuous
      showSkipButton
      run={isTourOpen}
      callback={(data) => {
        if (data.status === "finished") {
          setIsTourOpen(false);
          setIsBlocking(false); // Unblock user interaction
          localStorage.setItem("hasVisited", "true");
        }
        if (data.action === "skip") {
          setIsTourOpen(false);
          setIsBlocking(false); // Unblock user interaction
          localStorage.setItem("hasVisited", "true");
        }
      }}
    />
      <Toaster
        toastOptions={{
          duration: 500,
        }}
      />
      <MyModal
        duplicateEmails={duplicateEmails}
        duplicatePhones={duplicatePhones}
        existingCourses={existingCourse}
        error={error}
        emailerros={emailerros}
        phoneErrors={phoneErrors}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      {isUploadModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-f p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upload Sheet</h2>
              <button
                onClick={closeUploadModal}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center">
              {/* Course Selection Checkboxes */}
              <div className="w-full mb-4">
                <h3 className="text-lg font-semibold mb-2">Select Courses</h3>
                <div className="flex flex-col gap-2">
                  {Coins?.coursesAllotted?.map((course) => (
                    <div
                      key={course._id}
                      className="flex items-center w-full border rounded p-2"
                    >
                      <input
                        type="checkbox"
                        id={`course-${course._id}`}
                        checked={selectedCourses.includes(course._id)}
                        onChange={() => handleCourseSelect(course._id)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`course-${course._id}`}
                        className="flex-grow cursor-pointer"
                      >
                        {course.title} ({course.category})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <label
                htmlFor="fileInput"
                className="text-xs font-semibold cursor-pointer"
              >
                <div className="h-32 w-56 flex flex-col justify-center items-center border border-[#D0D0D0] rounded-md gap-1">
                  <Upload className="h-16 w-12" />
                  <div className="flex flex-col ">
                    Upload Sheet
                    <input
                      id="fileInput"
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="px-[4%] flex flex-col gap-4 w-full">
        <div className="flex w-full justify-end">
          <button
            className="py-2 bg-[#1DBF73] shadow-lg text-white rounded mt-3 px-3 download-button"
            onClick={handleDownload}
          >
            Download format
          </button>
        </div>
        <div className="w-full flex justify-between">
          <div className="h-32 w-56 flex justify-center items-center border border-[#D0D0D0] rounded-md total-students">
            <Cap className="h-20 w-20" />
            <div className="flex flex-col ">
              <p className="font-bold text-center text-xl">{data?.length}</p>
              <p className="text-xs font-semibold">Total students</p>
            </div>
          </div>
          <div className="h-32 w-56 flex justify-center items-center border border-[#D0D0D0] rounded-md gap-1 total-coins">
            <Coin className="h-12 w-16" />
            <div className="flex flex-col ">
              <p className="font-bold text-center text-xl ">
                <span className="text-gray-500 text-2xl ">
                  {Coins?.used_coins}
                </span>
                /{Coins?.coins}
              </p>
              <p className="text-xs font-semibold">Total coins</p>
            </div>
          </div>
          <label
            htmlFor="fileInput"
            className="text-xs font-semibold cursor-pointer"
          >
            <div>
              <button
                onClick={openUploadModal}
                className="h-32 text-base w-56 flex flex-col justify-center items-center border border-[#D0D0D0] rounded-md gap-1 upload-button"
              >
                <Upload className="h-16 w-12" />
                Upload Sheet
              </button>
            </div>
          </label>
          <div
            onClick={exportToExcel}
            className="  h-32 cursor-pointer w-56 flex flex-col justify-center items-center border border-[#D0D0D0] rounded-md gap-1 report"
          >
            <Download className="h-16 w-12" />
            <div className="flex flex-col ">
              <p className="text-xs font-semibold">Download Students Report</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 bg-[#000000] py-6 text-center w-full student-table">
          <p className="text-[#FFFFFF] text-[17px] font-pop font-semibold">
            Name
          </p>
          <p className="text-[#FFFFFF] text-[17px] font-pop font-semibold max-w-xs">
            Email
          </p>
          <p className="text-[#FFFFFF] text-[17px] font-pop font-semibold">
            Branch
          </p>
          <p className="text-[#FFFFFF] text-[17px] font-pop font-semibold">
            Status
          </p>
          <p className="text-[#FFFFFF] text-[17px] font-pop font-semibold">
            Action
          </p>
        </div>
        <div className="alternatebg">
          {data?.length > 0 ? (
            data?.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-5 bg-[#fff] py-3 text-center border border-[#E2E2E2] w-full"
              >
                <p className="text-[#000] text-[16px] font-pop font-semibold">
                  {row.name}
                </p>
                <p
                  className="text-[#000] text-[16px] font-pop font-semibold"
                  title={row.email}
                >
                  {row.email}
                </p>
                <p className="text-[#000] text-[16px] font-pop font-semibold">
                  {row.stream || "CSE"}
                </p>
                {row.isCourseOpened ? (
                  <p className="text-[#43e674] text-[16px] font-pop font-semibold">
                    Accepted
                  </p>
                ) : (
                  <p className="text-[#f8674d] text-[16px] font-pop font-semibold">
                    Pending
                  </p>
                )}
                <Link
                  to={`/college-studentdata?id=${row._id}`}
                  className="text-[#000] text-[16px] font-pop font-semibold"
                >
                  View
                </Link>
              </div>
            ))
          ) : (
            <div className="flex justify-center w-full font-bold">
              No Data Found
            </div>
          )}
        </div>
        {showspinner ? (
          <div className="w-full h-screen fixed top-0 left-0 bg-[#b4cca1] opacity-80 z-50">
            <Spinner className="" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DetailTableDashboard;

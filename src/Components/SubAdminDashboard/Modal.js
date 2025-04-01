import React from 'react';
import Modal from 'react-modal';
import { MdClose } from "react-icons/md";
Modal.setAppElement('#root');

const MyModal = ({ isModalOpen, error, closeModal,duplicateEmails,duplicatePhones,emailerros,phoneErrors,existingCourses }) => {
  console.log("existing",existingCourses);
  
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-auto">
        <div className='flex justify-between'><h2 className="text-base font-semibold mb-4">{error}</h2>
        <button
          onClick={closeModal}
          className="mb-4 text-red-500 text-xl px-4 py-2 rounded  transition"
        >
         <MdClose className='text-xl'/>
        </button></div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                {/* <th className="px-4 py-2 border">Sr</th> */}
                <th className="px-4 py-2 border">Email/Phone</th>
                <th className="px-4 py-2 border">Errors</th>
              </tr>
            </thead>
            <tbody>
            {existingCourses?.map((item)=>{
                return(<>
                   <tr>
                <td className="px-4 py-2 border">{item?.email}</td>
                <td className="px-4 py-2 border">{item?.error}</td>
              </tr>
                </>)
            })}
            {duplicateEmails?.map((item)=>{
                return(<>
                   <tr>
                <td className="px-4 py-2 border">{item?.email}</td>
                <td className="px-4 py-2 border">{item?.error}</td>
              </tr>
                </>)
            })}
            {duplicatePhones?.map((item)=>{
                return(<>
                   <tr>
                <td className="px-4 py-2 border">{item?.phone}</td>
                <td className="px-4 py-2 border">{item?.error}</td>
              </tr>
                </>)
            })}
            {phoneErrors?.map((item)=>{
                return(<>
                   <tr>
                <td className="px-4 py-2 border">{item?.phone}</td>
                <td className="px-4 py-2 border">{item?.error}</td>
              </tr>
                </>)
            })}
                 {emailerros?.map((item)=>{
                return(<>
                   <tr>
                <td className="px-4 py-2 border">{item?.email}</td>
                <td className="px-4 py-2 border">{item?.error}</td>
              </tr>
                </>)
            })}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;

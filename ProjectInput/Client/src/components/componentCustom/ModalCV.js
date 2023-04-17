import { postCV } from "services/job/JobService";
import React, { useEffect, useState } from "react";
import "./ModalCV.css"
import { toast } from 'react-toastify';

export const ModelCV = ({ idModal, job, candidate, open, setOpen }) => {

    const [dataCV, setDataCV] = useState({
        description: null,
        cvFile: null
    });

    const [toastType, setToastType] = useState("UNSHOW");

    const handleChangeInputFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setDataCV({ ...dataCV, ["cvFile"]: event.target.files[0] })
        }
    }

    const handleChangeTextareaDescription = (event) => {
        setDataCV({ ...dataCV, ["description"]: event.target.value })
    }

    const handleClickCloseModal = (e) => {
        setOpen(false)
    }

    const handleClickSendCV = (event) => {
        console.log("job: ", job);
        console.log("candidate: ", candidate);
        console.log("dataCV: ", dataCV);

        if (job && job.id && candidate && candidate.userId && dataCV.cvFile) {
            let formData = new FormData();
            formData.append("candidateId", candidate.userId);
            formData.append("jobId", job.id);
            formData.append("description", dataCV.description);
            formData.append("cvFile", dataCV.cvFile);

            postCV(formData).then((res) => {
                toast.success("Gửi cv thành công")
            }).catch((error) => {
                console.log(error);
                toast.warn(error.response.data.errors[0].message);
            });
        }
        else {
            toast.error("Thông tin không hợp lệ");
        }
        console.log("toastType: ", toastType);
    }
    // data-hs-overlay="#hs-slide-down-animation-modal"
    useEffect(() => {
    }, [toastType])

    return (
        <>
            <div id={idModal} className="w-full h-full fixed flex justify-center items-center left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="mt-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">

                        {/* Header */}
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                                Gửi CV
                            </h3>
                            <button onClick={handleClickCloseModal} type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-slide-down-animation-modal">
                                <span className="sr-only">Close</span>
                                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex flex-col p-5 space-y-5 overflow-y-auto">
                            <div className="space-y-2">
                                <label className="block text-[1rem] font-medium text-gray-900 dark:text-white">Thêm chú thích</label>
                                <textarea onChange={handleChangeTextareaDescription} id="textarea_message" className="block p-2.5 h-[10rem] w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-common_color focus:border-common_color dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-hover_common_color dark:focus:border-hover_common_color"></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-white">Tải lên file</label>
                                <input onChange={handleChangeInputFile} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                            <button onClick={handleClickCloseModal} type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-hover_common_color transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-500 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-slide-down-animation-modal">
                                Đóng
                            </button>
                            <button onClick={handleClickSendCV} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent bg-common_color text-white hover:bg-hover_common_color focus:outline-none focus:ring-2 focus:ring-hover_common_color focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800">
                                Gửi
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* <MyToast toastType={toastType} setToastType={setToastType} /> */}
        </>
    );
}

export default ModelCV
import React, { useState } from "react"
import { Modal, IconButton } from "@mui/material"
import axios from "axios"
import config from "../../../config.json"
import Authentication from "services/Authentication/Authentication"
import { toast } from "react-toastify"

export default function ReportModal({ open, setOpen, companyId }) {
    const [reportMessage, setReportMessage] = useState("")

    const onClose = () => {
        setReportMessage("")
        setOpen(false)
    }
    const onSubmit = () => {
        console.log("REPORT")
        console.log(reportMessage)
        
        if (Authentication.isCandidate()) {
            axios({
                method: "POST",
                url: `${config.server.domain}/report`,
                headers: {
                    Authorization: Authentication.generateAuthorizationHeader()
                },
                data: {
                    candidateId: Authentication.getCurrentUser().id,
                    companyId: companyId,
                    message: reportMessage 
                }
            }).then(() => {
                onClose()
                toast.success("Báo cáo thành công")
            }).catch(() => {
                toast.error("Có lỗi xảy ra")
            })
        }
    }

    return (
        <Modal open={open} onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div className="w-full h-full fixed flex justify-center items-center left-0 z-[60] overflow-x-hidden overflow-y-auto" >
                <div className="mt-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">

                        {/* Header */}
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                                Báo cáo công ty
                            </h3>
                            <IconButton onClick={onClose} >
                                <img src="/icon/close.svg" className="h-3.5 w-3.5" alt="" /> 
                            </IconButton>
                        </div>

                        {/* Body */}
                        <div className="flex flex-col p-5 space-y-5 overflow-y-auto">
                            <div className="space-y-2">
                                <label className="block text-[1rem] font-medium text-gray-900 dark:text-white">
                                    Nhập phản ánh của bạn
                                </label>
                                <textarea name="textarea_description_report" value={reportMessage} onChange={(e) => setReportMessage(e.target.value)} 
                                    className="block p-2.5 h-[10rem] w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-common_color focus:border-common_color dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-hover_common_color dark:focus:border-hover_common_color"></textarea>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                            <button onClick={onClose} type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-hover_common_color transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-500 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                                Đóng
                            </button>
                            <button onClick={onSubmit} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent bg-common_color text-white hover:bg-hover_common_color focus:outline-none focus:ring-2 focus:ring-hover_common_color focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800">
                                Gửi
                            </button>
                        </div>

                    </div>
                </div>
            </div >
        </Modal>
    )
}
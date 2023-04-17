import axios from "axios"
import React, { useRef, useState } from "react"
import config from "../../../config.json"
import Authentication from "services/Authentication/Authentication"
import { toast } from "react-toastify"
import { IconButton, Modal, Rating } from "@mui/material"
import { Close } from "@mui/icons-material"

export default function RateModal({ open, setOpen, companyId }) {
    const [value, setValue] = useState(0)
    const description = useRef(null)

    const onClose = () => {
        setOpen(false)
        setValue(0)
    }

    const onSubmitButtonClick = () => {
        axios({
            method: "POST",
            url: `${config.server.domain}/evaluate`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader()
            },
            data: {
                candidateId: Authentication.getCurrentUser().id,
                companyId: companyId,
                star: value
            }
        }).then((response) => {
            onClose()
            toast.success("Đánh giá thành công")

        }).catch((error) => {
            toast.error("Lỗi")
        })
        console.log(description.current.innerHTML)
    }

    return (
        <Modal open={open} onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div className="rounded w-[20rem] flex justify-center flex-col bg-white py-4 px-6 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <IconButton size="small" sx={{
                    position: "absolute",
                    right: "0.5rem",
                    top: "0.5rem"
                }} onClick={() => { setOpen(false) }}>
                    <Close />
                </IconButton>

                <h1 className="inline-block font-bold text-[1.2rem] mb-4">Đánh giá công ty</h1>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                {/* <p ref={description} contentEditable className=" border border-[gray] rounded-md mt-4 p-4 w-full whitespace-pre-wrap"></p> */}
                <button onClick={onSubmitButtonClick} className="px-4 py-2 bg-blue-600 rounded-3xl w-fit h-fit mt-6">
                    <span className="text-white">Gửi</span>
                </button>
            </div>
        </Modal>
    )
}
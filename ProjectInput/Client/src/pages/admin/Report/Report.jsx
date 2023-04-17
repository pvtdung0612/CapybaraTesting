import {
    Table, TableContainer,
    TableHead, TableCell,
    TableRow, TableBody, TableFooter,
    TablePagination,
    useTheme,
    Box,
    IconButton
} from "@mui/material"
import React, { useEffect, useState } from "react"
import config from '../../../config.json'
import axios from "axios"
import Authentication from "services/Authentication/Authentication"
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { toast } from "react-toastify"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Spinner from "components/components/Spinner"
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

function ReportTable({ reportPage, handleChangePage, handleChangeRowsPerPage, pagination }) {

    return (
        <TableContainer >
            <Table sx={{ backgroundColor: 'white' }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Người báo cáo</TableCell>
                        <TableCell align="left">Công ty bị báo cáo</TableCell>
                        <TableCell align="left">Ngày báo cáo</TableCell>
                        <TableCell align="left">Phản ánh</TableCell>
                        {/* <TableCell align="left">Tùy chọn</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reportPage.elements.slice(0, pagination.pageSize).map((report, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{index}</TableCell>
                            <TableCell component="th" scope="row">
                                {report.id}
                            </TableCell>
                            <TableCell align="left">{report.candidate.fullName}</TableCell>
                            <TableCell align="left">{report.company.companyName}</TableCell>
                            <TableCell align="left">{report.date.substr(0, 10)}</TableCell>
                            <TableCell align="left">{report.message}</TableCell>
                            {/* <TableCell align="left">
                                <div className="flex gap-4">
                                    <IconButton>
                                        <VisibilityIcon className="" />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            colSpan={8}
                            count={reportPage.page.totalElement}
                            rowsPerPage={pagination.pageSize}
                            page={pagination.page}
                            labelRowsPerPage="Số hàng trên một trang"
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default function Report() {
    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: 10
    })
    const [reportPage, setReportPage] = useState({
        page: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalElement: 0
        },
        elements: []
    })
    const [requestOption, setRequestOption] = useState({
        method: 'GET',
        url: `${config.server.domain}/report`,
        headers: {
            Authorization: Authentication.generateAuthorizationHeader()
        }
    })

    const [requestUrl, setRequestUrl] = useState(`${config.server.domain}/report`)
    const [requestParams, setRequestParams] = useState([])

    useEffect(() => {
        let url = requestUrl
        if (url.includes("?")) {
            url = url + `&page=${pagination.page}&pageSize=${pagination.pageSize}`
        } else {
            url = url + `?page=${pagination.page}&pageSize=${pagination.pageSize}`
        }
        axios(
            // requestOption
            {
                method: 'GET',
                url: requestUrl,
                headers: {
                    Authorization: Authentication.generateAuthorizationHeader()
                }
            }
        ).then((response) => {
            setReportPage(response.data)
            console.log(response.data)
        })
    }, [requestUrl])

    const handleChangePage = (
        event,
        newPage,
        pageSize
    ) => {
        let url = requestUrl;
        if (url.includes("?")) {
            url = url + `&page=${newPage}&pageSize=${pageSize != null ? pageSize : pagination.pageSize}`
        } else {
            url = url + `?page=${newPage}&pageSize=${pageSize != null ? pageSize : pagination.pageSize}`
        }
        axios({
            method: 'GET',
            url: url,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            setReportPage(response.data)
            console.log(response.data)
            // setPage(newPage);
            setPagination({
                ...pagination,
                pageSize: pageSize != null ? pageSize : pagination.pageSize,
                page: newPage
            })
        }).catch((error) => {
            toast.error("Lỗi không xác định")
        })
    };

    const handleChangeRowsPerPage = (event) => {
        let newPageSize = parseInt(event.target.value)
        console.log(pagination.pageSize)
        console.log(newPageSize)
        if (pagination.pageSize < newPageSize) {
            handleChangePage(null, 0, newPageSize)
        } else {
            setPagination({
                ...pagination,
                page: 0,
                pageSize: newPageSize
            })
        }
    };

    const accountType = ['Không chọn', 'Company', 'Candidate']
    const [selectedAccountType, setSelectedAccountType] = useState(accountType[0])
    const activated = ['Không chọn', 'Có', 'Không']
    const [selectedActivated, setSelectedActivated] = useState(activated[0])
    const locked = ['Không chọn', 'Có', 'Không']
    const [selectedLocked, setSelectedLocked] = useState(locked[0])
    const [email, setEmail] = useState("")

    const [isFiltered, setIsFiltered] = useState(false)

    function clearFilter() {
        setSelectedAccountType(accountType[0])
        setSelectedActivated(activated[0])
        setSelectedLocked(locked[0])
        setEmail("")
        setIsFiltered(false)
        setRequestUrl(`${config.server.domain}/report`)
    }

    function onFilterButtonClick() {
        if (!isFiltered) {
            setRequestUrl(`${config.server.domain}/user/search?email=${email}` +
                (selectedAccountType != accountType[0] ? `&accountType=${selectedAccountType}` : "") +
                (selectedActivated != activated[0] ? `&isActive=${selectedActivated}` : "") +
                (selectedLocked != locked[0] ? `&isLocked=${selectedLocked}` : ""))
        } else {
            setRequestUrl(`${config.server.domain}/user`)
        }
        setIsFiltered(!isFiltered)
    }

    return (
        <div className="rounded overflow-hidden m-4 h-full">
            {/* <div className="w-full mb-4 flex flex-wrap gap-[0.5rem]">
                <div className="rounded px-4 py-2 bg-white">
                    <input value={email} onChange={(event) => setEmail(event.target.value)} maxLength={320} className="border-none outline-none" type="text" placeholder="Nhập email" />
                </div>
                <div className="rounded px-4 py-2 bg-white flex gap-1 items-center">
                    <p>Loại tài khoản: </p>
                    <Spinner
                        options={accountType}
                        selected={selectedAccountType}
                        setSelected={setSelectedAccountType}
                        boxStyle="border-none outline-none" />
                </div>
                <div className="rounded px-4 py-2 bg-white flex gap-1 items-center">
                    <p>Được kích hoạt</p>
                    <Spinner
                        options={activated}
                        selected={selectedActivated}
                        setSelected={setSelectedActivated}
                        boxStyle="border-none outline-none" />
                </div>
                <div className="rounded px-4 py-2 bg-white flex gap-1 items-center">
                    <p>Bị khóa</p>
                    <Spinner
                        options={locked}
                        selected={selectedLocked}
                        setSelected={setSelectedLocked}
                        boxStyle="border-none outline-none" />
                </div>
                <div className="flex justify-center items-center rounded px-4 py-2 bg-[#3b1534] cursor-pointer">
                    <p onClick={clearFilter} className="text-white font-bold">Clear</p>
                </div>
                <div onClick={onFilterButtonClick} className="flex justify-center items-center cursor-pointer rounded px-4 py-2 bg-white">
                    {
                        isFiltered ? <FilterAltOffIcon /> : <FilterAltIcon />
                    }
                </div>
            </div> */}
            <div className=" bg-white rounded overflow-hidden px-4">
                <ReportTable
                    reportPage={reportPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    pagination={pagination} />
            </div>
        </div>
    )
}
import axios from "axios";
import Candidate from "components/company/Candidate";
import Authentication from "services/Authentication/Authentication";
import { example } from "./CandidatesPerPost";
import Pagination, { postsPerPage } from "components/Pagination";

const { default: Dashboard } = require("components/company/Dashboard");
const { default: React, useEffect, useState } = require("react");

function CandidatesList() {
  const [applications, setApplications] = useState([]);
  const [waitingApplications, setWaitingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);

  const [activeOption, setActiveOption] = useState("Waiting");
  const companyData = Authentication.getCurrentUser();

  const [currentPage, setCurrentPage] = useState(1);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/job-application/listByCompany?companyId=${companyData.id}`,
      headers: {
        Authorization: Authentication.generateAuthorizationHeader(),
      },
    })
      .then((res) => {
        // setCandidates(res.data);
        console.log(res.data);
        let acceptedApplicationsTemp = res.data.elements.filter(
          (application) => {
            return application.status === "Accepted";
          }
        );
        setAcceptedApplications(acceptedApplicationsTemp);

        let waitingApplicationsTemp = res.data.elements.filter(
          (application) => {
            return application.status === "Waiting";
          }
        );
        setWaitingApplications(waitingApplicationsTemp);

        let rejectedApplicationsTemp = res.data.elements.filter(
          (application) => {
            return application.status === "Rejected";
          }
        );
        setRejectedApplications(rejectedApplicationsTemp);
        // console.log(res.data);

        switch (activeOption) {
          case "Waiting":
            setApplications(waitingApplicationsTemp);
            break;
          case "Accepted":
            setApplications(acceptedApplicationsTemp);
            break;
          case "Rejected":
            setApplications(rejectedApplicationsTemp);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  useEffect(() => {
    switch (activeOption) {
      case "Waiting":
        setApplications(waitingApplications);
        break;
      case "Accepted":
        setApplications(acceptedApplications);
        break;
      case "Rejected":
        setApplications(rejectedApplications);
        break;
      default:
        break;
    }
  }, [currentPage, activeOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeOption]);

  return (
    <Dashboard>
      <div className="w-full bg-white m-5 rounded-md shadow-md p-5 overflow-y-scroll scrollbar-hide">
        <h1 className="text-text_color text-xl font-medium mb-10">
          Danh sách ứng viên
        </h1>
        <div className="flex gap-10">
          <div>
            <button
              onClick={() => setActiveOption("Waiting")}
              className={`${
                activeOption === "Waiting"
                  ? "text-text_color"
                  : "text-text_color/50"
              } text-base font-medium `}
            >
              <span>Đang chờ</span>
              <span className="ml-3">{waitingApplications.length}</span>
              {activeOption === "Waiting" && (
                <div className="w-full h-2 bg-emerald-300 mt-2 rounded-xl"></div>
              )}
            </button>
          </div>
          <div>
            <button
              onClick={() => setActiveOption("Accepted")}
              className={`${
                activeOption === "Accepted"
                  ? "text-text_color"
                  : "text-text_color/50"
              } text-base font-medium `}
            >
              <span>Chấp nhận</span>
              <span className="ml-3">{acceptedApplications.length}</span>
              {activeOption === "Accepted" && (
                <div className="w-full h-2 bg-emerald-300 mt-2 rounded-xl"></div>
              )}
            </button>
          </div>
          <div>
            <button
              onClick={() => setActiveOption("Rejected")}
              className={`${
                activeOption === "Rejected"
                  ? "text-text_color"
                  : "text-text_color/50"
              } text-base font-medium `}
            >
              <span>Từ chối</span>
              <span className="ml-3">{rejectedApplications.length}</span>
              {activeOption === "Rejected" && (
                <div className="w-full h-2 bg-emerald-300 mt-2 rounded-xl"></div>
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5 scrollbar-hide">
          {applications
            .slice(firstPostIndex, lastPostIndex)
            .map((application) => {
              return (
                <Candidate
                  reload={reload}
                  setReload={setReload}
                  key={application.id}
                  candidate={application.candidate}
                  activeOption={activeOption}
                  application={application}
                />
              );
            })}
        </div>
        <div className="absolute right-14 -bottom-5">
          <Pagination
            totalPosts={applications.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Dashboard>
  );
}
export default CandidatesList;

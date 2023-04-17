import axios from "axios";
import { useNavigate } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";

const { default: Dashboard } = require("components/company/Dashboard");
const { default: React, useEffect, useState } = require("react");

function Profile() {
  const navigate = useNavigate();
  const companyData = Authentication.getCurrentUser();
  const [company, setCompany] = useState({});
  const [detailAddress, setDetailAddress] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/company/${companyData.id}`,
    })
      .then((res) => {
        console.log(res.data);
        setCompany(res.data);
        setDetailAddress(res.data.address.detailAddress);
        setWard(res.data.address.ward);
        setDistrict(res.data.address.district);
        setProvince(res.data.address.province);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Dashboard>
      <div className="w-full bg-white m-5 rounded-md shadow-md p-5 overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col px-10 py-5">
          <div className="flex gap-5 items-center">
            <img
              src={company.companyLogo || "https://i.imgur.com/6VBx3io.png"}
              alt="avatar"
              className="h-24 w-24 object-cover rounded-full"
            />
            <h1 className="text-2xl font-medium">{company.companyName}</h1>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-medium">Địa chỉ</h1>
              <p>{`${detailAddress}, ${ward}, ${district}, ${province}`}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-medium">Quy mô</h1>
              <p>{`${company.numberOfEmployee} nhân viên`}</p>
            </div>
            <div>
              <h1 className="text-lg font-medium">Giới thiệu</h1>
              <p>{company.companyDescription}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            navigate("/company/profile/edit", { state: { company: company } })
          }
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-md ml-10 mt-5"
        >
          Chỉnh sửa thông tin
        </button>
      </div>
    </Dashboard>
  );
}
export default Profile;

import React, { useEffect, useState } from "react";
import LogoJobFinder from "../../assets/image/candidates/LogoJobFinder.png"
import DotDivide from "../../assets/image/candidates/DotDivide.png"

export const CompanyView = ({ data }) => {
   const defaultValue = "Unknow";

   const [company, setCompany] = useState(null);

   useEffect(() => {
      if (data) {
         let validData = { ...data };

         //valid
         if (!validData.companyLogo)
            validData.companyLogo = String(LogoJobFinder);

         if (!validData.companyName)
            validData.companyName = defaultValue;

         if (!validData.address)
            validData.address = defaultValue;

         if (!validData.numberOfEmployee)
            validData.numberOfEmployee = defaultValue;

         if (!validData.companyDescription)
            validData.companyDescription = defaultValue;

         setCompany(validData);
      }
   }, [])

   return (
      <div className="hover:bg-gray-50 bg-white rounded-xl">{
         company &&
         <div className="space-y-3 w-full h-xl p-5">
            <div className="Header">
               <div className="flex flex-row space-x-3 items-center">
                  <img className="rounded-md w-10 h-10" src={company.companyLogo} alt={LogoJobFinder} />

                  <div className="space-y-1.5">
                     <label className="text-[1.1rem] line-clamp-1">{company.companyName}</label>

                     <div className="flex flex-row space-x-2 items-center text-xs">
                        <label className="line-clamp-1">{company.address.province}</label>
                        <img alt="." className="w-1 h-1" src={DotDivide} />
                        <label className="line-clamp-1">{company.numberOfEmployee} Applicant</label>
                     </div></div>
               </div>
            </div>

            <p className="text-[0.9rem] line-clamp-2">
               {company.companyDescription}
            </p>

            <div className="flex flex-row">
               <div className="bg-common_color text-white text-[0.7rem] p-1 rounded-md line-clamp-1">Công Nghệ</div>
               <div className="flex-1"> </div>
            </div>
         </div>
      }
      </div>
   );
}
export default CompanyView;
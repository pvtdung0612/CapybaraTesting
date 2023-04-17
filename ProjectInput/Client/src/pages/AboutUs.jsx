import Footer from "components/layouts/footer/Footer";
import HomeHeader from "components/layouts/header/Header";
import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full">
      <div className="2xl:container 2xl:mx-auto p-10 bg-slate-100 h-screen">
        <div className="bg-white px-10 py-10 rounded-md h-full">
          <div className="flex flex-col lg:flex-row justify-between gap-8 h-full">
            <div className="w-full lg:w-5/12 flex flex-col gap-20 justify-center">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
                  Về chúng tôi
                </h1>
                <p className="font-normal text-base leading-6 text-gray-600 ">
                  JobFinder là một trang web tìm kiếm việc làm, được xây dựng
                  bởi nhóm sinh viên Đại học Công Nghệ Thông Tin - Đại học Quốc
                  Gia Hà Nội. Trang web được xây dựng với mục đích giúp người
                  tìm việc dễ dàng tìm kiếm việc làm phù hợp.Cũng như giúp các
                  nhà tuyển dụng dễ dàng tìm kiếm được những ứng viên tiềm năng
                  với vị trí tuyển dụng của mình.
                </p>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
                  Tầm nhìn
                </h1>
                <p className="font-normal text-base leading-6 text-gray-600 ">
                  JobFinder với hy vọng sẽ trở thành một trang web tìm kiếm việc
                  làm hàng đầu tại Việt Nam, giải quyết được vấn đề tìm kiếm
                  việc làm cho người tìm việc và tìm kiếm ứng viên tiềm năng cho
                  nhà tuyển dụng.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                className="w-full h-full object-cover rounded-md"
                src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
                alt="A group of People"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

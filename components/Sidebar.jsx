import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { clientAuth } from "../firebase";
import { useRouter } from "next/router";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BsWallet2, BsHouse } from "react-icons/bs";
import { BiPurchaseTag } from "react-icons/bi";
import { VscSignOut } from "react-icons/vsc";
import { BsArrowLeftRight } from "react-icons/bs";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuList, setMenuList] = useState([
    { title: "Эхлэл", link: "" },
    { title: "Харилцагчид", link: "users" },
    { title: "Бүтээгдэхүүнүүд", link: "products" },
    { title: "Зээлүүд", link: "loans" },
    { title: "Зээлийн гүйлгээнүүд", link: "loantxns" },
  ]);

  const router = useRouter();

  const handleSubmit = () => {
    signOut(clientAuth)
      .then((result) => {
        // console.log(result);
        alert("Системээс гарлаа. Амжилт хүсье.");
      })
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        // console.log(error);
        alert("Системээс гарахад алдаа гарлаа.");
      });
  };

  useEffect(() => {
    onAuthStateChanged(clientAuth, (data) => {
      if (!data) {
        router.push("/login");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGo = (link) => {
    router.push("/" + link);
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } duration-300 h-screen bg-blue-900 relative`}
    >
      {/* <div
        className="absolute cursor-pointer rounded-full -right-3.5 top-5 h-7 w-7 border-2 border-white bg-white text-blue-900 font-bold flex justify-center items-center"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <FaAngleLeft size={15} className="text-blue-900" />
        ) : (
          <FaAngleRight size={15} className="text-blue-900" />
        )}
      </div> */}
      <div className="pt-10 w-full h-[10%] flex justify-center items-center">
        <h1
          className={`cursor-pointer text-white font-semibold duration-300 ${
            sidebarOpen ? "text-3xl" : "text-xl"
          }`}
        >
          LOGO
        </h1>
      </div>
      <div className="flex flex-col justify-between">
        <ul className="pt-6">
          {menuList.map((menu, index) => {
            return (
              <li
                key={index}
                className={`${
                  sidebarOpen ? "w-[85%] pl-2" : "w-[50%] pl-2.5"
                } ml-5 text-gray-200 text-sm flex items-center gap-x-4 cursor-pointer py-2 hover:bg-blue-700 rounded-md mt-2 font-700`}
                onClick={() => handleGo(menu.link)}
              >
                {menu.link === "users" ? (
                  <FiUsers size={18} className="text-gray-100" />
                ) : menu.link === "loans" ? (
                  <BsWallet2 size={18} className="text-gray-100" />
                ) : menu.link === "products" ? (
                  <BiPurchaseTag size={18} className="text-gray-100" />
                ) : menu.link === "" ? (
                  <BsHouse size={18} className="text-gray-100" />
                ) : menu.link === "loantxns" ? (
                  <BsArrowLeftRight size={18} className="text-gray-100" />
                ) : null}
                <span
                  className={`${
                    !sidebarOpen && "hidden"
                  } origin-left duration-300`}
                >
                  {menu.title}
                </span>
              </li>
            );
          })}
        </ul>
        <div
          className={`${
            sidebarOpen ? "w-[85%] pl-2" : "w-[50%] pl-2.5"
          } ml-5 text-gray-200 text-sm flex items-center gap-x-4 cursor-pointer py-2 hover:bg-blue-700 rounded-md mt-2`}
          onClick={handleSubmit}
        >
          <VscSignOut size={18} className="text-gray-100" />
          <span
            className={`${!sidebarOpen && "hidden"} origin-left duration-300`}
          >
            Гарах
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

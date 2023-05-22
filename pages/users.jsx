import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Sidebar from "@/components/Sidebar";
import { User } from "@/functions/User";
import { Permission } from "@/functions/Permission";
import { Product } from "@/functions/Product";
import Modal from "@/components/Modal";

const Users = () => {
  const users = User("GET", null);
  const permissions = Permission();
  const products = Product("GET", null);
  const [data, setData] = useState(null);
  const [parameter, setParameter] = useState({
    action: null,
  });
  const metadatas = [
    { name: "Овог", width: "10%", align: "center", field: "lastname" },
    { name: "Нэр", width: "10%", align: "center", field: "firstname" },
    { name: "Регистр", width: "10%", align: "center", field: "register" },
    { name: "Имэйл", width: "17%", align: "center", field: "email" },
    { name: "Утас", width: "10%", align: "center", field: "mobile" },
    { name: "Гэрээ", width: "10%", align: "center", field: "isAgreement" },
    { name: "Эрх", width: "10%", align: "center", field: "permission" },
    { name: "Сегмент", width: "13%", align: "center", field: "segment" },
  ];

  const handleClickEdit = (data) => {
    setData(data);
    setParameter({
      ...parameter,
      action: "edit",
    });
  };

  const handleClickCancel = () => {
    setParameter({
      ...parameter,
      action: null,
    });
  };

  const handleClickSave = async () => {
    const result = await User("PUT", data);

    setParameter({
      ...parameter,
      action: null,
    });
    setData(null);
  };

  const handleChangeValue = (event) => {
    event.preventDefault();

    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-7 h-screen w-[84%]">
        <h1 className="text-2xl font-semibold text-blue-900 mb-7">
          Харилцагчид
        </h1>
        {parameter.action === "edit" && (
          <Modal
            handleClickCancel={handleClickCancel}
            handleClickSave={handleClickSave}
            title="user"
            action={parameter.action}
            metadatas={metadatas}
            datas={data}
            handleChangeValue={handleChangeValue}
          />
        )}
        <table className="text-sm w-full">
          <thead>
            <tr>
              {metadatas.map((metadata, index) => {
                return (
                  <td
                    className={`border border-1 border-blue-900 text-center font-semibold h-9`}
                    width={metadata.width}
                    key={index}
                  >
                    {metadata.name}
                  </td>
                );
              })}
              <td
                className={`border border-1 border-blue-900 text-center font-semibold h-9`}
              >
                Үйлдэл
              </td>
            </tr>
          </thead>
          <tbody>
            {users === null ? (
              <tr>
                <td
                  colSpan={metadatas.length + 1}
                  className={`border border-1 border-blue-900 text-center h-12 text-red-500`}
                >
                  Өгөгдөл олдсонгүй
                </td>
              </tr>
            ) : (
              users?.map((user, index) => {
                // console.log(user);
                return (
                  <tr
                    key={index}
                    className="text-center h-6 hover:bg-color-500"
                  >
                    {metadatas.map((metadata, index) => {
                      // console.log(metadata.field);
                      return metadata.field === "isAgreement" ? (
                        user[metadata.field] === false ? (
                          <td
                            key={index}
                            className="border border-1 border-blue-900 text-red-500"
                          >
                            Байгуулаагүй
                          </td>
                        ) : (
                          <td
                            key={index}
                            className="border border-1 border-blue-900 text-green-800"
                          >
                            Байгуулсан
                          </td>
                        )
                      ) : metadata.field === "permission" ? (
                        user[metadata.field] === null ? (
                          <td
                            key={index}
                            className="border border-1 border-blue-900"
                          >
                            -
                          </td>
                        ) : (
                          <td
                            key={index}
                            className="border border-1 border-blue-900"
                          >
                            {
                              permissions?.filter(
                                (p) => p.id === user[metadata.field]
                              )[0]?.name
                            }
                          </td>
                        )
                      ) : metadata.field === "segment" ? (
                        user[metadata.field] === null ? (
                          <td
                            key={index}
                            className="border border-1 border-blue-900"
                          >
                            -
                          </td>
                        ) : (
                          <td
                            key={index}
                            className="border border-1 border-blue-900"
                          >
                            {
                              products?.filter(
                                (p) => p.id === user[metadata.field]
                              )[0]?.segment
                            }
                          </td>
                        )
                      ) : (
                        <td
                          key={index}
                          className="border border-1 border-blue-900"
                        >
                          {user[metadata.field]}
                        </td>
                      );
                    })}
                    <td className="border border-1 border-blue-900">
                      <HiOutlinePencilAlt
                        className="m-auto cursor-pointer"
                        size={20}
                        onClick={() => handleClickEdit(user)}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

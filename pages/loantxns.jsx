import React, { useState, useEffect } from "react";
import thoud from "thousand_separator_number";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Sidebar from "@/components/Sidebar";
import AddButton from "@/components/AddButton";
import Modal from "@/components/Modal";
import { Transaction } from "@/functions/Transaction";

const LoanTxns = () => {
  const [data, setData] = useState(null);
  const [parameter, setParameter] = useState({
    action: null,
  });
  const transactions = Transaction("GET", null);

  const metadatas = [
    {
      name: "Гүйлгээний утга",
      width: "20%",
      align: "center",
      field: "unique",
      type: "number",
    },
    {
      name: "Гүйлгээний төрөл",
      width: "20%",
      align: "center",
      field: "txn_type",
      type: "text",
    },
    {
      name: "Гүйлгээний дүн",
      width: "20%",
      align: "right",
      field: "txn_amount",
      type: "number",
    },
    {
      name: "Гүйлгээний огноо",
      width: "20%",
      align: "center",
      field: "txn_date",
      type: "datetime",
    },
  ];

  const handleClickAdd = () => {
    setParameter({
      ...parameter,
      action: "add",
    });
    setData(null);
  };

  // const handleClickEdit = (data) => {
  //   setData(data);
  //   setParameter({
  //     ...parameter,
  //     action: "edit",
  //   });
  // };

  const handleClickCancel = () => {
    setParameter({
      ...parameter,
      action: null,
    });
    setData(null);
  };

  const handleClickSave = async () => {
    if (parameter.action === "add") {
      const result = await Transaction("POST", data);
    } else {
      const result = await Transaction("PUT", data);
    }

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
      <div className="p-7 flex-1 h-screen">
        <h1 className="text-2xl font-semibold text-blue-900 mb-7">
          Зээлийн гүйлгээнүүд
        </h1>
        <AddButton handleClickAdd={handleClickAdd} />
        {parameter.action === "add" || parameter.action == "edit" ? (
          <Modal
            handleClickCancel={handleClickCancel}
            handleClickSave={handleClickSave}
            title="transaction"
            action={parameter.action}
            metadatas={metadatas}
            datas={data}
            handleChangeValue={handleChangeValue}
          />
        ) : null}
        <table className="text-sm w-full" cellPadding={5} cellSpacing={0}>
          <thead>
            <tr className="text-center font-semibold h-16">
              {metadatas.map((metadata, index) => {
                return (
                  <td
                    className={`border border-1 border-blue-900`}
                    width={metadata.width}
                    key={index}
                  >
                    {metadata.name}
                  </td>
                );
              })}
              <td className={`border border-1 border-blue-900`}>Үйлдэл</td>
            </tr>
          </thead>
          <tbody>
            {transactions === undefined || transactions === null ? (
              <tr>
                <td
                  colSpan={metadatas.length + 1}
                  className={`border border-1 border-blue-900 text-center h-12 text-red-500`}
                >
                  Өгөгдөл олдсонгүй
                </td>
              </tr>
            ) : (
              transactions?.map((transaction, index) => {
                // console.log(transaction);
                return (
                  <tr key={index} className="h-6 hover:bg-color-500">
                    {metadatas.map((metadata, index) => {
                      // console.log(transaction[metadata.field]);
                      return metadata.field === "txn_amount" ? (
                        <td
                          key={index}
                          className={`border border-1 border-blue-900 ${
                            metadata.align === "right"
                              ? "text-right"
                              : "text-center"
                          }`}
                        >
                          {thoud(transaction[metadata.field])} MNT
                        </td>
                      ) : metadata.field === "txn_type" ? (
                        transaction[metadata.field] === "Approve" ? (
                          <td
                            key={index}
                            className={`border border-1 border-blue-900 ${
                              metadata.align === "right"
                                ? "text-right"
                                : "text-center"
                            }`}
                          >
                            Олголт
                          </td>
                        ) : transaction[metadata.field] === "Stretch" ? (
                          <td
                            key={index}
                            className={`border border-1 border-blue-900 ${
                              metadata.align === "right"
                                ? "text-right"
                                : "text-center"
                            }`}
                          >
                            Сунгалт
                          </td>
                        ) : (
                          <td
                            key={index}
                            className={`border border-1 border-blue-900 ${
                              metadata.align === "right"
                                ? "text-right"
                                : "text-center"
                            }`}
                          >
                            Төлөлт
                          </td>
                        )
                      ) : metadata.field === "lastname" ||
                        metadata.field === "firstname" ||
                        metadata.field === "register" ? (
                        <td
                          key={index}
                          className={`border border-1 border-blue-900 ${
                            metadata.align === "right"
                              ? "text-right"
                              : "text-center"
                          }`}
                        >
                          {
                            loans?.filter((l) => transaction.loan_id)[0][
                              metadata.field
                            ]
                          }
                        </td>
                      ) : (
                        <td
                          key={index}
                          className={`border border-1 border-blue-900 ${
                            metadata.align === "right"
                              ? "text-right"
                              : "text-center"
                          }`}
                        >
                          {transaction[metadata.field]}
                        </td>
                      );
                    })}
                    <td className="border border-1 border-blue-900">
                      <HiOutlinePencilAlt
                        className="m-auto cursor-pointer"
                        size={20}
                        // onClick={() => handleClickEdit(transaction)}
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

export default LoanTxns;

import React, { useState } from "react";
import thoud from "thousand_separator_number";
import { RxCrossCircled } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { Loan } from "@/functions/Loan";
import { LoanStatus } from "@/functions/LoanStatus";
import { Product } from "@/functions/Product";
import Sidebar from "@/components/Sidebar";
import MySearch from "@/components/MySearch";

const Loans = () => {
  const loans = Loan("GET", null);
  const products = Product("GET", null);
  const loanStatus = LoanStatus();
  const [search, setSearch] = useState(null);

  const metadatas = [
    {
      name: "#",
      width: "6%",
      align: "center",
      field: "unique",
      type: "number",
    },
    {
      name: "Овог",
      width: "7%",
      align: "center",
      field: "lastname",
      type: "text",
    },
    {
      name: "Нэр",
      width: "7%",
      align: "center",
      field: "firstname",
      type: "text",
    },
    {
      name: "Регистрийн дугаар",
      width: "7%",
      align: "center",
      field: "register",
      type: "text",
    },
    {
      name: "Утасны дугаар",
      width: "5%",
      align: "center",
      field: "mobile",
      type: "number",
    },
    {
      name: "Бүтээгдэхүүн",
      width: "6%",
      align: "center",
      field: "segment",
    },
    {
      name: "Зээлийн эрх",
      width: "6%",
      align: "right",
      field: "loan_amount",
      type: "number",
    },
    {
      name: "Авсан зээл",
      width: "5%",
      align: "right",
      field: "user_loan_amount",
      type: "number",
    },
    {
      name: "Хүсэлт илгээсэн огноо",
      width: "9%",
      align: "center",
      field: "created_datetime",
      type: "datetime",
    },
    {
      name: "Зээл олгосон огноо",
      width: "8%",
      align: "center",
      field: "loan_start_datetime",
      type: "datetime",
    },
    {
      name: "Зээл дуусах огноо",
      width: "6%",
      align: "center",
      field: "loan_end_date",
      type: "date",
    },
    {
      name: "Шимтгэл",
      width: "5%",
      align: "right",
      field: "user_loan_fee",
      type: "number",
    },
    {
      name: "Төлөв",
      width: "5%",
      align: "center",
      field: "loan_status",
      type: "text",
    },
    {
      name: "Поларис",
      width: "3%",
      align: "center",
      field: "polaris_registration",
    },
    {
      name: "Өмнөх #",
      width: "6%",
      align: "center",
      field: "prevUnique",
    },
  ];

  const handleLoanDecision = async (decision, loan) => {
    const result = await Loan("PUT", {
      decision,
      loan,
      prevLoanId: loans?.filter((l) => l.unique === loan.prevUnique)[0]?.id,
    });
  };

  const handleSearchValue = (event) => {
    event.preventDefault();

    setSearch(event.target.value);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-7 flex-1 h-screen">
        <h1 className="text-2xl font-semibold text-blue-900 mb-7">Зээлүүд</h1>
        <div className="flex justify-between items-center">
          <div className="my-2">&nbsp;</div>
          <MySearch
            value={search}
            onChange={(event) => handleSearchValue(event)}
          />
        </div>
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
            {loans === undefined || loans === null ? (
              <tr>
                <td
                  colSpan={metadatas.length + 1}
                  className={`border border-1 border-blue-900 text-center h-12 text-red-500`}
                >
                  Өгөгдөл олдсонгүй
                </td>
              </tr>
            ) : (
              loans
                ?.filter((el) => {
                  if (search !== null) {
                    return Object.values(el)
                      .join(" ")
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  } else {
                    return el;
                  }
                })
                .map((loan, index) => {
                  // console.log(loan);
                  return (
                    <tr key={index} className="h-6 hover:bg-color-500">
                      {metadatas.map((metadata, index) => {
                        // console.log(loan[metadata.field]);
                        return metadata.field === "polaris_registration" ? (
                          loan[metadata.field] === undefined ||
                          loan[metadata.field] === false ? (
                            <td
                              key={index}
                              className={`border border-1 border-blue-900 text-red-500 font-semibold ${
                                metadata.align === "right"
                                  ? "text-right"
                                  : "text-center"
                              }`}
                            >
                              Бүртгээгүй
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
                              Бүртгэсэн
                            </td>
                          )
                        ) : metadata.field === "segment" ? (
                          <td
                            key={index}
                            className={`border border-1 border-blue-900 ${
                              metadata.align === "right"
                                ? "text-right"
                                : "text-center"
                            }`}
                          >
                            {
                              products?.filter(
                                (p) => p.id === loan[metadata.field]
                              )[0]?.segment
                            }
                          </td>
                        ) : metadata.field === "loan_status" ? (
                          <td
                            key={index}
                            className={`border border-1 border-blue-900 ${
                              metadata.align === "right"
                                ? "text-right"
                                : "text-center"
                            } text-${
                              loanStatus?.filter(
                                (p) => p.id === loan[metadata.field]
                              )[0]?.color
                            }-500 font-semibold`}
                          >
                            {
                              loanStatus?.filter(
                                (p) => p.id === loan[metadata.field]
                              )[0]?.name
                            }
                          </td>
                        ) : metadata.field === "loan_amount" ||
                          metadata.field === "user_loan_amount" ||
                          metadata.field === "user_loan_fee" ? (
                          <td
                            key={index}
                            className={`border border-1 border-blue-900 ${
                              metadata.align === "right"
                                ? "text-right"
                                : "text-center"
                            }`}
                          >
                            {thoud(loan[metadata.field])}₮
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
                            {loan[metadata.field]}
                          </td>
                        );
                      })}
                      <td className="border border-1 border-blue-900">
                        {loan.loan_status === "gDhqtQGFYVmv5LR4C5R4" && (
                          <div className="flex flex-row justify-center">
                            {loan.prevUnique === undefined ||
                            loan.prevUnique === null ? (
                              <TiTick
                                className="m-auto cursor-pointer text-blue-500"
                                size={20}
                                onClick={() =>
                                  handleLoanDecision("Approve", loan)
                                }
                              />
                            ) : (
                              <TiTick
                                className="m-auto cursor-pointer text-blue-500"
                                size={20}
                                onClick={() =>
                                  handleLoanDecision("Stretch", loan)
                                }
                              />
                            )}
                            <RxCrossCircled
                              className="m-auto cursor-pointer text-red-500"
                              size={20}
                              onClick={() => handleLoanDecision("Cancel", loan)}
                            />
                          </div>
                        )}
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

export default Loans;

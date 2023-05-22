import React, { useState, useEffect } from "react";
import thoud from "thousand_separator_number";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Sidebar from "@/components/Sidebar";
import AddButton from "@/components/AddButton";
import Modal from "@/components/Modal";
import { Product } from "@/functions/Product";

const Products = () => {
  const [data, setData] = useState(null);
  const [parameter, setParameter] = useState({
    action: null,
  });
  const products = Product("GET", null);

  const metadatas = [
    { name: "Сегмент", width: "15%", align: "center", field: "segment" },
    {
      name: "Зээлийн хэмжээ",
      width: "10%",
      align: "right",
      field: "loan_amount",
      type: "number",
    },
    {
      name: "Доод хэмжээ",
      width: "12%",
      align: "right",
      field: "min_amount",
      type: "number",
    },
    {
      name: "Дээд хэмжээ",
      width: "12%",
      align: "right",
      field: "max_amount",
      type: "number",
    },
    {
      name: "Валют",
      width: "5%",
      align: "center",
      field: "currency",
      type: "text",
    },
    {
      name: "Үндсэн хүү, хувиар",
      width: "7%",
      align: "center",
      field: "interest",
      type: "number",
    },
    {
      name: "Шимтгэл, хувиар",
      width: "5%",
      align: "center",
      field: "fee",
      type: "number",
    },
    {
      name: "Өргөдлийн хураамж, төгрөгөөр",
      width: "5%",
      align: "right",
      field: "application_fee",
      type: "number",
    },
    {
      name: "Хугацаа, хоногоор",
      width: "5%",
      align: "center",
      field: "duration",
      type: "number",
    },
    {
      name: "Сунгалт, хоногоор",
      width: "5%",
      align: "center",
      field: "extension",
      type: "number",
    },
    {
      name: "Нэмэгдүүлсэн хүү, хувиар",
      width: "7%",
      align: "center",
      field: "pentalty_rate",
      type: "number",
    },
  ];

  const handleClickAdd = () => {
    setParameter({
      ...parameter,
      action: "add",
    });
    setData(null);
  };

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
    setData(null);
  };

  const handleClickSave = async () => {
    if (parameter.action === "add") {
      const result = await Product("POST", data);
    } else {
      const result = await Product("PUT", data);
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
          Бүтээгдэхүүнүүд
        </h1>
        <AddButton handleClickAdd={handleClickAdd} />
        {parameter.action === "add" || parameter.action == "edit" ? (
          <Modal
            handleClickCancel={handleClickCancel}
            handleClickSave={handleClickSave}
            title="product"
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
            {products === undefined || products === null ? (
              <tr>
                <td
                  colSpan={metadatas.length + 1}
                  className={`border border-1 border-blue-900 text-center h-12 text-red-500`}
                >
                  Өгөгдөл олдсонгүй
                </td>
              </tr>
            ) : (
              products?.map((product, index) => {
                // console.log(product);
                return (
                  <tr key={index} className="h-6 hover:bg-color-500">
                    {metadatas.map((metadata, index) => {
                      // console.log(product[metadata.field]);
                      return metadata.field === "loan_amount" ||
                        metadata.field === "max_amount" ||
                        metadata.field === "min_amount" ||
                        metadata.field === "application_fee" ? (
                        <td
                          key={index}
                          className={`border border-1 border-blue-900 ${
                            metadata.align === "right"
                              ? "text-right"
                              : "text-center"
                          }`}
                        >
                          {thoud(product[metadata.field])}
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
                          {product[metadata.field]}
                        </td>
                      );
                    })}
                    <td className="border border-1 border-blue-900">
                      <HiOutlinePencilAlt
                        className="m-auto cursor-pointer"
                        size={20}
                        onClick={() => handleClickEdit(product)}
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

export default Products;

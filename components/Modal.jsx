import React from "react";
import AcceptButton from "./AcceptButton";
import CancelButton from "./CancelButton";
import MyInput from "./MyInput";
import MySelect from "./MySelect";

const Modal = (props) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
      <div className="relative w-full max-w-[60%] max-h-full">
        <div className="relative bg-white rounded-lg border border-1 border-gray-500 shadow">
          {/* Гарчиг */}
          <div class="flex items-start justify-between py-3 px-6 rounded-t">
            <h3 class="text-xl font-semibold text-gray-900 my-1">
              {props.title === "product"
                ? "Бүтээгдэхүүн"
                : props.title === "user"
                ? "Хэрэглэгч"
                : props.title === "transaction"
                ? "Гүйлгээ"
                : null}
              {props.action === "add"
                ? " нэмэх"
                : props.action === "edit"
                ? " өөрчлөх"
                : null}
            </h3>
          </div>
          {/* Их бие */}
          <div className="py-3 px-6 space-y-6">
            {props.metadatas?.map((metadata, index) => {
              // console.log("METADATA: ", metadata.field);
              return metadata.field === "email" ? (
                <MyInput
                  name={metadata.field}
                  type={metadata.type}
                  onChange={(event) => props.handleChangeValue(event)}
                  label={metadata.name}
                  id={metadata.field}
                  value={
                    props.datas !== null ? props.datas[metadata.field] : ""
                  }
                  key={index}
                  disabled={true}
                />
              ) : props.title === "user" ? (
                metadata.field === "isAgreement" ||
                metadata.field === "permission" ||
                metadata.field === "segment" ? (
                  <MySelect
                    name={metadata.field}
                    onChange={(event) => props.handleChangeValue(event)}
                    label={metadata.name}
                    id={metadata.field}
                    key={index}
                    value={props.datas !== null && props.datas[metadata.field]}
                    disabled={false}
                  />
                ) : (
                  <MyInput
                    name={metadata.field}
                    type={metadata.type}
                    onChange={(event) => props.handleChangeValue(event)}
                    label={metadata.name}
                    id={metadata.field}
                    value={
                      props.datas !== null ? props.datas[metadata.field] : ""
                    }
                    key={index}
                    disabled={false}
                  />
                )
              ) : props.title === "transaction" ? (
                metadata.field === "txn_type" ? (
                  <MySelect
                    name={metadata.field}
                    onChange={(event) => props.handleChangeValue(event)}
                    label={metadata.name}
                    id={metadata.field}
                    key={index}
                    value={props.datas !== null && props.datas[metadata.field]}
                    disabled={false}
                  />
                ) : metadata.field !== "txn_date" ? (
                  <MyInput
                    name={metadata.field}
                    type={metadata.type}
                    onChange={(event) => props.handleChangeValue(event)}
                    label={metadata.name}
                    id={metadata.field}
                    value={
                      props.datas !== null ? props.datas[metadata.field] : ""
                    }
                    key={index}
                    disabled={false}
                  />
                ) : null
              ) : (
                <MyInput
                  name={metadata.field}
                  type={metadata.type}
                  onChange={(event) => props.handleChangeValue(event)}
                  label={metadata.name}
                  id={metadata.field}
                  value={
                    props.datas !== null ? props.datas[metadata.field] : ""
                  }
                  key={index}
                  disabled={false}
                />
              );
            })}
          </div>
          {/* Товчнууд */}
          <div class="flex items-center py-3 px-6 space-x-2 rounded-b">
            <AcceptButton handleClickSave={props.handleClickSave} />
            <CancelButton handleClickCancel={props.handleClickCancel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

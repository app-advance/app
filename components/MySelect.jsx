import React from "react";
import { Permission } from "@/functions/Permission";
import { Product } from "@/functions/Product";

const MySelect = ({ id, value, onChange, label, action, name, disabled }) => {
  const permissions = Permission();
  const products = Product("GET", null);

  return (
    <div className="relative">
      <select
        className={`border-b border-b-1 border-b-gray-600 block px-3 ${
          action === "login"
            ? "mb-6 pb-1 pt-5 text-md"
            : "pt-1 mb-6 pb-0 text-sm"
        } w-full  text-neutral-700 appearance-none focus:outline-none focus: ring-0 peer`}
        placeholder=" "
        id={id}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
      >
        <option value={null}>Сонгоно уу</option>
        {name === "isAgreement" ? (
          value ? (
            <>
              <option value={true} selected>
                Байгуулсан
              </option>
              <option value={false}>Байгуулаагүй</option>
            </>
          ) : (
            <>
              <option value={true}>Байгуулсан</option>
              <option value={false} selected>
                Байгуулаагүй
              </option>
            </>
          )
        ) : name === "permission" ? (
          permissions !== undefined &&
          permissions !== null &&
          permissions?.map((permission, index) => {
            return permission.id === value ? (
              <option value={permission.id} key={index} selected>
                {permission.name}
              </option>
            ) : (
              <option value={permission.id} key={index}>
                {permission.name}
              </option>
            );
          })
        ) : name === "segment" ? (
          products !== undefined &&
          products !== null &&
          products?.map((product, index) => {
            return product.id === value ? (
              <option value={product.id} key={index} selected>
                {product.segment}
              </option>
            ) : (
              <option value={product.id} key={index}>
                {product.segment}
              </option>
            );
          })
        ) : name === "txn_type" ? (
          <>
            <option value="Pay">Хэсэгчилсэн төлөлт</option>
            <option value="Close">Зээл хаалт</option>
          </>
        ) : null}
      </select>
      <label
        htmlFor={id}
        className={`absolute text-zinc-400 duration-150 transform -translate-y-3 scale-75 ${
          action === "login" ? "pt-4 -top-1 text-md" : "pt-2 -top-2.5 text-sm"
        } left-3 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3`}
      >
        {label}
      </label>
    </div>
  );
};

export default MySelect;

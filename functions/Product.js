import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../firebase";

export const Product = (method, datas) => {
  const collectionRef = collection(database, "products");

  if (method === "POST") {
    addDoc(collectionRef, {
      application_fee: Number(datas.application_fee),
      currency: datas.currency,
      duration: Number(datas.duration),
      extension: Number(datas.extension),
      fee: Number(datas.fee),
      interest: Number(datas.interest),
      loan_amount: Number(datas.loan_amount),
      min_amount: Number(datas.min_amount),
      max_amount: Number(datas.max_amount),
      pentalty_rate: Number(datas.pentalty_rate),
      segment: datas.segment,
    })
      .then((result) => {
        // console.log("ADD_PRODUCT_RESULT: ", result);
        alert("Бүтээгдэхүүн бүртгэгдлээ.");
      })
      .catch((error) => {
        // console.log("ADD_PRODUCT_ERROR: ", error);
        alert("Бүтээгдэхүүн бүртгэхэд алдаа гарлаа.");
      });

    return null;
  } else if (method === "PUT") {
    const docUpdate = doc(database, "products", datas.id);
    updateDoc(docUpdate, {
      application_fee: Number(datas.application_fee),
      currency: datas.currency,
      duration: Number(datas.duration),
      extension: Number(datas.extension),
      fee: Number(datas.fee),
      interest: Number(datas.interest),
      loan_amount: Number(datas.loan_amount),
      min_amount: Number(datas.min_amount),
      max_amount: Number(datas.max_amount),
      pentalty_rate: Number(datas.pentalty_rate),
      segment: datas.segment,
    })
      .then((result) => {
        // console.log("ADD_PRODUCT_RESULT: ", result);
        alert("Бүтээгдэхүүн өөрчлөгдлөө.");
      })
      .catch((error) => {
        // console.log("ADD_PRODUCT_ERROR: ", error);
        alert("Бүтээгдэхүүн өөрчлөхөд алдаа гарлаа.");
      });

    return null;
  } else if (method === "GET") {
    const [products, setProducts] = useState();
    useEffect(() => {
      const productQuery = query(collectionRef, orderBy("loan_amount", "asc"));
      onSnapshot(productQuery, (res) => {
        setProducts(
          res.docs?.map((data) => {
            return { ...data?.data(), id: data.id };
          })
        );
      });
    }, []);

    return products;
  }
};

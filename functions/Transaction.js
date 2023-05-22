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
import moment from "moment";

export const Transaction = (method, datas) => {
  const collectionRef = collection(database, "loantxns");
  const currentDate = moment()
    .utcOffset("+08:00")
    .format("YYYY-MM-DD HH:MM:SS");

  if (method === "POST") {
    addDoc(collectionRef, {
      txn_amount: Number(datas.txn_amount),
      txn_date: currentDate,
      txn_type: datas.txn_type,
      unique: Number(datas.unique),
      user: datas.user,
    })
      .then((result) => {
        // console.log("ADD_PRODUCT_RESULT: ", result);
        alert("Гүйлгээ бүртгэгдлээ.");
      })
      .catch((error) => {
        // console.log("ADD_PRODUCT_ERROR: ", error);
        alert("Гүйлгээ бүртгэхэд алдаа гарлаа.");
      });

    return null;
    // } else if (method === "PUT") {
    //   const docUpdate = doc(database, "products", datas.id);
    //   updateDoc(docUpdate, {
    //     application_fee: Number(datas.application_fee),
    //     currency: datas.currency,
    //     duration: Number(datas.duration),
    //     extension: Number(datas.extension),
    //     fee: Number(datas.fee),
    //     interest: Number(datas.interest),
    //     loan_amount: Number(datas.loan_amount),
    //     min_amount: Number(datas.min_amount),
    //     max_amount: Number(datas.max_amount),
    //     pentalty_rate: Number(datas.pentalty_rate),
    //     segment: datas.segment,
    //   })
    //     .then((result: any) => {
    //       // console.log("ADD_PRODUCT_RESULT: ", result);
    //       alert("Бүтээгдэхүүн өөрчлөгдлөө.");
    //     })
    //     .catch((error) => {
    //       // console.log("ADD_PRODUCT_ERROR: ", error);
    //       alert("Бүтээгдэхүүн өөрчлөхөд алдаа гарлаа.");
    //     });

    //   return null;
  } else if (method === "GET") {
    const [transactions, setTransactions] = useState();
    useEffect(() => {
      const transactionQuery = query(collectionRef, orderBy("txn_date", "asc"));
      onSnapshot(transactionQuery, (res) => {
        setTransactions(
          res.docs?.map((data) => {
            return { ...data?.data(), id: data.id };
          })
        );
      });
    }, []);

    return transactions;
  }
};

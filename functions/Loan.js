import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  orderBy,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import moment from "moment";
import { database } from "../firebase";

export const Loan = (method, data) => {
  const collectionRef = collection(database, "loans");
  const collectionRefTxn = collection(database, "loantxns");

  if (method === "GET") {
    const [loans, setLoans] = useState();
    useEffect(() => {
      const loanQuery = query(
        collectionRef,
        orderBy("created_datetime", "desc")
      );
      onSnapshot(loanQuery, (res) => {
        setLoans(
          res.docs?.map((data) => {
            return { ...data?.data(), id: data.id };
          })
        );
      });
    }, []);

    return loans;
  } else if (method === "PUT") {
    const docUpdate = doc(database, "loans", data.loan.id);
    const currentDate = moment().utcOffset("+08:00").format("YYYY-MM-DD HH:MM");
    const txnDate = moment().utcOffset("+08:00").format("YYYY-MM-DD HH:MM:SS");
    const endDate = moment()
      .utcOffset("+08:00")
      .add(30, "days")
      .format("YYYY-MM-DD");

    if (data.decision === "Cancel") {
      updateDoc(docUpdate, {
        loan_status: "M2SMvrwkGjzMM0avAaBI",
        loan_end_date: currentDate,
      })
        .then((result) => {
          alert("Зээлийн хүсэлт цуцлагдлаа.");
        })
        .catch((error) => {
          alert("Зээлийн хүсэлт цуцлахад алдаа гарлаа.");
        });
    } else if (data.decision === "Approve") {
      updateDoc(docUpdate, {
        loan_status: "6KkSosdjxnZkBJwYq1fy",
        loan_start_datetime: currentDate,
        loan_end_date: endDate,
        polaris_registration: true,
      })
        .then((result) => {
          addDoc(collectionRefTxn, {
            txn_type: data.decision,
            txn_amount: Number(data.loan.user_loan_amount),
            txn_date: txnDate,
            unique: Number(data.loan.unique),
            user: data.loan.user,
          })
            .then((result) => {
              alert("Зээл олгогдож, олголтын гүйлгээ бичигдлээ.");
            })
            .catch((error) => {
              alert("Зээл олголтын гүйлгээ бичихэд алдаа гарлаа.");
            });
        })
        .catch((error) => {
          alert("Зээл олгоход алдаа гарлаа.");
        });
    } else if (data.decision === "Stretch") {
      const docUpdate = doc(database, "loans", data.loan.id);
      const prevDocUpdate = doc(database, "loans", data.prevLoanId);
      const currentDate = moment()
        .utcOffset("+08:00")
        .format("YYYY-MM-DD HH:MM");
      const txnDate = moment()
        .utcOffset("+08:00")
        .format("YYYY-MM-DD HH:MM:SS");
      const endDate = moment()
        .utcOffset("+08:00")
        .add(30, "days")
        .format("YYYY-MM-DD");

      // Сунгах зээлийн хүсэлтийг Олгогдсон төлөвт шилжүүлэх
      updateDoc(docUpdate, {
        loan_status: "6KkSosdjxnZkBJwYq1fy",
        loan_start_datetime: currentDate,
        loan_end_date: endDate,
      })
        .then((result) => {
          // Сунгах зээлийн хүсэлтийн Сунгасан гүйлгээг бүртгэх
          addDoc(collectionRefTxn, {
            loan_id: data.loan.id,
            user_id: data.loan.user,
            txn_type: data.decision,
            txn_amount: Number(data.loan.user_loan_amount),
            txn_date: txnDate,
            unique: Number(data.loan.unique),
          })
            .then((result) => {
              // Үндсэн зээлийн төлвийг Сунгасан төлөвт шилжүүлэх
              updateDoc(prevDocUpdate, {
                loan_status: "r91BWlhc9ySSpIXhhJGj",
              })
                .then((result) => {
                  alert(
                    "Зээлийн хугацаа сунгагдаж, олголтын гүйлгээ бичигдлээ."
                  );
                })
                .catch((error) => {
                  alert("Зээл сунгалтын гүйлгээ бичихэд алдаа гарлаа.");
                });
            })
            .catch((error) => {
              alert("Зээл сунгалтын гүйлгээ бичихэд алдаа гарлаа.");
            });
        })
        .catch((error) => {
          alert("Зээлийн хугацаа сунгахад алдаа гарлаа.");
        });
    }

    return null;
  }
};

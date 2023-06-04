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
    const currentDate = new Date(Date.now());
    const txnDate = new Date(Date.now());
    const endDate = new Date(Date.now() + 29 * 24 * 60 * 60 * 1000);

    if (data.decision === "Cancel") {
      updateDoc(docUpdate, {
        loan_status: "M2SMvrwkGjzMM0avAaBI",
        loan_end_date: Date.parse(currentDate),
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
        loan_start_datetime: Date.parse(currentDate),
        loan_end_date: Date.parse(endDate),
        polaris_registration: true,
      })
        .then((result) => {
          addDoc(collectionRefTxn, {
            txn_type: data.decision,
            txn_amount: Number(data.loan.user_loan_amount),
            txn_date: Date.parse(txnDate),
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
      const currentDate = new Date(Date.now());
      const txnDate = new Date(Date.now());
      const endDate = new Date(Date.now() + 29 * 24 * 60 * 60 * 1000);

      // Сунгах зээлийн хүсэлтийг Олгогдсон төлөвт шилжүүлэх
      updateDoc(docUpdate, {
        loan_status: "6KkSosdjxnZkBJwYq1fy",
        loan_start_datetime: Date.parse(currentDate),
        loan_end_date: Date.parse(endDate),
      })
        .then((result) => {
          // Сунгах зээлийн хүсэлтийн Сунгасан гүйлгээг бүртгэх
          addDoc(collectionRefTxn, {
            // loan: data.loan.id,
            user: data.loan.user,
            txn_type: data.decision,
            txn_amount: Number(data.loan.user_loan_amount),
            txn_date: Date.parse(txnDate),
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
    } else if (data.decision === "Close") {
      const docUpdate = doc(database, "loans", data.loan.id);
      updateDoc(docUpdate, {
        loan_status: "hrCkW7hb3o2JI9r5OeYg",
      })
        .then((result) => {
          alert(data.loan.unique + ` дугаартай зээл хаагдлаа.`);
        })
        .catch((error) => {
          alert(
            data.loan.unique +
              ` дугаартай зээл хаахад алдаа гарлаа. Хаалтын гүйлгээ хийгдсэн бол гараар зээлийг хаана уу.`
          );
        });
    }

    return null;
  }
};

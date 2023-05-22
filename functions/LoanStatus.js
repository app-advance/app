import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";

export const LoanStatus = () => {
  const [loanStatus, setLoanStatus] = useState(null);

  useEffect(() => {
    const collectionRef = collection(database, "loan_status");
    getDocs(collectionRef)
      .then((result) => {
        // console.log("useUser_Result: ", result);
        setLoanStatus(
          result.docs?.map((data) => {
            return { ...data?.data(), id: data.id };
          })
        );
      })
      .catch((error) => {
        // console.log("useUser_Error: ", error);
      });
  }, []);

  return loanStatus;
};

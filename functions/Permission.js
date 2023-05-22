import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";

export const Permission = () => {
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    const collectionRef = collection(database, "permissions");
    getDocs(collectionRef)
      .then((result) => {
        // console.log("useUser_Result: ", result);
        setPermissions(
          result.docs?.map((data) => {
            return { ...data?.data(), id: data.id };
          })
        );
      })
      .catch((error) => {
        // console.log("useUser_Error: ", error);
      });
  }, []);

  return permissions;
};

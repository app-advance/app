import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";

export const User = (method, data) => {
  if (method === "GET") {
    const [users, setUsers] = useState(null);
    useEffect(() => {
      const collectionRef = collection(database, "users");
      getDocs(collectionRef)
        .then((result) => {
          // console.log("useUser_Result: ", result);
          setUsers(
            result.docs?.map((data) => {
              return { ...data?.data(), id: data.id };
            })
          );
        })
        .catch((error) => {
          // console.log("useUser_Error: ", error);
        });
    }, []);

    return users;
  } else if (method === "PUT") {
    const docUpdate = doc(database, "users", data.id);
    updateDoc(docUpdate, data)
      .then((result) => {
        // console.log("ADD_PRODUCT_RESULT: ", result);
        alert("Харилцагчийн мэдээлэл өөрчлөгдлөө.");
      })
      .catch((error) => {
        // console.log("ADD_PRODUCT_ERROR: ", error);
        alert("Харилцагчийн мэдээлэл өөрчлөхөд алдаа гарлаа.");
      });

    return null;
  }
};

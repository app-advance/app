import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { clientAuth } from "../firebase";
import { useRouter } from "next/router";

import Spinner from "@/components/Spinner";
import MyInput from "@/components/MyInput";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    if (email !== null && password !== null) {
      setLoading(true);
      signInWithEmailAndPassword(clientAuth, email, password)
        .then((result) => {
          //   console.log("RESULT: ", result.user);
          setEmail(null);
          setPassword(null);
          setLoading(false);
          alert("Амжилттай нэвтэрлээ. Амжилт хүсье.");
        })
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          //   console.log("ERROR: ", error.message);
          setEmail(null);
          setPassword(null);
          setLoading(false);
          alert(
            "Имэйл эсвэл нууц үг буруу байна. Дахин оролдоно уу. Амжилт хүсье."
          );
        });
    } else {
      alert("Имэйл эсвэл нууц үгээ оруулна уу. Амжилт хүсье.");
    }
  };

  useEffect(() => {
    onAuthStateChanged(clientAuth, (data) => {
      if (data) {
        router.push("/");
      } else {
        router.push("/login");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-[100vh] w-full bg-sky-600 flex flex-col justify-center items-center overflow-hidden">
      <div className="bg-white w-96 h-96 rounded-lg px-6 py-10">
        <div className="text-sky-900 text-2xl font-semibold pb-4">НЭВТРЭХ</div>
        <div className="my-6">
          <MyInput
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            label="Имэйл хаяг"
            id="email"
            value={email}
            action="login"
          />
          <MyInput
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            label="Нууц үг"
            id="password"
            value={password}
            action="login"
          />
          <div className="flex justify-center">
            {loading ? (
              <Spinner />
            ) : (
              <button
                className="bg-sky-600 py-2 text-white rounded-md w-[50%] mt-10 transition"
                onClick={handleSubmit}
              >
                НЭВТРЭХ
              </button>
            )}
          </div>
        </div>
      </div>
      <p className="mt-3 text-white font-700 text-sm">Эдванс Кредит ББСБ ХХК</p>
    </div>
  );
};

export default Login;

// src/pages/SignupTest.js
import { useEffect } from "react";

const SignupTest = () => {
  useEffect(() => {
    const signupAndGetUser = async () => {
      // 1️⃣ Signup
      const signupRes = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: "123",
          username: "Alice",
          email: "alice@test.com",
          image: "url"
        })
      });
      const signupData = await signupRes.json();
      const token = signupData.token;

      // 2️⃣ Call protected route
      const userRes = await fetch("http://localhost:3000/api/user", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const userData = await userRes.json();
      console.log(userData);
    };

    signupAndGetUser();
  }, []);

  return <div>Check console for results</div>;
};

export default SignupTest;

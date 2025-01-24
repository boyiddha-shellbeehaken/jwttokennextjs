"use client";

import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { username, password };
    // const payload = {
    //   username: e.currentTarget.username.value,
    //   password: e.currentTarget.password.value,
    // };
    await axios.post("/api/auth/login", payload);

    // redirect the user to /dashboard
    router.push("/dashboard");
  };

  const handleGetToken = async () => {
    try {
      const response = await axios.get("/api/getToken");
      console.log(response.data);
    } catch (error) {
      // Use custom logging logic to suppress unnecessary UI alerts
      if (process.env.NODE_ENV !== "development") {
        console.error("Error logging out:", error);
      }
    }

    // Use custom logging logic to suppress unnecessary UI alerts
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/logout"); // Make GET request to the logout route
      //console.log(response.data.message); // Log the success message from the server
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="border rounded border-black"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border rounded border-black"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="p-2 bg-orange-600 text-white w-fit rounded"
        >
          LogIn
        </button>
      </form>
      <button onClick={() => handleGetToken()}>GetToken</button>
      <button onClick={() => handleLogout()}>Log Out</button>
    </div>
  );
}

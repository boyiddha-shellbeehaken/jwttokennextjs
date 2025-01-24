"use client";

import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const [isSuccess, setIsSuccess] = useState();
  const router = useRouter();

  async function getUser() {
    try {
      const { data } = await axios.get("/api/auth/me");

      return {
        user: data,
        error: null,
      };
    } catch (e) {
      const error = e;

      return {
        user: null,
        error,
      };
    }
  }

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        router.push("/");
        return;
      }

      // if the error did not happen, if everything is alright
      setIsSuccess(true);
    })();
  }, [router.push]);

  if (!isSuccess) {
    return <p>Loading...</p>;
  }
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/logout"); // Make GET request to the logout route
      console.log(response.data.message); // Log the success message from the server
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <main>
      <header>
        <Link href="/dashboard">Dashboard</Link>
        <br />
        <br />
        <Link href="/dashboard/settings">Settings</Link>
        <br />
      </header>
      {children}
      <button onClick={() => handleLogout()}>Logout</button>
    </main>
  );
}

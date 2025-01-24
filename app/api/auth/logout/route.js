import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req, res) {
  //const jwt = req.cookies.get("OurSiteJWT");
  //const jwt = req.cookies["OurSiteJWT"];
  const cookieStore = req.cookies;
  const jwt = cookieStore.get("OurSiteJWT")?.value;

  if (!jwt) {
    return NextResponse.json(
      { message: "Bro your are not already Logged In!" },
      { status: 401 } // Return a 401 Unauthorized status
    );
  } else {
    // //Provides methods to set or delete cookies in the response.
    // const response = NextResponse.json({ message: "Hello" });
    // response.cookies.set("token", "12345");
    // response.cookies.delete("token");
    // return response;
    try {
      //Create a response to log out
      const response = NextResponse.json(
        { message: "Successfully logged out" },
        { status: 200 }
      );
      const token = "OurSiteJWT";
      response.cookies.set(token, "", {
        httpOnly: true, // Make sure it's not accessible via JavaScript
        expires: new Date(0), // Expire the cookie immediately
        path: "/", // Ensure the path matches where the cookie was set
      });

      return response;
    } catch (error) {
      //console.error("Error in logout API route:", error);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}

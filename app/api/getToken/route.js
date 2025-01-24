import { NextResponse } from "next/server";

// This is a function to handle GET requests
export async function GET(req) {
  try {
    // Retrieve cookies from the request headers
    const cookieStore = req.cookies;
    const jwt = cookieStore.get("OurSiteJWT")?.value;

    //const jwt = req.cookies.get("OurSiteJWT");

    // Check if the JWT is present
    if (!jwt) {
      return NextResponse.json(
        { message: "Invalid Token" },
        { status: 401 } // Return a 401 Unauthorized status
      );
    }

    // JWT is valid (you may want to validate it further here)
    return NextResponse.json(
      { token: jwt, message: "JWT token retrieved successfully" },
      { status: 200 } // Return a 200 OK status
    );
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { message: "An error occurred." },
      { status: 500 } // Return a 500 Internal Server Error status
    );
  }
}

import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days;

export async function POST(request) {
  const payload = await request.json();

  const { username, password } = payload;

  if (username !== "admin" || password !== "admin") {
    return NextResponse.json(
      { message: "Unauthorized", success: false },
      { status: 401 }
    );
  }

  // Now S/He is a Valid User => create jwt token and save it
  // Always check this
  const secret = process.env.SECRET || "";

  // const token=jwt.sign(payload, secretKey, options)
  // payload => user data in object from, secretKey - A secret string used to sign the token, options- expiresIn: Set the token expiration time
  // const decoded = jwt.verify(token, secretKey);

  const token = sign({ username }, secret, { expiresIn: MAX_AGE });

  //Create a response to log in
  const response = NextResponse.json(
    { message: "Successfully logged In" },
    { status: 200 }
  );

  response.cookies.set("OurSiteJWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  return response;
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const formspreeEndpoint = "https://formspree.io/f/mqazrpdw";
  try {
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      console.log("Form submitted successfully");
      return NextResponse.json(
        { message: "Form submitted successfully" },
        { status: 200 }
      );
    } else {
      const errorData = await response.json();
      console.error("Formspree error:", errorData);
      return NextResponse.json(
        { error: "Failed to submit form", details: errorData },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Failed to submit form", details: "Unknown error" },
      { status: 500 }
    );
  }
}

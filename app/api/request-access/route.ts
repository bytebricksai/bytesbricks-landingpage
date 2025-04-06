import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // In a real app, you'd get the user's email from their session/auth
  const userEmail = "user@example.com"; // Placeholder email
  const { projectTitle } = await req.json();

  if (!projectTitle) {
    return NextResponse.json(
      { error: "Project title is required" },
      { status: 400 }
    );
  }

  const formspreeEndpoint = "https://formspree.io/f/mqazrpdw"; // Use YOUR Formspree endpoint
  const emailSubject = `Access Request: ${projectTitle}`;
  const emailMessage = `User with email ${userEmail} (placeholder) requested access to the project: ${projectTitle}.`;

  try {
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: emailSubject,
        email: userEmail, // Formspree requires an email field, using placeholder
        message: emailMessage,
        project: projectTitle, // Add project title as extra data
      }),
    });

    if (response.ok) {
      console.log("Access request submitted successfully for:", projectTitle);
      return NextResponse.json(
        { message: "Access request submitted successfully" },
        { status: 200 }
      );
    } else {
      const errorData = await response.json();
      console.error("Formspree error submitting access request:", errorData);
      return NextResponse.json(
        { error: "Failed to submit access request", details: errorData },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error submitting access request:", error);
    return NextResponse.json(
      { error: "Failed to submit access request", details: "Unknown error" },
      { status: 500 }
    );
  }
}

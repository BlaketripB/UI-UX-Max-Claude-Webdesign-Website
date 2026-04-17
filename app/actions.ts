"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email, and a short message.",
    };
  }

  if (!emailPattern.test(email)) {
    return { status: "error", message: "That email address looks off." };
  }

  if (message.length < 10) {
    return {
      status: "error",
      message: "Could you share a bit more about the project?",
    };
  }

  return {
    status: "success",
    message: "Thanks — we'll get back to you within one business day.",
  };
}

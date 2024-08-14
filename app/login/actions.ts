"use server";

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return formData.get("password") === "12345"
    ? { isSuccess: true }
    : {
        isSuccess: false,
        errors: ["wrong password"],
      };
}

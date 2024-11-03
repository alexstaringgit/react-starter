import { useState } from "react";

export const ValidationSignHook = (type = "", value = "") => {
  const initialValue = {
    nameError: false,
    emailError: false,
    passwordError: false,
    nameMessage: "",
    emailMessage: "",
    passwordMessage: "",
    name: "",
    email: "",
    password: "",
  };
  const [data, setData] = useState(initialValue);

  const validateInputs = (type = "", value = "") => {
    let errors =
      type === "all"
        ? { nameError: true, emailError: true, passwordError: true }
        : {
            nameError:
              type === "name" ? !value || value.length < 5 : data.nameError,
            emailError:
              type === "email"
                ? !value || !/\S+@\S+\.\S+/.test(value)
                : data.emailError,
            passwordError:
              type === "password"
                ? !value || value.length < 6
                : data.passwordError,
          };
    setData((prev) =>
      type.length > 2
        ? {
            ...prev,
            ...errors,
            name: type === "name" ? value : prev.name,
            email: type === "email" ? value : prev.email,
            password: type === "password" ? value : prev.password,
            nameMessage: errors.nameError ? "Name is required." : "",
            emailMessage: errors.emailError
              ? "Please enter a valid email address."
              : "",
            passwordMessage: errors.passwordError
              ? "Password must be at least 6 characters long."
              : "",
          }
        : { ...prev, ...initialValue }
    );
  };

  return [data, validateInputs];
};

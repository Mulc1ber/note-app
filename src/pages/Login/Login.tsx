import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants";
import { useAuth } from "@/hooks";
import { Button, Input } from "@mantine/core";
import styles from "./Login.module.css";

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export const Login = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const loginRef = useRef<LoginFormData>({ email: "", password: "" });

  const auth = useAuth();

  const from: string = location.state?.from || "/";

  const handleRedirect = (): void => {
    navigate(from, { replace: true });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    loginRef.current = { ...loginRef.current, [e.target.name]: e.target.value };
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loginRef.current.email) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(loginRef.current.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!loginRef.current.password) {
      newErrors.password = "Password is required";
    } else if (!PASSWORD_REGEX.test(loginRef.current.password)) {
      newErrors.password =
        "Password must be at least 6 characters with letters and numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setIsSubmitted(true);
    if (!validate()) return;

    if (!auth) return;
    auth.signin(loginRef.current, handleRedirect);
  };

  return (
    <div className={styles["login-container"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <label className={styles["login-label"]}>
          <span>Email:</span>
          <Input
            error={isSubmitted && errors.email}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          {isSubmitted && <div className={styles["error"]}>{errors.email}</div>}
        </label>
        <label className={styles["login-label"]}>
          <span>Password:</span>
          <Input
            error={isSubmitted && errors.password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          {isSubmitted && (
            <div className={styles["error"]}>{errors.password}</div>
          )}
        </label>
        <Button variant="filled" size="md" radius="md" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

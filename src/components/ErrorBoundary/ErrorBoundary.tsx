import React, { type ErrorInfo, type ReactNode } from "react";
import { Button } from "@mantine/core";
import styles from "./ErrorBoundary.module.css";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log(error.message);

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, error.message);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles["error-boundary"]}>
          <h2>Что-то пошло не так.</h2>
          <p>
            Проверьте подключение к интернету и попробуйте перезагрузить
            страницу.
          </p>
          <Button onClick={() => window.location.reload()}>
            Вернуться на главную страницу
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

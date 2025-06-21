import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context";
import { PrivateRoute } from "@/hoc";
import { Loading } from "@/components";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

const MainPage = lazy(() =>
  import("@/pages/MainPage/MainPage").then((module) => ({
    default: module.MainPage,
  }))
);

const Login = lazy(() =>
  import("@/pages/Login/Login").then((module) => ({
    default: module.Login,
  }))
);

const NotFound = lazy(() =>
  import("@/pages/NotFound/NotFound").then((module) => ({
    default: module.NotFound,
  }))
);

export const AppRouter = () => {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  );
};

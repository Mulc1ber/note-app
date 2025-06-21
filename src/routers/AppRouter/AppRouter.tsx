import { Route, Routes } from "react-router-dom";
import { Login, MainPage, NotFound } from "@/pages";
import { AuthProvider } from "@/context";
import { PrivateRoute } from "@/hoc";

export const AppRouter = () => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

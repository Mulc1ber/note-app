import React from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { UserProfile } from "../UserProfile/UserProfile";

export const AuthStatus: React.FC = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  const handleSignout = (): void => {
    if (!auth) return;
    auth.signout(() => {
      navigate("/");
    });
  };

  if (auth && auth.user === null) {
    return (
      <UserProfile
        userName={"Guest"}
        onClick={() => navigate("/login")}
        btnText={"Sign in"}
      />
    );
  } else if (auth && auth.user !== null) {
    const parseData = JSON.parse(auth.user);
    const userName = parseData.email.split("@")[0];

    return (
      <UserProfile
        userName={userName}
        onClick={handleSignout}
        btnText={"Sign out"}
      />
    );
  }
};

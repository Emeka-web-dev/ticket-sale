import React from "react";

type Props = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;

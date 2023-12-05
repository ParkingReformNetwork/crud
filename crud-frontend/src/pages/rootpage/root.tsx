import React, { FC, ReactNode } from "react";

interface RootpageProps {
  children: ReactNode;
  header: string;
}

const Rootpage: FC<RootpageProps> = ({ children, header }) => {
  return (
    <>
      {/* Have a header here */}
      {children}
      {/* Have a footer here */}
    </>
  );
};

export default Rootpage;

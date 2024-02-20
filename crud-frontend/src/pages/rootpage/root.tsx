import React, { FC, ReactNode } from "react";

interface RootpageProps {
  children: ReactNode;
  header: string;
}

const Rootpage: FC<RootpageProps> = ({ children, header }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Rootpage;

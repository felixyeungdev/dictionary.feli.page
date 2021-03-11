import React, { ReactNode } from "react";
import AppBar from "./AppBar";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <AppBar />
            {children}
        </>
    );
};

export default Layout;

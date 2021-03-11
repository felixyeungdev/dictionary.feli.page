import React from "react";
import { AppBar as AppBarBase } from "@felipage/react-ui";
import { HiOutlineBookOpen } from "react-icons/hi";
import { useRouter } from "next/router";

const AppBar = () => {
    const router = useRouter();

    const goHome = () => {
        router.push("/");
    };

    return (
        <AppBarBase
            title="Dictionary"
            Icon={HiOutlineBookOpen}
            onTitleClick={goHome}
        />
    );
};

export default AppBar;

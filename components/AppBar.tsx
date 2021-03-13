import React from "react";
import { AppBar as AppBarBase, IconButton, Tooltip } from "@felipage/react-ui";
import { HiOutlineBookOpen, HiOutlineCog } from "react-icons/hi";
import { useRouter } from "next/router";

const AppBar = () => {
    const router = useRouter();

    const goHome = () => {
        router.push("/");
    };

    const goSettings = () => {
        router.push("/settings");
    };

    return (
        <AppBarBase
            title="Dictionary"
            Icon={HiOutlineBookOpen}
            onTitleClick={goHome}
            actions={
                <>
                    <Tooltip label="Settings">
                        <IconButton Icon={HiOutlineCog} onClick={goSettings} />
                    </Tooltip>
                </>
            }
        />
    );
};

export default AppBar;

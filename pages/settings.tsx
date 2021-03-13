import { Button, Content } from "@felipage/react-ui";
import React from "react";
import { useLocalStorage } from "react-use";

const Settings = () => {
    const [history, , clearHistory] = useLocalStorage<string[]>(
        "search-history",
        []
    );

    return (
        <Content>
            <div className="mt-3">
                <h1>Settings</h1>
                <h2>Search History</h2>
                <p>{history?.length ?? 0} entries</p>
                <Button onClick={clearHistory}>Clear Search History</Button>
            </div>
        </Content>
    );
};

export default Settings;

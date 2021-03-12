import { Content, SlowTextField } from "@felipage/react-ui";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Word from "../components/Word";

interface Props {
    word?: string;
}

const IndexPage = ({ word }: Props) => {
    const [fetchedData, setFetchedData] = useState<object>();
    const router = useRouter();

    const onChange = async (value: string) => {
        if (!value) {
            if (router.pathname !== "/") router.push("/");
            setFetchedData(undefined);
            return;
        }

        if (
            router.query?.word === value.trim() &&
            fetchedData &&
            (fetchedData as any).word === value
        )
            return;

        if ((router.query?.word ?? "") !== value.trim())
            router.push(`/search/${value}`, undefined, { shallow: true });

        const response = await fetch(
            `https://api.feli.page/v1/words/define?word=${encodeURIComponent(
                value.toString()
            )}`
        );
        const json = await response.json();
        if (!json.word) json.word = value;
        setFetchedData(json);
    };

    useEffect(() => {
        onChange(word ?? "");
    }, [word]);

    return (
        <Content>
            <div className="mt-3">
                <SlowTextField
                    fullWidth
                    label="Word"
                    onChange={onChange}
                    value={word ?? ""}
                    placeholder="Start searching"
                />
            </div>
            <div className="mt-3">
                <Word data={fetchedData} />
            </div>
        </Content>
    );
};

export default IndexPage;

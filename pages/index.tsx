import { Content, SlowTextField } from "@felipage/react-ui";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Word from "../components/Word";
import { IWord } from "../interfaces/word";
import PageHead from "../components/PageHead";

interface Props {
    word?: string;
    data: IWord;
}

const IndexPage = ({ word, data }: Props) => {
    console.log(data);
    const router = useRouter();

    const onChange = async (value: string) => {
        if (!value) {
            if (router.pathname !== "/") router.push("/");
            return;
        }

        if (
            router.query?.word === value.trim() &&
            data &&
            (data as any).word === value
        )
            return;

        if ((router.query?.word ?? "") !== value.trim())
            router.push(`/search/${encodeURIComponent(value)}`, undefined, {});
    };

    useEffect(() => {
        onChange(word ?? "");
    }, [word]);

    return (
        <Content>
            <PageHead word={word} data={data} />
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
                <Word data={data} />
            </div>
        </Content>
    );
};

export default IndexPage;

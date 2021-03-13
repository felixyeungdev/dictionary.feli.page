import { Alert, Content, SlowDropdownTextField } from "@felipage/react-ui";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Word from "../components/Word";
import { IWord } from "../interfaces/word";
import PageHead from "../components/PageHead";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "react-use";

interface Props {
    word?: string;
    data: IWord;
}

const IndexPage = ({ word, data }: Props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [history, setHistory] = useLocalStorage<string[]>(
        "search-history",
        []
    );

    const onChange = async (value: string) => {
        console.log({ value });
        if (!value) {
            // if (router.pathname !== "/") router.push("/");
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

    useEffect(() => {
        if (word && word.trim() !== "" && data.success !== false) {
            setHistory(() => [...new Set([word, ...(history ?? [])])]);
        }
    }, [word, data]);

    useEffect(() => {
        let routeChangeStart = () => {
            setLoading(true);
        };
        let routeChangeComplete = () => {
            setLoading(false);
        };

        router.events.on("routeChangeStart", routeChangeStart);
        router.events.on("routeChangeComplete", routeChangeComplete);
        router.events.on("routeChangeError", routeChangeComplete);
        return () => {
            router.events.off("routeChangeStart", routeChangeStart);
            router.events.off("routeChangeComplete", routeChangeComplete);
            router.events.off("routeChangeError", routeChangeComplete);
        };
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <>
            <Content>
                <PageHead word={word} data={data} />
                <div className="mt-3">
                    <SlowDropdownTextField
                        fullWidth
                        label="Word"
                        onChange={onChange}
                        value={word ?? ""}
                        placeholder="Start searching"
                        ref={inputRef}
                        options={history ?? []}
                        id="search-history"
                    />
                </div>
                <div className="mt-3 mb-12">
                    <Word data={data} />
                </div>
            </Content>
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.1,
                            damping: 10,
                            stiffness: 100,
                        }}
                    >
                        <Alert fixed>Loading</Alert>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default IndexPage;

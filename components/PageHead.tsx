import React from "react";
import Head from "next/head";
import { IWord } from "../interfaces/word";

interface Props {
    word?: string;
    data?: IWord;
}

const PageHead = ({ word, data }: Props) => {
    const displayTitle = word ? `${word} | Dictionary` : "Dictionary";
    const definitions = data?.results
        ?.map(({ definition }, i) => `${i + 1}. ${definition}`)
        .join(" ");
    const description = definitions
        ? `${word} definition: ${definitions} | Dictionary`
        : "Dictionary";

    return (
        <Head>
            <meta name="twitter:title" content={displayTitle} />
            {/* <meta name="twitter:image" content="/assets/images/dictionary.png" /> */}
            <meta property="og:title" content={displayTitle} />
            {/* <meta property="og:image" content="/assets/images/dictionary.png" /> */}
            <title>{displayTitle}</title>
            {/* <link rel="icon" href="/favicon.png" /> */}
            {/* <link rel="manifest" href="/manifest.json" /> */}
            {/* <link rel="apple-touch-icon" href="/assets/images/dictionary.png" /> */}
            {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
            <meta name="description" content={description} />
            <meta name="theme-color" content="#000000" />

            <link
                rel="search"
                href="/open-search.xml"
                title="Feli Dictionary"
                type="application/opensearchdescription+xml"
            />
        </Head>
    );
};

export default PageHead;

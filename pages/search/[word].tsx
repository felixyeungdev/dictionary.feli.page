import { GetServerSideProps } from "next";

export { default } from "../index";

const getServerSideProps: GetServerSideProps = async (context) => {
    const word = context.params?.word.toString();
    let data;

    if (word) {
        const response = await fetch(
            `https://api.feli.page/v1/words/define?word=${encodeURIComponent(
                word
            )}`
        );
        const json = await response.json();
        data = json;
    }

    return {
        props: { word, data },
    };
};

export { getServerSideProps };

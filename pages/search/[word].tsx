import { GetStaticPaths, GetStaticProps } from "next";

export { default } from "../index";

const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

const getStaticProps: GetStaticProps = async (context) => {
    const word = context.params?.word.toString();

    return {
        props: { word },
    };
};

export { getStaticPaths, getStaticProps };

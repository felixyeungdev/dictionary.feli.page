import { Chip } from "@felipage/react-ui";
import { useRouter } from "next/router";
import React from "react";
import { IWord } from "../interfaces/word";
import dynamic from "next/dynamic";
const Speak = dynamic(() => import("./Speak"), { ssr: false });

interface Props {
    data?: any;
}

const Word = ({ data }: Props) => {
    const router = useRouter();

    if (!data) return <></>;
    const { word, message, pronunciation, syllables, results } = data as IWord;

    if ("success" in data && data.success === false) {
        return <>{message}</>;
    }

    const searchWord = (word: string) => {
        router.push(`/search/${encodeURI(word)}`, undefined, {
            shallow: false,
        });
    };

    return (
        <div>
            <article className="">
                <div className="flex items-center space-x-2">
                    <h1>{word}</h1>
                    <Speak word={word} />
                </div>
                <div className="flex space-x-2">
                    {pronunciation && (
                        <span>
                            {typeof pronunciation === "string"
                                ? pronunciation
                                : pronunciation.all}
                        </span>
                    )}
                    {syllables && <span>({syllables.list.join("-")})</span>}
                </div>
                {results && (
                    <div className="space-y-3">
                        {results.map(
                            ({
                                definition,
                                partOfSpeech,
                                synonyms = [],
                                antonyms = [],
                                examples = [],
                                similarTo = [],
                                // ...rest
                            }) => {
                                const similar = [...similarTo, ...synonyms];
                                const opposites = [...antonyms];
                                return (
                                    <div key={`${partOfSpeech}${definition}`}>
                                        <h1 className="text-lg italic">
                                            {partOfSpeech}
                                        </h1>
                                        <div className="ml-3 md:ml-6">
                                            <p>{definition}</p>
                                            <div className="text-gray-500">
                                                {examples.map((example) => (
                                                    <p key={example}>
                                                        "{example}"
                                                    </p>
                                                ))}
                                            </div>
                                            {similar.length > 0 && (
                                                <div className="flex items-start gap-3 mt-3">
                                                    <span className="mt-0.5 text-green-600">
                                                        Similar:
                                                    </span>
                                                    <div className="flex flex-wrap gap-3">
                                                        {similar.map(
                                                            (synonym) => (
                                                                <Chip
                                                                    key={
                                                                        synonym
                                                                    }
                                                                    onClick={() =>
                                                                        searchWord(
                                                                            synonym
                                                                        )
                                                                    }
                                                                >
                                                                    {synonym}
                                                                </Chip>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {opposites.length > 0 && (
                                                <div className="flex items-start gap-3 mt-3">
                                                    <span className="text-red-600 mt-0.5">
                                                        Opposite:
                                                    </span>
                                                    <div className="flex flex-wrap gap-3">
                                                        {opposites.map(
                                                            (antonym) => (
                                                                <Chip
                                                                    key={
                                                                        antonym
                                                                    }
                                                                    onClick={() =>
                                                                        searchWord(
                                                                            antonym
                                                                        )
                                                                    }
                                                                >
                                                                    {antonym}
                                                                </Chip>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                )}
            </article>
            {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
        </div>
    );
};

export default Word;

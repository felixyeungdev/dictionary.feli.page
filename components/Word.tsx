import { Chip } from "@felipage/react-ui";
import { useRouter } from "next/router";
import React from "react";
import { IWord } from "../interfaces/word";

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
                <h1>{word}</h1>
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
                <div className="space-y-3">
                    {results.map(
                        ({
                            definition,
                            partOfSpeech,
                            synonyms,
                            antonyms,
                            examples = [],
                        }) => {
                            return (
                                <div>
                                    <h1 className="text-lg italic">
                                        {partOfSpeech}
                                    </h1>
                                    <div className="ml-3">
                                        <p>{definition}</p>
                                        <div className="text-gray-500">
                                            {examples.map((example) => (
                                                <p>"{example}"</p>
                                            ))}
                                        </div>
                                        {synonyms && (
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-green-600">
                                                    Similar:
                                                </span>
                                                <div className="flex flex-wrap gap-3">
                                                    {synonyms.map((synonym) => (
                                                        <Chip
                                                            onClick={() =>
                                                                searchWord(
                                                                    synonym
                                                                )
                                                            }
                                                        >
                                                            {synonym}
                                                        </Chip>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {antonyms && (
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-green-600">
                                                    Opposite:
                                                </span>
                                                <div className="flex flex-wrap gap-3">
                                                    {antonyms.map((antonym) => (
                                                        <Chip
                                                            onClick={() =>
                                                                searchWord(
                                                                    antonym
                                                                )
                                                            }
                                                        >
                                                            {antonym}
                                                        </Chip>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </article>
            {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
        </div>
    );
};

export default Word;

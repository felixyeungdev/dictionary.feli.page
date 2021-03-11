interface IWordResult {
    definition: string;
    partOfSpeech: string;
    also?: string[];
    synonyms?: string[];
    attribute?: string[];
    similarTo?: string[];
    typeOf?: string[];
    hasTypes?: string[];
    antonyms?: string[];
    examples?: string[];
    derivation?: string[];
}

interface IWordSyllables {
    count: number;
    list: string[];
}
interface IWordPronunciation {
    all: string;
}

export interface IWord {
    success?: boolean;
    message?: string;
    word: string;
    results: IWordResult[];
    syllables?: IWordSyllables;
    pronunciation?: IWordPronunciation | string;
    frequency?: number;
}

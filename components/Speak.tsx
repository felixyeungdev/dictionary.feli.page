import { IconButton } from "@felipage/react-ui";
import React from "react";
import { HiVolumeUp } from "react-icons/hi";

interface Props {
    word?: string;
}

const Speak = ({ word }: Props) => {
    if (!("speechSynthesis" in window) || !word) return <></>;

    const speak = () => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = word;
        window.speechSynthesis.speak(msg);
    };

    return (
        <div className="">
            <IconButton Icon={HiVolumeUp} onClick={speak} />
        </div>
    );
};

export default Speak;

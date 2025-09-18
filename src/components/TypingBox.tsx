"use client";

import { useState, useEffect } from "react";

const sampleText: string = "The quick brown fox jumps over the lazy dog.";

export default function TypingBox() {
    const [input, setInput] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [finished, setFinished] = useState<boolean>(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            if (finished) return;

            if (!startTime) setStartTime(Date.now());

            const expected: string = sampleText[currentIndex];
            const typed: string = e.key;

            if (typed.length === 1) {
                setInput((prev: string) => prev + typed);
                setCurrentIndex((prev: number) => prev + 1);
            }

            if (currentIndex + 1 === sampleText.length) {
                setFinished(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, finished, startTime]);

    const correctChars: number = input
        .split("")
        .filter((ch: string, i: number) => ch === sampleText[i]).length;

    const accuracy: number =
        input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

    const wpm: number =
        finished && startTime
            ? Math.round((input.length / 5) / ((Date.now() - startTime) / 60000))
            : 0;

    return (
        <div className="max-w-xl mx-auto text-center p-6 border rounded-lg shadow bg-white dark:bg-gray-800">
            <p className="text-lg mb-4 leading-relaxed">
                {sampleText.split("").map((ch: string, i: number) => {
                    let color = "";
                    if (i < input.length) {
                        color = ch === input[i] ? "text-green-500" : "text-red-500";
                    }
                    return (
                        <span key={i} className={color}>
              {ch}
            </span>
                    );
                })}
            </p>
            {finished ? (
                <div className="mt-4">
                    <p>✅ Finished!</p>
                    <p>Accuracy: {accuracy}%</p>
                    <p>WPM: {wpm}</p>
                </div>
            ) : (
                <p className="text-gray-500">Start typing the sentence above...</p>
            )}
        </div>
    );
}

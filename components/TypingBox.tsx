"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function TypingBox() {
    const randomText = useQuery(api.texts.getRandomText);

    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!randomText?.content || finished) return;

            if (!startTime) setStartTime(Date.now());

            if (e.key === "Backspace") {
                setInput((prev) => prev.slice(0, -1));
            } else if (e.key.length === 1) {
                if (input.length < randomText.content.length) {
                    setInput((prev) => prev + e.key);
                    if (input.length + 1 === randomText.content.length) {
                        setFinished(true);
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [input, finished, startTime, randomText]);

    if (!randomText) {
        return (
            <div className="max-w-xl mx-auto text-center p-6 border rounded-lg shadow bg-white dark:bg-gray-800">
                <p className="text-gray-500">Loading text...</p>
            </div>
        );
    }

    const correctChars = input
        .split("")
        .filter((ch, i) => ch === randomText.content[i]).length;
    const mistakes = input.length - correctChars;
    const accuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;
    const wpm = startTime
        ? Math.round((input.length / 5) / ((Date.now() - startTime) / 60000))
        : 0;

    const restart = () => {
        setInput("");
        setStartTime(null);
        setFinished(false);
        // Convex query will automatically refresh with new random text
    };

    return (
        <div className="max-w-xl mx-auto text-center p-6 border rounded-lg shadow bg-white dark:bg-gray-800">
            <p className="text-lg mb-4 leading-relaxed">
                {randomText.content.split("").map((ch, i) => {
                    const isTyped = i < input.length;
                    const isCorrect = isTyped && ch === input[i];
                    let color = "";
                    if (isTyped) {
                        color = isCorrect ? "text-green-500" : "text-red-500";
                    }

                    return (
                        <motion.span
                            key={i}
                            className={color}
                            initial={{ opacity: 0.3, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {ch}
                        </motion.span>
                    );
                })}
            </p>

            <AnimatePresence>
                {finished ? (
                    <motion.div
                        key="results"
                        className="mt-4 space-y-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p>✅ Finished!</p>
                        <p>Accuracy: {accuracy}%</p>
                        <p>WPM: {wpm}</p>
                        <p>Mistakes: {mistakes}</p>
                        <button
                            onClick={restart}
                            className="mt-3 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                        >
                            Restart
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="stats"
                        className="text-gray-500 space-y-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <p>Start typing the sentence above...</p>
                        <p>Accuracy: {accuracy}% | WPM: {wpm} | Mistakes: {mistakes}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
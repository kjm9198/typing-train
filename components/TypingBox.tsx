"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sampleText = "The quick brown fox jumps over the lazy dog.";

export default function TypingBox() {
    const [input, setInput] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (finished) return;

            if (!startTime) setStartTime(Date.now());

            const expected = sampleText[currentIndex];
            const typed = e.key;

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

    const correctChars = input.split("").filter((ch, i) => ch === sampleText[i])
        .length;
    const accuracy =
        input.length > 0
            ? Math.round((correctChars / input.length) * 100)
            : 100;

    const wpm =
        finished && startTime
            ? Math.round((input.length / 5) / ((Date.now() - startTime) / 60000))
            : 0;

    return (
        <div className="max-w-xl mx-auto text-center p-6 border rounded-lg shadow bg-white dark:bg-gray-800">
            <p className="text-lg mb-4 leading-relaxed">
                {sampleText.split("").map((ch, i) => {
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
                            transition={{ duration: 0.2 }}
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
                        className="mt-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p>✅ Finished!</p>
                        <p>Accuracy: {accuracy}%</p>
                        <p>WPM: {wpm}</p>
                    </motion.div>
                ) : (
                    <motion.p
                        key="hint"
                        className="text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Start typing the sentence above...
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

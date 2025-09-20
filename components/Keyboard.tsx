"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const layout = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["ShiftLeft", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "ShiftRight"],
    ["Space"],
];

export default function Keyboard() {
    const [activeKey, setActiveKey] = useState<string | null>(null);

    useEffect(() => {
        const down = (e: KeyboardEvent) => setActiveKey(e.key.toUpperCase());
        const up = () => setActiveKey(null);

        window.addEventListener("keydown", down);
        window.addEventListener("keyup", up);

        return () => {
            window.removeEventListener("keydown", down);
            window.removeEventListener("keyup", up);
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-2 mt-6">
            {layout.map((row, i) => (
                <div key={i} className="flex gap-1">
                    {row.map((key, j) => (
                        <motion.div
                            key={`${key}-${i}-${j}`} // unique key now
                            className={`px-3 py-2 border rounded shadow text-sm font-bold 
                ${activeKey === key.toUpperCase() ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                            whileTap={{ scale: 0.95 }}
                        >
                            {key.replace("Left", "").replace("Right", "")} {/* Show clean label */}
                        </motion.div>
                    ))}
                </div>
            ))}
        </div>
    );
}
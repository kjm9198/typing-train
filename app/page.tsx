import TypingBox from "../components/TypingBox";
import Keyboard from "../components/Keyboard";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-6">Typing Trainer MVP 🎹</h1>
            <TypingBox />
            <Keyboard />
        </main>
    );
}

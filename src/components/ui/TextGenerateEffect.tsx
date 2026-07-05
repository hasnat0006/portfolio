"use client";

import { useEffect, useState } from "react";

export default function TextGenerateEffect({
  words,
  className = "",
  delay = 40,
}: {
  words: string;
  className?: string;
  delay?: number;
}) {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const wordArray = words.split(" ");

  useEffect(() => {
    // Reset displayed words — this is intentional for animation sequencing
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedWords([]);
    const timers: ReturnType<typeof setTimeout>[] = [];

    wordArray.forEach((_, i) => {
      const timer = setTimeout(() => {
        setDisplayedWords((prev) => [...prev, wordArray[i]]);
      }, i * delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, delay]);

  return (
    <span className={className}>
      {wordArray.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block mr-1.5 transition-opacity duration-300"
          style={{
            opacity: i < displayedWords.length ? 1 : 0.1,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

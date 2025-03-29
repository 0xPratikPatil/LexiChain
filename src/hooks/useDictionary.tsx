
import { useState } from "react";
import { toast } from "sonner";

export interface WordDefinition {
  word: string;
  languageCode: string;
  partOfSpeech: string;
  phonetic: string;
  definition: string;
  example: string[];
}

export function useDictionary() {
  const [isLoading, setIsLoading] = useState(false);
  const [wordData, setWordData] = useState<WordDefinition | null>(null);

  const lookupWord = async (word: string, languageCode: string) => {
    if (!word.trim()) {
      toast.error("Please enter a word to search");
      return;
    }

    setIsLoading(true);
    setWordData(null);

    try {
      const response = await fetch(
        `http://localhost:8000/word/${encodeURIComponent(word)}?language_code=${languageCode}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          toast.error(`No definition found for "${word}"`);
        } else {
          toast.error("Error fetching definition. Please try again.");
        }
        return;
      }

      const data = await response.json();
      setWordData(data);
    } catch (error) {
      console.error("Dictionary API error:", error);
      toast.error("Failed to connect to dictionary service");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    lookupWord,
    isLoading,
    wordData,
  };
}

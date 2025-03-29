
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import WordDefinition from "@/components/WordDefinition";
import ExamplesList from "@/components/ExamplesList";
import LoadingSpinner from "@/components/LoadingSpinner";
import ThemeToggle from "@/components/ThemeToggle";
import { useDictionary } from "@/hooks/useDictionary";
import { Book } from "lucide-react";

const Index = () => {
  const { lookupWord, isLoading, wordData } = useDictionary();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (word: string, languageCode: string) => {
    setHasSearched(true);
    lookupWord(word, languageCode);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="dictionary-container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Book className="h-7 w-7 text-primary" />
            <h1 className="text-2xl md:text-3xl font-serif">Wordly</h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="search-container">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {isLoading && <LoadingSpinner />}

        {!isLoading && wordData && (
          <div className="results-container space-y-6">
            <WordDefinition data={wordData} />
            <ExamplesList examples={wordData.example} />
          </div>
        )}

        {!isLoading && hasSearched && !wordData && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-muted-foreground mb-2">
              <Book className="h-12 w-12 mx-auto opacity-30" />
            </div>
            <h3 className="text-xl mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try another word or check your spelling
            </p>
          </div>
        )}

        {!hasSearched && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-primary/20 mb-4">
              <Book className="h-20 w-20 mx-auto" />
            </div>
            <h2 className="text-2xl mb-2">Dictionary Lookup</h2>
            <p className="text-muted-foreground max-w-md">
              Enter a word in the search box above and select a language to see its definition, pronunciation, and examples.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

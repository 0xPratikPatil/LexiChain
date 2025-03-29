
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import WordDefinition from "@/components/WordDefinition";
import ExamplesList from "@/components/ExamplesList";
import LoadingSpinner from "@/components/LoadingSpinner";
import ThemeToggle from "@/components/ThemeToggle";
import { useDictionary } from "@/hooks/useDictionary";
import { Book, Globe, Sparkles, Brain, Languages, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const languageExamples = [
  "English", "Spanish", "French", "German", 
  "Hindi", "Chinese", "Japanese", "Russian",
  "Arabic", "Portuguese", "Korean", "Italian"
];

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
            <h1 className="text-2xl md:text-3xl font-serif">LexiChain</h1>
          </div>
          <ThemeToggle />
        </div>

        {!hasSearched && !isLoading && (
          <div className="space-y-16 animate-fade-in">
            <section className="hero-section">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 font-bold">
                <span className="gradient-text">AI-Powered Dictionary</span>
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-foreground/80">
                Discover precise definitions, pronunciations, and context-rich examples in multiple languages
                powered by advanced language models.
              </p>
              <div className="search-container">
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-serif mb-4 text-center">Why LexiChain?</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-card/60 p-6 rounded-lg shadow-sm">
                  <h4 className="text-xl font-medium mb-3 text-primary">AI-Driven Understanding</h4>
                  <p className="text-foreground/80">
                    Unlike traditional dictionaries, LexiChain leverages large language models to provide context-aware definitions that adapt to modern language usage.
                  </p>
                </div>
                <div className="bg-card/60 p-6 rounded-lg shadow-sm">
                  <h4 className="text-xl font-medium mb-3 text-primary">Beyond Translation</h4>
                  <p className="text-foreground/80">
                    Our AI doesn't just translate — it understands cultural nuances and provides appropriate examples in each language.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-serif mb-8 text-center">Global Language Support</h3>
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {languageExamples.map((language, index) => (
                  <span key={index} className="language-pill">
                    {language}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-serif mb-8 text-center">Key Features</h3>
              <div className="features-section">
                <div className="feature-card">
                  <div className="mb-4 text-secondary">
                    <Globe className="h-10 w-10 mx-auto" />
                  </div>
                  <h4 className="text-xl font-serif mb-2 text-center">Multilingual Support</h4>
                  <p className="text-center text-foreground/80">
                    Get accurate definitions in multiple languages with native support.
                  </p>
                </div>
                
                <div className="feature-card">
                  <div className="mb-4 text-secondary">
                    <Brain className="h-10 w-10 mx-auto" />
                  </div>
                  <h4 className="text-xl font-serif mb-2 text-center">LLM Powered</h4>
                  <p className="text-center text-foreground/80">
                    Utilizing advanced AI language models for context-aware definitions.
                  </p>
                </div>
                
                <div className="feature-card">
                  <div className="mb-4 text-secondary">
                    <BookOpen className="h-10 w-10 mx-auto" />
                  </div>
                  <h4 className="text-xl font-serif mb-2 text-center">Rich Examples</h4>
                  <p className="text-center text-foreground/80">
                    Learn through contextual examples that illustrate real-world usage.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-10 px-4 bg-accent/10 rounded-xl">
              <h3 className="text-2xl font-serif mb-6 text-center">How It Works</h3>
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="flex flex-col items-center max-w-[250px]">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">1</div>
                  <h4 className="text-lg font-medium mb-2">Enter a word</h4>
                  <p className="text-center text-sm">Type any word or phrase you want to understand.</p>
                </div>
                <div className="flex flex-col items-center max-w-[250px]">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">2</div>
                  <h4 className="text-lg font-medium mb-2">Select language</h4>
                  <p className="text-center text-sm">Choose from 12+ supported languages.</p>
                </div>
                <div className="flex flex-col items-center max-w-[250px]">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">3</div>
                  <h4 className="text-lg font-medium mb-2">Get insights</h4>
                  <p className="text-center text-sm">Receive comprehensive definitions and contextual examples.</p>
                </div>
              </div>
            </section>

            <section className="text-center py-10">
              <h3 className="text-2xl font-serif mb-6">Ready to explore?</h3>
              <p className="text-foreground/70 mb-6">
                Start by typing a word in the search bar above and selecting a language.
              </p>
              <Button 
                onClick={() => document.querySelector('input')?.focus()} 
                className="bg-primary hover:bg-primary/90"
              >
                Try LexiChain Now
              </Button>
            </section>
          </div>
        )}

        <div className="search-container mt-8">
          {hasSearched && <SearchBar onSearch={handleSearch} isLoading={isLoading} />}
        </div>

        {isLoading && <LoadingSpinner />}

        {!isLoading && wordData && (
          <div className="results-container space-y-6">
            <WordDefinition data={wordData} />
            <ExamplesList examples={wordData.example} />
            <Button 
              variant="outline" 
              onClick={() => setHasSearched(false)}
              className="w-full mt-8"
            >
              Back to Home
            </Button>
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
            <Button 
              variant="outline" 
              onClick={() => setHasSearched(false)}
              className="mt-6"
            >
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

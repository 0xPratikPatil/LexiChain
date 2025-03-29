
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (word: string, languageCode: string) => void;
  isLoading: boolean;
}

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "hi", name: "Hindi" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ru", name: "Russian" },
];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [word, setWord] = useState("");
  const [languageCode, setLanguageCode] = useState("en");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(word.trim(), languageCode);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Enter a word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="pr-10 h-12"
            autoFocus
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
        </div>
        
        <Select value={languageCode} onValueChange={setLanguageCode}>
          <SelectTrigger className="w-full md:w-[180px] h-12">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language.code} value={language.code}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button type="submit" className="h-12" disabled={isLoading || !word.trim()}>
          {isLoading ? "Searching..." : "Look Up"}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;

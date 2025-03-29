
import React from "react";
import { WordDefinition as WordDefinitionType } from "@/hooks/useDictionary";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WordDefinitionProps {
  data: WordDefinitionType;
}

const WordDefinition: React.FC<WordDefinitionProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 bg-primary/5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-3xl font-serif">{data.word}</h2>
            <div className="phonetic text-sm">{data.phonetic}</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-normal text-xs">
              {data.languageCode.toUpperCase()}
            </Badge>
            <Badge className="font-normal">{data.partOfSpeech}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="definition-text">{data.definition}</div>
      </CardContent>
    </Card>
  );
};

export default WordDefinition;

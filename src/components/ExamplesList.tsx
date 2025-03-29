
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface ExamplesListProps {
  examples: string[];
}

const ExamplesList: React.FC<ExamplesListProps> = ({ examples }) => {
  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <Card className="overflow-hidden border-accent/50">
      <CardHeader className="pb-2 bg-accent/20">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-secondary" />
          <span>Examples</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {examples.map((example, index) => (
            <li key={index} className="example-item border-secondary/60">
              {example}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ExamplesList;

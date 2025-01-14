import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CalendarIcon, User2 } from "lucide-react";
import { Story } from "@/types/story";

interface StoryCardProps {
  story: Story;
  onViewStory: (id: string) => void;
}

const stripHtmlTags = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const StoryCard: React.FC<StoryCardProps> = ({ story, onViewStory }) => {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="space-y-2">
          <h3 className="text-xl line-clamp-2 font-semibold tracking-tight">
            {story.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {story.author && (
              <div className="flex items-center gap-1">
                <User2 className="h-4 w-4" />
                <span>{story.author}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(story.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="prose prose-sm">
          <p className="line-clamp-3 text-muted-foreground">
            {stripHtmlTags(story.content).substring(0, 200) + "..."}
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="default"
          className="w-full"
          onClick={() => onViewStory(story.id)}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;

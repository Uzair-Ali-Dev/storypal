"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { CalendarIcon, User2 } from "lucide-react";
import Loader from "@/components/Loader";
import StoryCard from "../components/cards/StoryCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStories } from "@/context/StoryContext";
import { useState } from "react";
import { Story } from "@/types/story";

export default function DiscoverPage() {
  const { data: session } = useSession();
  const {
    isLoading,
    error,
    fetchDiscoverStories,
    searchQuery,
    setSearchQuery,
    getFilteredStories,
  } = useStories();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    fetchDiscoverStories(session?.user?.id);
  }, [session?.user?.id, fetchDiscoverStories]);

  const handleViewStory = (story: Story) => {
    setSelectedStory(story);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStory(null);
  };

  if (isLoading) return <Loader fullScreen={true} />;

  const filteredStories = getFilteredStories();

  return (
    <div className="flex flex-1">
      <div className="max-w-6xl mx-auto p-6 w-full">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Discover Stories
            </h1>
            <p className="text-gray-600 mt-1">
              Explore stories from writers around the world.
            </p>
          </div>

          <div className="w-full max-w-md">
            <Input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {error ? (
          <div className="mt-6 text-center text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onViewStory={() => handleViewStory(story)}
              />
            ))}
          </div>
        )}

        <StoryDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          story={selectedStory}
        />
      </div>
    </div>
  );
}

interface StoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story | null;
}

function StoryDialog({ isOpen, onClose, story }: StoryDialogProps) {
  if (!story) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold">
              {story.title}
            </DialogTitle>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <User2 className="h-4 w-4" />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(story.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-grow">
          <div
            className="TipTapPreview p-6 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </ScrollArea>

        <DialogFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

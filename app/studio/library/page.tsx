"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CalendarIcon, User2 } from "lucide-react";
import { useStories } from "@/context/StoryContext";
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
import { Story } from "@/types/story";

export default function YourStoriesPage() {
  const { data: session } = useSession();
  const {
    stories,
    isLoading,
    error,
    selectedStory,
    fetchUserStories,
    setSelectedStory,
  } = useStories();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserStories(session.user.id);
    }
  }, [session?.user?.id, fetchUserStories]);

  const handleViewStory = (story: Story) => {
    setSelectedStory(story);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStory(null);
  };

  if (isLoading) return <Loader fullScreen={true} />;

  return (
    <div className="flex flex-1">
      <div className="max-w-6xl mx-auto p-6 w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Your Stories
            </h1>
            <p className="text-gray-600 mt-1">View and manage your stories.</p>
          </div>
          <Link href="/studio/create" passHref>
            <Button className="bg-primary hover:bg-primary/90" size="lg">
              Create New Story
            </Button>
          </Link>
        </div>

        {error ? (
          <div className="mt-6 text-center text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {stories.map((story) => (
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

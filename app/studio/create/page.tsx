"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/editor/TipTapEditor";
import { useStories } from "@/context/StoryContext";
import { toast } from "@/hooks/use-toast";

export default function CreateStoryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { createStory } = useStories();
  const editorRef = useRef<TiptapEditorRef>(null);

  const handleCreateStory = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: title.trim()
          ? "Story content cannot be empty."
          : "Title is required.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      await createStory(title, content);

      setTitle("");
      setContent("");
      editorRef.current?.clearContent();
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-1">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Create Story
            </h1>
            <p className="text-gray-600 mt-1">
              Write and share your story with the world.
            </p>
          </div>
          <div className="hidden lg:flex">
            <Button
              onClick={handleCreateStory}
              disabled={isCreating}
              size="lg"
              className="w-full"
            >
              {isCreating ? "Publishing..." : "Publish Story"}
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <Input
            type="text"
            placeholder="Enter your story title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 !text-xl !font-light !py-8"
          />
        </div>

        <div className="mt-6">
          <div className="border rounded-lg p-4 mt-1">
            <TiptapEditor
              maxHeight="500px"
              ref={editorRef}
              initialContent={content}
              onUpdate={setContent}
            />
          </div>
        </div>

        <Button
          onClick={handleCreateStory}
          disabled={isCreating}
          size="lg"
          className="mt-6 w-full block lg:hidden"
        >
          {isCreating ? "Publishing..." : "Publish Story"}
        </Button>
      </div>
    </div>
  );
}

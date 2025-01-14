export interface Story {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author?: string;
  userId: string;
}

export interface StoryContextType {
  // State
  stories: Story[];
  discoverStories: Story[];
  isLoading: boolean;
  error: string | null;
  selectedStory: Story | null;
  searchQuery: string;

  // Actions
  createStory: (title: string, content: string) => Promise<void>;
  fetchUserStories: (userId: string) => Promise<void>;
  fetchDiscoverStories: (userId?: string) => Promise<void>;
  setSelectedStory: (story: Story | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredStories: () => Story[];
}

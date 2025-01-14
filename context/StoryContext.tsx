"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Story, StoryContextType } from "@/types/story";
import { useSession } from "next-auth/react";

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export function StoryProvider({ children }: { children: ReactNode }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [discoverStories, setDiscoverStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { data: session } = useSession();

  const fetchUsersDetails = async (userIds: string[]) => {
    try {
      const usersRef = collection(db, "users");
      const userRefs = userIds.map((userId) => doc(usersRef, userId)); // Create document references for each userId

      // Fetch each user document individually using `getDocs` in a batch manner
      const userSnapshots = await Promise.all(
        userRefs.map((ref) => getDoc(ref))
      );

      const usersMap = new Map();
      userSnapshots.forEach((docSnapshot) => {
        if (docSnapshot.exists()) {
          usersMap.set(docSnapshot.id, docSnapshot.data().username); // Assuming the 'name' field
        }
      });

      return usersMap;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return new Map();
    }
  };

  const createStory = useCallback(
    async (title: string, content: string) => {
      try {
        const user = session?.user;
        if (!user) throw new Error("User is not logged in.");

        await addDoc(collection(db, "stories"), {
          title,
          content,
          userId: user.id,
          createdAt: new Date().toISOString(),
        });

        toast({
          title: "Success",
          description: "Your story has been published!",
        });

        // Refresh stories list
        await fetchUserStories(user.id);
      } catch (error) {
        console.error("Error creating story:", error);
        toast({
          title: "Error",
          description: "Failed to create story. Please try again.",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const fetchUserStories = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      const storiesRef = collection(db, "stories");
      const q = query(
        storiesRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("You haven't created any stories yet.");
        setStories([]);
      } else {
        const fetchedStories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Story[];
        setStories(fetchedStories);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching stories:", err);
      setError("Failed to load stories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch discover stories
  const fetchDiscoverStories = useCallback(async (userId?: string) => {
    setIsLoading(true);
    try {
      const storiesRef = collection(db, "stories");
      let q;

      if (userId) {
        // Exclude current user's stories
        q = query(
          storiesRef,
          where("userId", "!=", userId),
          orderBy("userId"),
          orderBy("createdAt", "desc"),
          limit(50)
        );
      } else {
        // Show all stories if no user is logged in
        q = query(storiesRef, orderBy("createdAt", "desc"), limit(50));
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No stories found.");
        setDiscoverStories([]);
      } else {
        // Get the list of userIds from the fetched stories
        const userIds = querySnapshot.docs.map((doc) => doc.data().userId);

        // Fetch user details for all the unique userIds
        const usersDetails = await fetchUsersDetails(userIds);

        // Map the user details to the stories
        const fetchedStories = querySnapshot.docs.map((doc) => {
          const storyData = doc.data();
          return {
            id: doc.id,
            title: storyData.title,
            content: storyData.content,
            createdAt: storyData.createdAt,
            userId: storyData.userId,
            author: usersDetails.get(storyData.userId) || "Unknown Author",
          };
        });

        setDiscoverStories(fetchedStories);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching discover stories:", err);
      setError("Failed to load stories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter stories based on search query
  const getFilteredStories = useCallback(() => {
    if (!searchQuery) return discoverStories;

    return discoverStories.filter((story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [discoverStories, searchQuery]);

  const value = {
    // State
    stories,
    discoverStories,
    isLoading,
    error,
    selectedStory,
    searchQuery,

    // Actions
    createStory,
    fetchUserStories,
    fetchDiscoverStories,
    setSelectedStory,
    setSearchQuery,
    getFilteredStories,
  };

  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
}

export function useStories() {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error("useStories must be used within a StoryProvider");
  }
  return context;
}

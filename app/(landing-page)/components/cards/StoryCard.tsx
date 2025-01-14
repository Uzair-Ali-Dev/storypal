import { cn } from "@/lib/utils";
import React from "react";

interface StoryCardProps {
  category: string;
  title: string;
  description: string;
  author: string;
  reads: string;
  authorInitials: string;
  bgColor: string;
}

const StoryCard: React.FC<StoryCardProps> = ({
  category,
  title,
  description,
  author,
  reads,
  authorInitials,
  bgColor,
}) => {
  return (
    <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 ">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span
            className={cn(`text-white text-sm px-3 py-1 rounded-full`, bgColor)}
          >
            {category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={cn(
                `w-8 h-8 rounded-full flex items-center justify-center`,
                bgColor
              )}
            >
              <span className="text-white font-semibold">{authorInitials}</span>
            </div>
            <span className="text-gray-300 ml-2">By {author}</span>
          </div>
          <span className="text-gray-400 text-sm">{reads} reads</span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;

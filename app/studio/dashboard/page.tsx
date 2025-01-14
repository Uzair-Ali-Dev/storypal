"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useStories } from "@/context/StoryContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, BookOpen, TrendingUp, Globe2 } from "lucide-react";
import Loader from "@/components/Loader";

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];

export default function DashboardPage() {
  const { data: session } = useSession();
  const {
    stories,
    discoverStories,
    fetchUserStories,
    fetchDiscoverStories,
    isLoading,
  } = useStories();
  const [storyStats, setStoryStats] = useState({
    totalStories: 0,
    totalReaders: 0,
    avgStoriesPerDay: 0,
    engagement: 0,
    communityRatio: 0,
  });

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserStories(session.user.id);
      fetchDiscoverStories(session.user.id);
    }
  }, [session?.user?.id, fetchUserStories, fetchDiscoverStories]);

  useEffect(() => {
    if (stories.length > 0 || discoverStories.length > 0) {
      const totalStoryCount = stories.length + discoverStories.length;
      const stats = {
        totalStories: stories.length,
        totalReaders: Math.floor(Math.random() * 1000),
        avgStoriesPerDay: Number((stories.length / 30).toFixed(1)), // Convert back to number
        engagement: Math.floor(Math.random() * 100),
        communityRatio: Number(
          ((discoverStories.length / totalStoryCount) * 100).toFixed(1)
        ),
      };
      setStoryStats(stats);
    }
  }, [stories, discoverStories]);

  // Prepare data for the activity chart
  const getActivityChartData = () => {
    const last7Days = [...Array(7)]
      .map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0];
      })
      .reverse();

    return last7Days.map((date) => ({
      date,
      "Your Stories": stories.filter(
        (story) => story.createdAt.split("T")[0] === date
      ).length,
      "Community Stories": discoverStories.filter(
        (story) => story.createdAt.split("T")[0] === date
      ).length,
    }));
  };

  // Prepare data for the distribution pie chart
  const getDistributionData = () => [
    { name: "You", value: stories.length },
    { name: "Others", value: discoverStories.length },
  ];

  if (isLoading) return <Loader fullScreen={true} />;

  return (
    <div className="flex flex-1">
      <div className="max-w-6xl mx-auto p-6 w-full space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Track your writing journey and community impact.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Your Stories
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {storyStats.totalStories}
              </div>
              <p className="text-xs text-muted-foreground">Stories published</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Community Stories
              </CardTitle>
              <Globe2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{discoverStories.length}</div>
              <p className="text-xs text-muted-foreground">
                From{" "}
                {new Set(discoverStories.map((story) => story.userId)).size}{" "}
                authors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Avg. Stories/Day
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {storyStats.avgStoriesPerDay}
              </div>
              <p className="text-xs text-muted-foreground">
                Your contribution rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Community Share
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {storyStats.communityRatio}%
              </div>
              <p className="text-xs text-muted-foreground">Of total stories</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Chart */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Story Activity</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getActivityChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="Your Stories"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Community Stories"
                    stroke="#60a5fa"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Distribution Chart */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Story Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getDistributionData()}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={70}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={45}
                  >
                    {getDistributionData().map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...stories, ...discoverStories]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, 5)
                .map((story) => (
                  <div
                    key={story.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium">{story.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {story.userId === session?.user?.id
                          ? "You"
                          : story.author}{" "}
                        • {new Date(story.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

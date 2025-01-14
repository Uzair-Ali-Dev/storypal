"use client";

import {
  Edit,
  LayoutTemplate,
  Users,
  BarChart,
  Upload,
  History,
} from "lucide-react";
import FeatureCard from "../components/cards/FeatureCard";
import { motion } from "motion/react";

const features = [
  {
    title: "Rich Text Editor",
    description:
      "Advanced formatting tools with real-time preview and collaborative editing features.",
    icon: Edit,
    bgColor: "bg-purple-500",
  },
  {
    title: "Story Templates",
    description:
      "Pre-designed templates to jumpstart your creativity and structure your stories.",
    icon: LayoutTemplate,
    bgColor: "bg-pink-500",
  },
  {
    title: "Community Feedback",
    description:
      "Get instant feedback from a supportive community of fellow writers.",
    icon: Users,
    bgColor: "bg-purple-500",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Track reader engagement and story performance with detailed analytics.",
    icon: BarChart,
    bgColor: "bg-pink-500",
  },
  {
    title: "Easy Publishing",
    description:
      "One-click publishing with multiple format support and distribution options.",
    icon: Upload,
    bgColor: "bg-purple-500",
  },
  {
    title: "Version Control",
    description:
      "Never lose your work with automatic saving and version history tracking.",
    icon: History,
    bgColor: "bg-pink-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

function Features() {
  return (
    <section id="features" className="py-20 bg-[#F8F8FF]">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Powerful Features for Storytellers
          </h2>
          <p className="text-lg text-neutral-600">
            Everything you need to bring your stories to life
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              bgColor={feature.bgColor}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;

// import { cn } from "@/lib/utils";

// interface CardProps {
//   icon: React.ElementType;
//   title: string;
//   description: string;
//   bgColor?: string;
// }

// const FeatureCard: React.FC<CardProps> = ({
//   icon: Icon,
//   title,
//   description,
//   bgColor,
// }) => {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300">
//       <div
//         className={cn(
//           `h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6`,
//           bgColor
//         )}
//       >
//         <Icon className="w-6 h-6 text-white" />
//       </div>
//       <h3 className="text-xl font-semibold text-neutral-900 mb-3">{title}</h3>
//       <p className="text-neutral-600">{description}</p>
//     </div>
//   );
// };

// export default FeatureCard;

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface CardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  bgColor?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const FeatureCard: React.FC<CardProps> = ({
  icon: Icon,
  title,
  description,
  bgColor,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-xl transition duration-300"
    >
      <motion.div
        whileHover={{ rotate: 5 }}
        className={cn(
          `h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6`,
          bgColor
        )}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-3">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;

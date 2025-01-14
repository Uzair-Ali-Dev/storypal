import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  onClick: () => void;
  bgColor: string;
  textColor: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  buttonText,
  onClick,
  bgColor,
  textColor,
}) => {
  return (
    <div
      className={`rounded-xl p-8 border ${
        isPopular
          ? "border-2 transform scale-105 shadow-xl bg-neutral-900"
          : "border-neutral-200 hover:border-purple-500"
      } transition-all duration-300 ${bgColor}`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm">
          Popular
        </div>
      )}
      <div className="text-center">
        <h3 className={`text-2xl font-bold mb-2 ${textColor}`}>{title}</h3>
        <div className="text-4xl font-bold text-purple-500 mb-4">
          <span>{price}</span>
          {title !== "Basic" && (
            <span className="text-lg text-neutral-600">/month</span>
          )}
        </div>
        <p className={`mb-6 ${textColor}`}>{description}</p>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center ${textColor}`}>
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "w-full py-3 rounded-lg font-semibold transition duration-300",
          isPopular
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
            : "bg-white text-purple-500 border-2 border-purple-500 hover:bg-purple-50"
        )}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;

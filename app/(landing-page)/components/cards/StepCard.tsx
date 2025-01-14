import { cn } from "@/lib/utils";

type StepProps = {
  stepNumber: number;
  title: string;
  description: string;
  isReversed?: boolean;
  bgColor: string;
};

const StepCard: React.FC<StepProps> = ({
  stepNumber,
  title,
  description,
  isReversed = false,
  bgColor,
}) => {
  return (
    <div
      className={cn(
        "relative lg:flex items-center",
        isReversed ? "lg:flex-row-reverse" : ""
      )}
    >
      <div
        className={cn(
          "hidden lg:block w-1/2",
          isReversed ? "pl-16 text-left" : "pr-16 text-right"
        )}
      >
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
      <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center lg:justify-center">
        <div
          className={cn(
            "w-12 h-12  rounded-full flex items-center justify-center border-4 border-neutral-900",
            bgColor
          )}
        >
          <span className="text-white font-bold">{stepNumber}</span>
        </div>
      </div>
      <div className="lg:w-1/2 lg:pl-16 mt-4 lg:mt-0 block lg:hidden">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;

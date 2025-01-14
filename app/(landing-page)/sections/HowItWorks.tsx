import StepCard from "../components/cards/StepCard";

function HowItWorks() {
  return (
    <section id="howItWorks" className="py-20 bg-black2">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-white mb-4">
            How StoryPal Works
          </h2>
          <p className="text-lg text-gray-300">
            Your journey from inspiration to publication in four simple steps
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>

          <div className="space-y-16">
            <StepCard
              stepNumber={1}
              title="Create Your Account"
              description="Sign up in seconds and personalize your writer profile. Join a community of creative storytellers ready to support your journey."
              bgColor="bg-purple-500"
            />
            <StepCard
              stepNumber={2}
              title="Start Writing"
              description="Use our intuitive editor with helpful prompts and templates to begin crafting your story. Save automatically as you write."
              isReversed
              bgColor="bg-purple-600"
            />
            <StepCard
              stepNumber={3}
              title="Share & Collaborate"
              description="Get instant feedback from the community, collaborate with other writers, and refine your story with helpful suggestions."
              bgColor="bg-pink-500"
            />
            <StepCard
              stepNumber={4}
              title="Publish & Grow"
              description="Publish your story to our global platform, build your audience, and track your growth with detailed analytics."
              isReversed
              bgColor="bg-pink-600"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition duration-300 animate__animated animate__pulse animate__infinite">
            Start Your Story Today
          </button>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

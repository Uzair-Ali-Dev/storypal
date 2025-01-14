import StoryCard from "../components/cards/StoryCard";

function Showcase() {
  const stories = [
    {
      category: "Fantasy",
      title: "The Last Enchanter",
      description:
        "A tale of magic, mystery, and ancient prophecies in a world where enchantment is fading...",
      author: "Jane Doe",
      reads: "12K",
      authorInitials: "JD",
      bgColor: "bg-purple-500",
    },
    {
      category: "Mystery",
      title: "Silent Shadows",
      description:
        "A gripping detective story that unfolds in the dark corners of a city that never sleeps...",
      author: "Mike Smith",
      reads: "8K",
      authorInitials: "MS",
      bgColor: "bg-pink-500",
    },
    {
      category: "Sci-Fi",
      title: "Beyond the Stars",
      description:
        "An epic space adventure that challenges the very boundaries of human exploration...",
      author: "Alex Ray",
      reads: "15K",
      authorInitials: "AR",
      bgColor: "bg-purple-500",
    },
  ];

  return (
    <section id="showcase" className="py-20 bg-black2">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Stories
          </h2>
          <p className="text-lg text-gray-300">
            Discover trending stories from our talented community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <StoryCard
              key={index}
              category={story.category}
              title={story.title}
              description={story.description}
              author={story.author}
              reads={story.reads}
              authorInitials={story.authorInitials}
              bgColor={story.bgColor}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition duration-300 animate__animated animate__pulse animate__infinite">
            Explore More Stories
          </button>
        </div>
      </div>
    </section>
  );
}

export default Showcase;

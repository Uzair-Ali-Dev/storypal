import React from "react";

function Community() {
  return (
    <section id="community" className="py-20 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Join Our Thriving Community
          </h2>
          <p className="text-lg text-neutral-600">
            Connect with fellow storytellers and grow together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-neutral-50 rounded-xl p-8 text-center ">
            <div className="text-4xl font-bold text-purple-500 mb-2">50K+</div>
            <div className="text-neutral-600">Active Writers</div>
            <div className="mt-4 h-2 bg-purple-200 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-purple-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-xl p-8 text-center">
            <div className="text-4xl font-bold text-pink-500 mb-2">100K+</div>
            <div className="text-neutral-600">Stories Published</div>
            <div className="mt-4 h-2 bg-pink-200 rounded-full overflow-hidden">
              <div className="w-4/5 h-full bg-pink-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-xl p-8 text-center ">
            <div className="text-4xl font-bold text-purple-500 mb-2">1M+</div>
            <div className="text-neutral-600">Monthly Readers</div>
            <div className="mt-4 h-2 bg-purple-200 rounded-full overflow-hidden">
              <div className="w-5/6 h-full bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Community;

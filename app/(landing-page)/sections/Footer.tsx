function Footer() {
  return (
    <footer
      id="footer"
      className="bg-neutral-900 pt-20 pb-10 border-t-[0.5px] border-slate-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Brand Info  */}
          <div className="">
            <h2 className="text-white font-bold text-2xl mb-4">StoryPal</h2>
            <p className="text-gray-400 mb-6">
              Empowering creative minds to craft and share captivating stories.
            </p>
          </div>

          {/* Quick Links  */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#howItWorks"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  How it works
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <div className="mb-4 md:mb-0">
              &copy; 2025 StoryPal. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

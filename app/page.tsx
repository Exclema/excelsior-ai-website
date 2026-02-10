{/* Hero Section */}
<section id="home" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
  {/* Animated Gradient Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-900">
    {/* Animated blobs for depth */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto text-center w-full">
    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
      Excelsior AI Solutions
    </h1>
    <p className="text-2xl md:text-3xl font-semibold mb-4 text-blue-200">
      Smarter Solutions. Stronger Business.
    </p>
    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-100">
      We deliver advanced AI automation, chatbots, and workflow systems designed to optimize how your business operates.
    </p>
    <button
      onClick={() => scrollToSection('contact')}
      className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      Get Started
      <ArrowRight className="ml-2 w-5 h-5" />
    </button>
  </div>
</section>

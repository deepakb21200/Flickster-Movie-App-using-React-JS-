 

export default function AboutUs() {
    document.title = "Flickster"  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header Section */}
      <div className="py-16 px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-100">
          About Us
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Welcome to Flickster. We are passionate about movies and TV shows, bringing you the latest updates, trending content, and more.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80"
          alt="Mission"
          className="w-full rounded-xl shadow-lg object-cover h-80 md:h-[400px]"
        />
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-gray-100">Our Mission</h2>
          <p className="text-gray-300 mb-4">
            Our mission is to provide movie enthusiasts with an engaging and easy-to-use platform where they can explore trending movies, popular shows, and discover hidden gems.
          </p>
          <p className="text-gray-300">
            We constantly update our content and enhance the user experience with a sleek interface and smooth navigation.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-100">
          Meet the Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {["Alice", "Bob", "Charlie", "Diana"].map((member, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 shadow-md"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${idx + 1}`}
                alt={member}
                className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-100">{member}</h3>
              <p className="text-gray-400 mt-2 text-sm">Developer & Designer</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="py-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Flickster. All rights reserved.
      </div>
    </div>
  );
}

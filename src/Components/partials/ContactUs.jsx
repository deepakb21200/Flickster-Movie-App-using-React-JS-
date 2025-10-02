import React from "react";

export default function ContactUs() {
    document.title = "Flickster"  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Header */}
      <div className="py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-100">
          Contact Us
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
          We'd love to hear from you! Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* Contact Form */}
      <div className="flex-1 flex justify-center items-center px-6 md:px-12 pb-16">
        <form className="w-full max-w-2xl bg-gray-800 p-10 rounded-3xl shadow-lg space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="flex-1 p-4 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 p-4 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            className="w-full p-4 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <textarea
            rows="6"
            placeholder="Your Message"
            className="w-full p-4 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-500 transition-colors duration-300 text-white font-bold py-4 rounded-xl text-lg shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="bg-gray-900/70 py-6 text-center text-gray-400 text-sm rounded-t-3xl">
        &copy; {new Date().getFullYear()} Flim-Flicks. All rights reserved.
      </div>
    </div>
  );
}

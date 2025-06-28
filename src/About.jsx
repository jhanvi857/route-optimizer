import React from "react";
function About() {
  return (
    <>
      <div className="text-gray-800 max-w-4xl mx-auto text-xl p-4">
        <div>
          <h1 className="text-3xl font-semibold mb-4 text-blue-500 text-center">
          About Route optimization system 
        </h1>

        <p className="mb-4 text-xl text-center">
          Our Route optimization system is a simple and smart website
          that helps you find the most efficient route between two locations in
          seconds. Whether you are commuting, planning a trip, or just exploring
          a new area, RouteFinder gives you the shortest and fastest path with
          ease.
        </p>
        </div>

        <h2 className="text-2xl font-semibold mb-2 mt-6 text-blue-500">✨ Key Features:</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
  {[
    "Enter source and destination to get optimized routes",
    "Clean, user-friendly interface",
    "Voice search support for hands-free input",
    "Save your favorite routes (Coming Soon)",
    "Supports mobile and desktop view",
    "Access your saved routes anytime from any device."
  ].map((feature, index) => (
    <div key={index} className="bg-gray-50 shadow-md rounded-xl p-4 text-xl text-gray-800 hover:shadow-lg">
      {feature}
    </div>
  ))}
</div>


        <h2 className="text-2xl font-semibold mb-2 mt-6 text-blue-500">🔧 How it works:</h2>
        <p className="mb-4 text-xl">
            This project uses the famous Dijkstra’s Algorithm to find the shortest path between two nodes in a graph. 
            Each location acts as a node, and the connections (roads) between them act as weighted edges representing distance.
        </p>
        <p className="mb-4 text-xl">
            When a user enters a start and end location, the app runs Dijkstra's algorithm on the internal graph structure to compute the most efficient path and displays the result along with the total distance.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-6 text-blue-500">🛠️ Tech Stack</h2>
<div className="grid md:grid-cols-2 gap-4 mb-8">
  {[
    "Frontend: React.js, Tailwind CSS, React Router",
    "Backend: Node.js, Express",
    "APIs: OpenStreetMap",
    "Tools: Vite, Git, GitHub"
  ].map((tech, index) => (
    <div key={index} className="shadow-md rounded-xl p-4 text-xl text-gray-800 bg-gray-50 hover:shadow-lg">
      {tech}
    </div>
  ))}
</div>
      </div>
    </>
  );
}
export default About;

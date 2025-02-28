import { useState, useEffect } from "react";
import BeerCard from "./components/BeerCard";

export default function App() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const beersPerPage = 10; // Change this for more or fewer items per page

  useEffect(() => {
    fetch("https://api.sampleapis.com/beers/ale")
      .then((res) => res.json())
      .then((data) => setBeers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // **Filter beers based on search input**
  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  // **Pagination Logic**
  const totalPages = Math.ceil(filteredBeers.length / beersPerPage);
  const indexOfLastBeer = currentPage * beersPerPage;
  const indexOfFirstBeer = indexOfLastBeer - beersPerPage;
  const currentBeers = filteredBeers.slice(indexOfFirstBeer, indexOfLastBeer);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="py-6 text-center text-3xl font-bold">🍻 Beer Explorer</header>

      {/* Search Bar */}
      <div className="flex justify-center p-4">
        <input
          type="text"
          placeholder="Search for a beer..."
          className="p-3 w-1/2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Beer Cards Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-6xl mx-auto">
        {currentBeers.map((beer) => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg bg-yellow-500 text-black font-bold ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅️ Previous
        </button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={`px-4 py-2 rounded-lg bg-yellow-500 text-black font-bold ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
          }`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}

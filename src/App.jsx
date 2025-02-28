import { useState, useEffect } from "react";
import BeerCard from "./components/BeerCard";

export default function App() {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(""); // Sorting state
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

  // **Sorting Logic**
  const sortedBeers = [...filteredBeers].sort((a, b) => {
    if (sortBy === "price-asc") {
      return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
    } else if (sortBy === "price-desc") {
      return parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""));
    } else if (sortBy === "rating-asc") {
      return a.rating.average - b.rating.average;
    } else if (sortBy === "rating-desc") {
      return b.rating.average - a.rating.average;
    } else if (sortBy === "reviews-asc") {
      return a.rating.reviews - b.rating.reviews;
    } else if (sortBy === "reviews-desc") {
      return b.rating.reviews - a.rating.reviews;
    }
    return 0;
  });

  // **Pagination Logic**
  const totalPages = Math.ceil(sortedBeers.length / beersPerPage);
  const indexOfLastBeer = currentPage * beersPerPage;
  const indexOfFirstBeer = indexOfLastBeer - beersPerPage;
  const currentBeers = sortedBeers.slice(indexOfFirstBeer, indexOfLastBeer);

  return (
    <div className="min-h-screen bg-[#B85042] text-white">
      {/* Header */}
      <header className="py-6 text-center text-3xl font-bold">🍻 Beer Explorer</header>

      {/* Search & Sorting Bar */}
      <div className="flex flex-col md:flex-row justify-center items-center p-4 space-y-3 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search for a beer..."
          className="p-3 w-80 rounded-lg text-[#B85042] bg-[#E7E8D1] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sorting Dropdown */}
        <select
          className="p-3 w-60 rounded-lg bg-[#E7E8D1] border border-gray-700 text-[#B85042] focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="reviews-asc">Reviews: Fewest to Most</option>
          <option value="reviews-desc">Reviews: Most to Fewest</option>
        </select>
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

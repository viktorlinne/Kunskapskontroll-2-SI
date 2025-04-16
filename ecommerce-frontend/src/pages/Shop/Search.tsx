import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ISearchItem } from "../../interfaces/ISearchItem";
import { Pagination } from "../../components/Pagination";

const fallbackImg =
  "https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg";
const RESULTS_PER_PAGE = 10;

const getThumbnailSrc = (item: ISearchItem): string => {
  return item.pagemap?.cse_thumbnail?.[0]?.src || fallbackImg;
};

export const Search = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [searchText, setSearchText] = useState(query);
  const [items, setItems] = useState<ISearchItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(1);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!searchText.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchText)}&start=${startIndex}`);
  };

  const fetchSearchResults = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            q: query,
            key: process.env.GOOGLE_API_KEY,
            cx: "b449b74a29a664c89",
            start: startIndex,
          },
        }
      );
      setSearchText("");
      setItems(response.data.items || []);
      setTotalResults(
        parseInt(response.data.searchInformation?.totalResults || "0")
      );
      setError(null);
    } catch (error) {
      setSearchText("");
      setError("An error occurred while fetching the search results.");
    } finally {
      setSearchText("");
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setSearchText(query);
    if (query) {
      fetchSearchResults();
    }
  }, [query, startIndex]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Search API
        </h2>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-auto flex-grow border border-gray-300 rounded-lg p-2 shadow-sm"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Results</h3>
          <Pagination
            items={items}
            loading={loading}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
            totalResults={totalResults}
            resultsPerPage={RESULTS_PER_PAGE}
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {loading ? (
            <div className="text-center py-10">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mx-auto mb-4 animate-spin"></div>
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl overflow-hidden shadow-md bg-white p-4 mb-6 flex flex-col sm:flex-row"
              >
                <div className="sm:w-48 sm:h-48 w-full h-64 flex-shrink-0">
                  <img
                    src={getThumbnailSrc(item)}
                    alt={item.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImg;
                    }}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between p-4">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{item.snippet}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    To Product -&gt;
                  </a>
                </div>
              </div>
            ))
          )}

          <Pagination
            items={items}
            loading={loading}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
            totalResults={totalResults}
            resultsPerPage={RESULTS_PER_PAGE}
          />
        </div>
      </div>
    </div>
  );
};

import React from "react";

interface Props {
  items: any[];
  loading: boolean;
  startIndex: number;
  setStartIndex: (val: number) => void;
  totalResults: number | null;
  resultsPerPage: number;
}

export const Pagination: React.FC<Props> = ({
  items,
  loading,
  startIndex,
  setStartIndex,
  totalResults,
  resultsPerPage,
}) => {
  if (items.length === 0 || loading) return null;

  const currentPage = Math.ceil(startIndex / resultsPerPage);
  const totalPages = totalResults
    ? Math.ceil(totalResults / resultsPerPage)
    : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
      <div className="text-gray-600 text-sm text-center">
        Page {currentPage} {totalPages && `of ${totalPages}`}
      </div>

      <div className="flex gap-2">
        <button
          disabled={startIndex <= 1}
          onClick={() =>
            setStartIndex(Math.max(1, startIndex - resultsPerPage))
          }
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={
            totalResults !== null && startIndex + resultsPerPage > totalResults
          }
          onClick={() => setStartIndex(startIndex + resultsPerPage)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

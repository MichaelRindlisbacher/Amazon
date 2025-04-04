interface PaginationProps {
    currentPage: number;
    totalPages: number;
    order: string;
    sortDirection: string;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    pageSize: number;
    onSortChange: (orderBy: string, direction: string) => void; // Add a new prop for sorting change
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    onPageSizeChange,
    pageSize,
    onSortChange,
    order,
    sortDirection,
}: PaginationProps) => {

    const handleSortChange = (newOrder: string) => {
    const newDirection = order === newOrder && sortDirection === 'asc' ? 'desc' : 'asc'; // Toggle direction
    onSortChange(newOrder, newDirection); // Pass the sort order and direction to parent
    };

    const handleDirectionToggle = () => {
        const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        onSortChange(order, newDirection); // Corrected line: Call onSortChange with the new direction
    };

    return (
        <div className="flex item-center justify-center mt-4">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    disabled={currentPage === i + 1}
                >
                    {i + 1}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>

            <br />
            <label>
                Results per page:
                <select
                    value={pageSize}
                    onChange={(p) => {
                        onPageSizeChange(Number(p.target.value));
                        onPageChange(1); // Reset to page one to avoid getting stuck on an empty page
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                <br />
                {/* Dropdown for sorting */}
                <select
                    value={order}
                    onChange={(e) => handleSortChange(e.target.value)} // Use the sorting change handler
                >
                    <option value="BookID">BookID</option>
                    <option value="Title">Title</option>
                    <option value="Author">Author</option>
                    <option value="Publisher">Publisher</option>
                    <option value="ISBN">ISBN</option>
                    <option value="Classification">Classification</option>
                    <option value="Category">Category</option>
                    <option value="PageCount">Page Count</option>
                    <option value="Price">Price</option>
                </select>
                {/* Toggle sorting direction (ASC/DESC) */}
                <button onClick={handleDirectionToggle}>
                    {sortDirection === 'asc' ? '🔼' : '🔽'}
                </button>
            </label>
        </div>
    );
};

export default Pagination;
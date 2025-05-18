export default function Filter({ currentFilter, onFilterChange }) {
    const filters = ['all', 'active', 'completed'];
  
    return (
      <div className="filter" data-testid="filter">
        {filters.map(filter => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={currentFilter === filter ? 'active' : ''}
            data-testid={`filter-${filter}`}
          >
            {filter}
          </button>
        ))}
      </div>
    );
  }
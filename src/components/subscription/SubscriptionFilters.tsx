import styled from 'styled-components'
import { SubscriptionFilters, SubscriptionState } from '../../types/subscription'

const FiltersContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  margin-bottom: 8px;
`

const FilterSelect = styled.select`
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 16px;
  background-color: #ffffff;
  color: #212529;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`

const SearchInput = styled.input`
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 16px;
  background-color: #ffffff;
  color: #212529;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
  
  &::placeholder {
    color: #ced4da;
  }
`

const FiltersActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  
  @media (max-width: 640px) {
    justify-content: stretch;
  }
`

const ClearButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background-color: transparent;
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
    color: #212529;
  }
  
  @media (max-width: 640px) {
    flex: 1;
  }
`

const ResultsCount = styled.div`
  font-size: 14px;
  color: #adb5bd;
  margin-bottom: 16px;
`

interface SubscriptionFiltersProps {
  filters: SubscriptionFilters
  onFiltersChange: (filters: SubscriptionFilters) => void
  resultsCount?: number
  showResultsCount?: boolean
}

export default function SubscriptionFiltersComponent({
  filters,
  onFiltersChange,
  resultsCount = 0,
  showResultsCount = true
}: SubscriptionFiltersProps) {
  
  const handleFilterChange = (key: keyof SubscriptionFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      status: 'all',
      sortBy: 'date',
      sortOrder: 'desc',
      searchTerm: ''
    })
  }

  const hasActiveFilters = 
    filters.status !== 'all' || 
    filters.searchTerm !== '' || 
    filters.sortBy !== 'date' || 
    filters.sortOrder !== 'desc'

  return (
    <FiltersContainer>
      {showResultsCount && (
        <ResultsCount>
          {resultsCount === 1 
            ? `1 subscription found` 
            : `${resultsCount} subscriptions found`
          }
        </ResultsCount>
      )}
      
      <FiltersGrid>
        <FilterGroup>
          <FilterLabel htmlFor="search">Search</FilterLabel>
          <SearchInput
            id="search"
            type="text"
            placeholder="Search by product..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="status">Status</FilterLabel>
          <FilterSelect
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value as SubscriptionState | 'all')}
          >
            <option value="all">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="EXPIRED">Expired</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="sortBy">Sort by</FilterLabel>
          <FilterSelect
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="date">Date</option>
            <option value="price">Price</option>
            <option value="title">Product</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel htmlFor="sortOrder">Order</FilterLabel>
          <FilterSelect
            id="sortOrder"
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersGrid>

      {hasActiveFilters && (
        <FiltersActions>
          <ClearButton onClick={clearFilters}>
            Clear Filters
          </ClearButton>
        </FiltersActions>
      )}
    </FiltersContainer>
  )
}
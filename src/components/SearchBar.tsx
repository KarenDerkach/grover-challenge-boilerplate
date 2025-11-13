import { Subscription } from '@/types/subscription'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const SearchContainer = styled.div`
    width: 100%;
    margin: 2rem 0;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 500px;
`

const StyledInput = styled.input`
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 2px solid #e2e8f0;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.15s ease;
    box-sizing: border-box;

    &:focus{
        border-color: rgb(254, 18, 81);
        box-shadow: 0 0 0 3px rgba(254, 18, 81, 0.08);
    }
`

const ClearButton = styled.button`
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #64748b;
    padding: 0.25rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #495057;
    }
`

const ResultsCount = styled.div`
    font-size: 0.875rem;
    color: #64748b;
    white-space: nowrap;
`

interface SearchBarProps {
    subscriptions: Subscription[]
    onSearchResults: (filteredSubscriptions: Subscription[]) => void
}

export default function SearchBar({ subscriptions, onSearchResults }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('')

    // Filter subscriptions in real time based on search term
    useEffect(() => {
        if (!searchTerm.trim()) {
            onSearchResults(subscriptions)
            return
        }

        const filtered = subscriptions.filter(subscription =>
            subscription.product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )

        onSearchResults(filtered)
    }, [searchTerm, subscriptions, onSearchResults])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleClearSearch = () => {
        setSearchTerm('')
    }

    const resultsCount = subscriptions.filter(sub =>
        sub.product.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).length

    return (
        <SearchContainer>
            <InputWrapper>
                <StyledInput
                    type="text"
                    placeholder="Search products by title..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    aria-label="Search products by title"
                />

                {searchTerm && (
                    <ClearButton onClick={handleClearSearch} aria-label="Clear search">
                        ×
                    </ClearButton>
                )}
            </InputWrapper>

            {searchTerm && <ResultsCount>{resultsCount} results</ResultsCount>}
        </SearchContainer>
    )
}

'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";

interface SearchProps {
  onSearchChange: (query: string) => void;
}

function Search({ onSearchChange }: SearchProps) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    onSearchChange(query); // Pass search query to parent
  };

  return (
    <div className="p-4">
      <Input
        placeholder="Search product"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;

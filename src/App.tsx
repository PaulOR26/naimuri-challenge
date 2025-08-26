import { useRepos } from './useRepos';
import { useState } from 'react';

import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [orderBy, setOrderBy] = useState('desc');
  const [limit, setLimit] = useState('10');
  const [page, setPage] = useState('1');

  const { repos, repoCount, isLoading, error } = useRepos({
    searchTerm,
    sortBy,
    orderBy,
    limit,
    page,
  });

  return (
    <div>
      <header></header>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [orderBy, setOrderBy] = useState('desc');
  const [limit, setLimit] = useState('10');
  const [page, setPage] = useState('1');
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRepos = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchTerm.trim()}&sort=${sortBy}&order=${orderBy}&per_page=${limit}&page=${page}`
      );
      const data = await response.json();

      setRepos(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, [sortBy, orderBy, limit, page]);

  useEffect(() => {
    const delayDebounce = setTimeout(fetchRepos, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div>
      <header></header>
    </div>
  );
}

export default App;

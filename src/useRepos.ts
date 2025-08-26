import { useState, useEffect } from 'react';

interface UseReposParams {
  limit: string;
  orderBy: string;
  page: string;
  searchTerm: string;
  sortBy: string;
}

export const useRepos = ({
  searchTerm,
  sortBy,
  orderBy,
  limit,
  page,
}: UseReposParams) => {
  const [repos, setRepos] = useState([]);
  const [repoCount, setRepoCount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRepos = async () => {
    const parsedSearchTerm = searchTerm.trim();

    if (!parsedSearchTerm) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${parsedSearchTerm}&sort=${sortBy}&order=${orderBy}&per_page=${limit}&page=${page}`
      );
      const { items, total_count } = await response.json();

      setRepos(items || []);
      setRepoCount(total_count);
    } catch (err) {
      setError('Failed to fetch repositories');
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

  return { repos, repoCount, isLoading, error };
};

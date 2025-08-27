import { LIMIT } from './constants';
import { useState, useEffect } from 'react';

interface UseReposParams {
  createdFrom: string;
  createdTo: string;
  orderBy: string;
  page: number;
  searchTerm: string;
  sortBy: string;
}

export const useRepos = ({
  createdFrom,
  createdTo,
  orderBy,
  page,
  searchTerm,
  sortBy,
}: UseReposParams) => {
  const [repos, setRepos] = useState([]);
  const [repoCount, setRepoCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRepos = async () => {
    const parsedSearchTerm = searchTerm.trim();

    if (!parsedSearchTerm) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${parsedSearchTerm}+created:${createdFrom}..${createdTo}&sort=${sortBy}&order=${orderBy}&per_page=${LIMIT}&page=${page}`
      );
      const { items, total_count } = await response.json();

      if (items) {
        setRepos((curr) => (page === 1 ? items : [...curr, ...items]));
        setRepoCount(total_count);
      } else {
        setRepos([]);
        setRepoCount(0);
      }
    } catch (err) {
      setError('Failed to fetch repositories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(fetchRepos, 500);

    return () => clearTimeout(delayDebounce);
  }, [createdFrom, createdTo, orderBy, page, searchTerm, sortBy]);

  return { repos, repoCount, isLoading, error };
};

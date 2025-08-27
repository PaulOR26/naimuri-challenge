import { LIMIT } from './constants';
import { RepoType, UseReposParams } from './interfaces';
import { useState, useEffect } from 'react';

export const useRepos = ({
  createdFrom,
  createdTo,
  orderBy,
  page,
  searchTerm,
  sortBy,
}: UseReposParams) => {
  const [repos, setRepos] = useState<RepoType[]>([]);
  const [repoCount, setRepoCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRepos = async () => {
    const parsedSearchTerm = searchTerm.trim();

    if (!parsedSearchTerm) {
      setRepos([]);
      setRepoCount(0);
      setIsLoading(false);

      return;
    }

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
    if (searchTerm) {
      setIsLoading(true);
      setRepos([]);
      setRepoCount(0);
      const delayDebounce = setTimeout(fetchRepos, 500);

      return () => clearTimeout(delayDebounce);
    } else {
      setRepos([]);
      setRepoCount(0);
      setIsLoading(false);
    }
  }, [createdFrom, createdTo, orderBy, searchTerm, sortBy]);

  useEffect(() => {
    setIsLoading(true);
    fetchRepos();
  }, [page]);

  return { error, isLoading, repoCount, repos };
};

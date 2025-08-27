import { ChangeEvent, useEffect, useState } from 'react';
import { LIMIT } from './constants';
import { useRepos } from './useRepos';

import Repo from './Repo';

import './App.css';

const today = new Date();
const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(today.getMonth() - 3);

const formatDate = (date: Date) => date.toISOString().split('T')[0];

function App() {
  const [createdFrom, setCreatedFrom] = useState(formatDate(threeMonthsAgo));
  const [createdTo, setCreatedTo] = useState(formatDate(today));
  const [orderBy, setOrderBy] = useState('desc');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('stars');

  const { repos, repoCount, isLoading, error } = useRepos({
    createdFrom,
    createdTo,
    orderBy,
    page,
    searchTerm,
    sortBy,
  });

  const totalPages = Math.ceil(Math.min(repoCount / LIMIT, 1000 / LIMIT));

  const handleChangeCreatedFrom = (event: ChangeEvent<HTMLInputElement>) =>
    setCreatedFrom(event.target.value);

  const handleChangeCreatedTo = (event: ChangeEvent<HTMLInputElement>) =>
    setCreatedTo(event.target.value);

  const handleChangeOrderBy = (event: ChangeEvent<HTMLSelectElement>) =>
    setOrderBy(event.target.value);

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const handleChangeSortBy = (event: ChangeEvent<HTMLSelectElement>) =>
    setSortBy(event.target.value);

  const handleLoadMore = () => setPage((curr) => curr + 1);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortBy, orderBy, createdFrom, createdTo]);

  return (
    <div>
      <header>Github API</header>

      <main>
        <label htmlFor='search-input'>Search</label>

        <input
          id='search-input'
          onChange={handleChangeSearch}
          placeholder='Enter search term'
          value={searchTerm}
        />

        <label>Created</label>

        <label htmlFor='from-date'>From</label>

        <input
          id='from-date'
          onChange={handleChangeCreatedFrom}
          type='date'
          value={createdFrom}
        />

        <label htmlFor='to-date'>To</label>

        <input
          id='to-date'
          onChange={handleChangeCreatedTo}
          type='date'
          value={createdTo}
        />

        <label htmlFor='sort-select'>Sort</label>

        <select id='sort-select' onChange={handleChangeSortBy} value={sortBy}>
          <option value='stars'>Stars</option>
          <option value='forks'>Forks</option>
        </select>

        <label htmlFor='order-select'>Order</label>

        <select
          id='order-select'
          onChange={handleChangeOrderBy}
          value={orderBy}
        >
          <option value='desc'>Highest to Lowest</option>
          <option value='asc'>Lowest to Highest</option>
        </select>

        {isLoading ? (
          <p>Loading repos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : repos.length > 0 ? (
          <ul>
            {repos.map(
              ({
                forks_count,
                full_name,
                html_url,
                id,
                name,
                open_issues_count,
                owner,
                stargazers_count,
              }) => (
                <Repo
                  forks_count={forks_count}
                  full_name={full_name}
                  html_url={html_url}
                  key={id}
                  name={name}
                  open_issues_count={open_issues_count}
                  owner={owner}
                  stargazers_count={stargazers_count}
                />
              )
            )}
          </ul>
        ) : (
          <p>
            {searchTerm
              ? 'No repos found for search criteria'
              : 'Search for repos'}
          </p>
        )}

        {page < totalPages && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </main>
    </div>
  );
}

export default App;

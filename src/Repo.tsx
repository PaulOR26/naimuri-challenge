import { RepoType } from './interfaces';
import { useState } from 'react';

import RepoMore from './RepoMore';

function Repo({
  forks_count,
  full_name,
  html_url,
  name,
  open_issues_count,
  owner,
  stargazers_count,
}: RepoType) {
  const [isShowingMore, setIsShowingMore] = useState(false);

  const handleShowMore = () => {
    setIsShowingMore((curr) => !curr);
  };

  return (
    <li>
      <p>Repo name</p>

      <p>{name}</p>

      <p>Owner</p>

      {owner && (
        <a href={owner.html_url} target='_blank'>
          {owner.login}
        </a>
      )}

      <a href={html_url} target='_blank'>
        Link to repo
      </a>

      <button onClick={handleShowMore}>
        {isShowingMore ? 'Less' : 'More'}
      </button>

      {isShowingMore && (
        <RepoMore
          forks_count={forks_count}
          full_name={full_name}
          open_issues_count={open_issues_count}
          stargazers_count={stargazers_count}
        />
      )}
    </li>
  );
}

export default Repo;

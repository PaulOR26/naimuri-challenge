import { RepoType } from './interfaces';
import { useReadme } from './useReadme';

import Markdown from 'react-markdown';

function RepoMore({
  forks_count,
  full_name,
  open_issues_count,
  stargazers_count,
}: RepoType) {
  const { error, isLoading, readme } = useReadme(full_name);

  return (
    <>
      <div className='repo-data'>
        <p className='repo-data-title'>Forks</p>

        <p>{forks_count}</p>
      </div>

      <div className='repo-data'>
        <p className='repo-data-title'>Stars</p>

        <p>{stargazers_count}</p>
      </div>

      <div className='repo-data'>
        <p className='repo-data-title'>Issues</p>

        <p>{open_issues_count}</p>
      </div>

      <div className='repo-data'>
        <p className='repo-data-title'>Readme</p>

        {isLoading ? (
          <p>Loading readme...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className='readme'>
            <Markdown>{readme}</Markdown>
          </div>
        )}
      </div>
    </>
  );
}

export default RepoMore;

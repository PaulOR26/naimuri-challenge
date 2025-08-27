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
      <p>Forks</p>

      <p>{forks_count}</p>

      <p>Stars</p>

      <p>{stargazers_count}</p>

      <p>Issues</p>

      <p>{open_issues_count}</p>

      {isLoading ? (
        <p>Loading readme...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Markdown>{readme}</Markdown>
      )}
    </>
  );
}

export default RepoMore;

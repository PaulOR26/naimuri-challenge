import { useEffect, useState } from 'react';

export const useReadme = (repoName: string) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [readme, setReadme] = useState('');

  const fetchReadme = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repoName}/readme`
      );
      const data = await response.json();
      const res = await fetch(data.download_url);
      const readmeContent = await res.text();

      setReadme(readmeContent);
    } catch (err) {
      setError('Failed to fetch readme');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReadme();
  }, []);

  return { error, isLoading, readme };
};

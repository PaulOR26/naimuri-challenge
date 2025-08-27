export interface RepoType {
  forks_count: string;
  full_name: string;
  html_url?: string;
  id?: string;
  name?: string;
  open_issues_count: string;
  owner?: { html_url: string; login: string };
  stargazers_count: string;
}

export interface UseReposParams {
  createdFrom: string;
  createdTo: string;
  orderBy: string;
  page: number;
  searchTerm: string;
  sortBy: string;
}

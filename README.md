# GitHub API

This project was to create a React + TypeScript app that connects to the GitHub API and allows searching and filtering of repositories.

## Installation Instructions

### `Clone the repo`

```
git clone https://github.com/PaulOR26/naimuri-challenge.git
cd naimuri-challenge
```

### `Install dependencies`

```
npm install
```

### `Start the development server`

```
npm start
```

## Implementation

### `Custom Hooks`

I extracted data-fetching logic into custom hooks (useRepos, useReadme) to keep the UI components clean.

This separation would make the app easier to test and extend.

### `Debouncing`

I used setTimeout inside a useEffect to debounce search input so that the API is not called on every keystroke, due to performance and GitHub fetch limit concerns.

### `Pagination`

I implemented a 'Load More' button to append further results to the existing list.

### `Date Filtering`

I added date filtering and set a default of 3 months to help produce more relevant results.

### `Accessibility`

I used appropriate elements for screen reader support, i used rem for sizing where necessary, and I ensured the app is usable on any screen size.

## What Next

Given more time I would:

- Add a limit option so users can decide how many results are included in each page
- Improve error handling
- Add tests
- Lazy loading
- Improve formatting of the repo readme's
- Refactor the scss
- Extract repo-data elements into reuseable components

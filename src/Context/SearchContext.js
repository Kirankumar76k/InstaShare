import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  showSearchComponent: false,
  apiStatus: 'INITIAL',
  userPosts: [],
})

export default SearchContext

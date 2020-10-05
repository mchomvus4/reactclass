import React, { Component } from 'react';
import axios from 'axios';
import { sortBy } from 'lodash';
import './App.css';
import Search from './Components/Search'
import Table from './Components/Table'
import Button from './Components/Button';
const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchKey:'',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey:'NONE',
      isSortReverse:false,

    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSort = this.onSort.bind(this);
  }

   needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
}

  setSearchTopStories (result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits=results&&results[searchKey]
      ? results[searchKey].hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      results:
      {
        ...results,
        [searchKey]: {hits: updatedHits, page}
      },
      isLoading:false,
    });
    }
  fetchSearchTopStories (searchTerm, page = 0) {
    this.setState({ isLoading: true });
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this.setSearchTopStories(result.data))
      .catch(error =>this.setState({error}));
  }
    componentDidMount() {
      const { searchTerm } = this.state;
      this.setState({ searchKey: searchTerm });
      this.fetchSearchTopStories(searchTerm);
  
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onSearchSubmit (event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
  
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
}
    event.preventDefault();
  }

  onDismiss (id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;

    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results, 
        [searchKey]:{ hits: updatedHits, page}
      }
    });
  }
  onSort (sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }



  render () {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading,
      sortKey,
      isSortReverse
    } = this.state;
    
    const page = (results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];


    if (error) {
      return <p>Something went wrong.</p>;
    }


    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}

          >
            Search
          </Search>
        </div>
        {results &&
          
          <Table
          list={list}
          sortKey={sortKey}
          isSortReverse={isSortReverse}
          onSort={this.onSort}
          onDismiss={this.onDismiss}
          />
        }
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
              More
          </ButtonWithLoading>
        
        </div>
        
      </div>
       
    );
  }
}
const Loading = () =>
  <div>Please wait page Loading...</div>
const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component{...rest} />
const ButtonWithLoading = withLoading(Button);
  
export default App;

export {
  Button,
  Search,
  Table
};
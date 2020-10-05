import React, { Component } from 'react';
import Button from './Button';
import { sortBy } from 'lodash';  
import classNames from 'classnames';
const largeColumn = {
  width: '70%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};
const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
          
};

class Table extends Component {
  render() {
    const {
      list,
      sortKey,
      isSortReserve,
      onSort,
      onDismiss,
    } = this.props;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReserve
      ? sortedList.reverse()
      : sortedList;
    

    return (
      <div className="table">
        <div className="table-header">
          <span style={{ width: '40%' }}>
            <Sort
              sortKey={'TITLE'}
              onSort={onSort}
              activeSortKey={sortKey}
              >
              Title
            </Sort>
          </span>
          <span style={{ width: '30%' }}>
            <Sort
              sortKey={'AUTHOR'}
              onSort={onSort}
              activeSortKey={onSort}
            >
              Author
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'COMMENTS'}
              onSort={onSort}
              activeSortKey={onSort}
            >
              Comments
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'POINTS'}  
              onSort={onSort}
              activeSortKey={onSort}
            >
              Points
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            Archieve
          </span>
        </div>
    {reverseSortedList.map(item =>
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>
          {item.author}
        </span>
        <span style={smallColumn}>
          {item.num_comments}
        </span>
        <span style={smallColumn}>
          {item.points}
        </span>
        <span style={smallColumn}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

    );
  } 

}
const Sort = ({
  sortKey,
  activeSortKey,
  onSort,
  children
}) => {
  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  );
  return (
    <Button
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}
    </Button>
  );
}
export default Table;
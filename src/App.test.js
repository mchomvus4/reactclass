import React from 'react';
import ReactDOM from 'react-dom';
import rendered from 'react-test-renderer';
import App, { Search}from './App';

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('has a valid snapshot', () => {
    const component = rendered.create(
      <App />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Search', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search />, div);
    ReactDOM.unmountComponentAtNode(div);
    const component = rendered.create(
      <Search/>
    );
  const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
     });
});


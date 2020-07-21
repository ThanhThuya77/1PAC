import * as React from "react";
import "./App.css";
import Pagination from "./components/Pagination/index";
import ListData from "./components/ListData/index";
import Search from './components/Search/index';
import {getAllData} from './Action';

class App extends React.Component {
  constructor() {
    super();

    // an example array of items to be paged
    var exampleItems = [...Array(50).keys()].map((i) => ({
      id: i + 1,
      name: "Item " + (i + 1),
    }));

    this.tabs = ["All", "Liked", "Removed"];

    this.state = {
      pageOfItems: [],
      tab: "All",
      data: exampleItems,
      search: ''
    };

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  handleSearch = (e) => {
    let value = e.currentTarget.value;
    this.setState({search: value}, () => {
      getAllData(value);
    });
  }

  setCurrentTab = (newTab) => {
    this.setState({ tab: newTab });
  };

  getListTab = () => {
    return this.tabs.map((item, idx) => {
      return (
        <li
          key={idx}
          className={`${this.state.tab === item ? "selectedTab" : ""}`}
          onClick={() => this.setCurrentTab(item)}
        >
          {item}
        </li>
      );
    });
  };

  render() {
    let dataStorage = localStorage.getItem('data') || [] // JSON.parse(JSON.stringify())|| [];
    return (
      <div className="container">
        <Search value={this.state.search} handleSearch={this.handleSearch}></Search>
        <ul className="dashboard-menu">{this.getListTab()}</ul>
        <ListData data={this.state.pageOfItems}></ListData>
        <Pagination items={dataStorage} onChangePage={this.onChangePage} />
      </div>
    );
  }
}

export default App;

import * as React from "react";
import "./App.css";
import Pagination from "./components/Pagination/index";
import ListData from "./components/ListData/index";
import Search from "./components/Search/index";
import { getAllData } from "./Action";

class App extends React.Component {
  constructor() {
    super();
    this.tabs = ["All", "Liked", "Removed"];
    this.state = {
      pageOfData: [],
      tab: "All",
      data: [],
      search: "",
      pager: {},
    };
    this.dataGlobal = [];
  }

  componentDidMount() {
    const promise1 = new Promise((resolve, reject) => {
      resolve(getAllData());
    });
    promise1.then((data) => {
      this.setState({data}, () => {
        this.setPage(1);
      });
    });
  }

  handleSearch = (e) => {
    let value = e.currentTarget.value;
    this.setState({search: value});
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const promise1 = new Promise((resolve, reject) => {
        resolve(getAllData(this.state.search));
      });
  
      promise1.then((data) => {
        this.setState((state, props) => ({
          data,
          pageOfData: data.slice(0, 10),
        }));
      });
    }
  }

  filterDataByTab = (tab) => {
    let data = [...JSON.parse(localStorage.getItem('data'))];
    if(tab === 'Liked') {
      data = data.filter(item => item.like && !item.remove);
    }
    else if (tab === 'Removed') {
      data = data.filter(item => item.remove);
    }
    return data;
  }

  setCurrentTab = (newTab) => {
    const data = this.filterDataByTab(newTab);
    this.setState({ tab: newTab, data, pageOfData: data.slice(0, 10)}, () => {
    this.setPage(1);
    });
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

  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;
    pageSize = pageSize || 10;
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }

  setPage = (page) => {
    const { data = {}, pager = {} } = this.state;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    let newPager = this.getPager(data.length, page);
    let pageOfData = data && data.slice(newPager.startIndex, newPager.endIndex + 1);
    this.setState({ pager: newPager, pageOfData: pageOfData });
    // this.setState((state, props) => ({ pager: newPager, pageOfData: pageOfData }));
  }

  updateData = (index, key, value) => {
    let data = JSON.parse(localStorage.getItem('data')) || [];
    data[index] = {...data[index], [key]: value};
    localStorage.setItem('data', JSON.stringify(data));
    const filterData = this.filterDataByTab(this.state.tab);
    this.setState((state, props) => ({ data: filterData, pageOfData: filterData.slice(0, 10) }));
  }

  render() {
    return (
      <div className="container">
        <Search
          value={this.state.search}
          handleSearch={this.handleSearch}
          handleKeyDown={this.handleKeyDown}
        ></Search>
        <ul className="dashboard-menu">{this.getListTab()}</ul>
        <ListData data={this.state.pageOfData} updateData={this.updateData}></ListData>
        <Pagination pager={this.state.pager} setPage={this.setPage} />
      </div>
    );
  }
}

export default App;

import * as React from "react";
import "./App.css";
import Pagination from "./components/Pagination/index";
import ListData from "./components/ListData/index";
import Search from "./components/Search/index";
import Dropdown from "./components/Dropdown/index";
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
      sort: "Title",
      showDropdown: false,
      loading: true,
    };
    this.dataGlobal = [];
  }

  callAPI = () => {
    this.setState({ loading: true });
    const promise1 = new Promise((resolve, reject) => {
      resolve(getAllData(this.state.search));
    });
    promise1.then((data) => {
      this.setState({ data, pageOfData: (data && data.slice(0, 9)) || [], loading: false }, () => {
        this.setPage(1);
      });
    });
  }

  componentDidMount() {
    this.callAPI();
  }

  handleSearch = (e) => {
    let value = e.currentTarget.value;
    this.setState({ search: value });
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.callAPI();
    }
  };

  filterDataByTab = (tab) => {
    let data = [...JSON.parse(localStorage.getItem("data"))];
    let newArr = [];
    if (tab === "Liked") {
      data.forEach((item, idx) => item.like && !item.remove & newArr.push({ ...item, idx }));
    } else if (tab === "Removed") {
      data.forEach((item, idx) => item.remove && newArr.push({ ...item, idx }));
    } else {
      data.forEach((item, idx) => !item.like && !item.remove && newArr.push({ ...item, idx }));
    }
    return newArr;
  };

  setCurrentTab = (newTab) => {
    const data = this.filterDataByTab(newTab);
    this.setState({ tab: newTab, data, pageOfData: data.slice(0, 9) }, () => {
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
    pageSize = pageSize || 9;
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 9) {
      // less than 9 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 9 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 9;
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
    let pageOfData =
      data && data.slice(newPager.startIndex, newPager.endIndex + 1);
      this.setState((state, props) => ({ pager: newPager, pageOfData: pageOfData }));
  };

  updateData = (index, key, value) => {
    let data = JSON.parse(localStorage.getItem("data")) || [];
    data[index] = { ...data[index], [key]: value };
    localStorage.setItem("data", JSON.stringify(data));
    const filterData = this.filterDataByTab(this.state.tab);
    this.setState((state, props) => ({
      data: filterData,
      pageOfData: filterData.slice(0, 9),
    }));
  };

  handleChange = (value) => () => {
    let mod = value === "A-Z" ? 1 : -1;
    let data = this.state.data.sort(function (a, b) {
      if (a.data[0].title < b.data[0].title) {
        return -1 * mod;
      }
      if (a.data[0].title > b.data[0].title) {
        return 1 * mod;
      }
      return 0;
    });
    this.setState({
      sort: value,
      showDropdown: false,
      data,
      pageOfData: data.slice(0, 9),
    });
  };

  handleToggle = (e) => {
    e.target.focus();
    this.setState({ showDropdown: !this.state.showDropdown });
  };

  handleBlur = (e) => {
    if (this.state.showDropdown) {
      setTimeout(() => {
        this.setState({ showDropdown: false });
      }, 200);
    }
  };

  render() {
    const {
      loading,
      search,
      sort,
      showDropdown,
      pageOfData,
      pager,
    } = this.state;
    return (
      <div className="container">
        <div className="tool">
          <Search
            value={search}
            handleSearch={this.handleSearch}
            handleKeyDown={this.handleKeyDown}
          ></Search>
          <Dropdown
            value={sort}
            show={showDropdown}
            handleToggle={this.handleToggle}
            handleBlur={this.handleBlur}
            handleChange={this.handleChange}
          ></Dropdown>
        </div>
        <ul className="dashboard-menu">{this.getListTab()}</ul>
        {loading ? (
          <div className="loading" />
        ) : (
          <div>
            <ListData data={pageOfData} updateData={this.updateData}></ListData>
            <Pagination pager={pager} setPage={this.setPage} />
          </div>
        )}
      </div>
    );
  }
}

export default App;

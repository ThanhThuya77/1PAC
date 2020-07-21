import * as React from "react";
import "./App.css";
import Pagination from "./components/Pagination/index";
import ListData from "./components/ListData/index";

class App extends React.Component {
  constructor() {
    super();

    // an example array of items to be paged
    var exampleItems = [...Array(50).keys()].map((i) => ({
      id: i + 1,
      name: "Item " + (i + 1),
    }));

    this.tabs = ['All', 'Liked', 'Removed'];

    this.state = {
      pageOfItems: [],
      tab: 'All',
      data: exampleItems,
    };

    // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  setCurrentTab = (newTab) => {
    this.setState({tab: newTab});
  }

  getListTab = () => {
    return this.tabs.map((item, idx) => {
      return <li key={idx} className={`${this.state.tab === item ? 'selectedTab': '' }`} onClick={() => this.setCurrentTab(item)}>{item}</li>
    });
  }

  render() {
    
    return (
      <div>
        <div className="container">
          <ul className="dashboard-menu">{this.getListTab()}</ul>
          <ListData data={this.state.pageOfItems}></ListData>
          <Pagination
            items={this.state.data}
            onChangePage={this.onChangePage}
          />
        </div>
      </div>
    );
  }
}

export default App;

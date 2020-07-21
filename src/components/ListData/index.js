import * as React from "react";

class ListData extends React.Component {

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <table>
        <div className="container">
          {this.props.data.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      </table>
    );
  }
}

export default ListData;

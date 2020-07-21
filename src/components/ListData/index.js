import * as React from "react";

class ListData extends React.Component {
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    let newData = this.props.data && this.props.data.data && this.props.data.data[0] || [];
    return (
      <div>
        {newData.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    );
  }
}

export default ListData;

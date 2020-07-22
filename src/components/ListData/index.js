import * as React from "react";
import './style.css';

class ListData extends React.Component {
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    return (
      <div>
        {this.props.data.map((item) => (
          <div key={item.data[0].nasa_id} className='item-data'>{item.data[0].title}</div>
        ))}
      </div>
    );
  }
}

export default ListData;

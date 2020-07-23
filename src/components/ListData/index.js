import * as React from "react";
import "./style.css";

const ListData = (props) => {
  return (
    <div className="list-data">
      {props.data.length ===0 && <p>Data not found</p>}
      {props.data.map((item, i) => (
        <div className="item-data" key={item.data[0].nasa_id}>
          <img
            src={item.links[0].href}
            alt={item.data[0].title}
            width="300"
            height="300"
          />
          <div>
            <p>{item.data[0].title}</p>
          </div>
          <div>
            <button className={`${item.like ? "like" : "unlike"}`}
              onClick={() => props.updateData(item.idx || i, "like", !item.like || false)}
            />
            <button className={`${!item.remove ? "remove" : "undo"}`}
              onClick={() => props.updateData(item.idx || i, "remove", !item.remove || false)}
            />
            {/* <button className={`${!item.edit ? "edit" : "save"}`}
              onClick={() => props.updateData(item.idx || i, "edit", !item.edit || false)}
            /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListData;

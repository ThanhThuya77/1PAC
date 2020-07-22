import * as React from "react";
import "./style.css";

const ListData = (props) => {
  return (
    <div>
      {props.data.map((item, idx) => (
            <div className="item-data" key={item.data[0].nasa_id}>
              <img src={item.links[0].href} alt={item.data[0].title} width="300" height="300"/>
              {/* <td className="item-data">{item.data[0].title}</td>
              <td className="item-data">{item.data[0].date_created}</td>
              <td className="item-data">{item.data[0].photographer}</td> */}
              <div>
                <button className={`${item.like ? 'like' : 'unlike'}`} onClick={() => props.updateData(idx, 'like', !item.like || false)}/>
                <button className={`${!item.remove ? 'remove' : 'undo'}`} onClick={() => props.updateData(idx, 'remove', !item.remove || false)}/>
                <button className='edit'/>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ListData;

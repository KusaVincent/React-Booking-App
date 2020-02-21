import React from "react";

import "./EventItem.css";

const eventItem = props => (
  <li key={props.eventId} className="event_list-item">
    <div>
      <h1> {props.title} </h1>
      <h2>
        Price:
        {props.price === 0 ? <b>Free</b> : <b>Ksh{props.price}</b>}
        <b style={{ marginLeft: "40px" }}>
          Date: {new Date(props.date).toLocaleDateString()}
        </b>
      </h2>
    </div>
    <div>
      {props.userId === props.creatorId ? (
        <p>The Owner</p>
      ) : (
        <button
          className="btn"
          onClick={props.onDetail.bind(this, props.eventId)}
        >
          View Event
        </button>
      )}
    </div>
  </li>
);
export default eventItem;

import React from "react";
import {Row} from "../../components/Leaderboard/";
// import Row from "./Row.js";

export const Leaderboard = props => 
  <div className="row" >
    {console.log(props)}

        <Row data={props.data} amt={1} />

    <div className="col-6">
      hello
    </div>
  
  </div>;

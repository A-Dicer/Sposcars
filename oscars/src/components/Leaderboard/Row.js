import React from "react";

export const Row = props =>
  <div className="col-sm-6">
     { props.data.length 
     ? props.data.map((user, i)=>
       i < 25 ? <div>  {i+1}: {user.username} </div> : null
     )
     :console.log('false')}
  </div>;

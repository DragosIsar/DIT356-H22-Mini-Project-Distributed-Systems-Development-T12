import React, { Component } from "react";
import CancellationItems from "./CancellationItems";
import 'bootstrap/dist/css/bootstrap.min.css'

class Cancellations extends Component {
    
render () {
 return this.props.c.map((c)  => (
<CancellationItems key={c.id} cancellations={c}/>
 ));
 }
}
export default Cancellations

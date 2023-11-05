import React, { Component } from "react";
import InboxItems from "./InboxItems";
import 'bootstrap/dist/css/bootstrap.min.css'

class Inbox extends Component {
    
render () {
 return this.props.inbox.map((inbox)  => (
<InboxItems key={inbox.id} inb={inbox}/>
 ));
 }
}
export default Inbox

//import { DateTime } from "luxon";
import Context from "../../context/context"
import {useContext, useState} from "react"

const Comment = (props) => {    
    const { content, id, username, date } = props;
    //console.log(username)

    const context = useContext(Context)


    return (
        
        <div >
            <div >
              <span >{username}</span>
              {/* <span className="postDate">{DateTime.fromISO(date).toRelative()}</span> */}

            </div>

          <div >
            <span>{content}</span>
          </div>

          
        </div>
      
    )
}

export default Comment; 
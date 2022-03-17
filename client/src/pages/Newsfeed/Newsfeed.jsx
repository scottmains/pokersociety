import React from "react";
import "./Newsfeed.css"
/**

 * 
 * @author Scott Mains
 */

class Newsfeed extends React.Component {

    handleLogoutClick = () => {
        this.setState({
            authenticated:false,
            token: null
        })
        localStorage.removeItem('auth-token');  
        window.location.reload(false);
    }


    render() {

        return (

                <div className= "newsfeed section__padding">
                  <h1> NEWS FEED </h1>
                  <p> News feed will go here</p>
                  <button className="slice__collect-button" onClick={this.handleLogoutClick}>Log Out</button>
                </div>

     
              )
            }
          }
 
export default Newsfeed;
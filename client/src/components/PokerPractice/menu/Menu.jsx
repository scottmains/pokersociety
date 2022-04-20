import React from 'react';


class Menu extends React.Component {

  onTrigger = (event) => {
    this.props.updateState(event.target.myname.value)
    event.preventDefault();
  }

  render() {
    return (
    
      <form className="poker-menu-container" onSubmit={this.onTrigger}>
        <div className='number-bots--radiobuttons'>
          <input type="text" name="myname" placeholder="Enter bot amount (1 to 4)"/>
        </div>
        <button className="startgame--button" type="submit">Start game</button>
      </form>
    )
  }
}

export default Menu;
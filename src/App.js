import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  getData = url => {
    axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/${url}`)
      .then(res => { this.setState({ list: res.data }); })
      .catch(error => { console.log(error); });
  };

  constructor(props) {
    super(props)

    this.state = {
      list: [],
      showRecent: true,
    };

    this.getDataAlltime = this.getDataAlltime.bind(this);
    this.getDataRecent = this.getDataRecent.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.getData('recent');
  }

  getDataAlltime() {
    console.log("getDataAlltime");
    this.getData('alltime');
    this.setState({showRecent: false});
  }

  getDataRecent() {
    console.log("getDataRecent");
    this.getData('recent');
    this.setState({showRecent: true});
  }

  getShowRecent() {
    return this.state.showRecent ? 'active' : '';
  }

  render() {
    return (
      <div className="App">
        {/* Header */}
        < div className="header" >
          <h1>Leaderboards</h1>

          <div className="row">
            <div className="cell"><span>Points by</span></div>

            <div className={this.state.showRecent ? 'cell btn-container active' : 'cell btn-container'}>
              <span className='btn' onClick={this.getDataRecent}>30 days</span>
            </div>

            <div className={this.state.showRecent ? 'cell btn-container' : 'cell btn-container active'}>
              <span className='btn' onClick={this.getDataAlltime}>all</span>
            </div>
          </div>

        </div >

        {/* Body */}
        <div className="board" >
          {
            this.state.list.map(
              (user, idx) =>
                <div key={++idx} className='user'>
                  <div className='rank'>{ idx }</div>
                  <div className='avatar-container'><img src={user.img} alt="user avatar" /></div>
                  <div className='name'>{user.username}</div>
                  <div className='recent'>{user.recent}</div>
                  <div className='alltime'>{user.alltime}</div>
                </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;

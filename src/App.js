import prop from "./assets/props.png"
import './App.css';
import Modal from "./Modal"
import Table from "./BuyTable"
import React, { Component } from 'react';
import music from "./assets/magic.mp3";
let all_tricks = [{
  "name": "Ball In Cups",
  "price": 3000,
  "morale": 1,
  "upkeep": 0.5,
  "hype": 2,
  "img": "",
  "position": "start",
  "is_owned": true,
  "is_chosen": false
},
{
  "name": "Rope Trick",
  "price": 5000,
  "morale": 1,
  "upkeep": 0.7,
  "hype": 2,
  "img": "",
  "position": "start",
  "is_owned": false,
  "is_chosen": false
},
{
  "name": "Levitation",
  "price": 1000,
  "morale": 1,
  "upkeep": 0.5,
  "hype": 2,
  "img": "",
  "position": "start",
  "is_owned": false,
  "is_chosen": false
},
{
  "name": "Bunny Magic",
  "price": 1000,
  "morale": 1,
  "upkeep": 0.5,
  "hype": 2,
  "img": "",
  "position": "middle",
  "is_owned": true,
  "is_chosen": false
},
{
  "name": "Osmosis",
  "price": 1000,
  "morale": 1,
  "upkeep": 0.5,
  "hype": 2,
  "img": "",
  "position": "middle",
  "is_owned": false,
  "is_chosen": false
},
{
  "name": "Chain Break",
  "price": 1000,
  "morale": 1,
  "upkeep": 0.5,
  "hype": 2,
  "img": "",
  "position": "middle",
  "is_owned": false,
  "is_chosen": false
},
{
  "name": "Elephant Disappear",
  "price": 1000,
  "morale": 1,
  "upkeep": 0.5,
  "hype": 2,
  "img": "",
  "position": "finale",
  "is_owned": true,
  "is_chosen": false
},
{
  "name": "Fire Work",
  "price": 1000,
  "morale": 1,
  "upkeep": 0.5,
  "hype": 2,
  "img": "",
  "position": "finale",
  "is_owned": false,
  "is_chosen": false
},
{
  "name": "Levitation",
  "price": 1000,
  "morale": 1,
  "upkeep": 0.5,
  "hype": 2,
  "img": "",
  "position": "finale",
  "is_owned": false,
  "is_chosen": false
}
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 10000,
      upkeep: 2,
      morale: 2,
      hype: 2,
      all_tricks: all_tricks,
      current_tricks: {
        start: all_tricks[0],
        middle: all_tricks[3],
        finale: all_tricks[6]
      },
      budget: {
        Advertisement: 0,
        expenses: 0,
        maintenance: 0,
        saving: 0,
        shop: 0
      },
      day: 1,
      earning: 10000,
      saving: 0,
      gameOver: false,
      sound: true
    }
  }
  toggleSound = () => {
    let sound = document.getElementsByTagName("embed");
    sound[0].volume = "0";
    this.setState({ sound: !this.state.sound })
  }
  onBudgetSet = (e) => {
    const shop = document.getElementById("section");
    let sliders = document.getElementsByTagName('input');
    const mybudget = {
      Advertisement: parseInt(sliders[0].value),
      expenses: parseInt(sliders[1].value),
      maintenance: parseInt(sliders[2].value),
      saving: parseInt(sliders[3].value),
      shop: parseInt(sliders[4].value)
    }

    this.setState({
      budget: mybudget,
      saving: this.state.saving + mybudget.saving,
      balance: 0
    })
    shop.scrollIntoView();
  }
  calculateEarning = () => {
    let hype = 0, morale = 0, upkeep = 0;
    console.log(this.state.budget.Advertisement);
    hype = (this.state.budget.Advertisement / this.state.earning) * 10
      + this.state.current_tricks.start.hype
      + this.state.current_tricks.middle.hype
      + this.state.current_tricks.finale.hype;
    morale = (this.state.budget.expenses / this.state.earning) * 10
      + this.state.current_tricks.start.morale
      + this.state.current_tricks.middle.morale
      + this.state.current_tricks.finale.morale;
    upkeep = (this.state.budget.maintenance / this.state.earning) * 30
      - this.state.current_tricks.start.morale
      - this.state.current_tricks.middle.morale
      - this.state.current_tricks.finale.morale;
    let earning = (upkeep * 0.4 + morale * 0.28 + hype * 0.32) * 5000;
    let gameOver = false;
    console.log(hype);
    console.log(morale);
    console.log(upkeep);
    if (hype <= 0 || morale <= 0 || upkeep <= 0) {
      gameOver = true;
    }
    let showTime = document.getElementById("show-time");
    showTime.scrollIntoView();
    this.setState({
      earning: earning,
      balance: earning,
      hype: hype,
      morale: morale,
      upkeep: upkeep,
      gameOver: gameOver,
      day: this.state.day + 1
    })
  }
  toggleChosen = (trick) => {
    console.log(trick);
    let bal = this.state.budget;
    console.log(bal.shop);
    if (trick.is_chosen == false && trick.price > bal.shop) {
      return;
    } else if (trick.is_chosen) {
      bal.shop += trick.price;
    } else {
      bal.shop -= trick.price;
    }
    const tricks = this.state.all_tricks
      .map((rv) => {
        if (rv.name == trick.name) {
          const rm = rv;

          rm.is_chosen = !rm.is_chosen;
          return rm;
        }
        return rv;
      });
    console.log(tricks);
    this.setState({ all_tricks: tricks, budget: bal });

  }
  Continue = () => {
    let setBudget = document.getElementById("make-budget");
    setBudget.scrollIntoView();
  }
  buyTricks = () => {
    let mytricks = this.state.all_tricks.map((trick) => {
      if (trick.is_chosen) {
        trick.is_chosen = false;
        trick.is_owned = true;
      }

      return trick;
    });
    console.log(mytricks);
    let routine = document.getElementById("set-routine");
    routine.scrollIntoView()
    this.setState({ all_tricks: mytricks });
  }

  choseTricks = (trick) => {
    let ct = this.state.current_tricks;
    ct[trick.position] = trick;
    this.setState({ current_tricks: ct });
  }

  handleChange = (e) => {
    let count = 0;
    let myId = e.target.id;
    let mybudget = this.state.budget;
    mybudget[myId] = parseInt(e.target.value);
    let sliders = document.getElementsByTagName('input');
    console.log(sliders);
    for (let i = 0; i < sliders.length; i++) {
      count += parseInt(sliders[i].value);
    }
    let balance = this.state.earning - count;
    this.setState({ balance: balance, budget: mybudget });

  }
  render() {
    const style = {
      width: "30%",
      height: "50px"
    }



    return (
      <div className="App">

        <div className="heading">
          <div className="nav nav-dark text-white fixed bg-dark p-3">
            Hype
            <div class="bg-secondary border w-25">
              <div class="float-left progress  bg-primary" style={{ "width": this.state.hype * 10 + "%" }} >{this.state.hype * 10}% </div>
            </div>

            Morale
            <div class="bg-secondary border w-25">
              <div class="float-left progress bg-primary" style={{ "width": this.state.morale * 10 + "%" }} >{this.state.morale * 10}% </div>
            </div>

            Upkeep
            <div class="bg-secondary w3-xlarge border w-25">
              <div class="float-left progress bg-primary" style={{ "width": this.state.upkeep * 10 + "%" }}>{this.state.upkeep * 10}% </div>
            </div>
            <i onClick={this.toggleSound} class="fas fa-volume-off"></i>
            <h4>Day {this.state.day}</h4>
          </div>
          <div className="gamebox">
            <h1>Jaaduuu</h1>
          </div>

        </div>
        <div className="balance">
          <h2>₹: {this.state.balance}</h2>
        </div>

        <div className="content">
          <div>

            <div id="make-budget" className='py-5'>
              <div>
                <h3>Advertisement</h3>
                <div className="slidecontainer">
                  <input type="range" min="0" max={this.state.earning} defaultValue="0" className="slider" id="Advertisement" onChange={(e) => { this.handleChange(e) }} onChange={(e) => { this.handleChange(e) }} />
                </div>
                <small id="sm">{this.state.budget.Advertisement}</small>
              </div>

              <div >
                <h3>Expenses</h3>
                <div className="slidecontainer">
                  <input type="range" min="0" max={this.state.earning} defaultValue="0" className="slider" id="expenses" onChange={(e) => { this.handleChange(e) }} />
                </div>
                <small>{this.state.budget.expenses}</small>
              </div>
              <div >
                <h3>Maintenance</h3>
                <div className="slidecontainer">
                  <input type="range" min="0" max={this.state.earning} defaultValue="0" className="slider" id="maintenance" onChange={(e) => { this.handleChange(e) }} />
                </div>
                <small>{this.state.budget.maintenance}</small>
              </div>
              <div>
                <h3>Saving</h3>
                <div className="slidecontainer">
                  <input type="range" min="0" max={this.state.earning} defaultValue="0" className="slider" id="saving" onChange={(e) => { this.handleChange(e) }} />
                </div>
                <small>{this.state.budget.saving}</small>
              </div>

              <div >
                <h3>Shop</h3>
                <div className="slidecontainer">
                  <input type="range" min="0" max={this.state.earning} defaultValue="0" className="slider" id="shop" onChange={(e) => { this.handleChange(e) }} />
                </div>
                <small>{this.state.budget.shop}</small>
              </div>

            </div>
            <div className="text-center py-2">
              <button className="btn btn-primary p-3 " id="sec1" onClick={this.onBudgetSet}>Budget</button>
            </div>

          </div>


          <div><img src={prop}></img> </div>


          <div id="set-tricks" className='trick'>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" id="section">
              <li className="nav-item" role="presentation">
                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">OPENER</a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">MIDDLE</a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false"> FINALE </a>
              </li>
            </ul>


            <div className="tab-content text-center" id="pills-tabContent ">
              <Table toggleChosen={this.toggleChosen} all_tricks={this.state.all_tricks} position="start" id="pills-home" />
              <Table toggleChosen={this.toggleChosen} all_tricks={this.state.all_tricks} position="middle" id="pills-profile" />
              <Table toggleChosen={this.toggleChosen} all_tricks={this.state.all_tricks} position="finale" id="pills-contact" />
            </div>
            <div className="buy">
              <button style={style} className="btn btn-secondary" onClick={this.buyTricks}>Buy</button>
            </div>
            <div className="rmamt">
              Magic shop fund:{this.state.budget.shop}
            </div>
          </div>
          <div><img src={prop}></img></div>
          <div id="set-routine" >
            <div className="position-card " data-toggle="modal" data-target=".bd-opener-modal-lg">OPENER</div>
            <div className="position-card" data-toggle="modal" data-target=".bd-middle-modal-lg">MIDDLE</div>
            <div className="position-card" data-toggle="modal" data-target=".bd-finale-modal-lg">FINALE</div>


            <Modal position="start" all_tricks={this.state.all_tricks} choseTricks={this.choseTricks} className="bd-opener-modal-lg" />
            <Modal position="middle" all_tricks={this.state.all_tricks} choseTricks={this.choseTricks} className="bd-middle-modal-lg" />
            <Modal position="finale" all_tricks={this.state.all_tricks} choseTricks={this.choseTricks} className="bd-finale-modal-lg" />
            <button style={style} className="show-time btn btn-secondary" onClick={this.calculateEarning}>Show Time</button>
          </div >

          <div> <img src={prop} /></div>
          <div id="show-time">
            {!this.state.gameOver ?
              <h1>Your Earning was ₹{this.state.earning}</h1> :
              <h1>You lost</h1>
            }
            <button className="btn btn-primary" onClick={this.Continue}>Continue</button>

          </div>

        </div >
      <embed src={music} volume="10" loop="true" autostart="true" width="2" height="0" />
      </div >
    );
  }
}

export default App;

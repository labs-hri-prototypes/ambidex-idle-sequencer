import React from 'react';
import './App.css';
import {data_pr} from './data.js';


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*   Variables & Constants                                                     */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var showCam = false;




/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*   React classes                                                             */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Media related classes -------------------------------------------------------

class Placeholder extends React.Component {
  render() {
    return (
      <div
        id={this.props.id}
        className="placeholder"
        style={{visibility: this.props.visibility ? "visible" : "hidden"}}
      >
        {this.props.content}
      </div>
    );
  }
}

class Video extends React.Component {
  changeSource() {

  }
  render() {
    return (
      <video
        id={this.props.id}
        className=""
        onEnded={() => videoEndHandler()}
        src={this.props.src}
      />
    );
  }
}

class Img extends React.Component {
  render() {
    return (
      <img
        id={this.props.id}
        src={this.props.src}
      />
    );
  }
}

// Dashboard related classes ---------------------------------------------------

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  makeStatusTable() {

  }
  makeRangeTable(prOut) {
    let rows = [];
    prOut.forEach((item, index) => {
      let ifClass = '';
      ifClass = (index === 0) ? 'border-top' : ifClass;
      ifClass += (item.isEndOfCat) ?
        ((ifClass ? ' ' : '') + 'border-bottom')
        : '';
      ifClass += (item.isPrev) ?
        ((ifClass ? ' ' : '') + 'prev')
        : '';
      ifClass += (item.isCurrent) ?
        ((ifClass ? ' ' : '') + 'active')
        : '';
      let row = <tr key={index} className={ifClass}>
        <td>{item.code}</td>
        <td>{parseFloat(item.pr).toFixed(3)}</td>
        </tr>;
      rows.push(row);
    });
    return rows;
  }
  render() {
    let rows = this.makeRangeTable(this.props.prOut);
    return (
      <div className="ui-container-h ui-container-gap abs-left">
      <div className="ui-panel">
        <h1>probability</h1>
        <table className="dashboard">
          <tbody id="table_dashboard_dice">
            <tr><td>prev</td><td>{this.props.prevMotion}</td></tr>
            <tr><td>random</td><td>{parseFloat(this.props.dice).toFixed(3)}</td></tr>
          </tbody>
        </table>
        <table className="dashboard">
          <tbody id="table_dashboard_pr">
            {rows}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}

class Controlboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 100
    }
  }
  makeBarTable(prIn) {
    let rows = [];
    const data_array = Object.keys(prIn);
    data_array.forEach((set, setIndex) => {
      if (set === 'primary' || set === 'secondary') {
        let contents = [];
        let value_old = 0;
        prIn[set].prRatios.forEach((item, index) => {
          let _content = <input
            type="range"
            id={set+'_'+item.cat}
            key={set+'_'+item.cat}
            className={'controls'}
            min={this.state.min}
            max={this.state.max}
            label={item.cat}
            defaultValue={(item.pr + value_old)*100}
          />;
          if (index < prIn[set].prRatios.length - 1) {
            contents.push(_content);
            value_old += item.pr;
          }
        });
        let row = <tr key={set}>
          <td className="header">{set}</td>
          <td className="cell-slider">{contents}</td>
        </tr>;
        rows.push(row);
      }
      else {
        prIn[set].prRatios.forEach((inSet, inSetIndex) => {
          let contents = [];
          let value_old = 0;
          inSet.prRatios.forEach((item, index) => {
            let _content = <input
              type="range"
              id={item.code}
              key={item.code}
              className={'controls'}
              min={this.state.min}
              max={this.state.max}
              label={item.code}
              defaultValue={(item.pr + value_old)*100}
              onChange={() => blabla()}
            />;
            if (index < inSet.prRatios.length - 1) {
              contents.push(_content);
              value_old += item.pr;
            }
          });
          let row = <tr key={inSet.cat}>
            <td className="header">{inSet.cat + ' (' + inSet.desc + ')'}</td>
            <td className="cell-slider">{contents}</td>
          </tr>;
          if(inSet.prRatios.length > 1) {
            rows.push(row);
          }
        });
      }
    });
    return rows;
  }
  render() {
    const content = this.makeBarTable(this.props.data);
    return (
      <div className="ui-container-v abs-right">
        <input type="checkbox" id="toggle_panel" value="false"/>
        <label htmlFor="toggle_panel" className="toggle-panel">probability ratio</label>
        <div className="ui-panel round-bottom">
        <table className="controlpanel">
          <tbody>
            {content}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

// Footer ----------------------------------------------------------------------

class Footer extends React.Component {
  render() {
    const btn_start = 'btn_start';
    const btn_end = 'btn_end';
    const btn_cam = 'btn_cam';
    return (
      <div className="footer">
        <div className="ui-container-h ui-container-gap abs-left">
          <Btn
            id="btn_start"
            label="idle start"
            onClick={() => this.props.onClick('btn_start')}
          />
          <Btn
            id="btn_end"
            label="idle end"
            onClick={() => this.props.onClick('btn_end')}
          />
        </div>
        <div className="ui-container-h ui-container-gap abs-right">
          <Btn
            id="btn_cam"
            label="change cam"
            onClick={() => this.props.onClick('btn_cam')}
          />
        </div>
        <Playback />
      </div>
    );
  }
}

class Playback extends React.Component {
  render() {
    return (
      <input
        type="range"
        className="playback"
        min="0"
        max="100"
      />
    );
  }
}

// Generic UI components -------------------------------------------------------

class Btn extends React.Component {
  render() {
    return (
      <button
        type="button"
        id={this.props.id}
        onClick={this.props.onClick}
      >
        {this.props.label}
      </button>
    );
  }
}



/*******************************************************************************/
/*   Assemble!!!   *************************************************************/
/*******************************************************************************/

class App extends React.Component {
  constructor(props) {
    super(props);
    let prevMotion = 'none';
    let currentMotion = 'none';
    this.state = {
      sideCamVisible: false,
      playStatus: 'none',
      prevMotion: prevMotion,
      currentMotion: currentMotion,
      dice: 0,
      prIn: data_pr,
      prOutType: 1,
      prOut: this.calcPrOut(data_pr, 1, prevMotion, currentMotion),
      prOut1: this.calcPrOut(data_pr, 1, prevMotion, currentMotion),
      prOut2: this.calcPrOut(data_pr, 2, prevMotion, currentMotion)
    };
  }
  findMotion() {
    let dice = Math.random();
    let current = this.state.currentMotion;
    let prev = this.state.prevMotion;
    let fix = '1-a';
    let prOutType = this.state.prOutType;
    prOutType = (prOutType === 1) ?
      ((current === fix) ? 2 : 1) : 1;
    let prOut = (prOutType === 2) ? this.state.prOut2 : this.state.prOut1;

    let temp = this.findCurrent(dice, prOut);
    console.log(dice);
    console.log(temp);
    while(temp === current && temp != fix) {
      console.log('repeat');
      dice = Math.random();
      temp = this.findCurrent(dice, prOut);
      console.log(dice);
      console.log(temp);
    }
    prev = current;
    current = temp;
    prOut.forEach(item => {
      item.isPrev = false;
      item.isCurrent = false;
    });
    const codes = prOut.map(item => {
      return item.code;
    });
    if(codes.includes(prev)) {
      prOut.find(o => o.code === prev).isPrev = true;
    }
    prOut.find(o => o.code === current).isCurrent = true;
    this.setState({
      dice: dice,
      prevMotion: prev,
      currentMotion: current,
      prOutType: prOutType,
      prOut: prOut
    });
    return current;
  }
  findCurrent(dice, prOut) {
    for (let i = 0; i < prOut.length; i++) {
      if(dice < prOut[i].pr) {
        return prOut[i].code;
      }
    }
  }

  calcPrOut(prIn, target, prev, current) {
    let _range = [];
    let _cat;
    let _pr_accum = 0;
    let _data = (target === 1) ?
      prIn.primary.prRatios : prIn.secondary.prRatios;
    prIn.motionGroup.prRatios.forEach((item, index) => {
      _cat = item.cat;
      let pr_cat = _data.find(o => o.cat === _cat).pr;
      let pr_accum_inCat = 0;
      _pr_accum += (index > 0) ? _data[index-1].pr : 0;
      item.prRatios.forEach((item, index, array) => {
        pr_accum_inCat += pr_cat * item.pr;
        let pr1 = _pr_accum + pr_accum_inCat;
        let isCurrent = (item.code === current) ? true : false;
        let isPrev = (item.code === prev) ? true : false;
        let isEnd = (index === array.length - 1) ? true : false;
        let output = {
          code: item.code,
          pr: pr1,
          cat: _cat,
          isCurrent: isCurrent,
          isPrev: isPrev,
          isEndOfCat: isEnd
        };
        _range.push(output);
      });
    });
    console.log(_range);
    return _range;
  }
  setPrOut() {
    const _pr1 = this.calcPrOut(
      this.state.prIn,
      1,
      this.state.prevMotion,
      this.state.currentMotion
    );
    const _pr2 = this.calcPrOut(
      this.state.prIn,
      2,
      this.state.prevMotion,
      this.state.currentMotion
    );
    const prOut = (this.state.prOutType == 2) ? _pr2 : _pr1;
    this.setState({
      prOut: prOut,
      prOut1: _pr1,
      prOut2: _pr2
    });
  }
  setPrIn() {
    this.setPrOut();
  }
  handleClick(id) {
    switch(id) {
      case 'btn_start':
        this.findMotion();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <Placeholder
        id="box_cam_front"
          content={<Img src={require('./img/front_default.jpg')}/>}
          visibility={true}
        />
        <Placeholder
        id="box_cam_side"
          content={<Img src={require('./img/side_default.jpg')}/>}
          visibility={showCam}
        />
        <Dashboard
          prOut={this.state.prOut}
          prevMotion={this.state.prevMotion}
          dice={this.state.dice}
        />
        <Controlboard data={this.state.prIn}/>
        <Footer
          onClick={id => this.handleClick(id)}
        />
      </div>
    );
  }
}
export default App;



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*   Functions                                                                 */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function setNextMotion() {
  console.log("set next motion and play");
}

function stopMotion() {
  console.log("stop motion");
}

function changeCam() {
  console.log("change camera");
}

function videoEndHandler() {

}

function blabla() {
  console.log('bla bla');
}

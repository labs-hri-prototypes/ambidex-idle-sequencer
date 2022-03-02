import React from 'react';
import './App.css';
import {data_pr} from './data.js';



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

// Controlboard related classes ------------------------------------------------

class Controlboard extends React.Component {
  constructor(props) {
    super(props);
  }

  makeBarTable() {
    const prIn = this.props.data;
    let rows = [];
    const data_array = Object.keys(prIn);
    data_array.forEach((set, setIndex) => {
      if (set === 'primary' || set === 'secondary') {
        let contents = [];
        let value_old = 0;
        prIn[set].prRatios.forEach((item, index) => {
          if (index < prIn[set].prRatios.length - 1) {
            const value_next =
              value_old +
              item.pr +
              prIn[set].prRatios[index + 1].pr;
            const value = parseInt((item.pr + value_old)*100);
            const _content = <Slider
              id={set+'_'+item.cat}
              key={set+'_'+item.cat}
              cat={item.cat}
              value={value}
              onChange={this.props.onSliderChange}
            />;
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
            if (index < inSet.prRatios.length - 1) {
              const value_next =
                value_old +
                item.pr +
                prIn[set].prRatios[index + 1].pr;
              const value = parseInt((item.pr + value_old)*100);
              const _content = <Slider
                id={item.code}
                key={item.code}
                cat={inSet.cat}
                value={value}
                onChange={this.props.onSliderChange}
              />;
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
    let content = this.makeBarTable();
    return (
      <div className="ui-container-v abs-right">
        <div className="header-mini">probability ratio</div>
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

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  handleChange(e) {
    const value = e.target.value;
    return this.props.onChange(this.props.id, value);
  }
  handleMouseUp(e) {
    console.log("input value changed:");
    console.log(`  id: ${this.props.id}, value: ${this.props.value}`);
  }
  render() {
    return (
      <div className="wrapper-slider">
        <input
          type="range"
          id={this.props.id}
          cat={this.props.cat}
          className='controls'
          min={0}
          max={100}
          value={this.props.value}
          onChange={this.handleChange}
          onMouseUp={this.handleMouseUp}
        />
        <div
          className="slider-indicator"
          style={{left: `calc(6px + (100% - 12px)*${this.props.value}/100)`}}
        >
          {this.props.value}</div>
      </div>
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
      trial: 0,
      prIn: data_pr,
      prOutType: 1,
      prOut: this.calcPrOut(data_pr, 1, prevMotion, currentMotion),
      prOut1: this.calcPrOut(data_pr, 1, prevMotion, currentMotion),
      prOut2: this.calcPrOut(data_pr, 2, prevMotion, currentMotion)
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
  }

  handleClick(id) {
    ///*// DEBUG BTN
    console.log(`button pressed: ${id}`);
    //*/// DEBUG BTN
    switch(id) {
      case 'btn_start':
        this.findMotion();
        break;
      case 'btn_end':
        break;
      case 'btn_cam':
        const toggleCam = !this.state.sideCamVisible;
        this.setState({sideCamVisible: toggleCam});
        ///*// DEBUG TOGGLECAM
        console.log(`  sideCamVisible: ${toggleCam}`);
        //*/// DEBUG TOGGLECAM
        break;
      default:
        break;
    }
  }

  handleSlider(id, value) {
    let data = this.state.prIn;
    // for category ratio
    if(!id.match(/^\d/)) {
      const set = id.match(/^\D*(?=_)/)[0];
      const cat = parseInt(id.match(/\d*$/)[0]);
      let _value = parseFloat(value)/100;
      for(let i = 0; i <= cat; i++) {
        if(i > 0) {
          _value -= data[set].prRatios.find(o => o.cat === i-1).pr;
        }
      }
      const _value_diff = _value -
        parseFloat(data[set].prRatios.find(o => o.cat === cat).pr);
      data[set].prRatios.find(o => o.cat === cat).pr = _value;
      data[set].prRatios.find(o => o.cat === cat+1).pr -= _value_diff;
    }
    // for motion ratio in category
    else {
      const cat = parseInt(id.match(/^\d*(?=-)/)[0]);
      let data_cat = data.motionGroup.prRatios.find(o => o.cat === cat).prRatios;
      let _value = parseFloat(value)/100;
      for(let i = 0; i < data_cat.length - 1; i++) {
        if(i > 0) {
          _value -= data_cat[i-1].pr;
        }
      }
      for(let index = 0; index < data_cat.length;index++) {
        if(data_cat[index].code === id) {
          const _value_diff = _value - data_cat[index].pr;
          data_cat[index].pr = _value;
          data_cat[index+1].pr -= _value_diff;
          data.motionGroup.prRatios.find(o => o.cat === cat).prRatios = data_cat;
          break;
        }
      }
    }
    this.setState({prIn: data});
    this.setPrOut();
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

    ///*// DEBUG DICE
    console.log("======== iteration start ========");
    const trial = this.state.trial + 1;
    let debugbar = "";
    for (let i = 0; i < 20 - trial.toString().length; i++) {
      debugbar += "-";
    }
    console.log(`dice trial: ${trial} ${debugbar}`);
    console.log(`  dice thrown: ${dice.toFixed(3)}`);
    console.log(`  prev motion: ${current}`);
    console.log(`  new motion: ${temp}`);
    while(temp === current && temp != fix) {
      dice = Math.random();
      temp = this.findCurrent(dice, prOut);
      // DEBUG DICE REPEAT
      console.log('  (repeat trial)');
      console.log(`  dice thrown: ${dice.toFixed(3)}`);
      console.log(`  new motion: ${temp}`);
    }
    console.log("(dice trial ends) ---------------");
    //*/// DEBUG DICE

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
      trial: trial,
      prevMotion: prev,
      currentMotion: current,
      prOutType: prOutType,
      prOut: prOut
    });

    ///*// DEBUG PROUT
    console.log("prOut: " + JSON.stringify(this.state.prOut, null, 2));
    //*/// DEBUG PROUT

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

  showSideCam() {
    return (this.state.sideCamVisible) ? "visible" : "hidden";
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
          visibility={this.state.sideCamVisible}
        />
        <Dashboard
          prOut={this.state.prOut}
          prevMotion={this.state.prevMotion}
          dice={this.state.dice}
        />
        <Controlboard
          data={this.state.prIn}
          onSliderChange={this.handleSlider}
          />
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

function videoEndHandler() {

}

function blabla() {
  console.log('bla bla');
}

function clamp(value, min, max) {
  return (Math.min(Math.max(value, min), max));
}

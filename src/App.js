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
        style={{display: this.props.visibility ? "block" : "none"}}
      >
        {this.props.content}
      </div>
    );
  }
}

class Video extends React.Component {

  render() {
    return (
      <video
        id={this.props.id}
        //ref={this.props.videoref}
        style={{visibility: this.props.visibility ? "visible" : "hidden"}}
        onTimeUpdate={this.props.onTimeUpdate}
        onEnded={this.props.onEnded}
        preload="auto"
      >
        <source
          src={this.props.src}
          type="video/mp4"
        />
        Error to load video
      </video>
    );
  }
}

class Img extends React.Component {
  render() {
    return (
      <img
        id={this.props.id}
        src={this.props.src}
        alt={this.props.id}
      />
    );
  }
}

// Dashboard related classes ---------------------------------------------------

class Dashboard extends React.Component {

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
            const value = parseInt((item.pr + value_old)*100);
            const _content = <Slider
              id={`slider_${set}_${item.cat}`}
              key={`slider_${set}_${item.cat}`}
              cat={item.cat}
              value={value}
              onChange={this.props.onSliderChange}
            />;
            contents.push(_content);
            value_old += item.pr;
          }
        });
        let row = <tr key={`slidergroup_${set}`}>
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
              const value = parseInt((item.pr + value_old)*100);
              const _content = <Slider
                id={`slider_${item.code}`}
                key={`slider_${item.code}`}
                cat={inSet.cat}
                value={value}
                onChange={this.props.onSliderChange}
              />;
              contents.push(_content);
              value_old += item.pr;
            }
          });
          let row = <tr key={inSet.cat}>
            <td className="header">{`${inSet.cat} (${inSet.desc})`}</td>
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
        <Playback value={this.props.progressvalue}/>
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
        value={this.props.value}
        readOnly={true}
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
      isIdle: false,
      videoDuration: 0,
      videoProgress: 0,
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
    //this.videoRefFront = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
    this.handleVideoEnd = this.handleVideoEnd.bind(this);
  }

  handleClick(id) {
    console.log(`button pressed: ${id}`);
    switch(id) {
      case 'btn_start':
        if(!this.state.isIdle) {
          this.startVideo();
        }
        break;
      case 'btn_end':
      if(this.state.isIdle) {
        this.stopVideo();
      }
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

  handleSlider(idIn, value) {
    let data = this.state.prIn;
    let id = idIn.replace('slider_', '');
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
      const key = data_cat.indexOf(data_cat.find(o => o.code === id));
      let _value = parseFloat(value)/100;
      for(let i = 0; i <= key; i++) {
        if(i > 0) {
          _value -= data_cat[i-1].pr;
        }
      }
      const _value_diff = _value - parseFloat(data_cat[key].pr);
      data_cat[key].pr = _value;
      data_cat[key+1].pr -= _value_diff;
      data.motionGroup.prRatios.find(o => o.cat === cat).prRatios = data_cat;
    }
    this.setState({prIn: data});
    this.setPrOut();
  }

  showSideCam() {
    return (this.state.sideCamVisible) ? "visible" : "hidden";
  }

  startVideo() {
    const id = this.findMotion();
    const video_front = document.querySelector(`#front_${id}`);
    const video_side = document.querySelector(`#side_${id}`);
    video_front.play();
    video_side.play();
    console.log("from startVideo in App:");
    console.log(`  start playing video: ${id}`);
    console.log(`  video duration: ${video_front.duration}`);
    this.setState({isIdle: true})
    this.setState({videoDuration: video_front.duration})
  }

  stopVideo() {
    this.setState({isIdle: false});
  }

  handleVideoTime(id) {
    const video_front = document.querySelector(`#front_${id}`);
    const video_progress =
      video_front.currentTime / this.state.videoDuration * 100;
    this.setState({videoProgress: video_progress});
  }

  handleVideoEnd(cam) {
    if(cam === 'front') {
      this.setState({videoDuration: 0});
      console.log("from handleVideoEnd in App:");
      console.log("  video ended");
      if(this.state.isIdle) {
        this.startVideo();
      }
    }
  }

  findMotion() {
    let dice = Math.random();
    let current = this.state.currentMotion;
    let prev = this.state.prevMotion;
    let fix = '0-0-1';
    let prOutType = this.state.prOutType;
    prOutType = (prOutType === 1) ?
      ((current === fix) ? 2 : 1) : 1;
    let prOut = (prOutType === 2) ? this.state.prOut2 : this.state.prOut1;
    let temp = this.findCurrent(dice, prOut);
    const trial = this.state.trial + 1;

    ///*// DEBUG DICE
    console.log("from findMotion in App:");
    console.log("======== iteration start ========");
    let debugbar = "";
    for (let i = 0; i < 20 - trial.toString().length; i++) {
      debugbar += "-";
    }
    console.log(`dice trial: ${trial} ${debugbar}`);
    console.log(`  dice thrown: ${dice.toFixed(3)}`);
    console.log(`  prev motion: ${current}`);
    console.log(`  new motion: ${temp}`);
    //*/// DEBUG DICE
    while(temp === current && temp !== fix) {
      dice = Math.random();
      temp = this.findCurrent(dice, prOut);
      ///*// DEBUG DICE REPEAT
      console.log('  (repeat trial)');
      console.log(`  dice thrown: ${dice.toFixed(3)}`);
      console.log(`  new motion: ${temp}`);
      //*/// DEBUG DICE REPEAT
    }
    ///*// DEBUG DICE
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
    const prOut = (this.state.prOutType === 2) ? _pr2 : _pr1;
    this.setState({
      prOut: prOut,
      prOut1: _pr1,
      prOut2: _pr2
    });
  }

  renderContents(cam) {
    let codes = [];
    //const _videoref = (cam === 'side') ? this.videoRefSide : this.videoRefFront;
    const prOut = this.state.prOut;
    const current = this.state.currentMotion;
    prOut.forEach(item => {
      codes.push(item.code);
    });
    let contents = [];
    codes.forEach(item => {
      const _isTarget = (item === current) ? true : false;
      const _content = <Video
        key={item}
        //videoref={(_isTarget) ? _videoref : null}
        id={`${cam}_${item}`}
        src={require(`./video/${cam}_${item}.mp4`)}
        visibility={_isTarget}
        onTimeUpdate={() => this.handleVideoTime(item)}
        onEnded={() => this.handleVideoEnd(cam)}
      />;
      contents.push(_content);
    });
    /*// DEBUG RENDER CONTENTS
    console.log("from renderContents in App:");
    console.log("  updated video contents");
    console.log(`  current motion: ${this.state.currentMotion}`);
    */// DEBUG RENDER CONTENTS
    return contents;
  }

  render() {
    return (
      <div className="App">
        <Placeholder
        id="box_cam_front"
          content={
            <div>
              <Img src={require('./img/front_default.jpg')}/>
              {this.renderContents('front')}
            </div>
          }
          visibility={true}
        />
        <Placeholder
        id="box_cam_side"
          content={
            <div>
              <Img src={require('./img/side_default.jpg')}/>
              {this.renderContents('side')}
            </div>
          }
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
          progressvalue={this.state.videoProgress}
        />
      </div>
    );
  }
}
export default App;

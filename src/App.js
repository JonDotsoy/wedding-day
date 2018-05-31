import React, { Component } from 'react';
import './App.css';
import moment from 'moment';

async function interval(fn, ms) {
  do {
    fn();
    if (ms) {
      await new Promise(r => setTimeout(r, ms));
    } else {
      await new Promise(r => process.nextTick(r));
    }
  } while(true)
}

const timeEvent = moment('4-jul-2018 10:00', 'DD-MMM-YYYY HH:mm').toDate();

class App extends Component {
  state = {
    timeEvent,
    timeOut: undefined,
  }

  componentDidMount() {
    const updateLabel = () =>
      this.setState((state) => ({
        ...state,
        timeOut: this.makeLableTimeOut(),
      }));

    interval(updateLabel);
  }

  makeLableTimeOut = () => {
    const end = moment(this.state.timeEvent);
    const now = moment();
    
    return {
      days: end.diff(now, 'days'),
      hours: end.diff(now, 'hours') % 24,
      minutes: end.diff(now, 'minutes') % 60,
      seconds: end.diff(now, 'seconds') % 60,
      milliseconds: end.diff(now, 'milliseconds') % 1000,
    };
  }

  RenderDays = ({days}) => days === 1 ? [`Queda un día`] : [`Quedan `, days, ` días`]
  RenderHours = ({hours}) => hours === 1 ? [hours % 24, ` horas`] : [hours % 24, ` horas`]
  RenderMinutes = ({minutes}) => minutes === 1 ? [minutes % 60, ` minuto`] : [minutes % 60, ` minutos`]
  RenderSeconds = ({seconds}) => seconds === 1 ? [`${seconds % 60}`, ` segundo`] : [`${seconds % 60}`, ` segundos`]

  render() {
    const {RenderDays, RenderHours, RenderMinutes, RenderSeconds} = this;

    return (
      <div className="hero is-fullheight is-bold is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-centered is-size-1"><span role="img" aria-labelledby="">🤔</span>¿Cuanto falta para el gran día?<span role="img" aria-labelledby="">💐</span></h1>
            {
              this.state.timeOut &&
              <h2 className="subtitle has-text-centered is-size-2">
                <RenderDays days={this.state.timeOut.days}/> <RenderHours hours={this.state.timeOut.hours}/> <RenderMinutes minutes={this.state.timeOut.minutes}/> y <RenderSeconds seconds={this.state.timeOut.seconds}/>
              </h2>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import moment from 'moment';

async function interval(fn, ms) {
  do {
    fn();
    if (ms) {
      await new Promise(r => setTimeout(r, ms));
    }
  } while(true)
}

class App extends Component {
  state = {
    label: 'calculando...',
  }

  componentDidMount() {
    const updateLabel = () =>
      this.setState((state) => ({
        ...state,
        label: this.makeLableTimeOut(),
      }));

    interval(updateLabel, 100);
  }

  makeLableTimeOut () {
    const end = moment('4-jul-2018 10:00', 'DD-MMM-YYYY HH:mm');
    const now = moment();
    
    const diff = {
      days: end.diff(now, 'days'),
      hours: end.diff(now, 'hours') % 24,
      minutes: end.diff(now, 'minutes') % 60,
      seconds: end.diff(now, 'seconds') % 60,
      milliseconds: end.diff(now, 'milliseconds') % 1000,
    };

    return `${diff.days} días, ${diff.hours} horas, ${diff.minutes} minutos, ${diff.seconds} segundos y ${diff.milliseconds} milisegundos`;
  }

  render() {
    return (
      <div className="app">
        <div className="label title"><span role="img" aria-labelledby="">🤔</span>¿Cuanto falta para el gran día?<span role="img" aria-labelledby="">💐</span></div>
        <div className="label">{this.state.label}</div>
      </div>
    );
  }
}

export default App;

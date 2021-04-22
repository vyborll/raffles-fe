import { Component } from 'react';
import moment from 'moment';

class Countdown extends Component<{ time: number | string }> {
  state = {
    time: 0,
  };

  public interval: any;

  componentDidMount() {
    if (this.props.time) {
      this.setState(
        {
          time: this.props.time,
        },
        () => {
          this.interval = setInterval(() => {
            this.setState({
              time: this.props.time,
            });
          }, 1000);
        },
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { time } = this.state;

    let interval = 1000;
    const diff = time - Date.now();
    let duration: any = moment.duration(diff, 'milliseconds');
    duration = moment.duration(duration - interval, 'milliseconds');

    let format;
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (days > 0) {
      format = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
      format = `${hours}h ${minutes}m ${seconds}m`;
    } else if (minutes > 0) {
      format = `${minutes}m ${seconds}s`;
    } else if (seconds > 0) {
      format = `${seconds}s`;
    }

    return <span>{format ? format : 'Ended'}</span>;
  }
}

export default Countdown;

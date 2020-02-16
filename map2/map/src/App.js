/*
 * Author Antto Hautamäki
 */
import React from 'react';
import './App.css';
import MainComponent from './MainComponent/';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class App extends React.Component {

    constructor(props) {
        super(props)

        //Säteeksi voi asentaa välit 10-3000m
        this.state = {
            range: 3000
        };
    }

    //Asettaa etäisyyden
    set(e) {
        this.setState({ range: e.target.value })
    }

    render() {
        var uniqid = require('uniqid');

        return (
            <div className="App">
                <header
                    className="App-header"
                >
                    <div>
                        <em>10 m</em>
                        <input
                            defaultValue="3000"
                            type="range"
                            name="points"
                            min="10"
                            max="3000"
                            list="tickmarks"
                            onChange={this.set.bind(this)}
                        />
                        <em>3000 m</em>
                    </div>

                    <p>
                        <MainComponent
                            key={uniqid()}
                            range={this.state.range}
                        />
                    </p>

                </header>
            </div>
        );
    }
}

export default App;

import React from 'react';
import  { Component } from 'react';

import './App.css';
import { Map, TileLayer, Circle  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'



delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const position = [51.505, 65]

class MyComponent extends Component {
    lat = 3
    lot = 3;

    constructor(props) {
        super(props);
        this.state = {
            data1: null,
            circles: []
            ,
            redraw:false
        };

    }
    getAddress(t1, address,postal) {


    }
    componentDidMount() {

        let t = this;
     
        fetch('http://localhost:3000/test1.txt')
            .then((r) => r.text())
            .then(text => {
           
                let row = text.split('\n');

                row.map(row1 => {
                    let items = row1.split(';');
                    let items1 = t.state.circles;
                   
                    items1.push(<Circle center={[items[7], items[8]]} radius={parseInt(t.props.range)} />)
                    t.setState({ circles: items1, redraw: false })

                }
                    )
        


                t.setState({ redraw: true })
              
            })  


        }

    render() {
  
        if (this.state.redraw===false) 
            return (<p>loading</p>)
   
        return (
            <div>
         
                <Map center={position} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                 
          
                    {this.state.circles}
                </Map>
                </div>
                )
    }
}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            range: 3000
        };
    }
    set(e) {
        //alert(e.target.value)
       
        this.setState({ range: e.target.value })
    }
    render() {
        var uniqid = require('uniqid');
        return (
            <div className="App">

                <header className="App-header">
                    <input type="range" name="points" min="10" max="3000"
                        onChange={this.set.bind(this)}
                    />
                    <p>

                        <MyComponent key={uniqid()} range={this.state.range} />
                       
        </p>

                </header>
            </div>
        );
    }
}

export default App;

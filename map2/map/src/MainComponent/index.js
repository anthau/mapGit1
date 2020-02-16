/*
 * Tekij�: Antto Hautam�ki
 */
import React from 'react';
import { Map, TileLayer, Circle } from 'react-leaflet'
import { Component } from 'react';


class MainComponent extends Component {
    lat = 3
    lot = 3;

    constructor(props) {
        super(props);
        /*
         * State -tilan muuttujat
         * circles: luodut ympyr�t tallennetaan t�h�n, josta ne luetaan piirtoa varten
         * redraw: niin kauan kun luetaan tietoja, niin t�m� on false. Heti 
         * kun on valmista, niin tila vaihdetaan true:ksi, jolloin render-
         * funktio tiet�� piirt�� kartan
         * 
         */
        this.state = {
            circles: [],
            redraw: false
        };

    }


    componentDidMount() {

        let t = this;
        //Ladataan kokoontumispaikkojen tiedot
        fetch('test1.txt')
            .then((r) => r.text())
            .then(text => {

                let row = text.split('\n');
                 row.map(row1 => {
                    //Rivin erotusmerkki on ';'
                    let items = row1.split(';');
                    let items1 = t.state.circles;

                    //Ty�nnet��n kokoontumispaikkaa kuvaava ympyr� jonoon ja ympyr�n s�de saadaan range-parametrist�
                    //S�de kilometrein�
                    items1.push(<Circle center={[items[7], items[8]]} radius={parseInt(t.props.range)} />)
                     t.setState({ circles: items1, redraw: false })
                     return 0;

                 })
                //Homma valmis
                t.setState({ redraw: true })
            })
    }

    render() {
        let position = [60, 25];
        //uudelleenpiirto sitten kun kaikki arvot on luettu

        if (this.state.redraw === false)
            return (<p>loading</p>)
           //Kartan piirto asetuksilla paikka 60,25, zoom =6
        //Ja karttaan voi helposti lis�t� kerroksia my�hemmin
        return (
            <div>
             
                <Map center={position} zoom={6}>
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
export default MainComponent;
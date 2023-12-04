import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Credits from "./Components/Credits";
import Modal from "./Components/Modal";

mapboxgl.accessToken =
    "pk.eyJ1IjoiYW5kcmVzYWxiYSIsImEiOiJjbHBqZjI4aWgwMWlvMmlxdW53aHk5M3FoIn0.J_sM4Dw5zslkBHK9-kro8Q";

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-98.6);
    const [lat, setLat] = useState(39.27);
    const [zoom, setZoom] = useState(3);

    const [changeLayer, setChangeLayer] = useState(false);
    const [stateInfo, setStateInfo] = useState({
        nombre: "",
        electoral: "",
        winner: "",
        percentb: "",
        percentt: "",
        votesb: "",
        votest: "",
    });
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
    });
         

    function initializenMap() {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/outdoors-v12",
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        setChangeLayer(true);
    }

    useEffect(() => {
        initializenMap();
    });

    useEffect(() => {
        if (changeLayer) {
            map.current.on("load", () => {
                setChangeLayer(false)
                map.current.addLayer({
                    id: 'states',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: './usa-geojson.json'
                    },
                    paint: {
                        'fill-color': [
                            'match',
                            ['get', 'STATE'],
                            '01',
                            'red',
                            '02',
                            'red',
                            '04',
                            'blue',
                            '05',
                            'red',
                            '06',
                            'blue',
                            '08',
                            'blue',
                            '09',
                            'blue',
                            '10',
                            'blue',
                            '11',
                            'blue',
                            '12',
                            'red',
                            '13',
                            'blue',
                            '15',
                            'blue',
                            '16',
                            'red',
                            '17',
                            'blue',
                            '18',
                            'red',
                            '19',
                            'red',
                            '20',
                            'red',
                            '21',
                            'red',
                            '22',
                            'red',
                            '23',
                            'blue',
                            '24',
                            'blue',
                            '25',
                            'blue',
                            '26',
                            'blue',
                            '27',
                            'blue',
                            '28',
                            'red',
                            '29',
                            'red',
                            '30',
                            'red',
                            '31',
                            'red',
                            '32',
                            'blue',
                            '33',
                            'blue',
                            '34',
                            'blue',
                            '35',
                            'blue',
                            '36',
                            'blue',
                            '37',
                            'red',
                            '38',
                            'red',
                            '39',
                            'red',
                            '40',
                            'red',
                            '41',
                            'blue',
                            '42',
                            'blue',
                            '44',
                            'blue',
                            '45',
                            'red',
                            '46',
                            'red',
                            '47',
                            'red',
                            '48',
                            'red',
                            '49',
                            'red',
                            '50',
                            'blue',
                            '51',
                            'blue',
                            '53',
                            'blue',
                            '54',
                            'red',
                            '55',
                            'blue',
                            '56',
                            'red',
                            '72',
                            'orange',
                            'orange'
                        ],
                        'fill-outline-color': 'white'
                    },
                });

                 map.current.on('mousemove', 'states', (e) => {
                    const features = map.current.queryRenderedFeatures(e.point, {
                        layers: ['states'],
                    });

                    if (features.length > 0) {
                        const hoveredFeature = features[0];
                        const nombre = hoveredFeature.properties.NAME;
                        const electoral = hoveredFeature.properties.ELECTORAL;
                        const winner = hoveredFeature.properties.WINNER;
                        const percentb = hoveredFeature.properties.PERCENTB;
                        const percentt = hoveredFeature.properties.PERCENTT;
                        const votesb = hoveredFeature.properties.VOTESB;
                        const votest = hoveredFeature.properties.VOTEST;
                        
                        popup
                            .setLngLat(e.lngLat)
                            .setHTML(
                                `<div>
                                    <div class="popup-row"><strong>President:</strong> ${nombre}<br></div>
                                    <div class="popup-row"><strong>Electoral Votes:</strong> ${electoral}<br></div>
                                    <div class="popup-row"><strong>Projected Winner:</strong> ${winner}<br></div>
                                    <div class="popup-row"><strong class="popup-blue">Percent Biden:</strong> ${percentb}%<br></div>
                                    <div class="popup-row"><strong class="popup-red">Percent Trump:</strong> ${percentt}%<br></div>
                                    <div class="popup-row"><strong class="popup-blue">Votes Biden:</strong> ${votesb}<br></div>
                                    <div class="popup-row"><strong class="popup-red">Votes Trump:</strong> ${votest}</div>
                                </div>`
                            )
                            .addTo(map.current);

                        setStateInfo({
                            nombre,
                            electoral,
                            winner,
                            percentb,
                            percentt,
                            votesb,
                            votest,
                        });
                    }
                });
                map.current.on('mouseleave', 'states', () => {
                    popup.remove(); 
                });
            })
        }
    }, [changeLayer]);

    return (
        <div>
            <Credits />
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
            <Modal {...stateInfo} />
        </div>
    );
}


//Deployed in: https://presidentialmap.web.app/
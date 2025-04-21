// src/components/RadarMap.jsx
import React, { useEffect, useRef, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import '@arcgis/core/assets/esri/themes/light/main.css'; // import the ArcGIS CSS
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import alertColors from './colors.json';

// Assuming you already have the FeatureLayer reference as `alertLayer`

const getActiveEventTypes = async (alertLayer) => {
    const query = alertLayer.createQuery();
    query.where = "1=1"; // match all features
    query.outFields = ["event"];
    query.returnDistinctValues = true;
    query.returnGeometry = false;
  
    const { features } = await alertLayer.queryFeatures(query);
    const uniqueEvents = [...new Set(features.map(f => f.attributes.event))];
    return uniqueEvents;
  };

const createAlertRenderer = (colorMap) => {
    const uniqueValueInfos = Object.entries(colorMap).map(([event, hex]) => {
        // Convert hex to [R, G, B]
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        return {
            value: event,
            symbol: {
                type: 'simple-fill',
                color: [r, g, b, 0.1],
                outline: {
                    color: [r, g, b],
                    width: 2
                }
            },
            label: event
        };
    });

    return {
        type: 'unique-value',
        field: 'event',
        uniqueValueInfos,
        defaultSymbol: {
            type: 'simple-fill',
            color: [128, 128, 128, 0.2],
            outline: {
                color: [100, 100, 100],
                width: 1
            }
        },
        defaultLabel: 'Other Alerts'
    };
};

const RadarMap = (props) => {
    const mapRef = useRef();

    const [lastScanTime, setLastScanTime] = useState(0)

    const refreshRadarAfterEndTime = async (radarLayer) => {
        const res = await fetch('https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer?f=pjson');
        const data = await res.json();
        const endTime = data.timeInfo?.timeExtent?.[1];
        if (endTime && lastScanTime) {
          setTimeout(() => {
            // Refresh your radar layer (e.g. by setting its `refreshInterval` or manually refreshing)
            if (radarLayer && (endTime !== lastScanTime)) {
                setLastScanTime(endTime)
                radarLayer.refresh();
                console.log("New radar scan, updating...")
            } else {
                console.log('No radar data currently displayed or last scan time matched most recent check')
            }
            refreshRadarAfterEndTime(radarLayer); // Schedule next refresh
          }, 6000);
        }
      };


    useEffect(() => {
        const map = new Map({
            basemap: 'streets-night-vector'
        });

        const radarLayer = new ImageryLayer({
            url: 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer',
            opacity: 0.6
        });

        map.add(radarLayer);
        refreshRadarAfterEndTime(radarLayer)

        const view = new MapView({
            container: mapRef.current,
            map,
            center: [-95, 37],
            zoom: 4
        });

        const alertsUrl = 'https://api.weather.gov/alerts/active';

        const alertLayer = new GeoJSONLayer({
            url: alertsUrl,
            title: 'Active NWS Alerts',
            renderer: createAlertRenderer(alertColors),
            popupTemplate: {
                title: '{event}',
                content: '{headline}<br>{description}'
            }
        });

        props.setAlertLayer(alertLayer)
        map.add(alertLayer);

        return () => {
            if (view) view.destroy();
        };
    }, []);

    return <div ref={mapRef} style={{ height: '95vh', width: '100%' }} />;
};

export default RadarMap;
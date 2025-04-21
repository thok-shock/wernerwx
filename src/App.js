import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { Container, Nav, NavDropdown, Navbar, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import colors from './colors.json'
import '@arcgis/core/assets/esri/themes/light/main.css'; // import the ArcGIS CSS
import RadarMap from './RadarMap';

export default function App() {

    const [alertLayer, setAlertLayer] = useState(null);
    const [activeEventTypes, setActiveEventTypes] = useState([]);
    const [visibleEvents, setVisibleEvents] = useState([]);

    useEffect(() => {
        const getActiveEventTypes = async () => {
            if (!alertLayer) return;
            const query = alertLayer.createQuery();
            query.where = "1=1";
            query.outFields = ["event"];
            query.returnDistinctValues = true;
            query.returnGeometry = false;

            const { features } = await alertLayer.queryFeatures(query);
            const events = [...new Set(features.map(f => f.attributes.event))];
            setActiveEventTypes(events);
            setVisibleEvents(events); // start with all visible
        };

        getActiveEventTypes();
    }, [alertLayer]);

    useEffect(() => {
        if (!alertLayer) return;

        const definition = visibleEvents.map(event => `'${event}'`).join(",");
        alertLayer.definitionExpression = visibleEvents.length
            ? `event IN (${definition})`
            : "1=0"; // show nothing if none selected
    }, [visibleEvents, alertLayer]);

    // Handle toggle logic
    const handleToggle = (eventType) => {
        setVisibleEvents((prev) =>
            prev.includes(eventType)
                ? prev.filter(e => e !== eventType)
                : [...prev, eventType]
        );
    };



    return (
        <>
            <Navbar style={{ height: '5vh' }} expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">WernerWx</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Alerts" id="basic-nav-dropdown">
                                {activeEventTypes.map((eventType) => (
                                    <NavDropdown.Item
                                        as="div"
                                        key={eventType}
                                        className="d-flex align-items-center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Form.Check
                                            type="checkbox"
                                            id={`alert-toggle-${eventType}`}
                                            label={eventType}
                                            checked={visibleEvents.includes(eventType)}
                                            onChange={() => handleToggle(eventType)}
                                        />
                                    </NavDropdown.Item>
                                ))}
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <RadarMap alertLayer={alertLayer} setAlertLayer={setAlertLayer} />
        </>
    )
}
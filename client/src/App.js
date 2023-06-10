import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

function App() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const [data, setData] = useState([]);

  const [date, setDate] = useState('');

  const [error, setError] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const s = event.target[0].value;
    const d = event.target[1].value;
    const dt = event.target[2].value;

    if (s !== 'Select Source City' && d !== 'Select Destination City') {
      setError(false);
      const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: s,
          destination: d,
          date: dt,
        }),
      }).then((resp) => resp.text())
      console.log(response);

      setDate(dt);
      setData(response);
    } else {
      setData([]);
      setError(true);
    }
  };

  const cities = [
    'Delhi',
    'Mumbai',
    'Kolkata',
    'Chennai',
    'Bengaluru',
    'Hyderabad',
  ];

  return (
    <Container>
      <h2 style={{ textAlign: 'center', margin: '4%' }}>FLIGHT PRICE API</h2>
      <Row>
        <Col md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="source">
              <Form.Label>
                <b>From (Source City):</b>
              </Form.Label>
              <Form.Select
                className="text-center"
                onChange={(event) => {
                  setSource(event.target.value);
                }}
              >
                <option>Select Source City</option>
                {cities.map((city) => (
                  <option
                    value={city}
                    key={city}
                    disabled={city === destination}
                  >
                    {city}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="destination">
              <Form.Label>
                <b>To (Destination City):</b>
              </Form.Label>
              <Form.Select
                className="text-center"
                onChange={(event) => {
                  setDestination(event.target.value);
                }}
              >
                <option>Select Destination City</option>
                {cities.map((city) => (
                  <option value={city} key={city} disabled={city === source}>
                    {city}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {error && (
              <h6 style={{ color: 'red', textAlign: 'center' }}>
                Please choose a valid source & destination city!
              </h6>
            )}
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3" controlId="date">
                  <Form.Label>
                    <b>Date of travel:</b>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                {window.screen.width > 413 && <br />}
                <div className="text-center mb-5">
                  <Button variant="primary" type="submit">
                    Check Flights
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={6}>
          <Form.Label>
            <b>
              {data.length === 0 && 'Flights will be displayed below!'}
              {data.length !== 0 && `Flights available on ${date} are :`}
            </b>
          </Form.Label>

          <Accordion
            style={{
              height: '380px',
              overflow: 'scroll',
              overflowX: 'hidden',
              border: '2px solid black',
            }}
            className="mb-5"
          >
            {data.length !== 0 &&
              data.flights.map((flight) => (
                <Accordion.Item
                  eventKey={flight._id}
                  style={{ marginBottom: '5px' }}
                >
                  <Accordion.Header>
                    {flight.name} Airways - Rs. {flight.price}/person
                  </Accordion.Header>
                  <Accordion.Body>
                    Total Seats : {flight.total_seats}
                    <br />
                    Available Seats : {flight.available_seats}
                    <br />
                    Route : {flight.route}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

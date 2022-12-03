import React, { useState } from 'react'
import './TitleGenerator.css'
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap'
const { Configuration, OpenAIApi } = require("openai");

const TitleGenerator = () => {
    const [topic, setTopic] = useState("");
    const [response, setResponse] = useState("Thesis title here . . . .");
    const [status, setStatus] = useState(false);

    const generateTitle = (e) => {
        e.preventDefault();
        setStatus(true)
        
        const configuration = new Configuration({
            apiKey: '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'
        });
        const openai = new OpenAIApi(configuration);
        
        openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Create a capstone thesis title based on topic ${topic}`,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }).then((response) => {
            setStatus(false)
            setResponse(response.data.choices[0].text);
        });

    }

    return (
        <>
            <Container>
                <Row className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Col lg="8">
                        <Form onSubmit={generateTitle}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="fs-2 form-label" > Thesis Title Generator</Form.Label>
                                <Form.Control className="p-3 custom-style" type="text" placeholder="Topic/Tags" onChange={e => setTopic(e.target.value)}></Form.Control>
                                <Form.Text className="text-muted">
                                    Enter a topic e.g. e-commerce, school, etc.
                                </Form.Text>

                                <Button className="m-3 custom-button" variant="primary" type="submit">
                                    { status === true && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> }
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>

                        <Card>
                            <Card.Body> {response} </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default TitleGenerator



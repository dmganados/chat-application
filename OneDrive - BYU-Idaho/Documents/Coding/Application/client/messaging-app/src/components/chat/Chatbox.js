import { Card, Container, Form, Button } from "react-bootstrap"

export default function Chatbox() {
    return(
        <>
            <Container id="chtboxDiv">
            {/* <Card id="chtboxCard"> */}
            <Form className="chatForm">
                <Form.Group id="txtInput">
                <Form.Control as="textarea" placeholder="Enter text here..." className='formCtrl'/>
                </Form.Group>
                <Button className="sndBtnBorder">Send</Button>       
            </Form>
            {/* </Card> */}
            </Container>
  
        </>
    )
}
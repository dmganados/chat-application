import { Card, Container } from "react-bootstrap"

export default function Contacts({contactsProp}) {
 
    return(
        <>  
            <Container id='cntctsDiv'>     
                <Card>          
                {contactsProp.firstName} {contactsProp.lastName}
                </Card> 
            </Container>                   
        </>
    )
}
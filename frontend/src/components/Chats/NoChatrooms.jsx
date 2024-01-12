import { Container, Button } from 'react-bootstrap';
import { TiMessages } from "react-icons/ti";
import { Link } from 'react-router-dom';


const NoChatrooms = () => {
  return (
    <Container style={{paddingBlock: '3rem'}}>
      <h3>Messages</h3>
      <hr/>
      <TiMessages style={{
        fontSize: '5rem'
      }}/>
      <br/>
      <small>{`We'll save all your conversations here.`}</small>
      <br/><br/>
      <Button as={Link} to="/">
        Start Browsing our Listings
      </Button>
    </Container>
  )
};

export default NoChatrooms;
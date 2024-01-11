import { useState } from "react";
import PageLayout from "../PageLayout/PageLayout";
import { Button, Container } from "react-bootstrap";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { IoPinSharp } from "react-icons/io5";
import { Link } from "react-router-dom";


const MyListings = () => {
  const [myListings, setMyListings] = useState(null);
  return (
    <PageLayout>
      {({ theme, getThemeAuto }) => (
        <Container
        data-theme={theme === "Auto" ? getThemeAuto() : theme}
        style={{
          paddingBottom: '2rem'
        }}
      >
        {
          !myListings && (
            <Container style={{paddingBlock: '3rem'}}>
              <h3>Your Listings</h3>
              <hr/>
              <Button
                variant="outline-primary"
                size="sm"
                style={{
                  width: '100%'
                }}>
                <GoPlus />
                Add a New Listing
              </Button>
              <hr/>
              <MdOutlineMapsHomeWork style={{
                fontSize: '6rem'}}/>
              <IoPinSharp style={{
                fontSize: '1rem', 
                transform: 'rotate(75deg)'
              }}
              />
              <br/>
              <small>{`Your Listings will live here`}</small>
              <br/><br/>
              <Button as={Link} to="/">
                Browsing our Listings
              </Button>
            </Container>
          )
        }
      </Container>
      )}

    </PageLayout>
  )
}

export default MyListings;
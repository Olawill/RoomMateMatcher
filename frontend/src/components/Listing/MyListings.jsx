import { useState } from "react";
import PageLayout from "../PageLayout/PageLayout";
import { Container } from "react-bootstrap";


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

      </Container>
      )}

    </PageLayout>
  )
}

export default MyListings;
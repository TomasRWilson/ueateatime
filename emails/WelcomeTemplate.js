import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Button } from "@react-email/button";

export default function WelcomeEmail(name, token) {
    return (
        <Html>
            <Section style={main}>
                <Container style={container}>
                    <Text style={heading}>Hello {name}</Text>
                    <Text style={paragraph}>Welcome to TeaTime! Please click the link below to login.</Text>
                    <Button href={"http://localhost:3000/logintoken?token="+token} style={{ color: '#acdef2'}}>Log In</Button>
                </Container>
            </Section>
        </Html>
    );
}

//Styles for email template
const main = {
    backgroundColour: "#ffffff"
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};
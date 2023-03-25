import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Button } from "@react-email/button";

export default function PasswordEmail(name, token) {
    return (
        <Html>
            <Section style={main}>
                <Container style={container}>
                    <Text style={heading}>Hello {name}</Text>
                    <Text style={paragraph}>An attempt has been made to change your password. If this was you click the link below:</Text>
                    <Button style={button} href={"http://localhost:3000/passtoken?token="+token}>Reset Password</Button>
                    <Text style={paragraph}>If this request was not made by you please contact support.</Text>
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
    backgroundColour: "#e8e8e8"
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

const button = {
    fontSize: "20px",
    lineHeight: '1.6',
    color: '#acdef2',
    padding: '20px',
    borderRadius: '5px',
};
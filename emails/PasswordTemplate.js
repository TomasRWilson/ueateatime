import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Link } from '@react-email/link';

export default function PasswordEmail(name, token) {
    return (
        <Html>
            <Section style={main}>
                <Container style={container}>
                    <Text style={topBorder}>Magic Link Request</Text>
                    <Text style={heading}>Hello {name}</Text>
                    <Text style={paragraph}>An attempt has been made to change your password. If this was you click the link below:</Text>
                    <Link style={link} href={"http://localhost:3000/passtoken?token="+token}>Reset Password</Link>
                    <Text style={paragraph}>The link above is only meant for you and is valid for 10 minutes. Please do not share it.</Text>
                    <Text style={paragraph}>If this request was not made by you please contact support.</Text>
                </Container>
            </Section>
        </Html>
    );
}

//Styles for email template
const main = {
    backgroundColor: "#ededed",
    height: "800px"
};

const container = {
    margin: "auto",
    width: "580px",
    backgroundColor: "white",
    textAlign: "center",
};

const topBorder = {
    fontSize: "30px",
    color: "white",
    backgroundColor: "#333",
    padding: "20px",
    margin: "0 auto",
    borderBottom: "2px solid #96d9ff"
}

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
  padding: "20px 0px",
};

const link = {
    fontSize: "25px",
    fontWeight: "bold",
    lineHeight: '1.6',
    color: '#ffffff',
    padding: '10px 30px',
    borderRadius: '5px',
    cursor: "pointer",
    margin: "10px",
    backgroundColor: "#acdef2",
};
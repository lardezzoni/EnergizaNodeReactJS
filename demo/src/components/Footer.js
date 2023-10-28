
import React from "react";
import {
    Box,
    FooterContainer,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./FooterStyles";
 
const Footer = () => {
    return (
        <Box>
            <h1
                style={{
                    color: "green",
                    textAlign: "center",
                    marginTop: "10px",
                }}
            >
                Demo para Energizou
            </h1>
            <FooterContainer>
                <Row>
                    <Column>
                        <Heading>About Us</Heading>

                    </Column>
                    <Column>
                        <Heading>Services</Heading>
]

                    </Column>
                    <Column>
                        <Heading>Contact Us</Heading>

                    </Column>
                    <Column>
                        <Heading>Social Media</Heading>

                
                        <FooterLink href="https://www.linkedin.com/in/luiz-henrique-ardezzoni-a8b71582/">
                            <i className="fab fa-linkedin">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Linkedin
                                </span>
                            </i>
                        </FooterLink>

                        <FooterLink href="https://github.com/lardezzoni/EnergizaNodeReactJS">
                            <i className="fab fa-github">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    GitHub
                                </span>
                            </i>
                        </FooterLink>
                    </Column>
                </Row>
            </FooterContainer>
        </Box>
    );
};
export default Footer;
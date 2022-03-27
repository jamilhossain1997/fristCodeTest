import Document, { html, body, main } from "next/document";
import Link from 'next/link';
import Head from "next/head";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useRouter } from 'next/router';

const Header = () => {

    const router = useRouter();
    function heandleChange() {
        localStorage.clear();
        router.push('/editor/login');
    }
    return (
        <>
            <html>
                <body>
                    <main>
                        <>
                            <Navbar bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Brand><Link href={"/admin"}><a style={{ textDecoration: `none` }}>Navbar</a></Link></Navbar.Brand>
                                    <Nav className="me-auto">
                                        <Nav><Link href={"/admin"}><a style={{ textDecoration: `none` }}>Home</a></Link></Nav>
                                        <Nav ><Link href={"/admin/ProductAdd"}><a style={{ textDecoration: `none`, marginLeft: `10px` }}>Product Add</a></Link></Nav>
                                        <Nav ><Link href={"/admin/ProductBnAdd"}><a style={{ textDecoration: `none`, marginLeft: `10px` }}>Bangla langauge Add</a></Link></Nav>

                                        <Nav onClick={heandleChange}><Link href="#"><a style={{ textDecoration: `none`,marginLeft: `10px` }}>Logout</a></Link></Nav>

                                    </Nav>

                                </Container>
                            </Navbar>
                        </>
                    </main>

                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
                </body>
            </html>
        </>
    )
}

export default Header
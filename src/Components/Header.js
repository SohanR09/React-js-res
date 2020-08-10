import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, 
         Modal, ModalBody, ModalHeader ,Button, FormGroup, Label, Input, Form 
         } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import  firebaseDb from '../firebase';

const addOrEdit = obj => {
    firebaseDb.child('login').push(
        obj,
        err => {
            if(err){
                console.log(err)
            }
        }
    )
}

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin =this.handleLogin.bind(this);
    }
    
    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(events){
        //this.toggleModal();
        alert('Username: ' + this.username.value + ' Password: ' + this.password.value 
                + ' Remember: ' + this.remember.checked);
        this.props.addOrEdit(events);
        events.preventDefault();
    }

    render(){
        return (
            
                <React.Fragment>
                    <Navbar dark expand="md">
                        <div className="container">
                            <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="mr-auto" href="/home">
                                <img src='https://firebasestorage.googleapis.com/v0/b/react-rest-a07dc.appspot.com/o/images%2Flogo.png?alt=media&token=922ee176-21fd-49f0-9b0d-c641c1da2318' height="30" width="41" alt="Ristorante Con Fusion"></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem> 
                                        <NavLink className="nav-link" to="/home"><span className="fa fa-home fa-lg"> Home &nbsp;</span></NavLink>
                                    </NavItem>
                                    <NavItem> 
                                        <NavLink className="nav-link" to="/aboutus"><span className="fa fa-info fa-lg"> About-Us&nbsp;</span></NavLink>
                                    </NavItem>
                                    <NavItem> 
                                        <NavLink className="nav-link" to="/menu"><span className="fa fa-list fa-lg"> Menu&nbsp;</span></NavLink>
                                    </NavItem>
                                    <NavItem> 
                                        <NavLink className="nav-link" to="/contactus"><span className="fa fa-address-card fa-lg"> Contact-Us&nbsp;</span></NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Button outline onClick={this.toggleModal}>
                                            <span className='fa fa-sign-in fa-lg'> Login</span>
                                        </Button>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        
                        </div>
                    </Navbar>
                    <Jumbotron>
                        <div className="container">
                            <div className="row row-header">
                                <div className="col-12 col-sm-6">
                                    <h1>Ristorante Con Fusion</h1>
                                    <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                                </div>
                            </div>
                        </div>
                    </Jumbotron>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={(events) => this.handleLogin(events)} addOrEdit={addOrEdit}>
                                <FormGroup>
                                    <Label htmlFor='username'>User-Name</Label>
                                    <Input type='text' name='username' id='username'
                                        innerRef={(input) => this.username = input}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='password'>Password</Label>
                                    <Input type='password' name='password' id='password'
                                         innerRef={(input) => this.password = input}></Input>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type='checkbox' name='remember'
                                             innerRef={(input) => this.remember = input} />
                                        Remmember Me
                                    </Label>
                                </FormGroup>
                                <Button type='submit' value='submit' color='primary'>Login</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
        
        ) 
    }
    
}

export default Header

import React from 'react'
import Navbarr from '../Navbar/Navbarr'
import './mobilereg.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const MobileReg = () => {
  return (
    <>
    <Navbarr/> 


    <Form className='mobile_form'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Reference No</Form.Label>
        <Form.Control type="number" placeholder="Enter Reference No" id='mobile_input' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone No</Form.Label>
        <Form.Control type="password" placeholder="Password" id='mobile_input' />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
    </>
  )
}

export default MobileReg

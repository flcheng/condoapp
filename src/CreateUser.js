import React, { useContext } from "react";
import styled from "styled-components";
import { CondoDataContext } from "./CondoDataContext";

const CreateUser = () => {

  const { firstName, setFirstName, lastName, setLastName, admin, setAdmin, unit, setUnit, owner, setOwner, condofee, setCondofee, tenant, setTenant, phone, setPhone, email, setEmail } = useContext(CondoDataContext);
  
  return (
    <Wrapper>
      <FormContainer>
        <Header1>Create User</Header1>
        <div className="form_row">
          <input className="form_input" id="firstname" type="text" name="firstname" required placeholder="First Name" onChange={(e) => {
						setFirstName(e.target.value);
					}}/>
        </div>
        <div className="form_row">
          <input className="form_input" id="lastname" type="text" name="lastname" required placeholder="Last Name" onChange={(e) => {
						setLastName(e.target.value);
					}}/>
        </div>
        <div className="form_row">
          <input className="form_input" id="unit" type="text" name="unit" required placeholder="Unit #" onChange={(e) => {
						setUnit(e.target.value);
					}}/>
        </div>
        <div className="form_row">
          <input className="form_input" id="phone" type="text" name="phone" required placeholder="Phone Number" onChange={(e) => {
						setPhone(e.target.value);
					}}/>
        </div>
        <div className="form_row">
          <input className="form_input" id="email" type="text" name="email" required placeholder="Email" onChange={(e) => {
						setEmail(e.target.value);
					}}/>
        </div>
        <div className="form_row">
          <input className="form_input" id="fee" type="text" name="fee" required placeholder="Condo Fee" onChange={(e) => {
            const CONDO_FEE = parseInt(e.target.value);
						setCondofee(CONDO_FEE);
					}}/>
        </div>
        <div className="form_row">
          <div className="radio-container">
            <div className="title">
              <h1 className="header-h1">Administrator</h1>
            </div>
            <div className="form-radio">
              <input id="not-admin" name="admin" type="radio" required onClick={
                (e) => {
                  setAdmin(false);
                }}/>
              <label htmlFor="not-admin">False</label>
            </div>
            <div className="form-radio">
              <input id="admin" name="admin" type="radio" required onClick={
                (e) => {
                  setAdmin(true);
                }} />
              <label htmlFor="admin">True</label>
            </div>
          </div>
        </div>
        <div className="form_row">
          <div className="radio-container">
            <div className="title">
              <h1 className="header-h1">Condo owner</h1>
            </div>
            <div className="form-radio">
              <input id="not-owner" name="condoowner" type="radio" required onClick={
                (e) => {
                  setOwner(false);
                }}/>
              <label htmlFor="not-owner">False</label>
            </div>
            <div className="form-radio">
              <input id="owner" name="condoowner" type="radio" required onClick={
                (e) => {
                  setOwner(true);
                }}/>
              <label htmlFor="owner">True</label>
            </div>
          </div>          
        </div>
        <div className="form_row">
          <div className="radio-container">
            <div className="title">
              <h1 className="header-h1">Tenant</h1>
            </div>
            <div className="form-radio">
              <input id="not-tenant" name="tenant" type="radio" required onClick={
                (e) => {
                  setTenant(false);
                }}/>
              <label htmlFor="not-tenant">False</label>
            </div>
            <div className="form-radio">
              <input id="tenant" name="tenant" type="radio" required onClick={
                (e) => {
                  setTenant(true);
                }}/>
              <label htmlFor="tenant">True</label>
            </div>
          </div>          
        </div>
        <div className="form_row button-container">
          <button type="submit" onClick={
            (e) => {
              e.preventDefault();
              console.log(firstName, lastName, admin, unit, owner, condofee, tenant, phone, email);

              let newUser = {
                "name": `${firstName} ${lastName}`,
                "admin": admin,
                "condo_unit": unit,
                "condo_owner": owner,
                "condo_fee": condofee,
                "tenant": tenant,
                "phone": phone,
                "email": email,
              };

              fetch(`/createuser`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
              })
              .then((res) => res.json())
              .then(({data, message}) => {
                console.log(data, message);
              });
            }} >Create User</button>
        </div>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 100px auto 0;
  width: 50%;
  flex-direction: column;
  .title {
    min-width: 120px;
  }
  .button-container {
    margin-top: 30px;
    border: none;
    button[type=submit] {
      padding: 5px 10px;
      color: var(--color-sky-blue);
      background-color: transparent;
      border: 1px solid var(--color-sky-blue);
      font-weight: bold;
      padding: 5px 10px;
      &:hover {
        background: linear-gradient(90deg, rgba(159,43,104,1) 0%, rgba(182,54,91,1) 50%, rgba(255,87,51,1) 100%);
        color: var(--color-white);
      }
    }
  }
`;

const FormContainer = styled.form`
  .form_row {
    .form_input {
      border: 1px solid var(--color-sky-blue);
      border-radius: 5px;
      margin-bottom: 20px;
      padding: 10px;
      width: 100%;
    }
  }
  .radio-container {
    display: flex;
    align-items: center;
  }
  .header-h1 {
    color: var(--color-medium-gray)
  }
`;

const Header1 = styled.h1`
  margin-bottom: 30px;
  margin-top: 30px;
  color: #888;
`;

export default CreateUser;

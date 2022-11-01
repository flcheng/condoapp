import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CondoDataContext } from "./CondoDataContext";
import { format } from "date-fns";

const BulletinBoard = () => {

  const { authenticated } = useContext(CondoDataContext);
  const [msg, setMessage] = useState({});
  
  return (
    <Wrapper>
      <FormContainer>
        <Header1>Bulletin Board</Header1>
        <div className="form_row">
          <textarea name="name" rows="8" cols="40" placeholder="New Message" onChange={(e) => {
						setMessage(e.target.value);
					}}></textarea>
        </div>
        <div className="form_row button-container">
          <button type="submit" onClick={
            (e) => {
              e.preventDefault();
              let timestamp_milliseconds = new Date().getTime();
              let timestamp = new Date();
              let messageObject = {"message": msg, "timestamp": timestamp, "timestamp_milliseconds": timestamp_milliseconds};
              let mergedObject = {...authenticated.user, ...messageObject};

              fetch(`/updatemessages`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(mergedObject)
              })
              .then((res) => res.json())
              .then(({data, message}) => {
                console.log(data, message);
              });
            }} >Post Message</button>
        </div>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 100px auto 0;
  width: 50%;
  @media (max-width: 768px) {
    width: 70%;
  }
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
  .header-h1 {
    color: var(--color-medium-gray)
  }
`;

const Header1 = styled.h1`
  margin-bottom: 30px;
  margin-top: 30px;
  color: #888;
`;

export default BulletinBoard;

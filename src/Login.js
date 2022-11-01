import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CondoDataContext } from "./CondoDataContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { authenticated, setIsAuthenticated } = useContext(CondoDataContext);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);
  const [errormessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    if(username !== '') {
      fetch('/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: username})
      })
      .then((res) => res.json())
      .then((json) => {
        const {data} = json;
  
        if(data.length) {
          setError(false);
          if(data[0].admin) {
            navigate(`/admin`);
            setIsAuthenticated({...authenticated, user: data[0], isAuthenticated: true, isAdmin: true });
          } else {
            setIsAuthenticated({...authenticated, user: data[0], isAuthenticated: true });
            navigate(`/profile`);
          }
        } else {
          setErrorMessage('user not found');
          setError(true);
        }
      });
    } else {
      setErrorMessage('input can not be empty');
      setError(true);
    }
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      login(e);
    }
  }

  return (
    <Wrapper>
      <div className="left"></div>
      <div className="right">        
        <form>
          <h1>Login</h1>
          <div>
            <input id="username" type="text" onKeyPress={handleKeypress} onChange={event => setUsername(event.target.value)} placeholder="Username" />
            <label htmlFor="username"></label>
          </div>
          <button type="submit" name="button" onClick={login}>Sign in</button>
        </form>
        {error && <ErrorMessage>{errormessage}</ErrorMessage>}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 480px) {
    flex-direction: column;
  }
  h1 {
    color: #494848;
    font-size: 32px;
    margin-bottom: 20px;
  }
  form {
    width: 100%;
    max-width: 400px;
  }
  input {
    height: 48px;
    width: 100%;
    border-radius: 5px;
    border: solid 1px #a9a9a9;
    padding: 10px;
    font-size: 14px;
    color: #494848;
    margin-bottom: 20px;
  }
  button {
    background-color: #5080ad;
    border: 1px solid #5080ad;
    border-radius: 5px;
    color: #fff;
    padding: 12px 15px;
    line-height: 16px;
    font-size: 14px;
    font-weight: bold;
  }
  .left {
    display: flex;
    height: 100%;
    width: 50%;
    background-color: rgba(236, 185, 116, .5);
    @media (max-width: 480px) {
        order: 2;
        width: 100%;
        background-color: rgba(185, 228, 243, 0.5);
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    width: 50%;
    background-color: rgba(185, 228, 243, 0.5);
    align-items: center;
    justify-content: center;
    @media (max-width: 480px) {
      background-color: rgba(236, 185, 116, .5);
      order: 1;
      width: 100%;
    }
  }
`;

const ErrorMessage = styled.div`
    display: flex;
    margin-top: 30px;
    color: red;
`;

export default Login;
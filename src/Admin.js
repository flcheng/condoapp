import React, { useEffect, useState, useContext } from "react";
import { CondoDataContext } from "./CondoDataContext";
import styled from "styled-components";
import Month from "./Month";
import LoadingSpinner from "./assets/LoadingSpinner";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { condofees, condoFeeValues } = useContext(CondoDataContext);
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    fetch("/homeowners/USERS", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {

        const DATA = data.data.filter(val => {
          return val.admin === false;
        }).sort(function (a, b) {
          return a.condo_unit - b.condo_unit;
        });
        let obj = condofees;
        setUsers(DATA);
        DATA.forEach(val => {
          obj[val.condo_unit] = val.condo_fee.toFixed(2);
        });
        condoFeeValues({...condofees, ...obj});        
      })
      .catch((e) => {});
  }, [loading]);

  return (
    <Wrapper>
      <div style={{display: 'flex', color: '#888'}}>
        <h1>Fiscal year: 2022</h1>
      </div>
      {loading === true && (
        <SpinnerContainer>
          <LoadingSpinner></LoadingSpinner>
        </SpinnerContainer>
      )}
      {users.map((user) => (
        <li className="item" key={user.condo_unit}>
          <CondoUnitInfo>
            <div className="name">{user.name}</div>
            <div className="unit">Unit #{user.condo_unit}</div>
            <YTD>
              Year to date :{" "}
              ${(
                user.condo_fee *
                user.payments.filter((val) => {
                  return val === true;
                }).length
              ).toFixed(2)}
            </YTD>
          </CondoUnitInfo>
          <ListContainer>
            <MonthWrapper>
              {user.payments.map((month, index) => (
                <Month
                  month={month}
                  index={index}
                  unit={user.condo_unit}
                  key={MONTHS[index]}
                  condofee={user.condo_fee.toFixed(2)}
                ></Month>
              ))}
            </MonthWrapper>
            <PaymentWrapper>
              <div className="top-row">
              <span>$</span>
              <input type="text" value={condofees[user.condo_unit]} onChange={(e) => {

                let value = e.target.value === '' ? '0' : e.target.value;

                let obj = {[user.condo_unit]: value};
                condoFeeValues({
                  ...condofees,
                  ...obj
                });
              }} />
              </div>
              <div className="bottom-row">
              <button data-user={JSON.stringify(user)} className="paid-btn" onClick={(e)=> {
                const USER_DATA = e.target.getAttribute('data-user');
                let user = JSON.parse(USER_DATA);
                const RADIO_BUTTONS = Array.from(document.querySelectorAll(`input[name="${user.condo_unit}"]`));
                const RESULT = RADIO_BUTTONS.map(val => {return val.checked === true ? val.value : null});
                const M = RESULT.filter(val => {return val !== null});
                
                user.payments[MONTHS.indexOf(M[0])] = true;
                setLoading(true);
                fetch(`/updatepayment`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(user)
                })
                .then((res) => res.json())
                .then(({data, message}) => {
                  setLoading(false);
                  console.log(data, message);
                });

              }}>Mark as paid</button> 
              </div>
            </PaymentWrapper>
          </ListContainer>
          <DeleteBtn data-user-id={user._id}
              type="button"
              onClick={(event) => {
                let id = event.target.getAttribute('data-user-id');
                setLoading(true);
                fetch(`/client/${id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                })
                .then((res) => res.json())
                .then(({data, message}) => {
                  setLoading(false);
                });
              }}
            >
              delete user
          </DeleteBtn>
        </li>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  background: var(--color-white);
  display: grid;
  flex-direction: column;
  width: 50%;
  @media (max-width: 768px) {
    width: 100vw;
    margin-left: 0;
    margin-right: 0;
    padding: 0 20px;
  }
  margin: 100px auto 0;
  li.item {
    margin: 10px 0;
    border-bottom: 1px solid var(--color-sky-blue);
    padding-bottom: 20px;
    padding-top: 10px;
    .name,
    .unit {
      flex: 1;
    }
    @media (max-width: 768px) {
      .name,
      .unit {
        margin-bottom: 10px;
      }
    }
  }
  .loading-animation {
    animation: loading 3s linear infinite;
    height: 5vh;
    width: 5vw;
    @media (max-width: 768px) {
      height: 50px;
      width: 50px;
    }
    @keyframes loading {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
`;

const CondoUnitInfo = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: block;
  }
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ListContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  button.paid-btn {
    border: none;
    height: 20px;
    &:hover {
      background-color: var(--color-green);
      border: none;
      color: var(--color-white);
    }
  }
`;

const MonthWrapper = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  @media (max-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const PaymentWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    height: 70px;
    display: flex;
    flex-direction: column;
    .top-row,
    .bottom-row {
      flex: 1;
    }
    .bottom-row {
      text-align: center;
    }
  }
  input {
    max-width: 100px;
    margin-right: 20px;
    border-radius: 0;
    border: 1px solid var(--color-light-gray);
    margin-left: 5px;
    border-radius: 3px;
    padding: 5px;
  }
`;

const YTD = styled.div`
    color: #365c8e;
    font-weight: bold;
`;

const SpinnerContainer = styled.span`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 100;
  left: 50%;
  top: 50%;
`;

const DeleteBtn = styled.button`
  margin-top: 20px;
  border: none;
  padding: 3px 7px;
  &:hover {
    background: var(--color-red);
    color: var(--color-white);
  }
`;

export default Admin;

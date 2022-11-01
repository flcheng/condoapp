import React from "react";
import styled from "styled-components";

const Mock = () => {
  return (
    <Wrapper>
      <Header1>Mock Page</Header1>
      <section>
        <CondoUnitInfo>
          <div>Toni Holden</div>
          <span className="divider"> | </span>
          <div>Unit #101</div>
          <span className="divider"> | </span>
          <div>Year to date : $1500</div>
        </CondoUnitInfo>
        <Month>
          <li className="paid">Jan</li>
          <li>Feb</li>
          <li>Mar</li>
          <li>Apr</li>
          <li>May</li>
          <li>Jun</li>
          <li>Jul</li>
          <li>Aug</li>
          <li>Sep</li>
          <li>Oct</li>
          <li>Nov</li>
          <li>Dec</li>
        </Month>
        <Container>
          <label htmlFor="amount">Enter amount : </label>
          <input id="amount" type="text"></input>
          <button type="submit">Mark as paid</button>
        </Container>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .divider {
    padding-left: 5px;
    padding-right: 5px;
  }
`;
const Header1 = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Month = styled.ul`
  display: flex;
  li {
    cursor: pointer;
    padding: 5px;
    &.paid {
      background-color: #ccc;
    }
  }
`;

const CondoUnitInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default Mock;

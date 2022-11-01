import React from "react";
import styled from "styled-components";

const Month = ({month, index, unit, condofee}) => {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <ListItem>
      <ButtonWrapper>
        {
          month ? (
            <>
              <Paid className="month">{MONTHS[index]}</Paid>
            </>
          ) : (
            <>
            <MonthBtn type="radio" name={unit} value={MONTHS[index]}/>
            <Unpaid className="month">{MONTHS[index]}</Unpaid>
            </>
          )
        }
      </ButtonWrapper>
    </ListItem>
  );
};

const ListItem = styled.li`
    display: flex;
    position: relative;
    height: 20px;
    width: 30px;
`;

const ButtonWrapper = styled.label`
  position: relative;
  .month {
    align-items: center;
    display: flex;
    font-size: var(--font-size-med);
    height: 20px;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    transition: background-color cubic-bezier(0.45, 0.05, 0.55, 0.95) 0.2s;
    width: 30px;
  }
`;

const MonthBtn = styled.input`
    opacity: 0;
    position: absolute;
    height: 20px;
    width: 30px;
    &:checked {
      + span {
        background: var(--color-green);
        color: var(--color-white);
        font-weight: bold;
      }
    }
`;

const Unpaid = styled.span`
  background: var(--color-white);
  cursor: pointer;
  &.checked,
  &:hover {
    color: var(--color-darkgreen);
    border: 1px solid var(--color-darkgreen);
  }
`;
const Paid = styled.span`
  background: var(--light-gray);
  opacity: 0.5;
`;

export default Month;

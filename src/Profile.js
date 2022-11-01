import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CondoDataContext } from "./CondoDataContext";
import { parseISO, format } from "date-fns";

const Profile = () => {
  const { authenticated } = useContext(CondoDataContext);
  const [users, setUsers] = useState([]);
  const [groupmessage, setGroupMessage] = useState([]);
  const [groupmessages, setGroupMessages] = useState([]);
  const [admin_messages, setAdminMessage] = useState([]);
  const {user} = authenticated;
  const GROUP_MESSAGES_ARRAY = [];

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

        setUsers(DATA);

        const ADMIN_DATA = data.data.filter(val => {
          return val.admin === true;
        });

        setAdminMessage(ADMIN_DATA[0].messages);

        window.parseISO = parseISO;
        window.format = format;

        const GROUP_MESSAGES = DATA.filter(val => {
          return val.groupmessage.length;
        });

        GROUP_MESSAGES.forEach(user => {
          let name = user.name;
          if(user.groupmessage.length) {
            user.groupmessage.forEach(val => {
              val.name = name;
              GROUP_MESSAGES_ARRAY.push(val);
            })
          }
        });

        GROUP_MESSAGES_ARRAY.sort((a, b) => {
          return a.timestamp_milliseconds - b.timestamp_milliseconds;
        })

        setGroupMessages(GROUP_MESSAGES_ARRAY);        
      })
      .catch((e) => {});
  }, []);

  return (
    <Wrapper>
      <h1 style={{fontWeight:'normal', textAlign: 'center', fontSize: '30px', marginBottom:'30px'}}>Profile Page</h1>
      <div className="row name"><span>{user.name}</span></div>
      <div className="row"><span>Monthly condo fee:</span><span>${(user.condo_fee).toFixed(2)}</span></div>
      <div className="row"><span>Unit#</span><span>{user.condo_unit}</span></div>
      <div className="row"><span>Email</span><span>{user.email}</span></div>
      <div className="row"><span>Tel: </span><span>{user.phone}</span></div>
      <div className="row"><span>Year to date payment:</span><span>${(user.condo_fee * user.payments.filter((val) => {return val === true;}).length).toFixed(2)}</span></div>
      <div>
        <h1 className="header1">List of owners</h1>
        <ul>
          {users && users.map(val => (
            <ListItem key={(val.name).toLowerCase().trim()}>
              <span>{val.name}</span>
              <span className="condo-unit">Unit# {val.condo_unit}</span>
              <span>{val.email}</span>
              <span className="telephone-number">{val.phone}</span>
            </ListItem>
          ))}
        </ul>
      </div>
      <BulletinBoardContainer>
        <h1 className="header1">Bulletin Board</h1>
        <ul>
          {admin_messages && admin_messages.map(val => (
            <ListItemBulletin key={val.timestamp_milliseconds}>
              <TimeStampRow><TimeStamp>{format(parseISO(val.timestamp),'MMMM dd yyyy hh:mm a')}</TimeStamp></TimeStampRow>
              <MessageRow><span>{val.message}</span></MessageRow>
            </ListItemBulletin>
          ))}
        </ul>
      </BulletinBoardContainer>
      <GroupMessagesContainer>
          <ul>
          {groupmessages && groupmessages.map((val, index) => (
            <li key={val.timestamp}>
              <span style={{fontSize:'12px', color:'#1e325c'}}>@{val.name}</span>
              <span style={{fontSize:'12px', color:'#1e325c'}}>{format(parseISO(val.timestamp),'MMMM dd yyyy hh:mm a')}</span>
              <span>{val.message}</span>
            </li>
          ))}
          </ul>
        </GroupMessagesContainer>
      <GroupChatContainer>
        <h1 className="header1">Group Chat</h1>
        <div className="form_row">
          <textarea style={{width: '100%'}} name="name" rows="8" cols="40" placeholder="New Message" onChange={(e) => {
						setGroupMessage(e.target.value);
					}}></textarea>
        </div>
        <div className="form_row button-container">
          <button style={{marginTop: '20px'}} type="submit" onClick={
            (e) => {
              e.preventDefault();

              let timestamp_milliseconds = new Date().getTime();
              let timestamp = new Date();
              let messageObject = {"message": groupmessage, "timestamp": timestamp, "timestamp_milliseconds": timestamp_milliseconds};
              let mergedObject = {...authenticated.user, ...messageObject};

              fetch(`/updategroupmessage`, {
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
            }} >Post To Group</button>
        </div>
      </GroupChatContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 50%;
  margin: 120px auto 0;
  display: flex;
  flex-direction: column;
  .row {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    span {
      display: flex;
      font-size: 20px;
      flex-direction: column;
    }
    &.name {
      border-bottom: 1px solid var(--color-sky-blue);
      margin-bottom: 20px;
      padding-bottom: 20px;
    }
  }
  .header1 {
    border-bottom: 1px solid var(--color-sky-blue);
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 20px;
    margin-top: 50px;
    padding-bottom: 20px;
  }
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding-bottom: 10px;
  padding-top: 10px;
  .condo-unit,
  .telephone-number {
    text-align: right;
  }
`;

const TimeStampRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const MessageRow = styled.div``;

const TimeStamp = styled.span`
  font-size: 12px;
  background-color: var(--color-medium-orange);
  color: #fff;
  font-weight: bold;
  padding: 5px;
`;

const BulletinBoardContainer = styled.div`
  min-height: 30vh;
`;

const ListItemBulletin = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-medium-orange);
  margin-bottom: 20px;
  padding: 10px;
`;

const GroupChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
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
`;

const GroupMessagesContainer = styled.div`
  margin-top: 50px;
  li {
      display: flex;
      flex-direction: column;
      padding: 10px 0;
      &:nth-child(2n) {
        text-align: right;  
        justify-content: flex-end;
      }
  }
`;

export default Profile;

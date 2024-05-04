import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [invitationList, setInvitationList] = useState([]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((error) => {
        console.log(error);
        alert('Can`t get users');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  //invitationList is an array of id [0,1,2,3...], we should filter array to remove the user with specific id; _id - id from invitationList, id is from chosen user's id
  //invitationList will be an array without chosen id

  const onClickInvite = (id) => {
    if (invitationList.includes(id)) {
      setInvitationList((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvitationList((prev) => [...prev, id]); //add to array an id that wasn't in array before
    }
  };

  const onClickSentInvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invitationList.length} />
      ) : (
        <Users
          users={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          onClickInvite={onClickInvite}
          invitationList={invitationList}
          onClickSentInvites={onClickSentInvites}
        />
      )}
    </div>
  );
}

export default App;

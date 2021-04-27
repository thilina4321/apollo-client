import React, { useEffect, useState } from "react";

import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";

const users = gql`
  query users {
    users {
      id
      name
      age
    }
  }
`;

const userSubscription = gql`
  subscription createUser {
    users {
      id
      name
      age
    }
  }
`;

const NAME = gql`
  query Name($a: String) {
    name(a: $a) {
      id
      name
      age
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String, $age: Int) {
    createUser(name: $name, age: $age) {
      name
      age
      id
    }
  }
`;

const App = () => {
  const [datas, setData] = useState([]);
  const { loading, error, data } = useQuery(users);
  const [createUser, { data: userData }] = useMutation(CREATE_USER);
  const { data: subData,  loading: subLoad } = useSubscription(userSubscription);

  useEffect(() => {
    if (data) {
      setData(data.users);
    }
  }, [data]);

  useEffect(() => {
    if (subData) {
      setData((prev) => [...prev, subData.users]);
    }
  }, [subData]);

  const onCreateUser = () => {
    createUser({ variables: { name: "thilina", age: 44 } });
  };

  return (
    <div>
      <p> Thid id it </p>
      {datas.map((da) => (
        <p key={da.id}> {da.name} </p>
      ))}
      <button onClick={onCreateUser}> Click </button>
    </div>
  );
};

export default App;

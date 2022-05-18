import React, { useState } from "react";

interface ItemProps {
  name: string;
  age: number;
}

const Item: React.FC<ItemProps> = ({ name, age }) => {
  return (
    <li>
      name: {name} / age: {age}
    </li>
  );
};

const url =
  "https://raw.githubusercontent.com/techoi/raw-data-api/main/simple-api.json?id=kyle";

export const TestMocking = () => {
  const [data, setData] = useState<{ people: ItemProps[] }>(null!);
  const [error, setError] = useState<string>(null!);

  const handleClick1 = () => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.errorMessage) {
          throw new Error(json.errorMessage);
        }
        setData(json.data);
      })
      .catch((error) => {
        setError(`Somthing Wrong: ${error}`);
      });
  };

  const handleClick2 = () => {
    fetch("/login")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(JSON.stringify(json));
      })
      .catch((error) => {
        setError(`Somthing Wrong: ${error}`);
      });
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <button onClick={handleClick1}>데이터 가져오기1</button>
      <button onClick={handleClick2}>데이터 가져오기2</button>
      {data && (
        <ul>
          {data.people.map((person: ItemProps) => (
            <Item
              key={`${person.name}-${person.age}`}
              name={person.name}
              age={person.age}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

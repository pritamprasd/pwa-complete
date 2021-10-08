import "./App.css";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import { useState } from "react";


function App() {
  const [name, setname] = useState("MISTER 0")

  const onButonClick = () => {
    setname("MISTER 1")
    const friend= {
        name: name,
        age: 10
    }
    db.friends.add(friend);
  };
  return (
    <div className="App">
      {/* <h1>Sample PWA App</h1>
      <button onClick={onButonClick}>Add random data</button>
      <OldFriendsList/> */}
      Dummy
    </div>
  );
}

export function OldFriendsList() {

  const friends = useLiveQuery(
    () => db.friends
      .where('age')
      .above(5)
      .toArray()
  );
  
  if (!friends) return null; // Still loading.
  
  return <ul>
    { friends.map(friend =>
        <li key={friend.id}>
          {friend.name}, {friend.age}
        </li>)
    }
  </ul>;
}

export default App;

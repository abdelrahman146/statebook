# Statebook JS

Fast :zap: , Reliable :dizzy:, Light and Incredibely Easy State Manager For React Built with Rxjs.

### Features:

:star: Straight Forward with zero setup needed. No need to instantiate anything or wrap the app with a root component or create actions and reducers.

:star: Very easy to create/update/read states (local or global).

:star: Every state has a status object by default that can holds the status of the object and important messages such as: Error, Success, Warning...

:star: Uses react hooks.

:star: Handles cleanup functions on its own.

:star: States can be created/updated/read OUTSIDE react components.

:star: States can await values from each other or subscribe to each other status outside react components.

:star: Uses Rxjs in the background

:star: Perfect for simple and complex applications.

:star: Fast to learn.

## Getting Started

#### Compatbility

-   Statebook can be used with any javascript / nodejs project. it is recommended to use Nodejs 12 or later.
-   Statebook is integrated with react apps out of the box. Tested versions: React 16.3 or later.

#### TypeScript

Statebook is built with typescript so it supports typings out of the box.

#### Installation

just install the package in your project:

```bash
npm i statebook

# OR

yarn add statebook
```

## Usage:

Example of creating and using Global State in a React App

```javascript
import { useState } from 'react';
import { useGlobalStatebook } from 'statebook';

function App() {
  const user = useGlobalStatebook('user');// returns a state with id: 'user' if state doesn't exist it will create new one.
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) return;
    user.setData({ username, password });
    user.setLoaded(true);
  };

  return (
    <div>
      <h1>First Component</h1>
      <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setusername(e.target.value)} />
      <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <br />
      <UserComponent />
    </div>
  );
}

function UserComponent() {
  const user = useGlobalStatebook('user');

  return (
    <div>
      <h1>Second Component</h1>
      {user.state.loaded && (
        <div>
          <p>username: {user.state.data.username}</p>
          <p>password: {user.state.data.password}</p>
        </div>
      )}
    </div>
  );
}

export default App;
```

Example of Creating a Local State in React App:

```javascript
import { useState } from 'react';
import { useLocalStatebook } from 'statebook';

function App() {
  const counter = useLocalStatebook({ totalcount: 0 }); // creates a state with the given initial value.
  const [input, setinput] = useState('');

  const handleButton = () => {
    const number = Number(input);
    if (!number) {
      counter.setStatus('error', 'Input is not valid');
      return;
    }
    const newTotalCount = counter.state.data.totalcount + number;
    counter.setData({ totalcount: newTotalCount });
    counter.setStatus('success', 'Successfully add ' + number + ' to total count');
  };

  return (
    <div>
      <h1>Counter</h1>
      <input type="text" name="number" placeholder="number" value={input} onChange={(e) => setinput(e.target.value)} />
      <button onClick={handleButton}>ADD Input</button>
      <br />
      <h4>Total Count: {counter.state.data.totalcount}</h4>
      <br />
      {counter.state.status.error && <p style={{ color: 'red' }}>{counter.state.status.error}</p>}
      {counter.state.status.success && <p style={{ color: 'green' }}>{counter.state.status.success}</p>}
    </div>
  );
}

export default App;
```

Example of creating a global state outside react app:

```javascript
import { statebook } from 'statebook';

async function loginUser(username, password) {
  const user = statebook('user'); // returns a state with id:'user' if not exist it will create a new one.
  user.setStatus('loading', true);
  try {
    const response = await fetch('<website>/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    user.setData(response);
    user.setLoaded(true);
  } catch (error) {
    user.setStatus('error', 'something went wrong');
  } finally {
    user.resetStatus();
  }
}

// you can then use useGlobalStateBook('user') to read the information related to the state inside a a react component.
```

statebook allows us to make a state await to another state until a certain value is met. this is usefull when we have a state that depends on a value from another state.

Optional: during the await period, you can make the state that is waiting synchronize its status with the other state. this is also useful to make our components to watch the status of only one of them.

```javascript
async function fetchCart() {
    const cart = statebook('cart');
    const user = statebook('user');
    const { apikey }  = await awaitStatebook(user, ({loaded}) => loaded, cart); // since we have provided the function with our cart space in the third parameter. now cart status will synchronzie with user status until the condition is met.
    try {
        user.setStatus('loading', 'Fetching cart items');
        const response = await fetch('<website>/cart', {
            method: 'POST',
            headers: {Authorization: apikey}
        });
        cart.setData(response);
        cart.setLoaded(true);
    } catch (error) {
        cart.setStatus('error', 'something went wrong');
    } finally {
        cart.resetStatus();
    }
}
```

## API Reference

### Statebook
Responsible of reading and interacting with the state

| Property | Description | default Value | Return |
| -- | -- | -- | -- |
| **`state`** | return the state content of the state book | `{status:{}}` | -- |
| **`asObservable()`** Only in Global State | returns an Observable instance of the state | -- | `Observable<State<T>>` |
| **`setStatus(status: string, value: string|boolean)`** | update the status of the statebook, **Note: it will toggle the status** | `status:{}` | -- |
| **`setData(data: T)`** | replaces the current data | `undefined` | -- |
| **`setLoaded(flag: boolean)`** | replaces the current value of loaded | `undefined` | -- |
| **`resetStatus()`** | reset the status object in statebook| -- | -- |
| **`flush()`** | returns statebook to initial state| -- | -- |


### React Hooks
| Hook | Description | Parameters | Return |
| -- | -- | -- | -- |
| **`useGlobalStatebook<T>`** | Looks for an existing state with the provided id if not found, it will create a new one. Then it will initiate component update mechanism whenever a new value of the state is retrieved. | `id:  string` | `Statebook<T>`
| **`useLocalStatebook<T>`** | creates a new local statebook for the component, this statebook will reset when the component unmounts | `data?:  T` takes the initial value of the state data| `LocalStatebook<T>` |

### Functions

| Function | Description | Parameters | Return |
| -- | -- | -- | -- |
| **`statebook<T>`** | Looks for an existing state with the provided id if not found, it will create a new one. | `id: string` | `Statebook<T>` |
| **`awaitStatebook<T,  K>`** | waits another state until a condition is met. (example: value has been changed), if `syncstatus` parameter is provided it will synchronize its status automatically to the other statebook until the condition is met | `statebook: Statebook<T>, condition: (state: State<T>) => boolean, syncstatus?: Statebook<K>` | `Promise<State<T>>` |
| **`syncStatus<T,  K>`** | synchronize the status from a state book to another | `from:  Statebook<T>,  to:  Statebook<K>` | `Subscription` from rxjs so you can unsubscribe later on |

## Maintainer
[Abdel Rahman Hussein](https://github.com/abdelrahman146)

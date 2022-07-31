# Statebook JS
Stateful Data Structures for React

## Introduction
Statebook is a lightweight, easy to use, loaded with features and extensible state manager built with TypesScript for React Apps ⚛️

Statebook Topics (States) use the observer pattern in the background to let functions subscribe and unsubscribe for state updates.

Topics are stateful data structures where each topic comes with a set of handy methods that can update the state with ease. In addition, each Topic has a status object (Ex: Error :x:, Success ✅, Info ℹ️, warning ❗, and loading :clock1:), subscribed functions can receive the status of the object too.

|:star:| Statebook Features |
|--|--|
| 🔹 | Easy to use and Lightweight |
| 🔹 | Built-in react hooks |
| 🔹 | Stateful Data Structures |
| 🔹 | Each Topic has a status (Error, Success, Warning, Info) |
| 🔹 | Topics can be subscribed to, updated and created OUTSIDE React Components |
| 🔹 | Fast Learning curve |

## Getting Started
> **Compatbility**
- Can be used with ES and CommonJS Modules. 
-   Supports React 17.0.2 or later.

> **TypeScript**

Statebook is built with typescript so it supports typings out of the box.

> **Installation**

just install the package in your project:

```bash
npm i statebook

# OR

yarn add statebook
```

## Usage

How to use statebook in a react app;

```javascript
import { StatebookFactory, Topics } from 'statebook';

// create new statebook
const statebook = StatebookFactory({
  counter: Topics.Number(0), // add topic to statebook
});

// increase counter every second
setInterval(() => {
  const {counter} = statebook;
  counter.set((totalCount) => totalCount + 1);
}, [1000])

function App() {
  const [ totalCount ] = statebook.useTopic('counter');

  return (
    <div>
      <h1>The Counter will Increase every second</h1>
      <p>total counts: {totalCount}</p>
    </div>
  );
}

export default App;
```

## Master Statebook with 3 steps! ✨
---

> **Step 1️⃣**: Create Statebook Instance
```typescript
// create new statebook
const statebook = StatebookFactory({
  user: Topics.Object({
    name: 'Jhon Smith',
    age: 34
  }),
  posts: Topics.Array<{slug: string; title: string; body?: string}>([])
});
```

> **Step :two:**: Create Services
```typescript

export async function getPosts() {
  statebook.posts.setStatus('loading' , 'Loading Posts');
  try {
    const posts = await // fetch posts from endpoint
    statebook.posts.setStatus('success' , 'Loaded Posts Successfully');
    statebook.posts.set(posts);
  } catch {
    statebook.posts.setStatus('error' , 'Failed to load Posts');
  }
}
```

> **Step :three:**: Create Subscribers

Inside React Components:
```typescript
// inside react components
function App() {
  const [ user ] = statebook.useTopic('user');
  const [posts, postsStatus] = statebook.useTopic('posts');

  useEffect(() => {
    getPosts();
  }, []);

  {/* Note: One status will be available at a time */}
  return (
    <div>
      <h1>Hi, {user.name}</h1>
      <h3>Posts List</h3>
      {postsStatus.loading && <p style={{color: gray}}>{postsStatus.loading}</p>}
      {postsStatus.error && <p style={{color: red}}>{postsStatus.error}</p>}
      {postsStatus.success && <p style={{color: green}}>{postsStatus.success}</p>}
      <div style={{marginTop: 10}}>
        {posts.map((post) => {
          <div key={post.slug}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;

```

Outside React Components:
```typescript

// log list updates
statebook.posts.subscribe((list, status) => {
  console.log({list, status})
})

// inside react components
function App() {
  //...
```

> That's It!! :confetti_ball:

## Built-in Stateful Topics (DataTypes / Data Structures)

The following are the built-in topics that you can use immediatly in statebook. they can be created from  `Topics`

```typescript
import {StatebookFactory, Topics} from 'statebook';

const statebook = StatebookFactory({
  language: Topics.String('en'); // string
})
```

- [X] String
- [X] Number
- [X] Arrays
- [X] Objects / HashMaps
- [ ] Stacks (in progress)
- [ ] Queues (in progress)
- [ ] Linked List (in progress)

## Creating Custom Topics
Custom Topics can be created by creating a class for and extending the Topic abstract class

```TypeScript
import {Topic} from 'statebook';

class BinarySearchTree<T> {
  insert(val: T) {
    const node = new Node(val);
    // logic
    return node;
  }
  find() {
    // logic
  }
}

export class BinarySearchTreeTopic<T> extends Topic<BinarySearchTree<T>> {
  insert(value: T) {
    // set last inserted node in the state to trigger update
    this.set((state) => state.insert(value)) 
  }
}
```


## Maintainer
[Abdel Rahman Hussein](https://github.com/abdelrahman146)

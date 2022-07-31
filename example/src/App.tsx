import './App.css';
import { statebook } from './lib/statebook';

function App() {
    const [user, userStatus, userTopic] = statebook.useTopic('user');

    return (
        <div className="app">
            <div className="box">
                <div className="">
                    <label>Enter your name</label>
                    <input type={'text'} value={user.name} onChange={(e) => userTopic.update('name', e.target.value)} />
                </div>
            </div>
        </div>
    );
}

export default App;

import {useEffect, useRef} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './App.css';

function App() {
    const stompClient = useRef(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/api/ws');
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({
            login: "sangkhim",
            passcode: "123456",
            Authorization: "Basic dXNlcjE6YWJjZDEyMzQ="
        }, (frame) => {
            console.log('Connected: ' + frame);
            stompClient.current.subscribe('/topic/roomName', (message) => {
                console.log('room: ' + message.body);
            });
            stompClient.current.subscribe('/user/queue/reply', (message) => {
                console.log('user: ' + message.body);
            });
        });
    }, []);

    const sendMessage = () => {
        stompClient.current.send("/app/topic/roomName", {}, "Room");
        stompClient.current.send("/app/user/sangkhim", {}, "User");
    };

    return (
        <div className="App">
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
}

export default App;
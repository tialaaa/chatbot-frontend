import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  console.log(chats)
  console.log(chats.length)

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <h1>My First Chatbot</h1>
      <section className="chat-window">
        {chats && chats.length 
          ? chats.map((chat, index) => 
            <p key={index} className={chat.role === "user" ? "user-msg" : "assistant-msg"}>
              <span>
                <b>{chat.role.toUpperCase()}</b>
              </span>
              <span className='divider'>:</span>
              <span>{chat.content}</span>
            </p>
          )
        : ""}
      </section>

      <div className={isTyping ? "typing" : "typing hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder='Type a message here and hit Enter...'
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
};

export default App;

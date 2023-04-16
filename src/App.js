// import logo from './logo.svg';
import { MyNearComponent } from './NearComponent';
import './App.css';
// import * as nearAPI from "near-api-js";
import { useState, useRef } from "react";
// import Avatar from './assets/carter.webp'
import Avatar from './assets/favicon.webp'
import MartianLogo from './assets/martian-logo.jpg';

function App() {
  // const { keyStores } = nearAPI;
  // const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
  const messageEnd = useRef(null);
  const [ans, setAns] = useState([]);
  const [addAsk, setAsk] = useState("");
  const [typing, setTyping] = useState(false);


  // const { connect } = nearAPI;

  // const connectionConfig = {
  //   networkId: "mainnet",
  //   keyStore: myKeyStore, // first create a key store
  //   nodeUrl: "https://rpc.mainnet.near.org",
  //   walletUrl: "https://wallet.mainnet.near.org",
  //   helperUrl: "https://helper.mainnet.near.org",
  //   explorerUrl: "https://explorer.mainnet.near.org",
  // };
  // const nearConnection = await connect(connectionConfig);

  // const nearConnection = await connect(connectionConfig);


  const handleAdd = async () => {
    setTimeout(() => {
      setAns((preAns) => [
        {
          responsed: addAsk,
          role: "User",
        },
        ...preAns,
      ]);
    }, 250);

    setAsk("");

    setTimeout(() => {
      setTyping(true);
    }, 800);

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'f31aa08b09msh4ea63a26cf031f9p18fa80jsn5027f20780f9',
        'X-RapidAPI-Host': 'chatgpt-powered-question-answering-over-documents.p.rapidapi.com'
      },
      body: `{"text":"You are Martian wallet help doc. This document is about maritan. What is a Self-Custodial wallet? Self-custodial means that you are the keeper of your keys. You are the custodian of your account. _ We don't store any data about your wallet. Everything you see is in your browser is at a local level.  I was phished, scammed or hacked, can you help? Unfortunately, transactions made on the blockchain are final and irreversible. The decentralized nature of blockchains means that Martian is unable to reverse or block transactions once they have been made How to keep my wallet safe? Transaction simulation in Aptos and sui _ Accurately provide transaction gas estimates - This means users will always have some certainty about their anticipated gas expenditures. _ Preview wallet balance changes when asking for users to confirm a transaction - This means users will be far less likely to suffer from phishing/scam sites attempting drain their wallet's assets","query":"${addAsk}"}`
    };


    await fetch("https://chatgpt-powered-question-answering-over-documents.p.rapidapi.com/qa877", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.answer);
        setAns((preAns) => [
          {
            responsed: response.answer,
            role: "Assistant",
          },
          ...preAns,
        ]);
      })
      .catch((err) => console.error(err));
    setTyping(false);
  };

  const saveEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <>
      <MyNearComponent contractId="passthrough.near" methodNames={["transfer"]} />

      <div className="apiApp">
        <ul className='chatContainer'>
          <div className="chatSec">
            {typing && (
              <div className="chat">
                <div className="chatCont">
                  <div className="showAvatarSec">
                    <img className={"showChatAvatar"} src={Avatar} alt="" />
                  </div>
                  <div className="assistant typing">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            )}

            {ans.length > 0 ? (
              ans.map((ans, index) => {
                return (
                  <div className="chat" key={index}>
                    <div
                      className={
                        ans.role === "Assistant" ? "chatCont" : "chatContUser"
                      }
                    >
                      <div
                        className={
                          ans.role === "Assistant"
                            ? "showAvatarSec"
                            : "hideChatAvatar"
                        }
                      >
                        <img
                          className={
                            ans.role === "Assistant"
                              ? "showChatAvatar"
                              : "hideChatAvatar"
                          }
                          src={Avatar}
                          alt=""
                        />
                      </div>
                      <p
                        className={
                          ans.role === "User"
                            ? "user chatStyle"
                            : "assistant chatStyle"
                        }
                      >
                        {ans.responsed}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ margin: "0 auto" }}>Ask about Martian🙂</p>
            )}
            <div ref={messageEnd} />
          </div>
        </ul>
        <div className="addPost">
          <input
            type="text"
            value={addAsk}
            placeholder="Type something to ask..."
            onChange={(e) => setAsk(e.target.value)}
            onKeyDown={saveEnter}
          />
          <button
            className='sendBtn'
            onClick={handleAdd}
            disabled={!addAsk}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

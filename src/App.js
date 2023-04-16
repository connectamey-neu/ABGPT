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
      body: `{"text":"You are Arbitrum help doc assistant. anwer on following questions. Arbitrum is a technology suite designed to scale Ethereum. You can use Arbitrum chains to do all things you do on Ethereum — use Web3 apps, deploy smart contracts, etc., but your transactions will be cheaper and faster. Our flagship product — Arbitrum Rollup — is an Optimistic rollup protocol that inherits Ethereum-level security.What, what’s “Ethereum”? What's a “smart contract”? Where am I? If you aren’t yet familiar with the Ethereum ecosystem, you can check out ethereum.org for an intro. Come back whenever you're ready, no rush.You said Arbitrum exists to “scale” Ethereum; why does Ethereum need this help? Is there something wrong with Ethereum? Ethereum is awesome; on its own, however, it’s also very limited. The Ethereum blockchain only allows about 20-40 transactions per second (TPS) (that’s in total, for all Ethereum users); when the limit is reached, users are forced to compete against each other for their transactions to be included, which causes fees to go up.","query":"${addAsk}"}`
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

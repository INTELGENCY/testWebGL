// import { useEffect, useState } from "react";
// import { useUnityContext, Unity } from "react-unity-webgl";
// const App = () => {
//   const gameWebglUrl = "Build/Build/Build";
//   const { unityProvider, isLoaded, sendMessage } = new useUnityContext({
//     loaderUrl: gameWebglUrl + ".loader.js",
//     dataUrl: gameWebglUrl + ".data.unityweb",
//     frameworkUrl: gameWebglUrl + ".framework.js.unityweb",
//     codeUrl: gameWebglUrl + ".wasm.unityweb",
//   });

//   useEffect(() => {
//     // Define a JavaScript function to get room ID and host status
//     window.GetRoomInfo = () => {
//       return {
//         roomID: window.contentWindow.roomID,
//         isHost: window.contentWindow.isHost,
//       };
//     };

//     // Define a JavaScript function to send player rank to Unity
//     window.GameFinished = (position) => {
//       console.log("GameFinished");
//       setClick(false);
//       window.parent.postMessage({ type: "onRankChange", value: position }, "*");
//     };

//     return () => {
//       // Clean up functions when component unmounts
//       delete window.GetRoomInfo;
//       delete window.GameFinished;
//       // window.removeEventListener("message");
//     };
//   }, []);

//   useEffect(() => {
//     if (isLoaded) {
//       // send function
//       sendMessage("Bridge", "SendToUnity", "1213");
//     }
//   }, [isLoaded]);

//   // const [click, setClick] = useState(false);

//   return (
//     <Unity
//       unityProvider={unityProvider}
//       style={{ width: "100%", height: "100%" }}
//     />
//   );
// };

// export default App;

// import logo from './logo.svg';
// import './App.css';
// import { useEffect, useState } from 'react';

// function App() {

//   let [h, setH] = useState  (window.innerHeight);

//   const handleResize = () => {
//     setH(window.innerHeight);
//   };

//   useEffect(() => {

//     // set the room id
//     const iframe = document.getElementById('gameFrame');
//     iframe.contentWindow.roomID = "test-room-id";

//     //resize right for phone
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // Manage the receipt of the message when finishing the race at a certain position
//   useEffect(() => {
//     const receiveMessage = (event) => {
//       if (event.data.type === "onRankChange") {
//         const val = event.data.value;

//         console.log("Position received! ", val);
//       }
//     };
//     window.addEventListener('message', receiveMessage);

//     return () => {
//       window.removeEventListener('message', receiveMessage);
//     };
//   }, []);

//   return (
//     <div className="App">
//     <iframe height={h} width="100%" src={"/racing"} style={{border: "none"}} id='gameFrame' ></iframe>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { useUnityContext, Unity } from "react-unity-webgl";
const App = () => {
  const name = "JSBuild";
  const getUrl = (url) => `${name}/Build/${name}.${url}`;

  const { unityProvider, isLoaded, sendMessage } = new useUnityContext({
    loaderUrl: getUrl("loader.js"),
    dataUrl: getUrl("data.unityweb"),
    frameworkUrl: getUrl("framework.js.unityweb"),
    codeUrl: getUrl("wasm.unityweb"),
  });
  const [ishost, setIsHost] = useState("");
  const [Type, setType] = useState("");
  const [username, setUsername] = useState("");
  const [roomNo, setRoomNo] = useState("");

  // for room id

  // Function to return the room ID

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleRoomNoChange = (event) => {
    setRoomNo(event.target.value);
  };

  useEffect(() => {
    if (isLoaded) {
      console.log("the host isss", ishost);
      console.log("the name is", username);
      window.GetRoomID = (callbackName) => {
        let roomID = "123456";
        console.log("callbackName", callbackName);
        sendMessage("callingfunction", callbackName, roomNo);
      };

      window.ISHost = (callbackName) => {
        console.log("the callback", callbackName);
        sendMessage("callingfunction", callbackName, ishost);
      };

      window.PlayerName = (callbackName) => {
        sendMessage("callingfunction", callbackName, username);
      };

      window.onGameStarted = () => {
        console.log("onGameStarted");
      };

      window.EndDetail = (data, item) => {
        console.log("EndDetail", data);
        console.log("ItemDetail", item);
      };
    }
  }, [isLoaded]);
  const isUsernameValid = username.trim() !== "";
  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold",
  };

  if (!isUsernameValid) {
    buttonStyle.background = "#98a39b"; // Change the button color to blur
    buttonStyle.color = "gray"; // Change the button text color to gray
    buttonStyle.cursor = "not-allowed"; // Change cursor to not-allowed
  } else {
    buttonStyle.background = "blue"; // Restore original button color
    buttonStyle.color = "white"; // Restore original button text color
    buttonStyle.cursor = "pointer"; // Restore original cursor
  }

  // useEffect(() => {
  //   return () => {
  //     delete window.GetRoomID;
  //   };
  // }, []);
  // for room id
  // useEffect(() => {
  //   // Define a JavaScript function to get room ID and host status
  //   window.GetRoomInfo = () => {
  //     return {
  //       roomID: window.contentWindow.roomID,
  //       isHost: window.contentWindow.isHost,
  //     };
  //   };
  //   // Define a JavaScript function to send player rank to Unity
  //   window.GameFinished = (position) => {
  //     console.log("GameFinished");
  //     setClick(false);
  //     window.parent.postMessage({ type: "onRankChange", value: position }, "*");
  //   };
  //   // window.GetRoomID=()=>{
  //   //   alert("1232322343")
  //   // }
  //   window.IsHost = () => {
  //     alert("ISHOst");
  //   };
  //   return () => {
  //     // Clean up functions when component unmounts
  //     delete window.GetRoomInfo;
  //     delete window.GameFinished;
  //     // window.removeEventListener("message");
  //   };
  // }, []);
  // useEffect(() => {
  //   if (isLoaded) {
  //     // send function
  //     sendMessage("Bridge", "SendToUnity", "1213");
  //   }
  // }, [isLoaded]);
  const [click, setClick] = useState(false);
  return click ? (
    <Unity
      unityProvider={unityProvider}
      style={{ width: "100%", height: "100%" }}
    />
  ) : (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div className="">
          <div>
            <label
              htmlFor="username"
              style={{
                marginRight: "10px",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                fontSize: "25px",
              }}
            />
          </div>
          <div className="" style={{ marginTop: "20px" }}>
            <label
              htmlFor="roomNo"
              style={{
                marginRight: "10px",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              Room Id:
            </label>
            <input
              type="text"
              id="roomNo"
              value={roomNo}
              onChange={handleRoomNoChange}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                fontSize: "25px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            // height: "100vh",
            // width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <button
            onClick={() => {
              setClick((e) => !e);
              setIsHost("true");
            }}
            // style={{
            //   padding: "10px 20px",
            //   borderRadius: "10px",
            //   cursor: "pointer",
            //   background: "blue",
            //   color: "white",
            //   fontSize: "20px",
            //   fontWeight: "bold",
            // }}
            style={buttonStyle}
            disabled={!isUsernameValid}
          >
            Create Room
          </button>
          <button
            onClick={() => {
              setClick((e) => !e);
              setIsHost("false");
            }}
            // style={{
            //   padding: "10px 20px",
            //   borderRadius: "10px",
            //   cursor: "pointer",
            //   background: "blue",
            //   color: "white",
            //   fontSize: "20px",
            //   fontWeight: "bold",
            // }}
            style={buttonStyle}
            disabled={!isUsernameValid || roomNo === 0}
          >
            Join Room
          </button>
        </div>
      </div>
    </>
  );
};
export default App;

import { useEffect, useState } from "react";
import { useUnityContext, Unity } from "react-unity-webgl";
const App = () => {
  const gameWebglUrl = "Build/Build/Build";
  const { unityProvider, isLoaded, sendMessage } = new useUnityContext({
    loaderUrl: gameWebglUrl + ".loader.js",
    dataUrl: gameWebglUrl + ".data.unityweb",
    frameworkUrl: gameWebglUrl + ".framework.js.unityweb",
    codeUrl: gameWebglUrl + ".wasm.unityweb",
  });

  useEffect(() => {
    // Define a JavaScript function to get room ID and host status
    window.GetRoomInfo = () => {
      return {
        roomID: window.contentWindow.roomID,
        isHost: window.contentWindow.isHost,
      };
    };

    // Define a JavaScript function to send player rank to Unity
    window.GameFinished = (position) => {
      console.log("GameFinished");
      setClick(false);
      window.parent.postMessage({ type: "onRankChange", value: position }, "*");
    };

    return () => {
      // Clean up functions when component unmounts
      delete window.GetRoomInfo;
      delete window.GameFinished;
      // window.removeEventListener("message");
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // send function
      sendMessage("Bridge", "SendToUnity", "1213");
    }
  }, [isLoaded]);

  const [click, setClick] = useState(false);

  return click ? (
    <Unity
      unityProvider={unityProvider}
      style={{ width: "100%", height: "100%" }}
    />
  ) : (
    <button
      onClick={() => {
        setClick((e) => !e);
      }}
    >
      Play Game
    </button>
  );
};

export default App;

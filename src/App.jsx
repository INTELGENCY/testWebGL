import { useEffect } from "react";
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
      // Send message to Unity to initialize communication
      sendMessage("Bridge", "SendToUnity", "1213");
    }
  }, [isLoaded]);

  return (
    <Unity
      unityProvider={unityProvider}
      style={{ width: window.innerWidth, height: window.innerHeight }}
    />
  );
};

export default App;

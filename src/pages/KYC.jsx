import { ReactMediaRecorder } from "react-media-recorder";
import Layout from "../layouts/Layout";

export default function Contact() {
  return (
    <Layout>
      <div
        style={{
          marginTop: "100px",
        }}
      >
        <ReactMediaRecorder
          video
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <div>
              <p>{status}</p>
              <button onClick={startRecording}>Start Recording</button>
              <button onClick={stopRecording}>Stop Recording</button>
              <video src={mediaBlobUrl} controls autoPlay loop />
            </div>
          )}
        />
      </div>
    </Layout>
  );
}

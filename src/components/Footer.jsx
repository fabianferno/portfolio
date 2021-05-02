import { SocialIcon } from "react-social-icons";

export default function Footer(props) {
  return (
    <div
      style={{ height: "5vh" }}
      className="d-flex justify-content-around container py-3"
    >
      <SocialIcon url="https://github.com/fabianferno" bgColor="#60FF9F" />
      <SocialIcon
        url="https://www.youtube.com/channel/UCDrkxune31SSSYDL02P3rHg"
        bgColor="#60FF9F"
      />
      <SocialIcon url="https://dev.to/fabianferno" bgColor="#60FF9F" />
      <SocialIcon url="https://twitter.com/FabianFerno" bgColor="#60FF9F" />
    </div>
  );
}

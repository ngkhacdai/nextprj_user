import dynamic from "next/dynamic";

const Information = dynamic(() => import("./profile/Information"), {
  ssr: false,
});
// import Information from "./profile/Information";

const Profile = async () => {
  return <Information />;
};

export default Profile;

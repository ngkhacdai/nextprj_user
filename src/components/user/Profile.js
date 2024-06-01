import { getProfile } from "@/api/User";
import dynamic from "next/dynamic";

const Information = dynamic(() => import("./profile/Information"), {
  ssr: false,
});
// import Information from "./profile/Information";

const Profile = async () => {
  const profile = await getProfile();
  return <Information profile={profile} />;
};

export default Profile;

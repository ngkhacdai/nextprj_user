import dynamic from "next/dynamic";
const Profile = dynamic(() => import("@/components/user/Profile"), {
  suspense: true,
  ssr: false,
});
const page = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default page;

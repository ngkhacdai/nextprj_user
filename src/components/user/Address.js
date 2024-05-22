import { getAddress } from "@/api/User";
import AddressClient from "./addressClient/AddressClient";
const Address = async () => {
  const address = await getAddress();
  return <AddressClient address={address} />;
};

export default Address;

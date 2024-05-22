import { getAddress } from "@/api/User";
import Address from "./Address";
// import Method from "./Method";
import dynamic from "next/dynamic";
// import TableProduct from "./TableProduct";
const TableProduct = dynamic(() => import("./TableProduct"), { ssr: false });
const Method = dynamic(() => import("./Method"), { ssr: false });

const CheckOut = async () => {
  const address = await getAddress();
  return (
    <div>
      <div className="mx-auto md:w-3/4">
        <Address address={address} />
        <TableProduct />
        <Method address={address} />
      </div>
    </div>
  );
};

export default CheckOut;

import NavOrder from "@/components/user/NavOrder";

export default function OrderLayout({ children }) {
  return (
    <div>
      <NavOrder>{children}</NavOrder>
    </div>
  );
}

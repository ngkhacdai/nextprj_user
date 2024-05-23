import Category from "@/components/category/Category";

export default function Page({ searchParams }) {
  return (
    <div>
      <Category searchParams={searchParams} />
    </div>
  );
}

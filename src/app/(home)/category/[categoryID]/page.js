import Category from "@/components/category/Category";

export default function Page({ params }) {
  return <Category categoryID={params.categoryID} />;
}

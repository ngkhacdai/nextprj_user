import Review from "@/components/review/Review";

export default function Page({ params }) {
  return <Review productID={params.productID}>Review</Review>;
}

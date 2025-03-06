import Image from "next/image";
import CandidateForm from "./component/CandidateForm";
import PageLoader from "./component/Loader";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <CandidateForm />
    </div>
  );
}

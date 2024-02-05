import { ProgressBar } from "@/components/progressbar";
import { Typography } from "@/components/typography";


export default function Working() {
  return (
    <>
        <div className="fixed inset-x-0 top-30 h-16">
          <ProgressBar />
        </div>
      <div className="flex flex-col p-5 m-5 items-center justify-center">
        <Typography />
        <img src="/flow.png" alt="Proof Generation" className="w-auto h-auto" />
      </div>
    </>
  )
}

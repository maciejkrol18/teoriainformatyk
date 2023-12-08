import Exam from "@/components/exam/Exam"
import PageTitle from "@/components/ui/PageTitle"
import { notFound } from "next/navigation"

export default function ExamPage({ params }: { params: { qualification: string } }) {
  if (params.qualification === "inf02" || params.qualification === "inf03") {
    return (
      <>
        <PageTitle
          smallTitle={params.qualification === "inf02" ? "INF.02" : "INF.03"}
          bigTitle="Egzamin"
        />
        <Exam table={params.qualification} />
      </>
    )
  } else {
    notFound()
  }
}

import OneQuestion from "@/components/OneQuestion"
import PageTitle from "@/components/ui/PageTitle"
import { notFound } from "next/navigation"

export default function OneQuestionPage({
  params,
}: {
  params: { qualification: string }
}) {
  if (params.qualification === "inf02" || params.qualification === "inf03") {
    return (
      <>
        <PageTitle
          smallTitle={params.qualification === "inf02" ? "INF.02" : "INF.03"}
          bigTitle="Jedno pytanie"
        />
        <OneQuestion table={params.qualification} />
      </>
    )
  } else {
    notFound()
  }
}

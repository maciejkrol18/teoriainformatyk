import Exam from "@/components/Exam"
import PageTitle from "@/components/ui/PageTitle"

export default function Page() {
  return (
    <>
      <PageTitle smallTitle="INF.02" bigTitle="Egzamin" />
      <div className="md:w-full md:max-w-lg md:mx-auto">
        <Exam table="questions_inf02" />
      </div>
    </>
  )
}

import Exam from "@/components/Exam"
import PageTitle from "@/components/ui/PageTitle"

export default function Page() {
  return (
    <>
      <PageTitle smallTitle="INF.03" bigTitle="Egzamin" />
      <div className="md:w-full md:max-w-lg md:mx-auto">
        <Exam table="questions_inf03" />
      </div>
    </>
  )
}

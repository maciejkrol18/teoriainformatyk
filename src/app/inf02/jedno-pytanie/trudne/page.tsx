import OneQuestion from "@/components/OneQuestion"
import PageTitle from "@/components/ui/PageTitle"

export default function Page() {
  return (
    <>
      <PageTitle smallTitle="INF.02" bigTitle="Tryb jednego pytania - Hard mode" />
      <div className="md:w-full md:max-w-lg md:mx-auto">
        <OneQuestion table="questions_inf02" hardMode />
      </div>
    </>
  )
}

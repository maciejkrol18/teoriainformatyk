import OneQuestion from "@/components/OneQuestion"

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center py-12">
        <span className="text-transparent text-xl font-bold bg-clip-text bg-gradient-accent animate-moving-gradient">
          INF.03
        </span>
        <h1 className="text-2xl font-bold">Tryb jednego pytania</h1>
      </div>
      <div className="md:w-full md:max-w-lg md:mx-auto">
        <OneQuestion table="questions_inf03" hardMode />
      </div>
    </>
  )
}

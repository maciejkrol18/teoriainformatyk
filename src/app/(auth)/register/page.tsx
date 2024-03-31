import RegisterForm from "@/components/auth/RegisterForm"

export default function RegisterPage() {
  return (
    <>
      <div className="text-center lg:text-left leading-10 lg:leading-[60px]">
        <h1 className="text-4xl lg:text-5xl font-display font-semibold">
          Stwórz nowe konto
        </h1>
        <h2 className="text-lg lg:text-xl text-muted">
          Zarejestruj się za pomocą adresu email
        </h2>
      </div>
      <RegisterForm />
    </>
  )
}

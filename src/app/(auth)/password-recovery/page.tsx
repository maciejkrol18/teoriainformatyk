import PasswordRecoveryForm from "@/components/auth/PasswordRecoveryForm"

export default function PasswordRecoveryPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-center">Odzyskiwanie hasła</h1>
        <p className="text-center text-muted">
          Wprowadź adres email powiązany z kontem do którego zamierzasz odzyskać dostęp
        </p>
        <PasswordRecoveryForm />
      </div>
      <p className="text-sm text-muted text-center">
        Odzyskiwanie hasła służy do resetu hasła wykorzystywanego do logowania za
        pośrednictwem adresu email. Wciąż możesz się zalogować na utracone konto za pomocą
        zewnętrznego serwisu, pod warunkiem, że do rejestracji w tym serwisie użyto tego
        samego adresu email
      </p>
    </div>
  )
}

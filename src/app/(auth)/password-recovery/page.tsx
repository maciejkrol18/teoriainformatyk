import PasswordRecoveryForm from '@/components/auth/PasswordRecoveryForm'

export default function PasswordRecoveryPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Odzyskiwanie hasła</h1>
      <p className="text-muted">
        Wprowadź adres email powiązany z kontem do którego zamierzasz odzyskać dostęp
      </p>
      <PasswordRecoveryForm />
    </div>
  )
}

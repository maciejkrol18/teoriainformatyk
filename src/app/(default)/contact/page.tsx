import getUser from '@/lib/supabase/get-user'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Kontakt',
}

const contactTypes = ['report', 'general', 'help', 'suggestion', 'business']
type ContactType = (typeof contactTypes)[number]

interface ContactPageProps {
  searchParams: {
    type: ContactType
    content: string
  }
}

function isValidContactType(contactType: unknown): contactType is ContactType {
  return (
    typeof contactType === 'string' && contactTypes.includes(contactType as ContactType)
  )
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const contactType = isValidContactType(searchParams.type)
    ? searchParams.type
    : undefined
  const { user } = await getUser()
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold font-display">Skontaktuj się z nami</h1>
      <ContactForm
        contactType={contactType}
        content={searchParams.content}
        email={user?.email}
      />
    </div>
  )
}

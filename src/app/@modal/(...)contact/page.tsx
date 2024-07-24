import ContactModal from '@/app/(default)/contact/ContactModal'
import getUser from '@/lib/supabase/get-user'

const contactTypes = ['report', 'general', 'help', 'suggestion', 'business']
type ContactType = (typeof contactTypes)[number]

interface ContactModalPageProps {
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

export default async function ContactModalPage({ searchParams }: ContactModalPageProps) {
  const contactType = isValidContactType(searchParams.type)
    ? searchParams.type
    : undefined
  const { user } = await getUser()
  return (
    <ContactModal
      contactType={contactType}
      content={searchParams.content}
      email={user?.email}
    />
  )
}

import ContactModal from "@/app/(default)/contact/contact-modal";
import getUser from "@/lib/supabase/get-user";

const contactTypes = ["report", "general", "help", "suggestion", "business"];
type ContactType = (typeof contactTypes)[number];

interface ContactModalPageProps {
  searchParams: Promise<{
    type: ContactType;
    content: string;
  }>;
}

function isValidContactType(contactType: unknown): contactType is ContactType {
  return (
    typeof contactType === "string" && contactTypes.includes(contactType as ContactType)
  );
}

export default async function ContactModalPage(props: ContactModalPageProps) {
  const searchParams = await props.searchParams;
  const contactType = isValidContactType(searchParams.type)
    ? searchParams.type
    : undefined;
  const { user } = await getUser();
  return (
    <ContactModal
      contactType={contactType}
      content={searchParams.content}
      email={user?.email}
    />
  );
}

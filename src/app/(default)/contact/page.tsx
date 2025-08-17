import getUser from "@/lib/supabase/get-user";
import ContactForm from "./contact-form";

export const metadata = {
  title: "Kontakt",
};

const contactTypes = ["report", "general", "help", "suggestion", "business"];
type ContactType = (typeof contactTypes)[number];

interface ContactPageProps {
  searchParams: Promise<{
    type: ContactType;
    content: string;
  }>;
}

function isValidContactType(contactType: unknown): contactType is ContactType {
  return (
    typeof contactType === "string" &&
    contactTypes.includes(contactType as ContactType)
  );
}

export default async function ContactPage(props: ContactPageProps) {
  const searchParams = await props.searchParams;
  const contactType = isValidContactType(searchParams.type)
    ? searchParams.type
    : undefined;
  const { user } = await getUser();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold font-display">Skontaktuj się z nami</h1>
      <ContactForm
        contactType={contactType}
        content={searchParams.content}
        email={user?.email}
      />
    </div>
  );
}

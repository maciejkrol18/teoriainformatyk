import { Button } from "../ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";

interface ProgressResetWarningProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmFn: () => void;
}

export default function ProgressResetWarning({
  open,
  setOpen,
  confirmFn,
}: ProgressResetWarningProps) {
  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaContent className="pb-8">
        <CredenzaHeader>
          <CredenzaTitle>Potwierdź decyzję</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <p className="text-center md:text-left">
            Rozpoczęcie ćwiczenia od początku spowoduje reset twojego progresu w
            fiszkach w obecnej kwalifikacji
          </p>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose>
            <Button
              onClick={() => {
                setOpen(false);
                confirmFn();
              }}
              className="w-full"
            >
              Tak, zaczynam od początku
            </Button>
          </CredenzaClose>
          <CredenzaClose>
            <Button className="w-full" variant="primary">
              Anuluj
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}

import CodeEditor from "@uiw/react-textarea-code-editor";

interface QueryInputProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function QueryInput({ state, setState }: QueryInputProps) {
  return (
    <CodeEditor
      value={state}
      language="sql"
      placeholder="Tutaj wpisz swoją kwerendę"
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setState(e.target.value)}
      className="font-mono"
      style={{
        background: "hsl(var(--background-bright))",
        overflow: "auto",
        fontSize: "1.125rem",
        height: "100%",
        borderRadius: "0.375rem",
      }}
    />
  );
}

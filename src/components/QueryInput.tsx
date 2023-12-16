import CodeEditor from "@uiw/react-textarea-code-editor"

interface QueryInputProps {
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

export default function QueryInput({ state, setState }: QueryInputProps) {
  return (
    <CodeEditor
      value={state}
      language="sql"
      placeholder="Wpisz kwerendę"
      onChange={(e) => setState(e.target.value)}
      className="font-mono w-full rounded-lg"
      style={{
        backgroundColor: "#232323",
        overflow: "auto",
        maxHeight: "60px",
      }}
    />
  )
}

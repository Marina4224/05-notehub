import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const [input, setInput] = useState(value);
  const [debounced] = useDebounce(input, 500);

  useEffect(() => {
    onChange(debounced);
  }, [debounced, onChange]);

  return (
    <input
      type="text"
      className={css.input}
      placeholder="Search notes"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
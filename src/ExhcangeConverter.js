import { useEffect, useState } from "react";

export default function ExchangeConverter() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      setIsLoading(true);
      async function fetchRates() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setOutput(data?.rates?.[to]);
      }
      setIsLoading(false);
      if (from === to) return setAmount(1);
      fetchRates();
    },
    [amount, from, to]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option>USD</option>
        <option>EUR</option>
        <option>GBP</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option>USD</option>
        <option>EUR</option>
        <option>GBP</option>
      </select>
      <p>{output}</p>
    </div>
  );
}

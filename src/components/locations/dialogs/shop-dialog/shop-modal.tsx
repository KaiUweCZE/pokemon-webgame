import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Item } from "@/types/item";
import { roundNumber } from "@/utils/helper/round-number";
import { useEffect, useState } from "react";

interface ShopModalProps {
  state: "buy" | "sell";
  price: number;
  userItem: Item | null;
  money: number;
}

const ShopModal = ({ state, price, userItem, money }: ShopModalProps) => {
  const [amount, setAmount] = useState(1);
  const [inputValue, setInputValue] = useState("1");
  const debouncedAmount = useDebounce(inputValue, 500);

  // prettier-ignore
  const maxAmount =
    state === "sell"
      ? (userItem?.quantity
        ? Math.max(userItem?.quantity, 10)
        : 0)
      : roundNumber(money / price, 1);

  useEffect(() => {
    const parsedValue = parseInt(debouncedAmount);
    if (!isNaN(parsedValue)) {
      if (parsedValue < 1) {
        setAmount(1);
        setInputValue(String(1));
      } else if (parsedValue > maxAmount) {
        setAmount(Math.min(parsedValue, maxAmount));
        setInputValue(String(maxAmount));
      } else {
        setAmount(parsedValue);
      }
    } else {
      setAmount(1);
      setInputValue("1");
    }
  }, [debouncedAmount, maxAmount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", { state, amount });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount-input" className="text-amber-100">
          {`Amount (owned: ${userItem?.quantity ?? 0})`}
        </label>
        <Input
          id="amount-input"
          min={1}
          variant="secondary"
          type="number"
          value={inputValue}
          className="border-amber-100"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-amber-100">Total price: {amount * price}</span>
        <Button variant="light" type="submit">
          <span>Confirm</span>
        </Button>
      </div>
    </form>
  );
};

export default ShopModal;

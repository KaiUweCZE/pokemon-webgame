import { useEffect, useState } from "react";
import Image from "next/image";
import path from "path";
import fs from "fs";

export default function TestImages() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Zkusíme načíst obrázek přes fetch
    fetch("/images/pokemons/teddiursa.webp")
      .then((response) => {
        if (!response.ok) {
          setError(`Image fetch failed: ${response.status} ${response.statusText}`);
        }
      })
      .catch((err) => setError(`Fetch error: ${err.message}`));
  }, []);

  return (
    <div>
      <h1>Image Test Page</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <h2>Direct img tag test:</h2>
        <img src="/images/pokemons/teddiursa.webp" alt="Teddiursa" width={150} height={150} />
      </div>
      <div>
        <h2>Next.js Image component test:</h2>
        <Image
          src="/images/pokemons/teddiursa.webp"
          alt="Teddiursa"
          width={150}
          height={150}
          onError={(e) => setError("Next.js Image load failed")}
        />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { INITIAL_DESSERTS } from "./desserts";

const TICK_MS = 2500;
const MIN_PRICE_RATIO = 0.85;
const MAX_PRICE_RATIO = 1.45;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roundToHundred(value) {
  return Math.round(value / 100) * 100;
}

function createInitialState() {
  return INITIAL_DESSERTS.map((dessert) => ({
    ...dessert,
    price: dessert.basePrice,
    prevPrice: dessert.basePrice,
    stock: dessert.maxStock,
    soldOut: false,
    restockIn: 0,
    flash: null,
  }));
}

function tick(items) {
  return items.map((item) => {
    if (item.soldOut) {
      const restockIn = item.restockIn - TICK_MS / 1000;
      if (restockIn <= 0) {
        return {
          ...item,
          soldOut: false,
          restockIn: 0,
          stock: randomInt(Math.round(item.maxStock * 0.6), item.maxStock),
          prevPrice: item.price,
          price: item.basePrice,
          flash: "down",
        };
      }
      return { ...item, restockIn };
    }

    const sold = Math.random() < 0.6 ? randomInt(1, 2) : 0;
    const nextStock = Math.max(0, item.stock - sold);

    let changePct = (Math.random() * 10 - 4) / 100;
    if (nextStock <= Math.ceil(item.maxStock * 0.2)) {
      changePct += 0.05;
    }

    const minPrice = item.basePrice * MIN_PRICE_RATIO;
    const maxPrice = item.basePrice * MAX_PRICE_RATIO;
    const rawPrice = item.price * (1 + changePct);
    const nextPrice = roundToHundred(
      Math.min(maxPrice, Math.max(minPrice, rawPrice))
    );

    const becameSoldOut = nextStock === 0;

    return {
      ...item,
      prevPrice: item.price,
      price: nextPrice,
      stock: nextStock,
      soldOut: becameSoldOut,
      restockIn: becameSoldOut ? randomInt(15, 25) : 0,
      flash:
        nextPrice === item.price ? null : nextPrice > item.price ? "up" : "down",
    };
  });
}

export function useLiveDesserts() {
  const [items, setItems] = useState(createInitialState);

  useEffect(() => {
    setItems((current) =>
      current.map((item) => ({
        ...item,
        stock: randomInt(Math.round(item.maxStock * 0.6), item.maxStock),
      }))
    );

    const interval = setInterval(() => {
      setItems((current) => tick(current));
    }, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  return items;
}

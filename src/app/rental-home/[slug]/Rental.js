"use client"
import { useState } from "react";


const TICKETS = [
    { id: 0, status: "open" },
    { id: 1, status: "open" },
    { id: 2, status: "resolved" },
    { id: 3, status: "canceled" },
    { id: 4, status: "resolved" }
  ]

  
export default function Rental({ params }) {
  const id = params;
  const ticket = TICKETS[id];


  return (
    <div>
      <h1>hola</h1>
    </div>
  );
}
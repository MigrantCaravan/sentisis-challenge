import React, { useEffect, useState } from "react";
import "./App.css";

//This is a follow-up on the technical challenge I started with Human to Human Hub. The start of the challenge was rocky. However, upon reading more carefully, I was able to advance a bit more with the assignment, and I think I am a bit closer to what was outlined in the README.

//Added ticket interface. It follows objects from Endpoint
interface Ticket {
  id: string;
  title: string;
  type: string;
  releaseDate: number;
  price: number;
  currency: string;
  quantity: number;
  description: string;
}

//added modal interface
interface ModalProps {
  ticket: Ticket;
  onClose: () => void;
  onAdd: () => void;
}

function Modal({ ticket, onClose, onAdd }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{ticket.title}</h2>
        <p>
          <strong>Type:</strong> {ticket.type}
        </p>
        <p>
          <strong>Description:</strong> {ticket.description}
        </p>
        <button
          onClick={() => {
            onAdd();
            onClose();
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

function App() {
  /// added the state for the ticket
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load tickets from the provided API
    fetch("https://my-json-server.typicode.com/davidan90/demo/tickets")
      .then((response) => response.json())
      .then((data: Omit<Ticket, "quantity">[]) => {
        // Add quantity property and sort by release date
        const ticketsWithQuantity = data
          .map((ticket) => ({
            ...ticket,
            quantity: parseInt(
              /// default quantity is 0
              localStorage.getItem(`ticket-${ticket.id}`) || "0"
            ),
          }))
          .sort((a, b) => b.releaseDate - a.releaseDate);
        /// after the modifications we set the state
        setTickets(ticketsWithQuantity);
        setIsLoading(false);
      });
  }, []);
  ///this func updates the ticket quantity and re-set the state
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    setTickets((prevTickets) => {
      const updatedTickets = prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, quantity: newQuantity } : ticket
      );
      return updatedTickets;
    });
    ///set to local
    localStorage.setItem(`ticket-${id}`, newQuantity.toString());
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Release Date</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              style={{ cursor: "pointer" }}
            >
              <td>{ticket.title}</td>
              <td>{ticket.type}</td>
              <td>{new Date(ticket.releaseDate).toLocaleDateString()}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => updateQuantity(ticket.id, ticket.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={ticket.quantity}
                  onChange={(e) =>
                    updateQuantity(ticket.id, parseInt(e.target.value) || 0)
                  }
                  min="0"
                />
                <button
                  onClick={() => updateQuantity(ticket.id, ticket.quantity + 1)}
                >
                  +
                </button>
              </td>
              <td>
                {ticket.price} {ticket.currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTicket && (
        <Modal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onAdd={() =>
            updateQuantity(selectedTicket.id, selectedTicket.quantity + 1)
          }
        />
      )}
    </div>
  );
}

export default App;

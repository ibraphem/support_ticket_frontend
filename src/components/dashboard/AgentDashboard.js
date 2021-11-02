import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../components/Config";
import { useStateValue } from "../../StateProvider";
import TicketCard from "../shared/TicketCard";

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [{ user_id }] = useStateValue();

  useEffect(() => {
    axios.get(`${URL}/agent/${user_id}`).then((response) => {
      setTickets(response.data);
    });
  }, [user_id]);

  return (
    <>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket_id={ticket.id}
          file_id={ticket.file_id}
          service={ticket.service}
          department={ticket.department}
          priority={ticket.priority}
          date={ticket.date}
          status={ticket.status}
        />
      ))}
    </>
  );
};

export default AgentDashboard;

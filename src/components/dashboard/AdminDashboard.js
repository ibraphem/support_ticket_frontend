import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../components/Config";
import TicketCard from "../shared/TicketCard";
import Title from "../shared/Title";
import NoResult from "../shared/NoResult";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/tickets/admin`).then((response) => {
      setTickets(response.data);
    });
  }, []);

  const rerender = (ticketing) => {
    setTickets(ticketing);
  };

  return (
    <>
      <Title heading="Support Tickets" />
      {tickets.length > 0 ? (
        <>
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket_id={ticket.id}
              rerender={rerender}
              file_id={ticket.file_id}
              service={ticket.service}
              department={ticket.department}
              priority={ticket.priority}
              date={ticket.date}
              status={ticket.status}
              agentId={ticket.agent_id}
              agentName={ticket.agent?.name}
            />
          ))}
        </>
      ) : (
        <NoResult content="No ticket has been raised" />
      )}
    </>
  );
};

export default AdminDashboard;

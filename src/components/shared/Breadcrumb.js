import React from "react";
import Breadcrumbs from "react-router-dynamic-breadcrumbs";
import { BrowserRouter as Router } from "react-router-dom";
const routesList = {
  "/dasboard": "Home",
  "/ticket/open": "Open Support Ticket",
  "/view": "View Support Tickets",
  "/ticket/detail/:ticket_id/:file_id": "Detailed Ticket",
};
export class Breadcrumb extends React.Component {
  render() {
    return (
      <Router>
        <Breadcrumbs
          mappedRoutes={routesList}
          WrapperComponent={(props: any) => (
            <ol className="breadcrumb">{props.children}</ol>
          )}
          ActiveLinkComponent={(props: any) => (
            <li className="breadcrumb-item active">{props.children}</li>
          )}
          LinkComponent={(props: any) => (
            <li className="breadcrumb-item">{props.children}</li>
          )}
        />
      </Router>
    );
  }
}

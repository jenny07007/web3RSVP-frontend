import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Dashboard from "../../components/Dashboard";
import EventCard from "../../components/EventCard";

export default function MyUpcomingRSVPs() {
  const { data: account } = useAccount();

  const id = account ? account.address.toLowerCase() : "";
  const [currentTimestamp, setCurrentTimestamp] = useState(
    new Date().getTime()
  );

  const { loading, error, data } = useQuery(MY_UPCOMING_RSVPs, {
    variables: { id },
  });

  if (loading) {
    return (
      <Dashboard page="rsvps" isUpcoming={true}>
        <p>Loading...</p>
      </Dashboard>
    );
  }

  if (error) {
  }

  return (
    <Dashboard page="rsvps" isUpcoming={true}>
      {account ? (
        <div>
          {data && !data.account && <p>No upcoming RSVPs found</p>}
          {data && data.account && (
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {data.account.rsvps.map((rsvp) => {
                if (rsvp.event.eventTimestamp > currentTimestamp) {
                  return (
                    <li key={rsvp.event.id}>
                      <EventCard
                        id={rsvp.event.id}
                        name={rsvp.event.name}
                        eventTimestamp={rsvp.event.eventTimestamp}
                        imageURL={rsvp.event.imageURL}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center py-8">
          <p className="mb-4">Please connect your wallet to view your rsvps</p>
          <ConnectButton />
        </div>
      )}
    </Dashboard>
  );
}

const MY_UPCOMING_RSVPs = gql`
  query Account($id: String) {
    account(id: $id) {
      id
      rsvps {
        event {
          id
          name
          eventTimestamp
          imageURL
        }
      }
    }
  }
`;

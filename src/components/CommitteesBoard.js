'use client';

import NavigationLinks from './NavigationLinks';
import LeaderInCircle from './global/LeaderInCircle';
import '../scss/components/CommitteesBoard.scss';

export default function CommitteesBoard({ data, error = null }) {
  // Fallback data (kept for future reference as requested)
  const fallbackData = {
    committees: [
      {
        id: 1,
        title: "Strategy Committee",
        members: [
          {
            id: 1,
            name: "Vinita Gupta",
            title: "Chief Executive Officer",
            image: {
              url: "/assets/committees-board/vinita-gupta.png",
              alt: "Vinita Gupta"
            },
     
          },
          {
            id: 2,
            name: "Nilesh D Gupta",
            title: "Managing Director",
            image: {
              url: "/assets/committees-board/vinita-gupta.png",
              alt: "Nilesh D Gupta"
            }
          },
          {
            id: 3,
            name: "Mark D. McDade",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/vinita-gupta.png",
              alt: "Mark D. McDade"
            }
          },
          {
            id: 4,
            name: "Jeffrey Kindler",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/vinita-gupta.png",
              alt: "Jeffrey Kindler"
            }
          },
          {
            id: 5,
            name: "Alfonso Zulueta",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/vinita-gupta.png",
              alt: "Alfonso Zulueta"
            }
          },
          {
            id: 6,
            name: "Punita Lal",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/vinita-gupta.png",
              alt: "Punita Lal"
            }
          }
        ]
      },
      {
        id: 2,
        title: "Audit Committee",
        backgroundColor: "#f6f6f6",
        members: [
          {
            id: 1,
            name: "Mark D. McDade",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/vinita-gupta.png",
              alt: "Mark D. McDade"
            }
          },
          {
            id: 2,
            name: "Alfonso Zulueta",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/vinita-gupta.png",
              alt: "Alfonso Zulueta"
            }
          },
          {
            id: 3,
            name: "K B S Anand",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/vinita-gupta.png",
              alt: "K B S Anand"
            }
          }
        ]
      }
    ]
  };

  // Use API data if available, otherwise use fallback
  const committeesData = data?.committees && data.committees.length > 0 ? data : fallbackData;

  // Show error state if API failed and no fallback data
  if (error && (!data || !data.committees || data.committees.length === 0)) {
    return (
      <section className="committees-board">
        <div className="committees-board__container">
          <NavigationLinks links={[
            { id: 'committees', label: 'Committees of the Board', href: '/investors/committees' },
            { id: 'code-of-conduct', label: 'Code of Conduct', href: '/investors/code-of-conduct' },
            { id: 'policies', label: 'Policies', href: '/investors/policies' }
          ]} />
          <div className="committees-board__placeholder">
            <p>Unable to load committees data at this time. Please try again later.</p>
            {process.env.NODE_ENV === 'development' && (
              <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                Error: {error}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="committees-board" data-node-id="2371:2">
      <div className="committees-board__container">
        {/* Navigation Links */}
        <NavigationLinks links={[
          { id: 'committees', label: 'Committees of the Board', href: '/investors/committees' },
          { id: 'code-of-conduct', label: 'Code of Conduct', href: '/investors/code-of-conduct' },
          { id: 'policies', label: 'Policies', href: '/investors/policies' }
        ]} />

        {/* Committees */}
        <div className="committees-board__committees">
          {committeesData.committees && committeesData.committees.length > 0 ? (
            committeesData.committees.map((committee, index) => (
            <div 
              key={committee.id} 
              className="committees-board__committee"
              style={committee.backgroundColor ? { backgroundColor: committee.backgroundColor } : {}}
            >
              <div className="committees-board__committee-inner">
                {/* Committee Title */}
                <h2 className="committees-board__title">{committee.title}</h2>

                {/* Members Grid */}
                <div className="committees-board__members">
                {committee.members.map((member) => (
                  <LeaderInCircle
                    key={member.id}
                    id={member.id}
                    name={member.name}
                    title={member.title}
                    image={member.image || {
                      url: "/assets/committees-board/placeholder.png",
                      alt: member.name || "Leader"
                    }}
                    isSpecial={member.isSpecial}
                    size={member.size}
                    link={member.link || '#'}
                    className="committees-board__member"
                  />
                 ))}
                </div>
              </div>
            </div>
          ))
          ) : (
            <div className="committees-board__placeholder">
              <p>No committees available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


'use client';

import Image from 'next/image';
import Link from 'next/link';
import NavigationLinks from './NavigationLinks';
import '../scss/components/CommitteesBoard.scss';

export default function CommitteesBoard({ data }) {
  // Default data (will be replaced by Strapi)
  const committeesData = data || {
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
              url: "/assets/committees-board/vinita-gupta.jpg",
              alt: "Vinita Gupta"
            },
     
          },
          {
            id: 2,
            name: "Nilesh D Gupta",
            title: "Managing Director",
            image: {
              url: "/assets/committees-board/nilesh-gupta.jpg",
              alt: "Nilesh D Gupta"
            }
          },
          {
            id: 3,
            name: "Mark D. McDade",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/mark-mcdade.jpg",
              alt: "Mark D. McDade"
            }
          },
          {
            id: 4,
            name: "Jeffrey Kindler",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/jeffrey-kindler.jpg",
              alt: "Jeffrey Kindler"
            }
          },
          {
            id: 5,
            name: "Alfonso Zulueta",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/alfonso-zulueta.jpg",
              alt: "Alfonso Zulueta"
            }
          },
          {
            id: 6,
            name: "Punita Lal",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/punita-lal.jpg",
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
              url: "/assets/committees-board/mark-mcdade.jpg",
              alt: "Mark D. McDade"
            }
          },
          {
            id: 2,
            name: "Alfonso Zulueta",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/alfonso-zulueta.jpg",
              alt: "Alfonso Zulueta"
            }
          },
          {
            id: 3,
            name: "K B S Anand",
            title: "Independent Director",
            image: {
              url: "/assets/committees-board/kbs-anand.jpg",
              alt: "K B S Anand"
            }
          }
        ]
      }
    ]
  };

  return (
    <section className="committees-board" data-node-id="2371:2">
      <div className="committees-board__container">
        {/* Navigation Links */}
        <NavigationLinks links={[
          { id: 'committees', label: 'Committees of the Board', href: '/investors/policies/committees' },
          { id: 'code-of-conduct', label: 'Code of Conduct', href: '/investors/code-of-conduct' },
          { id: 'policies', label: 'Policies', href: '/investors/policies' }
        ]} />

        {/* Committees */}
        <div className="committees-board__committees">
          {committeesData.committees.map((committee, index) => (
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
                  <div
                    key={member.id}
                    className={`committees-board__member ${
                      member.isSpecial ? 'committees-board__member--special' : ''
                    } ${member.size === 'large' ? 'committees-board__member--large' : ''}`}
                  >
                    <div className="committees-board__member-image-wrapper">
                      <div className={`committees-board__member-circle ${
                        member.isSpecial ? 'committees-board__member-circle--special' : ''
                      }`}>
                        <Image
                          src={member.image.url}
                          alt={member.image.alt || member.name}
                          width={member.size === 'large' ? 500 : 400}
                          height={member.size === 'large' ? 500 : 400}
                          className="committees-board__member-image"
                          quality={100}
                        />
                      </div>
                      
                      {/* Special Indicator (Arrow Icon) - Always render, shown on hover for non-special members */}
                      <Link href="#" className="committees-board__member-indicator">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 12L12 1M12 1H1M12 1V12"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>

                    {/* Member Info */}
                    <div className={`committees-board__member-info ${
                      member.isSpecial ? 'committees-board__member-info--special' : ''
                    }`}>
                      <h3 className="committees-board__member-name">{member.name}</h3>
                      <p className="committees-board__member-title">{member.title}</p>
                    </div>
                  </div>
                 ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


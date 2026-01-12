'use client';

import Image from 'next/image';
import NavigationLinks from './NavigationLinks';
import '../scss/components/AnalystCoverage.scss';

export default function AnalystCoverage({ analysts: analystsProp }) {
  // Use prop data if available, otherwise fall back to default data
  const analysts = analystsProp && analystsProp.length > 0 ? analystsProp : [
    {
      id: 1,
      institution: 'Ambit Capital',
      analyst: 'Prashant Nair',
      email: 'prashant.nair@ambit.co',
      isActive: false
    },
    {
      id: 2,
      institution: 'Antique',
      analyst: 'Gaurav Tinani',
      email: 'gaurav.tinani@antiquelimited.com',
      isActive: false
    },
    {
      id: 3,
      institution: 'Avendus Spark',
      analyst: 'Harith Ahamed',
      email: 'harith@sparkcapital.in',
      isActive: false
    },
    {
      id: 4,
      institution: 'Axis Capital',
      analyst: 'Kunal Randeria',
      email: 'kunal.randeria@axiscap.in',
      isActive: false
    },
    {
      id: 5,
      institution: 'B&K Securities',
      analyst: 'Maulik Varia',
      email: 'maulik.varia@bksec.com',
      isActive: false
    },
    {
      id: 6,
      institution: 'BOB CAPS',
      analyst: 'Girish Pai',
      email: 'Girish.Pai@bobcaps.in',
      isActive: false
    },
    {
      id: 7,
      institution: 'Bank of America',
      analyst: 'Neha Manpuria',
      email: 'neha.manpuria@bofa.com',
      isActive: false
    },
    {
      id: 8,
      institution: 'BNP',
      analyst: 'Tausif Shaikh',
      email: 'tausif.shaikh@asia.bnpparibas.com',
      isActive: false
    },
    {
      id: 9,
      institution: 'Citi',
      analyst: 'Vivek Agrawal',
      email: 'vivek1.agrawal@citi.com',
      isActive: false
    },
    {
      id: 10,
      institution: 'CLSA',
      analyst: 'Kunal Lakhan',
      email: 'kunal.lakhan@clsa.com',
      isActive: false
    },
    {
      id: 11,
      institution: 'Dam Capital',
      analyst: 'Nitin Agarwal',
      email: 'nitin.a@damcapital.in',
      isActive: false
    },
    {
      id: 12,
      institution: 'Dolat Capital',
      analyst: 'Rashmi Sancheti',
      email: 'rashmis@dolatcapital.com',
      isActive: false
    },
    {
      id: 13,
      institution: 'Elara Capital',
      analyst: 'Bino Parampathimal',
      email: 'Bino.Pathiparampil@elaracapital.com',
      isActive: false
    },
    {
      id: 14,
      institution: 'Emkay',
      analyst: 'Shashank Krishnakumar',
      email: 'shashank.krishnakumar@emkayglobal.com',
      isActive: false
    },
    {
      id: 15,
      institution: 'Equirus',
      analyst: 'Bharat Celly',
      email: 'bharat.celly@equirus.com',
      isActive: false
    },
    {
      id: 16,
      institution: 'Goldman Sachs',
      analyst: 'Shyam Srinivasan',
      email: 'Shyam.Srinivasan@gs.com',
      isActive: false
    },
    {
      id: 17,
      institution: 'HDFC Securities',
      analyst: 'Mehul Sheth',
      email: 'mehul.sheth@hdfcsec.com',
      isActive: false
    },
    {
      id: 18,
      institution: 'HSBC Securities',
      analyst: 'Damayanti Kerai',
      email: 'damayantikerai@hsbc.co.in',
      isActive: false
    },
    {
      id: 19,
      institution: 'ICICI Securities',
      analyst: 'Abdulkader Puranwala',
      email: 'abdulkader.puranwala@icicisecurities.com',
      isActive: false
    },
    {
      id: 20,
      institution: 'IIFL',
      analyst: 'Rahul Jeewani',
      email: 'rahul.jeewani@iiflcap.com',
      isActive: false
    },
    {
      id: 21,
      institution: 'Investec',
      analyst: 'Anshuman Gupta',
      email: 'Anshuman.Gupta@investec.co.in',
      isActive: false
    },
    {
      id: 22,
      institution: 'Jefferies',
      analyst: 'Alok Dalal',
      email: 'adalal@jefferies.com',
      isActive: false
    },
    {
      id: 23,
      institution: 'JM Financial',
      analyst: 'Amey Chalke',
      email: 'Amey.Chalke@jmfl.com',
      isActive: false
    },
    {
      id: 24,
      institution: 'JP Morgan',
      analyst: 'Bansi Desai',
      email: 'bansi.desai@jpmorgan.com',
      isActive: false
    },
    {
      id: 25,
      institution: 'Kotak',
      analyst: 'Alankar Garude',
      email: 'alankar.garude@kotak.com',
      isActive: false
    },
    {
      id: 26,
      institution: 'Macquarie',
      analyst: 'Kunal Dhamesha',
      email: 'Kunal.Dhamesha@macquarie.com',
      isActive: false
    },
    {
      id: 27,
      institution: 'Morgan Stanley',
      analyst: 'Binay Singh',
      email: 'Binay.Singh@morganstanley.com',
      isActive: false
    },
    {
      id: 28,
      institution: 'Motilal Oswal',
      analyst: 'Tushar Manudhane',
      email: 'Tushar.Manudhane@motilaloswal.com',
      isActive: false
    },
    {
      id: 29,
      institution: 'Nirmal Bang',
      analyst: 'Umesh Laddha',
      email: 'umesh.laddha@nirmalbang.com',
      isActive: false
    },
    {
      id: 30,
      institution: 'Nomura',
      analyst: 'Saion Mukherjee',
      email: 'saion.mukherjee@nomura.com',
      isActive: false
    },
    {
      id: 31,
      institution: 'Nuvama',
      analyst: 'Shrikant Akolkar',
      email: 'Shrikant.akolkar@nuvama.com',
      isActive: false
    },
    {
      id: 32,
      institution: 'Phillip Capital',
      analyst: 'Surya Narayan Patra',
      email: 'spatra@phillipcapital.in',
      isActive: false
    },
    {
      id: 33,
      institution: 'Prabhudas Lilladher',
      analyst: 'Param Desai',
      email: 'ParamDesai@plindia.com',
      isActive: false
    },
    {
      id: 34,
      institution: 'Systematix',
      analyst: 'Vishal Manchanda',
      email: 'vishalmanchanda@systematixgroup.in',
      isActive: false
    },
    {
      id: 35,
      institution: 'UBS',
      analyst: 'Anubhav Agarwal',
      email: 'anubhav.a@ubs.com',
      isActive: false
    }
  ];

  return (
    <section className="analyst-coverage">
      {/* Background */}
      <div className="analyst-coverage__bg"></div>
      
      {/* Decorative Petals */}
      <div className="analyst-coverage__petal analyst-coverage__petal--left">
        <Image
          src="/assets/analyst-coverage/fill-petal-1.svg"
          alt=""
          width={266}
          height={273}
          className="analyst-coverage__petal-img"
          quality={100}
        />
      </div>
      <div className="analyst-coverage__petal analyst-coverage__petal--right">
        <Image
          src="/assets/analyst-coverage/fill-petal-2.svg"
          alt=""
          width={236}
          height={243}
          className="analyst-coverage__petal-img"
          quality={100}
        />
      </div>

      {/* Container */}
      <div className="analyst-coverage__container">
        {/* Navigation Links */}
        <NavigationLinks />

        {/* Analyst Cards Grid */}
        <div className="analyst-coverage__grid">
          {analysts.map((analyst) => (
            <div
              key={analyst.id}
              className={`analyst-card ${analyst.isActive ? 'analyst-card--active' : ''}`}
            >
              <div className="analyst-card__content">
                <h3 className="analyst-card__institution">{analyst.institution}</h3>
                <div className="analyst-card__info">
                  <p className="analyst-card__name">{analyst.analyst}</p>
                  <a
                    href={`mailto:${analyst.email}`}
                    className="analyst-card__email"
                  >
                    {analyst.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../scss/components/SubscriberUpdated.scss';

export default function SubscriberUpdated({ data }) {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Default data (will be replaced by Strapi)
  const subscriberData = data || {
    title: {
      line1: "Investor",
      line2: "Contacts"
    },
    shareholderServices: {
      title: "Shareholder Services",
      emails: [
        "investorservices@lupin.com",
        "rnt.helpdesk@in.mpms.mufg.com"
      ]
    },
    investorRelations: {
      title: "Investor Relations",
      email: "InvestorRelations@lupin.com"
    },
    subscription: {
      title: "Subscribe for\nInvestor updates",
      placeholder: "Email",
      checkboxText: "I agree and accept the",
      privacyPolicyText: "Privacy Policy",
      privacyPolicyLink: "/policies/privacy",
      andText: "and the",
      termsText: "Terms of use",
      termsLink: "/policies/terms",
      websiteText: "of this website",
      submitText: "Submit"
    },
    backgroundImage: {
      url: "/assets/faqs/bg.png",
      alt: "Office meeting room"
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !agreed) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/investors-faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          agreed
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setAgreed(false);
        
        // Reset success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        // Handle error
        console.error('Subscription error:', data.error);
        alert(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="subscriber-updated">
      <div className="subscriber-updated__container">
        {/* Left Panel - Contact Information */}
        <div className="subscriber-updated__left">
          <h2 className="subscriber-updated__title">
            <span className="subscriber-updated__title-line">{subscriberData.title.line1}</span>
            <span className="subscriber-updated__title-line">{subscriberData.title.line2}</span>
          </h2>

          {/* Shareholder Services */}
          <div className="subscriber-updated__section">
            <h3 className="subscriber-updated__section-title">
              {subscriberData.shareholderServices.title}
            </h3>
            <div className="subscriber-updated__emails">
              {subscriberData.shareholderServices.emails.map((email, index) => (
                <a
                  key={index}
                  href={`mailto:${email}`}
                  className="subscriber-updated__email"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>

          {/* Investor Relations */}
          <div className="subscriber-updated__section">
            <h3 className="subscriber-updated__section-title">
              {subscriberData.investorRelations.title}
            </h3>
            <a
              href={`mailto:${subscriberData.investorRelations.email}`}
              className="subscriber-updated__email"
            >
              {subscriberData.investorRelations.email}
            </a>
          </div>
        </div>

        {/* Right Panel - Subscription Form */}
        <div className="subscriber-updated__right">
          {/* Background Image */}
          {subscriberData.backgroundImage?.url && (
            <div className="subscriber-updated__bg-image">
              <Image
                src={subscriberData.backgroundImage.url}
                alt={subscriberData.backgroundImage.alt}
                fill
                className="subscriber-updated__bg-img"
                quality={100}
              />
            </div>
          )}

          {/* Green Circular Overlay with Form */}
          <div className="subscriber-updated__overlay">
            <form onSubmit={handleSubmit} className="subscriber-updated__form">
              <h3 className="subscriber-updated__form-title">
                {subscriberData.subscription.title.split('\n').map((line, index) => (
                  <span key={index} className="subscriber-updated__form-title-line">
                    {line}
                  </span>
                ))}
              </h3>

              <div className="subscriber-updated__input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={subscriberData.subscription.placeholder}
                  className="subscriber-updated__input"
                  required
                />
              </div>

              <div className="subscriber-updated__checkbox-wrapper">
                <input
                  type="checkbox"
                  id="subscriber-agreement"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="subscriber-updated__checkbox"
                  required
                />
                <label htmlFor="subscriber-agreement" className="subscriber-updated__checkbox-label">
                  {subscriberData.subscription.checkboxText}{' '}
                  <Link href={subscriberData.subscription.privacyPolicyLink} className="subscriber-updated__link">
                    {subscriberData.subscription.privacyPolicyText}
                  </Link>
                  {' '}{subscriberData.subscription.andText}{' '}
                  <Link href={subscriberData.subscription.termsLink} className="subscriber-updated__link">
                    {subscriberData.subscription.termsText}
                  </Link>
                  {' '}{subscriberData.subscription.websiteText}
                </label>
              </div>

              <button
                type="submit"
                className="subscriber-updated__submit"
                disabled={isSubmitting || !email || !agreed}
              >
                {isSubmitting ? 'Submitting...' : submitted ? 'Subscribed!' : subscriberData.subscription.submitText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


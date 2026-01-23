'use client';

import { useState } from 'react';
import Image from 'next/image';
import '../scss/components/ContactUsForm.scss';

export default function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    telNo: '',
    country: '',
    subject: '',
    query: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.query.trim()) {
      newErrors.query = 'Query is required';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Privacy Policy and Terms of use';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      alert('Thank you for your message. We will get back to you soon!');
      
      // Reset form
      setFormData({
        name: '',
        organization: '',
        email: '',
        telNo: '',
        country: '',
        subject: '',
        query: '',
        agreeToTerms: false
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-us-form" data-node-id="2947:6285">
      {/* Bottom SVG */}
      <div className="contact-us-form__bottom-svg">
        <Image
          src="/assets/images/contact/bottom.svg"
          alt="Decorative bottom"
          fill
          className="contact-us-form__bottom-svg-img"
          quality={100}
        />
      </div>
      <div className="contact-us-form__container">
        <div className="contact-us-form__header" data-node-id="2947:6286">
          <h2 className="contact-us-form__heading" data-node-id="2947:6288">
            Contact Us
          </h2>
          <p className="contact-us-form__required-text" data-node-id="2947:6287">
            Fields marked with an * are required
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-us-form__form" data-node-id="2947:6289">
          <div className="contact-us-form__row">
            <div className="contact-us-form__field-wrapper">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name *"
                className={`contact-us-form__input ${errors.name ? 'contact-us-form__input--error' : ''}`}
                data-node-id="2947:6290"
              />
              {errors.name && (
                <span className="contact-us-form__error">{errors.name}</span>
              )}
            </div>

            <div className="contact-us-form__field-wrapper">
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Organization *"
                className={`contact-us-form__input ${errors.organization ? 'contact-us-form__input--error' : ''}`}
                data-node-id="2947:6292"
              />
              {errors.organization && (
                <span className="contact-us-form__error">{errors.organization}</span>
              )}
            </div>
          </div>

          <div className="contact-us-form__row">
            <div className="contact-us-form__field-wrapper">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                className={`contact-us-form__input ${errors.email ? 'contact-us-form__input--error' : ''}`}
                data-node-id="2947:6294"
              />
              {errors.email && (
                <span className="contact-us-form__error">{errors.email}</span>
              )}
            </div>

            <div className="contact-us-form__field-wrapper">
              <input
                type="tel"
                name="telNo"
                value={formData.telNo}
                onChange={handleChange}
                placeholder="Tel No"
                className="contact-us-form__input"
                data-node-id="2947:6296"
              />
            </div>
          </div>

          <div className="contact-us-form__row">
            <div className="contact-us-form__field-wrapper">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="contact-us-form__input"
                data-node-id="2947:6298"
              />
            </div>

            <div className="contact-us-form__field-wrapper">
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`contact-us-form__select ${errors.subject ? 'contact-us-form__select--error' : ''}`}
                data-node-id="2947:6300"
              >
                <option value="">Select Subject Lines *</option>
                <option value="general">General Inquiry</option>
                <option value="product">Product Information</option>
                <option value="support">Customer Support</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && (
                <span className="contact-us-form__error">{errors.subject}</span>
              )}
            </div>
          </div>

          <div className="contact-us-form__row contact-us-form__row--full">
            <div className="contact-us-form__field-wrapper">
              <textarea
                name="query"
                value={formData.query}
                onChange={handleChange}
                placeholder="Post your query *"
                rows={8}
                className={`contact-us-form__textarea ${errors.query ? 'contact-us-form__textarea--error' : ''}`}
                data-node-id="2947:6302"
              />
              {errors.query && (
                <span className="contact-us-form__error">{errors.query}</span>
              )}
            </div>
          </div>

          <div className="contact-us-form__checkbox-wrapper" data-node-id="2947:6307">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="contact-us-form__checkbox"
              data-node-id="2947:6308"
            />
            <label htmlFor="agreeToTerms" className="contact-us-form__checkbox-label" data-node-id="2947:6309">
              I agree and accept the Privacy Policy and the Terms of use of this website *
            </label>
            {errors.agreeToTerms && (
              <span className="contact-us-form__error">{errors.agreeToTerms}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="contact-us-form__submit"
            data-node-id="2947:6304"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
}


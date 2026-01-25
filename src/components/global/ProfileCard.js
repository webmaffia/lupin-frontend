import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl, isProxiedImage } from '@/lib/image-proxy';
import '@/scss/components/global/ProfileCard.scss';

/**
 * ProfileCard - Reusable profile card component
 * 
 * @param {string} name - Person's name or card title (required)
 * @param {string} title - Person's title/position or card subtitle (optional)
 * @param {string} date - Optional date text (for news/media cards)
 * @param {string} link - Optional link URL (if provided, card becomes clickable)
 * @param {string} arrowIcon - Optional custom arrow icon path (defaults to built-in SVG)
 * @param {boolean} showArrow - Whether to show arrow icon (defaults to true if link provided)
 * @param {string} image - Optional image path (defaults to demo.png)
 * @param {string} imagePosition - Image position: 'bottom' (default) or 'bottom-right'
 * @param {string} className - Additional CSS classes (optional)
 * 
 * @example
 * // Basic usage
 * <ProfileCard 
 *   name="Vinita Gupta" 
 *   title="Chief Executive Officer" 
 * />
 * 
 * @example
 * // News card with date and bottom-right image
 * <ProfileCard 
 *   date="November 4, 2025"
 *   name="Lupin banks on complex generics"
 *   title="speciality products to sustain growth in FY26–27"
 *   image="/assets/media-kit-card/demo2.png"
 *   imagePosition="bottom-right"
 *   showArrow={false}
 * />
 */
export default function ProfileCard({ 
  name, 
  title, 
  date,
  link, 
  arrowIcon,
  showArrow = undefined, // undefined means auto-detect from link
  image = '/assets/media-kit-card/demo.png',
  imagePosition = 'bottom',
  className = '' 
}) {
  // Auto-detect showArrow if not explicitly set
  const shouldShowArrow = showArrow !== undefined ? showArrow : (link || arrowIcon);
  const cardContent = (
    <div className={`profile-card ${className} ${imagePosition === 'bottom-right' ? 'profile-card--image-right' : ''}`}>
      <div className="profile-card__content">
        <div className="profile-card__text">
          <h3 className="profile-card__name">{name}</h3>
          {title && <p className="profile-card__title">{title}</p>}
        </div>
      </div>
      
      {/* Image */}
      {image && (
        <div className={`profile-card__image profile-card__image--${imagePosition}`}>
          <Image
            src={getImageUrl(image) || image}
            alt={name || 'Card image'}
            width={519}
            height={400}
            className="profile-card__image-img"
            quality={100}
            unoptimized={isProxiedImage(image)}
          />
        </div>
      )}
      
      {/* Arrow Icon */}
      {shouldShowArrow && (
        <div className="profile-card__arrow">
          {arrowIcon ? (
            <Image
              src={arrowIcon}
              alt=""
              width={100}
              height={100}
              className="profile-card__arrow-icon"
            />
          ) : (
            <svg 
              width="100" 
              height="100" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="profile-card__arrow-icon"
            >
              <circle cx="49.7872" cy="49.7862" r="46.7065" fill="#126430" stroke="white" strokeWidth="6.16087"/>
              <path d="M41.5596 58.1065L58.002 41.6641" stroke="white" strokeWidth="2.85707" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M42.7451 41.2793H58.159V56.8789" stroke="white" strokeWidth="2.85707" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="profile-card__link">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}


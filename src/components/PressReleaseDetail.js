'use client';

import Image from 'next/image';
import Link from 'next/link';
import '@/scss/components/PressReleaseDetail.scss';

export default function PressReleaseDetail({ data }) {
  const pressRelease = data || {
    title: "",
    date: "",
    author: {
      name: "",
      image: ""
    },
    content: ""
  };

  return (
    <section className="press-release-detail">
      <div className="press-release-detail__container">
        <div className="press-release-detail__content">
          {/* Title */}
          <h1 className="press-release-detail__title">
            {pressRelease.title}
          </h1>

          {/* Header Section with Author */}
          <div className="press-release-detail__header">
            <div className="press-release-detail__author-image">
              {pressRelease.author?.image && (
                <Image
                  src={pressRelease.author.image}
                  alt={pressRelease.author.name || "Author"}
                  width={314}
                  height={314}
                  className="press-release-detail__author-img"
                  quality={100}
                />
              )}
            </div>
            <div className="press-release-detail__author-info">
              {pressRelease.date && (
                <p className="press-release-detail__date">{pressRelease.date}</p>
              )}
              {pressRelease.author?.name && (
                <p className="press-release-detail__author-name">{pressRelease.author.name}</p>
              )}
              <div className="press-release-detail__divider"></div>
            </div>
          </div>

          {/* Content from Strapi Rich Text Editor */}
          <div 
            className="press-release-detail__body"
            dangerouslySetInnerHTML={{ __html: pressRelease.content }}
          />
        </div>

        {/* Sidebar Navigation */}
        <aside className="press-release-detail__sidebar">
          <nav className="press-release-detail__nav">
            <Link 
              href="/media/press-releases" 
              className={`press-release-detail__nav-link ${pressRelease.activeCategory === 'press-releases' ? 'press-release-detail__nav-link--active' : ''}`}
            >
              Press Releases
            </Link>
            <Link 
              href="/media/perspectives" 
              className={`press-release-detail__nav-link ${pressRelease.activeCategory === 'perspectives' ? 'press-release-detail__nav-link--active' : ''}`}
            >
              perspectives
            </Link>
            <Link href="/media/media-coverage" className="press-release-detail__nav-link">
              Media Coverage
            </Link>
            <Link href="/media/media-kit" className="press-release-detail__nav-link">
              Media Kit
            </Link>
          </nav>
          <div className="press-release-detail__sidebar-decoration"></div>
        </aside>
      </div>
    </section>
  );
}


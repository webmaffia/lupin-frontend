'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ProductFinderSearchForm from './ProductFinderSearchForm';
import ProductFinderLetterFilter from './ProductFinderLetterFilter';
import ProductFinderResults from './ProductFinderResults';
import '../scss/components/ProductFinderBackgroundSection.scss';

export default function ProductFinderBackgroundSection({ data }) {
  // Shared state for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [geography, setGeography] = useState('');
  const [category, setCategory] = useState('');
  const [oncology, setOncology] = useState('');
  const resultsSectionRef = useRef(null);

  // Default data structure
  const sectionData = data || {
    searchForm: {
      heading: {
        line1: "Search for Lupin Generics",
        line2: "or products from other categories here:"
      },
      searchPlaceholder: "Search by Active Ingredient or Brand Name",
      geographyOptions: [],
      categoryOptions: [],
      oncologyOptions: []
    },
    letterFilter: {}
  };

  // Scroll to results section
  const scrollToResults = () => {
    if (resultsSectionRef.current) {
      resultsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handlers to update state
  const handleSearchSubmit = (searchData) => {
    const hasSearchTerm = searchData.searchTerm && searchData.searchTerm.trim() !== '';
    const hasGeography = searchData.geography && searchData.geography.trim() !== '';
    const hasCategory = searchData.category && searchData.category.trim() !== '';
    const hasOncology = searchData.oncology && searchData.oncology.trim() !== '';
    
    // Only proceed if at least one field has a value
    if (!hasSearchTerm && !hasGeography && !hasCategory && !hasOncology) {
      return; // Don't update state or scroll if form is empty
    }
    
    setSearchTerm(searchData.searchTerm || '');
    setGeography(searchData.geography || '');
    setCategory(searchData.category || '');
    setOncology(searchData.oncology || '');
    // Scroll to results after search (only if form has valid input)
    setTimeout(() => {
      scrollToResults();
    }, 100);
  };

  const handleLetterSelect = (letter) => {
    // Only scroll if a letter is actually selected (not when deselecting)
    if (letter && letter.trim() !== '') {
      setSelectedLetter(letter);
      // Scroll to results after letter selection
      setTimeout(() => {
        scrollToResults();
      }, 100);
    } else {
      setSelectedLetter('');
      // Don't scroll when deselecting a letter
    }
  };

  return (
    <section className="product-finder-background-section">
      <div className="product-finder-background-section__container">
        {/* Background Image */}
        <div className="product-finder-background-section__bg-image">
          <Image
            src="/assets/images/product-finder/bg.png"
            alt="Background"
            fill
            className="product-finder-background-section__bg-img"
            quality={100}
          />
        </div>

        {/* Content Wrapper */}
        <div className="product-finder-background-section__content-wrapper">
          {/* Search Form - Left Side */}
          <div className="product-finder-background-section__left">
            <ProductFinderSearchForm 
              data={sectionData.searchForm}
              onSearch={handleSearchSubmit}
              searchTerm={searchTerm}
              geography={geography}
              category={category}
              oncology={oncology}
            />
          </div>

          {/* Letter Filter - Right Side */}
          <div className="product-finder-background-section__right">
            <ProductFinderLetterFilter 
              data={sectionData.letterFilter}
              onLetterSelect={handleLetterSelect}
              selectedLetter={selectedLetter}
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div ref={resultsSectionRef} className="product-finder-background-section__results">
        <ProductFinderResults
          searchTerm={searchTerm}
          selectedLetter={selectedLetter}
          geography={geography}
          category={category}
          oncology={oncology}
        />
      </div>
    </section>
  );
}


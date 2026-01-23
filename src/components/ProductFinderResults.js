'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Pagination from '@/components/global/Pagination';
import '../scss/components/ProductFinderResults.scss';

export default function ProductFinderResults({ 
  searchTerm = '', 
  selectedLetter = '',
  geography = '',
  category = '',
  oncology = ''
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const resultsRef = useRef(null);

  // Dummy product data (30+ items for pagination)
  const allProducts = useMemo(() => [
    { id: 1, brandName: 'AB - FLO - N TAB (10 X 10)', activeIngredient: 'Acebrophylline + N-Acetylcysteine BP', therapyArea: 'Respiratory', form: 'Tablet' },
    { id: 2, brandName: 'AB - FLO SR TAB (10X10 T )', activeIngredient: 'Acebrophylline', therapyArea: 'Respiratory', form: 'Tablet' },
    { id: 3, brandName: 'AB-FLO 10X10 CAPS', activeIngredient: 'Acebrophylline', therapyArea: 'Respiratory', form: 'Capsule' },
    { id: 4, brandName: 'AB-NEXT', activeIngredient: 'Adapalene+ Benzoyl Peroxide', therapyArea: 'Dermatology', form: 'Gel' },
    { id: 5, brandName: 'ABDOWELL', activeIngredient: 'Saccharomyces boulardii + Lactobacillus rhamnosus GG', therapyArea: 'Gastrointestinal', form: 'Powder' },
    { id: 6, brandName: 'ABEL CT TAB', activeIngredient: 'Azilsartan + Chlorthalidon (CB)', therapyArea: 'Cardiology', form: 'Tablet' },
    { id: 7, brandName: 'ABEL TAB', activeIngredient: 'Azilsartan ( A-II REC Block )', therapyArea: 'Cardiology', form: 'Tablet' },
    { id: 8, brandName: 'ACEMIZ - S TABS (10X10T)', activeIngredient: 'Paracetamol IP + Serratiopeptidase + Aceclofenac IP', therapyArea: 'Pain', form: 'Tablet' },
    { id: 9, brandName: 'ACEMIZ 100 MG (20X10)', activeIngredient: 'Aceclofenac IP', therapyArea: 'Pain', form: 'Tablet' },
    { id: 10, brandName: 'ACEMIZ 200 SR', activeIngredient: 'Aceclofenac IP', therapyArea: 'Pain', form: 'Tablet' },
    { id: 11, brandName: 'ACETAZOLAMIDE TAB', activeIngredient: 'Acetazolamide', therapyArea: 'Neurology', form: 'Tablet' },
    { id: 12, brandName: 'ACICLOVIR TAB', activeIngredient: 'Acyclovir', therapyArea: 'Infectious Disease', form: 'Tablet' },
    { id: 13, brandName: 'ACIDOPHILUS CAPS', activeIngredient: 'Lactobacillus acidophilus', therapyArea: 'Gastrointestinal', form: 'Capsule' },
    { id: 14, brandName: 'ACILOC TAB', activeIngredient: 'Ranitidine', therapyArea: 'Gastrointestinal', form: 'Tablet' },
    { id: 15, brandName: 'ACIMOL TAB', activeIngredient: 'Paracetamol', therapyArea: 'Pain', form: 'Tablet' },
    { id: 16, brandName: 'ACITRETIN CAPS', activeIngredient: 'Acitretin', therapyArea: 'Dermatology', form: 'Capsule' },
    { id: 17, brandName: 'ACLARUBICIN INJ', activeIngredient: 'Aclarubicin', therapyArea: 'Oncology', form: 'Injection' },
    { id: 18, brandName: 'ACLOFENAC TAB', activeIngredient: 'Aceclofenac', therapyArea: 'Pain', form: 'Tablet' },
    { id: 19, brandName: 'ACNE GEL', activeIngredient: 'Benzoyl Peroxide', therapyArea: 'Dermatology', form: 'Gel' },
    { id: 20, brandName: 'ACRIVASTINE CAPS', activeIngredient: 'Acrivastine', therapyArea: 'Allergy', form: 'Capsule' },
    { id: 21, brandName: 'ACTIFED TAB', activeIngredient: 'Pseudoephedrine + Triprolidine', therapyArea: 'Respiratory', form: 'Tablet' },
    { id: 22, brandName: 'ACTINOMYCIN INJ', activeIngredient: 'Dactinomycin', therapyArea: 'Oncology', form: 'Injection' },
    { id: 23, brandName: 'ACYCLOVIR CREAM', activeIngredient: 'Acyclovir', therapyArea: 'Dermatology', form: 'Cream' },
    { id: 24, brandName: 'ADALAT TAB', activeIngredient: 'Nifedipine', therapyArea: 'Cardiology', form: 'Tablet' },
    { id: 25, brandName: 'ADAPALENE GEL', activeIngredient: 'Adapalene', therapyArea: 'Dermatology', form: 'Gel' },
    { id: 26, brandName: 'ADENOSINE INJ', activeIngredient: 'Adenosine', therapyArea: 'Cardiology', form: 'Injection' },
    { id: 27, brandName: 'ADIPEX TAB', activeIngredient: 'Phentermine', therapyArea: 'Weight Management', form: 'Tablet' },
    { id: 28, brandName: 'ADRENALIN INJ', activeIngredient: 'Epinephrine', therapyArea: 'Emergency', form: 'Injection' },
    { id: 29, brandName: 'AEROLIN INHALER', activeIngredient: 'Salbutamol', therapyArea: 'Respiratory', form: 'Inhaler' },
    { id: 30, brandName: 'AFINITOR TAB', activeIngredient: 'Everolimus', therapyArea: 'Oncology', form: 'Tablet' },
    { id: 31, brandName: 'AGOMELATINE TAB', activeIngredient: 'Agomelatine', therapyArea: 'Psychiatry', form: 'Tablet' },
    { id: 32, brandName: 'ALBUTEROL INHALER', activeIngredient: 'Albuterol', therapyArea: 'Respiratory', form: 'Inhaler' },
    { id: 33, brandName: 'ALENDRONATE TAB', activeIngredient: 'Alendronate', therapyArea: 'Bone Health', form: 'Tablet' },
    { id: 34, brandName: 'ALFACALCIDOL CAPS', activeIngredient: 'Alfacalcidol', therapyArea: 'Bone Health', form: 'Capsule' },
    { id: 35, brandName: 'ALISKIREN TAB', activeIngredient: 'Aliskiren', therapyArea: 'Cardiology', form: 'Tablet' },
  ], []);

  // Filter products based on search term and selected letter
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by selected letter (first letter of brand name)
    if (selectedLetter) {
      filtered = filtered.filter(product => 
        product.brandName.toUpperCase().startsWith(selectedLetter)
      );
    }

    // Filter by search term (brand name or active ingredient)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.brandName.toLowerCase().includes(searchLower) ||
        product.activeIngredient.toLowerCase().includes(searchLower)
      );
    }

    // Filter by geography, category, oncology (if implemented)
    // Add additional filters here as needed

    return filtered;
  }, [allProducts, searchTerm, selectedLetter, geography, category, oncology]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLetter, geography, category, oncology]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of results section
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={resultsRef} className="product-finder-results" data-node-id="2953:3897">
      {/* Mobile Heading */}
      <h2 className="product-finder-results__mobile-heading">Search Results</h2>
      
      {/* Table Header */}
      <div className="product-finder-results__header">
        <div className="product-finder-results__header-cell product-finder-results__header-cell--green" data-node-id="2953:3899">
          <span className="product-finder-results__header-text" data-node-id="2953:3900">Brand Name</span>
        </div>
        <div className="product-finder-results__header-cell product-finder-results__header-cell--light-green" data-node-id="2953:3905">
          <span className="product-finder-results__header-text" data-node-id="2953:3906">Active Ingredient</span>
        </div>
        <div className="product-finder-results__header-cell product-finder-results__header-cell--green" data-node-id="2953:3902">
          <span className="product-finder-results__header-text" data-node-id="2953:3903">Therapy Area</span>
        </div>
        <div className="product-finder-results__header-cell product-finder-results__header-cell--light-green" data-node-id="2953:3908">
          <span className="product-finder-results__header-text" data-node-id="2953:3909">Form</span>
        </div>
      </div>

      {/* Table Body */}
      <div className="product-finder-results__body">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <div key={product.id} className="product-finder-results__row" data-node-id={`2953:${3910 + index * 9}`}>
              {/* Desktop Table Cells */}
              <div className="product-finder-results__cell product-finder-results__cell--brand" data-node-id={`2953:${3912 + index * 9}`}>
                {product.brandName}
              </div>
              <div className="product-finder-results__cell product-finder-results__cell--ingredient" data-node-id={`2953:${3913 + index * 9}`}>
                {product.activeIngredient}
              </div>
              <div className="product-finder-results__cell product-finder-results__cell--therapy" data-node-id={`2953:${3914 + index * 9}`}>
                {product.therapyArea}
              </div>
              <div className="product-finder-results__cell product-finder-results__cell--form" data-node-id={`2953:${3915 + index * 9}`}>
                {product.form}
              </div>
              
              {/* Mobile Card Format */}
              <div className="product-finder-results__mobile-card">
                <div className="product-finder-results__mobile-item">
                  <span className="product-finder-results__mobile-label">Brand Name :</span>
                  <span className="product-finder-results__mobile-value">{product.brandName}</span>
                </div>
                <div className="product-finder-results__mobile-item">
                  <span className="product-finder-results__mobile-label">Active Ingredient :</span>
                  <span className="product-finder-results__mobile-value">{product.activeIngredient}</span>
                </div>
                <div className="product-finder-results__mobile-item">
                  <span className="product-finder-results__mobile-label">Therapy Area :</span>
                  <span className="product-finder-results__mobile-value">{product.therapyArea}</span>
                </div>
                <div className="product-finder-results__mobile-item">
                  <span className="product-finder-results__mobile-label">Form :</span>
                  <span className="product-finder-results__mobile-value">{product.form}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="product-finder-results__empty">
            <p>No products found. Please try different search criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="product-finder-results__pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}


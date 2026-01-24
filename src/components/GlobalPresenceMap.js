'use client';

import { useEffect, useRef, useState } from 'react';

export default function GlobalPresenceMap() {
  const svgRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    // Load SVG content
    fetch('/assets/global-presence/Map ok bro.svg')
      .then(res => res.text())
      .then(svg => {
        setSvgContent(svg);
      })
      .catch(err => console.error('Error loading SVG:', err));
  }, []);

  useEffect(() => {
    if (!svgRef.current || !svgContent) return;

    const svg = svgRef.current;
    
    // Find all groups that contain image elements (countries)
    const findCountryGroups = () => {
      const groups = Array.from(svg.querySelectorAll('g'));
      const countryGroups = [];
      
      groups.forEach((group) => {
        // Check if group contains image elements
        const hasImage = group.querySelector('image');
        
        // Check if group has fillable children with paths
        const children = Array.from(group.children);
        const hasFillableElements = children.some(child => {
          const fill = child.getAttribute('fill');
          const tagName = child.tagName.toLowerCase();
          return (fill && fill !== 'none' && fill !== 'transparent') || 
                 ['path', 'polygon', 'circle', 'rect', 'ellipse', 'image'].includes(tagName);
        });
        
        if (hasImage || (hasFillableElements && children.length > 0)) {
          countryGroups.push(group);
        }
      });
      
      // If no groups with images found, look for groups with multiple paths (likely countries)
      if (countryGroups.length === 0) {
        groups.forEach((group) => {
          const paths = group.querySelectorAll('path');
          if (paths.length > 0) {
            countryGroups.push(group);
          }
        });
      }
      
      return countryGroups;
    };

    const countryGroups = findCountryGroups();
    
    if (countryGroups.length === 0) {
      console.warn('No country groups found in SVG');
      return;
    }

    // Reset all groups to original state
    const resetAllGroups = () => {
      countryGroups.forEach((group) => {
        group.style.opacity = '0.4';
        group.style.transition = 'opacity 0.4s ease-in-out';
        
        // Find fillable elements within the group
        const fillableElements = group.querySelectorAll('[fill], path, polygon, circle, rect, ellipse');
        fillableElements.forEach((el) => {
          const originalFill = el.getAttribute('data-original-fill') || el.getAttribute('fill');
          if (originalFill && originalFill !== 'none' && originalFill !== 'transparent') {
            el.setAttribute('data-original-fill', originalFill);
            el.setAttribute('fill', originalFill);
          }
        });
        
        // Remove green overlays
        const overlays = group.querySelectorAll('[data-animated-overlay="true"]');
        overlays.forEach(overlay => overlay.remove());
        
        // Restore images
        const images = group.querySelectorAll('image');
        images.forEach((img) => {
          img.style.opacity = '1';
        });
      });
    };

    // Fill a specific country group with green
    const fillCountry = (group, index) => {
      group.style.opacity = '1';
      
      // Find all fillable elements within the group
      const fillableElements = group.querySelectorAll('[fill], path, polygon, circle, rect, ellipse');
      fillableElements.forEach((el) => {
        const currentFill = el.getAttribute('fill');
        if (currentFill && currentFill !== 'none' && currentFill !== 'transparent' && !currentFill.includes('url')) {
          // Store original fill if not already stored
          if (!el.getAttribute('data-original-fill')) {
            el.setAttribute('data-original-fill', currentFill);
          }
          // Fill with green
          el.setAttribute('fill', '#4ab767'); // Green color
          el.style.transition = 'fill 0.5s ease-in-out';
        }
      });
      
      // Handle image elements - create green overlay
      const images = group.querySelectorAll('image');
      images.forEach((img) => {
        img.style.opacity = '0.3';
        // Create a green overlay using the image's bounding box
        try {
          const bbox = group.getBBox();
          const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          overlay.setAttribute('x', bbox.x);
          overlay.setAttribute('y', bbox.y);
          overlay.setAttribute('width', bbox.width);
          overlay.setAttribute('height', bbox.height);
          overlay.setAttribute('fill', '#4ab767');
          overlay.setAttribute('data-animated-overlay', 'true');
          overlay.style.transition = 'opacity 0.5s ease-in-out';
          group.appendChild(overlay);
        } catch (e) {
          // If getBBox fails, skip overlay
        }
      });
    };

    // Reset a country group to original state
    const resetCountry = (group) => {
      group.style.opacity = '0.4';
      
      const fillableElements = group.querySelectorAll('[fill], path, polygon, circle, rect, ellipse');
      fillableElements.forEach((el) => {
        const originalFill = el.getAttribute('data-original-fill');
        if (originalFill) {
          el.setAttribute('fill', originalFill);
        }
      });
      
      // Remove green overlays
      const overlays = group.querySelectorAll('[data-animated-overlay="true"]');
      overlays.forEach(overlay => overlay.remove());
      
      // Restore images
      const images = group.querySelectorAll('image');
      images.forEach((img) => {
        img.style.opacity = '1';
      });
    };

    // Animation function
    const animateCountries = () => {
      // Reset all countries
      resetAllGroups();
      
      // Fill countries one by one
      countryGroups.forEach((group, index) => {
        setTimeout(() => {
          fillCountry(group, index);
          
          // Reset after a delay to create the loop effect
          setTimeout(() => {
            resetCountry(group);
          }, 1000); // Keep green for 1000ms
        }, index * 300); // 300ms delay between each country
      });
    };

    // Start the animation loop
    const startAnimation = () => {
      // Initial delay
      setTimeout(() => {
        animateCountries();
        
        // Repeat animation after all countries have been filled
        const totalDuration = countryGroups.length * 300 + 1000;
        animationIntervalRef.current = setInterval(() => {
          animateCountries();
        }, totalDuration);
      }, 500);
    };

    startAnimation();

    // Cleanup
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      resetAllGroups();
    };
  }, [svgContent]);

  if (!svgContent) {
    return (
      <div style={{ width: '100%', position: 'relative', minHeight: '400px' }}>
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading map...</div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div 
        ref={svgRef}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}

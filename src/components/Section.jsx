// src/components/Section.jsx

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/css/section.css'; // Import corresponding CSS

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Section = ({
    id,
    title = '',
    content = '',
    media = null,
    mediaType = 'image',
    backgroundColor = '#000', // Default to black as per your requirement
    animationDirection = 'up',
}) => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const mediaRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const contentElement = contentRef.current;
        const mediaElement = mediaRef.current;

        // Determine animation properties based on direction
        let fromVarsContent = { opacity: 0 };
        let fromVarsMedia = { opacity: 0 };

        switch (animationDirection) {
            case 'left':
                fromVarsContent.x = -50;
                fromVarsMedia.x = 50;
                break;
            case 'right':
                fromVarsContent.x = 50;
                fromVarsMedia.x = -50;
                break;
            case 'up':
                fromVarsContent.y = 50;
                fromVarsMedia.y = -50;
                break;
            case 'down':
                fromVarsContent.y = -50;
                fromVarsMedia.y = 50;
                break;
            default:
                fromVarsContent.y = 50;
                fromVarsMedia.y = -50;
        }

        // Animate Content
        gsap.fromTo(
            contentElement,
            fromVarsContent,
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Animate Media (if exists)
        if (mediaElement) {
            gsap.fromTo(
                mediaElement,
                fromVarsMedia,
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top center',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }

        // Cleanup on unmount
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [animationDirection]);

    return (
        <section
            id={id}
            ref={sectionRef}
            className="section"
            style={{ backgroundColor: backgroundColor }}
        >
            {media && mediaType === 'video' ? (
                <video
                    src={media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="section-media"
                    preload="none" // Lazy load the video
                ></video>
            ) : media && mediaType === 'image' ? (
                <img
                    src={media}
                    alt={`${title} Media`}
                    className="section-media"
                    loading="lazy" // Native lazy loading for images
                />
            ) : null}
            <div className="section-overlay">
                <div className="section-content" ref={contentRef}>
                    {title && <h1>{title}</h1>}
                    {content && <p>{content}</p>}
                </div>
            </div>
        </section>
    );
};

Section.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    media: PropTypes.string, // URL of the media (image or video)
    mediaType: PropTypes.oneOf(['image', 'video']),
    backgroundColor: PropTypes.string,
    animationDirection: PropTypes.oneOf(['left', 'right', 'up', 'down']),
};

export default Section;

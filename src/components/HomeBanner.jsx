import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
    { img: "src/images/nintendo64_banner.jpg", title: "Nintendo 64", search: "Nintendo 64" },
    { img: "src/images/ps1_banner.jpg", title: "PlayStation", search: "PlayStation" },
    { img: "src/images/gameboy_banner.jpg", title: "Gameboy", search: "Gameboy" },
];

export default function HomeBanner() {

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearTimeout(timer);
    }, [current]);

    return (
        <section className='home-banner'>
            <div className='banner-track' style={{ transform: `translateX(-${current * 100}%)` }}>
                {slides.map(slide => (
                    <Link
                        key={slide.title}
                        to={`/shop?search=${encodeURIComponent(slide.search)}`}
                        className='banner-slide'
                    >
                        <img src={slide.img} alt={slide.title} />
                        <span className='banner-title'>{slide.title}</span>
                    </Link>
                ))}
            </div>
            <div className='banner-dots'>
                {slides.map((slide, i) => (
                    <button
                        key={slide.title}
                        className={`banner-dot ${i === current ? "active" : ""}`}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to ${slide.title}`}
                    />
                ))}
            </div>
        </section>
    );
}

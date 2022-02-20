import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ anime, num, subtitle }) => {
    const titleJsx = (anime) => {
        if (anime.title_english) {
            return <li className="card--content-title">{anime.title_english}</li>
        } else if (anime.anime_title) {
            return <li className="card--content-title">{anime.anime_title}</li>
        } else if (!anime.anime_title || !anime.title_english) {
            return <li className="card--content-title">{anime.title}</li>
        }
    }
    return (
    <div className='card'>
        <div className='card--subtitle'>
        {subtitle}
        </div>
            <div className="card--content">
            {anime.image ? 
            <img className="card--content-image" src={anime.image} alt={anime.title_english}></img> 
            : <img className="card--content-image" src={anime.images.jpg.large_image_url} alt={anime.title_english}></img>}
            <ul className="card--content-ul" key={num}>
            {titleJsx(anime)}
            <li className="card--content-rating">Rating: {anime.score}</li>
            </ul>
        </div>
    </div>
)};

Card.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

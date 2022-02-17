import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ anime, num, subtitle }) => (
    <div className='card'>
        <div className='card--title'>
        ANIMEYA
        </div>
        <div className='card--subtitle'>
        {subtitle}
        </div>
            <div className="card--content">
            <img className="card--content-image" src={anime.images.jpg.large_image_url} alt={anime.title_english}></img>
            <ul className="card--content-ul" key={num}>
            {
            anime.title_english ? 
            <li className="card--content-title">{anime.title_english}</li>
            : <li className="card--content-title">{anime.title}</li>
            }
            <li className="card--content-rating">Rating: {anime.score}</li>
            {/* <li className="card--content-synopsis">{anime.synopsis}</li>
            {anime.airing ? 
            <li className="card--content-airing">True</li> 
            : <li className="card--content-airing">False</li>}
            <li className="card--content-episodes">{anime.episodes}</li> */}
            </ul>
        </div>
    </div>
);

Card.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

import React from 'react'
import './BannerHero.css'

import Home from '/src/assets/Videos/YVI.mp4'
import About from '/src/assets/Videos/About.mp4'
import SkillDevelopment from '/src/assets/Videos/Skill_Development.mp4'

import HomePoster from '/src/assets/Videos/YVI.png'
import AboutPoster from '/src/assets/Videos/About.png'

const videoAssets = {
  'YVI.mp4': { video: Home, poster: HomePoster },
  'About.mp4': { video: About, poster: AboutPoster },
  'Skill_Development.mp4': { video: SkillDevelopment, poster: AboutPoster }
}

const BannerHero = ({ headingText, highlightText, content, videoName }) => {
  const asset = videoAssets[videoName]

  return (
    <div
      className="banner-hero"
      style={{
        backgroundImage: `url(${asset?.poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <video
        src={asset?.video}
        autoPlay
        loop
        muted
        poster={asset?.poster}
      />

      <div className="video-overlay" />

      <div className="contentt-hero">
        <h1>
          <span className="hero-heading">{headingText}</span>
          <span className="hero-highlight">{highlightText}</span>
        </h1>

        <p>{content}</p>
      </div>
    </div>
  )
}

export default BannerHero
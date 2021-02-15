import React, {Component} from 'react';
import './AboutPage.css';

class AboutPage extends Component {
    componentDidMount() {
        document.title = 'EngineRoom | About';
    }

    render() {
        return (
            <div className='AboutPage-container'>
                <div className='AboutPage-title AboutPage-blob'>
                    <h2>About</h2>
                    <p>Learn the story of EngineRoom</p>
                </div>

                <div className='AboutPage-about AboutPage-blob'>
                    <p>
                        EngineRoom is a social media application for car enthusiasts.  
                        It allows users to make posts, make comments, upload pictures 
                        of their cars, set a profile picture, and find friends who share 
                        car interests.  It’s a single page, fullstack application 
                        that uses React and Redux on the frontend and Node.js, Express, and 
                        MongoDB on the backend. The frontend is served by GitHub Pages and 
                        the backend runs on Heroku with a managed database provided by MongoDB 
                        Atlas. It was designed using Figma.
                    </p>
                    <p className='AboutPage-handcrafted'>Handcrafted with <span className='AboutPage-heart'>❤</span> in Glastonbury, Connecticut.</p>
                </div>
            </div>
        );
    }
}

export default AboutPage;
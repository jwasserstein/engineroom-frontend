import React, {Component} from 'react';
import './AboutPage.css';

class AboutPage extends Component {
    componentDidMount() {
        document.title = 'EngineRoom | About';
    }

    render() {
        return (
            <div class='AboutPage-container'>
                <div class='AboutPage-title AboutPage-blob'>
                    <h2>About</h2>
                    <p>Learn the story of EngineRoom</p>
                </div>

                <div class='AboutPage-about AboutPage-blob'>
                    <p>
                        EngineRoom is a demonstration social media application made for 
                        the purposes of learning React and Redux. It allows users to add 
                        their cars, find friends, make posts, and make comments.  It was 
                        designed in Figma and uses the following technologies:
                    </p>
                    <ul>
                        <li><strong>Frontend</strong>: React and Redux</li>
                        <li><strong>Backend</strong>: Node.js and Express</li>
                        <li><strong>Database</strong>: MongoDB</li>
                    </ul>
                    <p class='AboutPage-handcrafted'>Hand-crafted with <span class='AboutPage-heart'>❤</span> in Glastonbury, Connecticut.</p>
                </div>
            </div>
        );
    }
}

export default AboutPage;
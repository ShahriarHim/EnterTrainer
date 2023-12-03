import React from 'react'
import { Link } from 'react-router-dom';
const Resource = () => {

    return (
        <div>
            <h3 style={{ display: 'block', textAlign: 'center', color: 'red'}}>
                Resources
            </h3>
            <Link to="/taken-courses" style={{ display: 'block', textAlign: 'center', color: '#06BBCC'}} >
                Back to Course
              </Link>
        </div>
    );
};
export default Resource;

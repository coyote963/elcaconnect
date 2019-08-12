import React from 'react';
import {AuthContext} from './withAuth'
import {Link} from 'react-router-dom'
import connect from '../assets/connect.png'
import hymn from '../assets/hymn.jpg'
import prayer from '../assets/prayer.jpg'
import profile from '../assets/profile.jpg'
import verse from '../assets/verse.jpg'
class Profile extends React.Component {
  render() {
    return (
      <div>
          <AuthContext.Consumer>
            {(value) => (
              <div className="container">
                <h3>Welcome {value.userAuth.first_name}</h3>
                <hr></hr>
                <div className="row">
                  <div className="col-md-4">
                    <Link to="/verse">
                      <div className="thumbnail">
                        <img className="img-thumbnail" src={verse} alt="verse"/>
                        <div className="caption">
                          <p>Verse Request</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <Link to="/hymn">
                      <div className="thumbnail">
                        <img className="img-thumbnail" src={hymn} alt="hymn"/>
                        <div className="caption">
                          <p>Request A Hymn</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <Link to="/history">
                      <div className="thumbnail">
                        <img className="img-thumbnail" src={profile} alt="profile"/>
                        <div className="caption">
                          <p>View User History</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <Link to="/prayer">
                      <div className="thumbnail">
                        <img className="img-thumbnail" src={prayer} alt="prayer"/>
                        <div className="caption">
                          <p>Request a Prayer</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <div className="thumbnail">
                      <img className="img-thumbnail" src={connect} alt="connect"/>
                      <div className="caption">
                        <p>Connect</p>
                      </div>
                    </div>
                  </div><div className="col-md-4">
                    <div className="thumbnail">
                      <img className="img-thumbnail" src="https://picsum.photos/id/1018/640/480" alt="img6"/>
                      <div className="caption">
                        <p>Lorem Ipsum</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AuthContext.Consumer>
      </div>  
    );
  }
};
Profile.contextType = AuthContext;
export default Profile;
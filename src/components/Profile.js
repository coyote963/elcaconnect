import React from 'react';
import {AuthContext} from './withAuth'
import {Link} from 'react-router-dom'
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
                    <Link to="/prayer">
                      <div className="thumbnail">
                        <img className="img-thumbnail" src="https://picsum.photos/id/1010/640/480" alt="img1"/>
                        <div className="caption">
                          <p>Prayer Request</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <div className="thumbnail">
                      <img className="img-thumbnail" src="https://picsum.photos/id/101/640/480" alt="img2"/>
                      <div className="caption">
                        <p>Lorem Ipsum</p>
                      </div>
                    </div>
                  </div><div className="col-md-4">
                    <div className="thumbnail">
                      <img className="img-thumbnail" src="https://picsum.photos/id/1019/640/480" alt="img3"/>
                      <div className="caption">
                        <p>Lorem Ipsum</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="thumbnail">
                      <img className="img-thumbnail" src="https://picsum.photos/id/1019/640/480" alt="img4"/>
                      <div className="caption">
                        <p>Lorem Ipsum</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="thumbnail">
                      <img className="img-thumbnail" src="https://picsum.photos/id/1024/640/480" alt="img5"/>
                      <div className="caption">
                        <p>Lorem Ipsum</p>
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
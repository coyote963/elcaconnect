import React from 'react';
import {AuthContext} from './withAuth'
import ReactJson from 'react-json-view'
class Protected extends React.Component {
  render() {
    console.log("rendering protected")
    return (
      <div>
          
          <AuthContext.Consumer>
            {(value) => (
              <div>
                <p>im inside the consumer {console.log(value.userAuth)}</p>
                {/* <p>im inside the consumer {console.log(value.userAuth.first_name)}</p> */}
              </div>
              
            )}
          </AuthContext.Consumer>
      </div>  
    );
  }
};
Protected.contextType = AuthContext;
export default Protected;
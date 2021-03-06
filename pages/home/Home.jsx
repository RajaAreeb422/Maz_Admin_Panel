import React from 'react';
import { connect } from 'react-redux';

import MainLayout from '../../layout/MainLayout';
import HomeContainer from '../../components/container/HomeContainer';
import HeadDefault from '../../layout/head/HeadDefault';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isScrolled: false };
  }

  static async getInitialProps(props) {
    const { store, isServer, req, res } = props.ctx;
  }

  render() {
    const { dispatch, storeLayout } = this.props;

    return (
      <>
        <HeadDefault
          title="Login "
          description="Admin Login"
        />
     
       
        <HomeContainer dispatch={dispatch} storeLayout={storeLayout}/>
        
        {/* <SingleLayout>
        <LoginContainer  />
        </SingleLayout> */}
        
      </>
    );
  }
}

export default connect(state => state)(Home);

import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, PageHeader } from 'antd';
import Posts from './Posts';
import CategoriesMenu from './CategoriesMenu';
import PostPage from './PostPage';
import { retrieveCategories } from '../actions/categories';

const { Header, Content } = Layout;

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Layout>
          <Header style={{ backgroundColor: '#40a9ff' }}>
            <PageHeader
              title="Readable"
              extra={<CategoriesMenu categories={this.props.categories} />}
            />
          </Header>
          <Content>
            <Route exact path="/" component={Posts} />
            <Route exact path="/:category" component={Posts} />
            <Route path="/:category/:id" component={PostPage} />
          </Content>
        </Layout>
      </Router>
    );
  }
}

App.propTypes = {
  categories: PropTypes.object.isRequired
};

const mapStateToProps = ({ categories }) => ({ categories });

const mapDispatchToProps = dispatch => {
  dispatch(retrieveCategories());

  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

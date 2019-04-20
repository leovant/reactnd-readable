import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, PageHeader } from 'antd';
import Posts from './Posts';
import CategoriesMenu from './CategoriesMenu';
import PostPage from './PostPage';
import { retrieveCategories } from '../actions/categories';

const { Header, Content } = Layout;

class App extends Component {
  componentDidMount() {
    this.props.dispatch(retrieveCategories());
  }

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

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps)(App);

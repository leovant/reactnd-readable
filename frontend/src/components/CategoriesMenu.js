import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Dropdown, Icon, Menu } from 'antd';

class CategoriesMenu extends PureComponent {
  render() {
    const { categories } = this.props;
    const menu = (
      <Menu>
        <Menu.Item key="all">
          <Link to="/">All</Link>
        </Menu.Item>
        <Menu.Divider />
        {Object.keys(categories).map(key => (
          <Menu.Item key={categories[key].name}>
            <Link to={`/${categories[key].path}`}>{categories[key].name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          Categories <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
}

CategoriesMenu.propTypes = {
  categories: PropTypes.object.isRequired
};

export default CategoriesMenu;

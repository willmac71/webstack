import React from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import styles from './BasicLayout.module.css';

const { SubMenu } = Menu;
const { Header, Sider, Content, Footer } = Layout;

class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className={styles.layout}>
        <Sider 
          className={styles.sider}
          width="256" 
          trigger={null} 
          collapsible 
          collapsed={this.state.collapsed}
        >
          <div className={styles.logo}>
            { this.state.collapsed ? '导航' : '前端导航' }
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {
              this.props.data.map(e => {
                if (e.children) {
                  return (
                    <SubMenu 
                      key={e.title} 
                      title={
                        <span>
                          <AppstoreOutlined />
                          <span>{e.title}</span>
                        </span>
                      }
                    >
                      {
                        e.children.map(e1 => {
                          return (
                            <Menu.Item key={e1.title}>
                              <a href={`#${e1.title}`} style={{color:'rgba(255, 255, 255, 0.65)'}}>
                                <UserOutlined />
                                <span>{e1.title}</span>
                              </a>
                            </Menu.Item>
                          );
                        })
                      }
                    </SubMenu>
                  );
                }
                return (
                  <Menu.Item key={e.title}>
                    <a href={`#${e.title}`} style={{color:'rgba(255, 255, 255, 0.65)'}}>
                      <UserOutlined />
                      <span>{e.title}</span>
                    </a>
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header} style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: this.toggle,
            })}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2019 Created by&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://www.maxmeng.top/">MaxMeng</a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;

import React from 'react'
import { Layout } from 'antd';
import '../styles/Home.css'
import Header from '../components/Header';
import Content from '../components/Content';
import FooterComponent from '../components/FooterComponent';

const { Footer, Sider } = Layout;

export default function Home() {
    return (
        <>
            <Layout className="layout">
                <Header />
                <Content />
                <Footer>
                    <FooterComponent/>
                </Footer>
            </Layout>
        </>
    )
}

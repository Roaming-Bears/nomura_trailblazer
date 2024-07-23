'use client'

import react from "react"
import { Header as AntdHeader } from "antd/es/layout/layout";
import { Button } from "antd";
import { useRouter } from 'next/navigation'
import Menu from "antd/es/menu";
import Link from "antd/es/typography/Link";

const Header: React.FC<{}> = () => {
  const router = useRouter()

    const items = [
        {key: 0, label: (<Link style={{color: "white"}} onClick={() => router.push("/")}>Home</Link>)}, 
        {key: 1, label: (<Link style={{color: "white"}} onClick={() => router.push("/stock")}>Stock</Link>)}
    ]

    return (
    <AntdHeader style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
        />
    </AntdHeader>
    );
  };
  
export default Header;
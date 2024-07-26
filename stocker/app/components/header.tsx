'use client'

import { Header as AntdHeader } from "antd/es/layout/layout";
import { useRouter } from 'next/navigation'
import Menu from "antd/es/menu";
import Link from "antd/es/typography/Link";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Header: React.FC<{}> = () => {
  const router = useRouter()

    const items = [
        {key: 0, label: (<Link style={{color: "white"}} onClick={() => router.push("/portfolio")}>Portfolio</Link>)}, 
        {key: 1, label: (<Link style={{color: "white"}} onClick={() => router.push("/chat")}>Stocker</Link>)}
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
        <Avatar icon={<UserOutlined />} />
    </AntdHeader>
    );
  };
  
export default Header;
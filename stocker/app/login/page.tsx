'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./style.css"
import { useUser } from '../context/UserContext';

const { Title } = Typography;

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const user = useUser();

  const onFinish = async (values: { username: string; password: string }) => {
    // Example: Perform client-side validation
    if (!values.username || !values.password) {
      setError('Please fill in all fields');
      return;
    }

    user.setUserDetails(values.username)
    router.push("/portfolio")
  };

  return (
    <div className="container">
      <Space direction="vertical" >
        <Title level={2}>Login</Title>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          {error && <Typography.Text type="danger">{error}</Typography.Text>}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default LoginPage;

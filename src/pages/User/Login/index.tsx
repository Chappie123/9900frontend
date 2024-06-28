import React, { useState } from 'react';
import { Form, Input, Button, message, Checkbox } from 'antd';
import { login2 } from '@/services/ant-design-pro/api'; 
import { history, useModel } from '@umijs/max';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      display: 'flex',
      height: '100vh',
      overflow: 'auto',
    },
    leftSide: {
      flex: 0.7,
      backgroundColor: '#FFDC00', // Yellow background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Shadow effect
    },
    rightSide: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: '200px',
      height: '200px',
      background: 'url(/path/to/your/logo.png) no-repeat center/contain',
    },
    formContainer: {
      width: '100%',
      maxWidth: '400px', // Adjust the max width as needed
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '24px',
      textAlign: 'center',
    },
    spacer: {
      height: '24px', // Adjust this value to set the desired spacing
    },
  };
});

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');; //useModel to update global state
  const { styles } = useStyles();
  const fetchUserInfo1 = async () => {
    try {
      const response = await login2({ username: 'yourUsername', password: 'yourPassword' });
      return response;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      return undefined;
    }
  };
  const onFinish = async (values: { username: string; password: string}) => {
    setLoading(true);
    try {
      const response = await login2(values);
      
      console.log('Login response:', response);
  
      if (response.map?.user?.username === values.username && response.map?.user?.password === values.password) {
        message.success('Login successful!');
        
        // Update global state with the login response
        await setInitialState((s) => ({
          ...s,
          user_status: response,
        }));
        // Ensure the state is updated before navigation
        setTimeout(() => {
        // Navigate to welcome page after state update
        history.push('/welcome');
        }, 0);
        
        
      } else {
        message.error('Incorrect username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Login failed, please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <img
            alt="logo"
            src="/logo2.png"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <div className={styles.title}>CSE Space Management System</div> {/* Main title */}
          <div className={styles.spacer}></div> {/* Added spacing */}
          <Form
            name="login"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'username' }]}
            >
              <Input placeholder="username" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'password' }]}
            >
              <Input.Password placeholder="password" size="large" />
            </Form.Item>
            <Form.Item name="rememberMe" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block size="large">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
import { AvatarDropdown, AvatarName, Footer, Question } from '@/components';
import { login2 } from '@/services/ant-design-pro/api'; 
import { useFetchData, type Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  user_status?: API.Login;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.Login | undefined>;
}> {
  const fetchUserInfo = async (): Promise<API.Login | undefined> => {
    try {
      const response = await login2({ username: 'yourUsername', password: 'yourPassword' });
      return response;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      return undefined;
    }
  };
  
  const { location } = history;
  let user_status;

  if (location.pathname !== loginPath) {
    user_status = await fetchUserInfo();
  }

  return {
    fetchUserInfo,
    user_status,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const fetchUserInfoAndUpdateState = async () => {
    if (initialState?.fetchUserInfo) {
      const newUserStatus = await initialState.fetchUserInfo();
      if (newUserStatus) {
        setInitialState((s) => ({
          ...s,
          user_status: newUserStatus,
        }));
      }
    }
  };
  
  return {
    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      title: initialState?.user_status?.map?.user?.username, 
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // Check if user is not logged in and trying to access a protected route
      if (!initialState?.user_status?.map?.user && location.pathname !== loginPath) {
        console.log('Not logged in, redirecting to login page');
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        background: '#FFFFFF',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        background: '#FFFFFF',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        background: '#FFFFFF',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuHeaderRender: undefined,
    childrenRender: (children) => {
      return (
        <>
          {children}
        </>
      );
    },
    
    // Adding user details to the sidebar
    menuExtraRender: ({ collapsed }) => {
      const { user_status } = initialState || {};
      const user = user_status?.map?.user;
      if (!user|| collapsed) {
        return null;
      }
      return (
        <div style={{ padding: '16px', color: 'rgba(0, 0, 0, 0.65)', background: '#FFDC00' }}>
          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>{user.username}</div>
          <div style={{ marginBottom: '8px' }}>{user.role}</div>
          <div>{user.email}</div>
        </div>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};


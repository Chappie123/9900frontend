import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'project',
          title: 'CSE Space',
          href: 'https://www.unsw.edu.au/engineering/our-schools/computer-science-and-engineering',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/unsw-cse-comp99-3900-24t1/capstone-project-9900f09afinalupupup',
          blankTarget: true,
        },
        {
          key: 'Team',
          title: 'FinalUPUPUP',
          href: 'https://github.com/unsw-cse-comp99-3900-24t1/capstone-project-9900f09afinalupupup',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;

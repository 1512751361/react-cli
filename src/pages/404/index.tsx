import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.less';
import img404 from './img/404.svg';

const Index = function (): JSX.Element {
  const [value, setValue] = useState<string[]>([]);
  return (
    <>
      <div className={styles.container404}>
        <img
          src={img404}
          alt='404'
          className={styles.container404Image}
          onTouchStart={() => {
            setValue(value.concat('start'));
          }}
          onTouchEnd={() => {
            setValue(value.concat('end'));
          }}
        />
        <div className={styles.container404Content}>
          <h1>404</h1>
          <h2>UH OH! 页面丢失</h2>
          <p>您所寻找的页面不存在。你可以点击下面的按钮，返回主页。</p>
          <div className={styles.container404ContentGoHome}>
            <Link to='/' className={styles.container404ContentGoHomeLink}>
              返回首页
            </Link>
          </div>
        </div>
      </div>
      <pre style={{ fontSize: 30 }}>{JSON.stringify(value, null, 4)}</pre>
    </>
  );
};

export default Index;

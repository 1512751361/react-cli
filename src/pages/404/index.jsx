import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import style from './style.scss';
import pic404 from './images/404.png';

export default class Erorr404 extends PureComponent {
	render() {
		return (
			<div className={style.error_404_container}>
				<div className={style.row}>
					<div className={style.pic_404}>
						<img src={pic404} alt="" />
					</div>
					<div className={style.bullshit}>
						<div className={style.bullshit_oops}>OOPS!</div>
						<div className={style.bullshit_info}>
              版权所有&nbsp;&nbsp;
							<Link to="/">火六</Link>
						</div>
						<div className={style.bullshit_headline}>网管说这个页面你不能进......</div>
						<div className={style.bullshit_info}>请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
						<Link to="/" className={style.bullshit_return_home}>返回首页</Link>
					</div>
				</div>
			</div>
		);
	}
}

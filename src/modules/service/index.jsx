import React from 'react';
import iphoneData from './phoneData';

export default class Service extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 375,
			height: 667,
			scale: 1,
		};
	}

	render() {
		const width = 750 / 2;
		const height = 1334 / 2;
		return (
			<div>
      服务中心
			UI：width:
				{' '}
				{width}
				{' '}
			height:
				{' '}
				{height}
				<br />
				{this.state.width * this.state.scale}
				<br />
				{this.state.height * this.state.scale}
				<div style={{
					backgroundColor: 'red',
					width,
					height,
					transform: [
						{
							translateX: -this.state.width * 0.5,
						},
						{
							translateY: -this.state.height * 0.5,
						},
						{
							scale: this.state.scale,
						},
						{
							translateX: this.state.width * 0.5,
						},
						{
							translateY: this.state.height * 0.5,
						},
					],
				}}
				/>
				<table cellPadding={10} cellSpacing={10}>
					<tr>
						<th>设备名称</th>
						<th>操作系统</th>
						<th>尺寸 in</th>
						<th>PPI</th>
						<th>纵横比</th>
						<th>
							{'宽 x 高 dp'}
						</th>
						<th>
							{'宽 x 高 px'}
						</th>
						<th>密度 dpi</th>
						<th>密度 type</th>
						<th>fwDesignScale</th>
						<th>fwWidth</th>
						<th>fwHeight</th>
						<th>fwScale</th>
						<th />
						<th>fhDesignScale</th>
						<th>fhWidth</th>
						<th>fhHeight</th>
						<th>fhScale</th>
						<th>操作</th>
					</tr>
					{
						iphoneData.map((item) => {
							const fwDesignScale = width / item.width;
							const fwWidth = width;
							let fwHeight = item.height * (width / item.width);
							let fwScale = 1 / item.dpi / (width / item.width);

							const fhDesignScale = height / item.height;
							let fhWidth = item.width * (height / item.height);
							const fhHeight = height;
							const fhScale = 1 / item.dpi / (height / item.height);

							let bg = '';
							if (Math.round(fwWidth) === width && Math.round(fhWidth) === width) {
								bg = 'green';
							} else if ((Math.round(fwWidth) === width && fwScale < fhScale) || (Math.round(fhWidth) === width && fwScale > fhScale)) {
								bg = 'red';
							}
							if (
								fwHeight !== height
							&& Math.round(fwHeight) === height
							) {
								fwHeight = Math.round(fwHeight);
								fwScale = 1 / item.dpi / (fwHeight / item.height);
							} else if (
								fwHeight !== height
							&& Math.floor(fwHeight) === height
							) {
								fwHeight = Math.floor(fwHeight);
							} else if (
								fwHeight !== height
							&& Math.ceil(fwHeight) === height
							) {
								fwHeight = Math.ceil(fwHeight);
							}

							if (
								fhWidth !== width
							&& Math.round(fhWidth) === width
							) {
								fhWidth = Math.round(fhWidth);
							} else if (
								fhWidth !== width
							&& Math.floor(fhWidth) === width
							) {
								fhWidth = Math.floor(fhWidth);
							} else if (
								fhWidth !== width
							&& Math.ceil(fhWidth) === width
							) {
								fhWidth = Math.ceil(fhWidth);
							}
							return (
								<tr style={{ backgroundColor: (item.isPad ? (bg ? 'blue' : 'pink') : bg) }}>
									<td>{item.name}</td>
									<td>{item.platform}</td>
									<td>{item.in}</td>
									<td>{item.PPI}</td>
									<td>{item.scale}</td>
									<td>
										{item.widthDp}
										{' X '}
										{item.heightDp}
									</td>
									<td>
										{item.width}
										{' X '}
										{item.height}
									</td>
									<td>{item.dpi}</td>
									<td>{item.dpiType}</td>
									<td>{fwDesignScale}</td>
									<td>{fwWidth}</td>
									<td>{fwHeight}</td>
									<td>{fwScale}</td>
									<td />
									<td>{fhDesignScale}</td>
									<td>{fhWidth}</td>
									<td>{fhHeight}</td>
									<td>{fhScale}</td>
									<td>
										<button
											type="button"
											onClick={() => {
												this.setState({
													width: fwWidth,
													height: fwHeight,
													scale: fwScale,
												});
											}}
										>
											{'执行1'}

										</button>
										<button
											type="button"
											onClick={() => {
												this.setState({
													width: fhWidth,
													height: fhHeight,
													scale: fhScale,
												});
											}}
										>
											{'执行2'}

										</button>
									</td>
								</tr>
							);
						})
					}
				</table>
			</div>
		);
	}
}

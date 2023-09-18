import React, { Component } from 'react';
import './styles.scss';

export default class MyTitle extends Component {
	render() {
		const { title, subtitle } = this.props;
		return (
			<div className="my-title">
				<p className="title">{title}</p>
				<div className='subtitle-wrapper'>
					<p className="subtitle">{subtitle}</p>
				</div>
			</div>
		);
	}
}

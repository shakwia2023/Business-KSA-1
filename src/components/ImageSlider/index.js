import React, { Component } from 'react';
import './styles.scss';

export default class ImageSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slider: 0,
			autoSlide: props.autoSlide || true,
			interval: props.interval || 5000,
			navDots: props.navDots || false,
			autoSlideInterval: null,
		};
		this.startAutoSlide = this.startAutoSlide.bind(this);
		this.StopAutoSlide = this.StopAutoSlide.bind(this);
		this.moveSlide = this.moveSlide.bind(this);
	}

	componentDidMount() {
		const { autoSlide, navDots } = this.state;
		document.getElementById('images_slider').children[0].classList.add('visible');
		navDots && document.getElementById('slider_nav_dots').children[0].classList.toggle('clicked');
		if (autoSlide) {
			this.startAutoSlide();
		}
	}

	componentWillUnmount() {
		this.StopAutoSlide();
	}

	startAutoSlide() {
		const { interval } = this.state;
		this.setState({ autoSlideInterval: setInterval(this.moveSlide, interval) });
	}

	StopAutoSlide() {
		const { autoSlideInterval } = this.state;
		clearInterval(autoSlideInterval);
	}

	moveSlide(slide) {
		const { slider, navDots } = this.state;
		const { data } = this.props;
		let next = slider + 1;
		if (slide >= 0) {
			this.StopAutoSlide();
			next = slide;
		} else if (slider >= data.length - 1) {
			next = 0;
		}
		document.getElementById('images_slider').children[next].classList.toggle('visible');
		document.getElementById('images_slider').children[slider].classList.toggle('visible');
		if (navDots) {
			document.getElementById('slider_nav_dots').children[next].classList.toggle('clicked');
			document.getElementById('slider_nav_dots').children[slider].classList.toggle('clicked');
		}
		this.setState({ slider: next });
		if (slide >= 0) {
			this.startAutoSlide();
		}
	}

	render() {
		const { navDots } = this.state;
		const { data, children } = this.props;
		return (
			<div className="image-slider">
				<div className="slider-images" id="images_slider">
					{data.map((d, i) => (
						<div key={i} className="slider-image" style={{ backgroundImage: `url(${d.url})` }} />
					))}
					<div className="children">{children}</div>
				</div>
				{navDots && (
					<div className="nav-dots" id="slider_nav_dots">
						{data.map((d, i) => (
							<button className="nav-dot" key={i} onClick={() => this.moveSlide(i)} />
						))}
					</div>
				)}
			</div>
		);
	}
}
